import fs from "node:fs/promises";
import satori from "satori";
import sharp from "sharp";

/** `public/news_ogp_frame.jpg` のピクセルサイズ */
export const NEWS_OGP_WIDTH = 2400;
export const NEWS_OGP_HEIGHT = 1350;

/** 白枠内のタイトル配置（フレーム画像に合わせた仮値） */
const TITLE_AREA = {
  /** 左右同じ余白にして、白枠の水平中央と揃える */
  horizontalPadding: 200,
  top: 360,
  height: 680,
  /** 垂直方向を中央より少し下げる（上側に余白ができる） */
  paddingTop: 24,
  fontSize: 120,
} as const;

const titleAreaWidth = NEWS_OGP_WIDTH - TITLE_AREA.horizontalPadding * 2;

export function getNewsOgImagePublicPath(articleId: string): string {
  return `og/news/${articleId}.png`;
}

type GenerateNewsOgImageOptions = {
  title: string;
  framePath: string;
  fontPath: string;
  outputPath: string;
};

/**
 * フレーム画像の上に Satori でタイトルを描画し、PNG を出力する。
 */
export async function generateNewsOgImage(
  options: GenerateNewsOgImageOptions,
): Promise<void> {
  const { title, framePath, fontPath, outputPath } = options;

  const frameBuffer = await fs.readFile(framePath);
  const frameBase64 = `data:image/jpeg;base64,${frameBuffer.toString("base64")}`;
  const fontData = await fs.readFile(fontPath);

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: NEWS_OGP_WIDTH,
          height: NEWS_OGP_HEIGHT,
          display: "flex",
          position: "relative",
        },
        children: [
          {
            type: "img",
            props: {
              src: frameBase64,
              width: NEWS_OGP_WIDTH,
              height: NEWS_OGP_HEIGHT,
              style: {
                position: "absolute",
                top: 0,
                left: 0,
                width: NEWS_OGP_WIDTH,
                height: NEWS_OGP_HEIGHT,
              },
            },
          },
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                left: TITLE_AREA.horizontalPadding,
                top: TITLE_AREA.top,
                width: titleAreaWidth,
                height: TITLE_AREA.height,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: TITLE_AREA.paddingTop,
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      fontSize: TITLE_AREA.fontSize,
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
      width: NEWS_OGP_WIDTH,
      height: NEWS_OGP_HEIGHT,
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
