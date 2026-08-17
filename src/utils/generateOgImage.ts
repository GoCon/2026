import dns from "node:dns";
import fs from "node:fs/promises";
import https from "node:https";
import satori from "satori";
import sharp from "sharp";

// Node 17+ は IPv6 を先に試す。Netlify 上では AAAA が通らず fetch が失敗することがある。
dns.setDefaultResultOrder("ipv4first");

/** `public/news_ogp_frame.jpg` のピクセルサイズ */
export const NEWS_OGP_WIDTH = 2400;
export const NEWS_OGP_HEIGHT = 1350;

/** `public/session_ogp_frame.jpg` のピクセルサイズ */
export const SESSION_OGP_WIDTH = 2400;
export const SESSION_OGP_HEIGHT = 1350;

type FontSizeStep = {
  /** この文字数以下ならこの fontSize を使う */
  maxLength: number;
  fontSize: number;
};

type TitleArea = {
  paddingLeft: number;
  paddingRight: number;
  top: number;
  height: number;
  paddingTop: number;
  fontSize: number;
  /** 指定時はタイトル文字数に応じて fontSize を切り替える。maxLength 昇順で評価する */
  fontSizeSteps?: readonly FontSizeStep[];
  lineHeight: number;
  textAlign: "left" | "center";
};

/** 白枠内のタイトル配置（news_ogp_frame.jpg に合わせた値） */
const NEWS_TITLE_AREA: TitleArea = {
  paddingLeft: 200,
  paddingRight: 200,
  top: 360,
  height: 680,
  /** 垂直方向を中央より少し下げる（上側に余白ができる） */
  paddingTop: 24,
  fontSize: 120,
  lineHeight: 1.35,
  textAlign: "center",
};

/** 白枠内のタイトル配置（session_ogp_frame.jpg に合わせた値） */
const SESSION_TITLE_AREA: TitleArea = {
  paddingLeft: 320,
  paddingRight: 150,
  top: 250,
  height: 680,
  paddingTop: 24,
  fontSize: 100,
  fontSizeSteps: [
    { maxLength: 65, fontSize: 100 },
    { maxLength: Number.POSITIVE_INFINITY, fontSize: 90 },
  ],
  lineHeight: 1.75,
  textAlign: "left",
};

const SESSION_SPEAKER_AREA = {
  bottom: 200,
  avatarSize: 150,
  fontSize: 70,
  gap: 24,
} as const;

export function getNewsOgImagePublicPath(articleId: string): string {
  return `og/news/${articleId}.png`;
}

export function getProgramOgImagePublicPath(programId: string): string {
  return `og/timetable/${programId}.png`;
}

/**
 * OGP 用フォントで欠けやすいハイフン類だけを ASCII hyphen に置換する。
 * タイトル区切りの em dash（—）などは変更しない。
 */
function sanitizeOgTitle(title: string): string {
  return title.replace(/[\u2010-\u2012\u2500]/g, "-");
}

function resolveTitleFontSize(title: string, titleArea: TitleArea): number {
  if (!titleArea.fontSizeSteps?.length) {
    return titleArea.fontSize;
  }

  const length = [...title].length;
  const steps = [...titleArea.fontSizeSteps].sort(
    (a, b) => a.maxLength - b.maxLength,
  );
  const matched = steps.find((step) => length <= step.maxLength);
  return matched?.fontSize ?? titleArea.fontSize;
}

type OgSpeaker = {
  name: string;
  avatarDataUri?: string;
};

type GenerateOgImageOptions = {
  title: string;
  framePath: string;
  fontPath: string;
  outputPath: string;
  width: number;
  height: number;
  titleArea: TitleArea;
  speaker?: OgSpeaker;
};

const AVATAR_FETCH_TIMEOUT_MS = 15_000;
const AVATAR_FETCH_RETRIES = 3;

function downloadAvatar(
  url: string,
  redirectsLeft = 5,
): Promise<{ buffer: Buffer; contentType: string }> {
  return new Promise((resolve, reject) => {
    const request = https.get(
      url,
      {
        family: 4,
        headers: {
          Accept: "image/jpeg,image/png,image/webp,image/svg+xml,*/*;q=0.1",
          "User-Agent": "GoCon2026OGP/1.0 (https://gocon.jp/2026)",
        },
      },
      (response) => {
        const status = response.statusCode ?? 0;
        if (
          status >= 300 &&
          status < 400 &&
          response.headers.location &&
          redirectsLeft > 0
        ) {
          const nextUrl = new URL(response.headers.location, url).href;
          response.resume();
          downloadAvatar(nextUrl, redirectsLeft - 1).then(resolve, reject);
          return;
        }

        if (status !== 200) {
          response.resume();
          reject(new Error(`HTTP ${status}`));
          return;
        }

        const chunks: Buffer[] = [];
        response.on("data", (chunk: Buffer) => {
          chunks.push(chunk);
        });
        response.on("end", () => {
          resolve({
            buffer: Buffer.concat(chunks),
            contentType: String(response.headers["content-type"] ?? ""),
          });
        });
        response.on("error", reject);
      },
    );

    request.on("error", reject);
    request.setTimeout(AVATAR_FETCH_TIMEOUT_MS, () => {
      request.destroy(new Error("Timed out"));
    });
  });
}

