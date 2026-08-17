import type { SessionProgram } from "./sessionProgram";

/**
 * 基調講演・スポンサーセッションなど Sessionize 外の手動入力。
 *
 * - id は sessionGrid と対応させること（keynote / sponsorSlot1〜3）
 * - 時刻は sessionGrid から自動解決される
 * - 未入力の枠はこの配列に含めない（プレースホルダー表示のまま）
 */
export const manualSessions: SessionProgram[] = [
  {
    id: "keynote",
    type: "keynote",
    title: "基調講演のタイトル",
    speaker: {
      name: "登壇者名",
      avatar: "https://example.com/avatar.jpg",
      xUrl: "https://x.com/example",
      company: "所属",
      description: "登壇者紹介",
    },
    room: "roomA",
    description: "セッション概要",
  },
  // 以下はスポンサーセッションのサンプル
  // {
  //   id: "sponsorSlot1",
  //   type: "sponsorSession",
  //   title: "スポンサーセッションのタイトル",
  //   difficulty: "beginner",
  //   speaker: {
  //     name: "登壇者名",
  //     avatar: "https://example.com/avatar.jpg",
  //     company: "所属",
  //     description: "登壇者紹介",
  //   },
  //   room: "roomA",
  //   description: "セッション概要",
  // },
];
