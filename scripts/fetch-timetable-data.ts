/**
 * Sessionize API から生データを取得し、rawData.json に保存する。
 *
 * URL は環境変数 SESSIONIZE_API_URL から読む（リポジトリには置かない）。
 *
 * Usage:
 *   SESSIONIZE_API_URL='https://sessionize.com/api/v2/<id>/view/All' pnpm fetch:timetable
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const outputPath = path.join(rootDir, "src/components/timetable/rawData.json");

async function main(): Promise<void> {
  const url = process.env.SESSIONIZE_API_URL;
  if (!url) {
    console.error("SESSIONIZE_API_URL が設定されていません");
    process.exit(1);
  }

  const response = await fetch(url);
  if (!response.ok) {
    console.error(`Sessionize API の取得に失敗しました: ${response.status}`);
    process.exit(1);
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    console.error("Sessionize API のレスポンスが JSON ではありません");
    process.exit(1);
  }

  fs.writeFileSync(outputPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  console.log(`Wrote ${outputPath}`);
}

void main();