async function toAvatarDataUri(url: string): Promise<string | undefined> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= AVATAR_FETCH_RETRIES; attempt += 1) {
    try {
      const { buffer, contentType } = await downloadAvatar(url);
      const size = SESSION_SPEAKER_AREA.avatarSize * 2;
      try {
        const png = await sharp(buffer)
          .rotate()
          .resize(size, size, { fit: "cover" })
          .toColorspace("srgb")
          .png()
          .toBuffer();
        return `data:image/png;base64,${png.toString("base64")}`;
      } catch (error) {
        const isSvg =
          contentType.includes("svg") ||
          new URL(url).pathname.endsWith(".svg");
        if (isSvg) {
          return `data:image/svg+xml;base64,${buffer.toString("base64")}`;
        }
        throw error;
      }
    } catch (error) {
      lastError = error;
    }
  }

  console.warn(
    `[og-image] Failed to load speaker avatar: ${url}`,
    lastError instanceof Error ? lastError.message : lastError,
  );
  return undefined;
}

/**
 * フレーム画像の上に Satori でタイトルを描画し、PNG を出力する。
 */
async function generateOgImage(options: GenerateOgImageOptions): Promise<void> {
  const { framePath, fontPath, outputPath, width, height, titleArea, speaker } =
    options;
  const title = sanitizeOgTitle(options.title);
  const fontSize = resolveTitleFontSize(title, titleArea);
  const titleAreaWidth = width - titleArea.paddingLeft - titleArea.paddingRight;

  const frameBuffer = await fs.readFile(framePath);
  const frameBase64 = `data:image/jpeg;base64,${frameBuffer.toString("base64")}`;
  const fontData = await fs.readFile(fontPath);

  const speakerChildren = [];
  if (speaker?.avatarDataUri) {
    speakerChildren.push({
      type: "img",
      props: {
        src: speaker.avatarDataUri,
        width: SESSION_SPEAKER_AREA.avatarSize,
        height: SESSION_SPEAKER_AREA.avatarSize,
        style: {
          width: SESSION_SPEAKER_AREA.avatarSize,
          height: SESSION_SPEAKER_AREA.avatarSize,
          borderRadius: SESSION_SPEAKER_AREA.avatarSize / 2,
          objectFit: "cover",
        },
      },
    });
  }
  if (speaker?.name) {
    speakerChildren.push({
      type: "div",
      props: {
        style: {
          display: "flex",
          fontSize: SESSION_SPEAKER_AREA.fontSize,
          fontWeight: 700,
          color: "#000000",
          fontFamily: "Noto Sans JP",
        },
        children: speaker.name,
      },
    });
  }

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width,
          height,
          display: "flex",
          position: "relative",
        },
        children: [
          {
            type: "img",
            props: {
              src: frameBase64,
              width,
              height,
              style: {
                position: "absolute",
                top: 0,
                left: 0,
                width,
                height,
              },
            },
          },
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                left: titleArea.paddingLeft,
                top: titleArea.top,
                width: titleAreaWidth,
                height: titleArea.height,
                display: "flex",
                flexDirection: "column",
                alignItems:
                  titleArea.textAlign === "left" ? "flex-start" : "center",
                justifyContent: "center",
                paddingTop: titleArea.paddingTop,
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      justifyContent:
                        titleArea.textAlign === "left"
                          ? "flex-start"
                          : "center",
                      width: "100%",
                      fontSize,
                      fontWeight: 700,
                      color: "#000000",
                      lineHeight: titleArea.lineHeight,
                      fontFamily: "Noto Sans JP",
                      textAlign: titleArea.textAlign,
                    },
                    children: title,
                  },
                },
              ],
            },
          },
          ...(speakerChildren.length > 0
            ? [
                {
                  type: "div",
                  props: {
                    style: {
                      position: "absolute",
                      left: titleArea.paddingLeft,
                      bottom: SESSION_SPEAKER_AREA.bottom,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: SESSION_SPEAKER_AREA.gap,
                    },
                    children: speakerChildren,
                  },
                },
              ]
            : []),
        ],
      },
    },
    {
      width,
      height,
      fonts: [
        {
          name: "Noto Sans JP",
          data: fontData,
          weight: 700,
          style: "normal",
        },
      ],
    },
  );

  await sharp(Buffer.from(svg)).png().toFile(outputPath);
}

type GenerateNewsOgImageOptions = Omit<
  GenerateOgImageOptions,
  "width" | "height" | "titleArea" | "speaker"
>;

export async function generateNewsOgImage(
  options: GenerateNewsOgImageOptions,
): Promise<void> {
  await generateOgImage({
    ...options,
    width: NEWS_OGP_WIDTH,
    height: NEWS_OGP_HEIGHT,
    titleArea: NEWS_TITLE_AREA,
  });
}

type GenerateProgramOgImageOptions = GenerateNewsOgImageOptions & {
  speaker?: {
    name: string;
    avatarUrl?: string;
  };
};

export async function generateProgramOgImage(
  options: GenerateProgramOgImageOptions,
): Promise<void> {
  const avatarDataUri = options.speaker?.avatarUrl
    ? await toAvatarDataUri(options.speaker.avatarUrl)
    : undefined;

  await generateOgImage({
    title: options.title,
    framePath: options.framePath,
    fontPath: options.fontPath,
    outputPath: options.outputPath,
    width: SESSION_OGP_WIDTH,
    height: SESSION_OGP_HEIGHT,
    titleArea: SESSION_TITLE_AREA,
    speaker: options.speaker?.name
      ? { name: options.speaker.name, avatarDataUri }
      : undefined,
  });
}
