import fs from "node:fs/promises";
import satori from "satori";
import sharp from "sharp";

/** `public/news_ogp_frame.jpg` のピクセルサイズ */
export const NEWS_OGP_WIDTH = 2400;
export const NEWS_OGP_HEIGHT = 1350;

/** `public/session_ogp_frame.jpg` のピクセルサイズ */
export const SESSION_OGP_WIDTH = 2400;
export const SESSION_OGP_HEIGHT = 1350;

type TitleArea = {
  horizontalPadding: number;
  top: number;
  height: number;
  paddingTop: number;
  fontSize: number;
};

/** 白枠内のタイトル配置（news_ogp_frame.jpg に合わせた値） */
const NEWS_TITLE_AREA: TitleArea = {
  /** 左右同じ余白にして、白枠の水平中央と揃える */
  horizontalPadding: 200,
  top: 360,
  height: 680,
  /** 垂直方向を中央より少し下げる（上側に余白ができる） */
  paddingTop: 24,
  fontSize: 120,
};

/** 白枠内のタイトル配置（session_ogp_frame.jpg に合わせた値） */
const SESSION_TITLE_AREA: TitleArea = {
  horizontalPadding: 200,
  top: 360,
  height: 680,
  paddingTop: 24,
  fontSize: 120,
};

export function getNewsOgImagePublicPath(articleId: string): string {
  return `og/news/${articleId}.png`;
}

export function getProgramOgImagePublicPath(programId: string): string {
  return `og/timetable/${programId}.png`;
}

type GenerateOgImageOptions = {
  title: string;
  framePath: string;
  fontPath: string;
  outputPath: string;
  width: number;
  height: number;
  titleArea: TitleArea;
};

/**
 * フレーム画像の上に Satori でタイトルを描画し、PNG を出力する。
 */
async function generateOgImage(options: GenerateOgImageOptions): Promise<void> {
  const { title, framePath, fontPath, outputPath, width, height, titleArea } =
    options;
  const titleAreaWidth = width - titleArea.horizontalPadding * 2;

  const frameBuffer = await fs.readFile(framePath);
  const frameBase64 = `data:image/jpeg;base64,${frameBuffer.toString("base64")}`;
  const fontData = await fs.readFile(fontPath);

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
                left: titleArea.horizontalPadding,
                top: titleArea.top,
                width: titleAreaWidth,
                height: titleArea.height,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: titleArea.paddingTop,
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      fontSize: titleArea.fontSize,
                      fontWeight: 700,
                      color: "#000000",
                      lineHeight: 1.35,
                      fontFamily: "Noto Sans JP",
                      textAlign: "center",
                    },
                    children: title,
                  },
                },
              ],
            },
          },
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
  "width" | "height" | "titleArea"
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

export async function generateProgramOgImage(
  options: GenerateNewsOgImageOptions,
): Promise<void> {
  await generateOgImage({
    ...options,
    width: SESSION_OGP_WIDTH,
    height: SESSION_OGP_HEIGHT,
    titleArea: SESSION_TITLE_AREA,
  });
}
