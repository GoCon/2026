import type { ProgramId } from "./program";

export type SessionGridRoom = "roomA" | "roomB";

export type SessionGridCell =
  | {
      type: "time";
      startTime: string;
      gridItem: number;
    }
  | {
      type: "card";
      programId: ProgramId;
      room: SessionGridRoom;
      gridItem: number;
      /** timeString 解決用（fullwidth colon） */
      startTime: string;
    };

/**
 * CSS Grid（grid-item-1…33）への内容割り当て。
 * スポンサーは 3 枠。row 7（150px）は休憩後の余白。
 */
export const sessionGridCells: SessionGridCell[] = [
  // 10:15
  { type: "time", startTime: "10：15", gridItem: 1 },
  {
    type: "card",
    programId: "opening",
    room: "roomA",
    gridItem: 2,
    startTime: "10：15",
  },

  // 10:30 基調講演
  { type: "time", startTime: "10：30", gridItem: 3 },
  {
    type: "card",
    programId: "keynote",
    room: "roomA",
    gridItem: 4,
    startTime: "10：30",
  },

  // 11:25
  { type: "time", startTime: "11：25", gridItem: 5 },
  {
    type: "card",
    programId: "1251905",
    room: "roomA",
    gridItem: 6,
    startTime: "11：25",
  },
  {
    type: "card",
    programId: "1251920",
    room: "roomB",
    gridItem: 7,
    startTime: "11：25",
  },

  // 12:20〜13:10 スポンサー + お昼休憩
  { type: "time", startTime: "12：20", gridItem: 8 },
  {
    type: "card",
    programId: "sponsorSlot1",
    room: "roomA",
    gridItem: 9,
    startTime: "12：20",
  },
  {
    type: "card",
    programId: "lunch",
    room: "roomB",
    gridItem: 10,
    startTime: "12：05",
  },
  { type: "time", startTime: "12：45", gridItem: 11 },
  {
    type: "card",
    programId: "sponsorSlot2",
    room: "roomA",
    gridItem: 12,
    startTime: "12：45",
  },
  { type: "time", startTime: "13：10", gridItem: 13 },
  {
    type: "card",
    programId: "sponsorSlot3",
    room: "roomA",
    gridItem: 14,
    startTime: "13：10",
  },

  // 14:00（Room A ロング / Room B ショート×2）
  { type: "time", startTime: "14：00", gridItem: 15 },
  {
    type: "card",
    programId: "1264506",
    room: "roomA",
    gridItem: 16,
    startTime: "14：00",
  },
  {
    type: "card",
    programId: "1236917",
    room: "roomB",
    gridItem: 17,
    startTime: "14：00",
  },
  { type: "time", startTime: "14：35", gridItem: 18 },
  {
    type: "card",
    programId: "1237370",
    room: "roomB",
    gridItem: 19,
    startTime: "14：35",
  },

  // 15:05
  { type: "time", startTime: "15：05", gridItem: 20 },
  {
    type: "card",
    programId: "1264549",
    room: "roomA",
    gridItem: 21,
    startTime: "15：05",
  },
  {
    type: "card",
    programId: "1257333",
    room: "roomB",
    gridItem: 22,
    startTime: "15：05",
  },

  // 15:40
  { type: "time", startTime: "15：40", gridItem: 23 },
  {
    type: "card",
    programId: "1264524",
    room: "roomA",
    gridItem: 24,
    startTime: "15：40",
  },
  {
    type: "card",
    programId: "1263610",
    room: "roomB",
    gridItem: 25,
    startTime: "15：40",
  },

  // 16:25
  { type: "time", startTime: "16：25", gridItem: 26 },
  {
    type: "card",
    programId: "1263399",
    room: "roomA",
    gridItem: 27,
    startTime: "16：25",
  },
  {
    type: "card",
    programId: "1263912",
    room: "roomB",
    gridItem: 28,
    startTime: "16：25",
  },

  // 17:20
  { type: "time", startTime: "17：20", gridItem: 29 },
  {
    type: "card",
    programId: "1255534",
    room: "roomA",
    gridItem: 30,
    startTime: "17：20",
  },
  {
    type: "card",
    programId: "1264230",
    room: "roomB",
    gridItem: 31,
    startTime: "17：20",
  },

  // 17:45
  { type: "time", startTime: "17：45", gridItem: 32 },
  {
    type: "card",
    programId: "closing",
    room: "roomA",
    gridItem: 33,
    startTime: "17：45",
  },
];
