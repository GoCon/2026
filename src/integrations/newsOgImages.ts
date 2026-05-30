import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { AstroIntegration } from "astro";
import { generateNewsOgImage } from "../utils/generateNewsOgImage";

const projectRoot = path.resolve(
  fileURLToPath(new URL("../..", import.meta.url)),
);

type NewsArticleMeta = {
  id: string;
  title: string;
};

/**
 * Markdown のフロントマターからタイトルを取得する。
 *
 * @param markdown - Markdown のテキスト
 * @returns タイトル
 */
function parseFrontmatterTitle(markdown: string): string {
  const frontmatterMatch = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!frontmatterMatch) {
    throw new Error("Frontmatter not found in news markdown");
  }

  const titleLine = frontmatterMatch[1]
    .split("\n")
    .find((line) => line.startsWith("title:"));
  if (!titleLine) {
    throw new Error("title field not found in news frontmatter");
  }

  const rawValue = titleLine.replace(/^title:\s*/, "").trim();
  if (
    (rawValue.startsWith('"') && rawValue.endsWith('"')) ||
    (rawValue.startsWith("'") && rawValue.endsWith("'"))
  ) {
    return rawValue.slice(1, -1);
  }

  return rawValue;
}

/**
 * ニュース記事のメタデータを読み込む。
 *
 * @returns ニュース記事のメタデータ
 */
async function loadNewsArticles(): Promise<NewsArticleMeta[]> {
  const newsDir = path.join(projectRoot, "src/content/news");
  const files = await fs.readdir(newsDir);

  return Promise.all(
    files
      .filter((file) => file.endsWith(".md"))
      .map(async (file) => {
        const markdown = await fs.readFile(path.join(newsDir, file), "utf-8");
        return {
          id: file.replace(/\.md$/, ""),
          title: parseFrontmatterTitle(markdown),
        };
      }),
  );
}

/*
 * すべてのニュース記事の OGP 画像を生成する。
 * 戻り値はなく、画像が生成されたら終了する。
 */
async function generateAllNewsOgImages(): Promise<void> {
  const articles = await loadNewsArticles();
  const outDir = path.join(projectRoot, "public/og/news");
  const framePath = path.join(projectRoot, "public/news_ogp_frame.jpg");
  const fontPath = path.join(
    projectRoot,
    "node_modules/@fontsource/noto-sans-jp/files/noto-sans-jp-japanese-700-normal.woff",
  );

  await fs.mkdir(outDir, { recursive: true });

  await Promise.all(
    articles.map((article) =>
      generateNewsOgImage({
        title: article.title,
        framePath,
        fontPath,
        outputPath: path.join(outDir, `${article.id}.png`),
      }),
    ),
  );
}

export function newsOgImagesIntegration(): AstroIntegration {
  return {
    name: "gocon-news-og-images",
    hooks: {
      "astro:build:start": async () => {
        await generateAllNewsOgImages();
      },
      "astro:server:start": async () => {
        await generateAllNewsOgImages();
      },
    },
  };
}
