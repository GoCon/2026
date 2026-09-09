/**
 * ワークショップ詳細ページ用の connpass 申し込み URL。
 * Part ごとに1つのイベントページへ複数ワークショップが載る。
 */
export const workshopConnpassUrls: Record<string, string> = {
  // Part 1
  "1259723": "https://connpass.com/event/402516", // Let’s Play Go: The Card Game
  "1264338": "https://connpass.com/event/402516", // Go × SIMD
  // Part 2
  "1264403": "https://connpass.com/event/400636", // go.devの歩き方
  "1263141": "https://connpass.com/event/400636", // 自作analyzer入門
  // Part 3
  "1259713": "https://connpass.com/event/402515", // TinyGo Keeb
  "1257229": "https://connpass.com/event/402515", // TDD
};

export function getWorkshopConnpassUrl(programId: string): string | undefined {
  return workshopConnpassUrls[programId];
}
