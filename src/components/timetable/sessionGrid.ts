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
 * CSS Grid（grid-item-1…35）への内容割り当て。
 * スポンサーは 3 枠。row 8（150px）は休憩後の余白。
 */
export const sessionGridCells: SessionGridCell[] = [
  // 09:30 開場
  { type: "time", startTime: "09：30", gridItem: 1 },
  {
    type: "card",
    programId: "open",
    room: "roomA",
    gridItem: 2,
    startTime: "09：30",
  },

  // 10:15
  { type: "time", startTime: "10：15", gridItem: 3 },
  {
    type: "card",
    programId: "opening",
    room: "roomA",
    gridItem: 4,
    startTime: "10：15",
  },

  // 10:30 基調講演
  { type: "time", startTime: "10：30", gridItem: 5 },
  {
    type: "card",
    programId: "keynote",
    room: "roomA",
    gridItem: 6,
    startTime: "10：30",
  },

  // 11:25
  { type: "time", startTime: "11：25", gridItem: 7 },
  {
    type: "card",
    programId: "1251905",
    room: "roomA",
    gridItem: 8,
    startTime: "11：25",
  },
  {
    type: "card",
    programId: "1251920",
    room: "roomB",
    gridItem: 9,
    startTime: "11：25",
  },

  // 12:20〜13:10 スポンサー + お昼休憩
  { type: "time", startTime: "12：20", gridItem: 10 },
  {
    type: "card",
    programId: "sponsorSlot1",
    room: "roomA",
    gridItem: 11,
    startTime: "12：20",
  },
  {
    type: "card",
    programId: "lunch",
    room: "roomB",
    gridItem: 12,
    startTime: "12：05",
  },
  { type: "time", startTime: "12：45", gridItem: 13 },
  {
    type: "card",
    programId: "sponsorSlot2",
    room: "roomA",
    gridItem: 14,
    startTime: "12：45",
  },
  { type: "time", startTime: "13：10", gridItem: 15 },
  {
    type: "card",
    programId: "sponsorSlot3",
    room: "roomA",
    gridItem: 16,
    startTime: "13：10",
  },

  // 14:00（Room A ロング / Room B ショート×2）
  { type: "time", startTime: "14：00", gridItem: 17 },
  {
    type: "card",
    programId: "1264506",
    room: "roomA",
    gridItem: 18,
    startTime: "14：00",
  },
  {
    type: "card",
    programId: "1236917",
    room: "roomB",
    gridItem: 19,
    startTime: "14：00",
  },
  { type: "time", startTime: "14：35", gridItem: 20 },
  {
    type: "card",
    programId: "1237370",
    room: "roomB",
    gridItem: 21,
    startTime: "14：35",
  },

  // 15:05
  { type: "time", startTime: "15：05", gridItem: 22 },
  {
    type: "card",
    programId: "1264549",
    room: "roomA",
    gridItem: 23,
    startTime: "15：05",
  },
  {
    type: "card",
    programId: "1257333",
    room: "roomB",
    gridItem: 24,
    startTime: "15：05",
  },

  // 15:40
  { type: "time", startTime: "15：40", gridItem: 25 },
  {
    type: "card",
    programId: "1264524",
    room: "roomA",
    gridItem: 26,
    startTime: "15：40",
  },
  {
    type: "card",
    programId: "1263610",
    room: "roomB",
    gridItem: 27,
    startTime: "15：40",
  },

  // 16:25
  { type: "time", startTime: "16：25", gridItem: 28 },
  {
    type: "card",
    programId: "1263399",
    room: "roomA",
    gridItem: 29,
    startTime: "16：25",
  },
  {
    type: "card",
    programId: "1263912",
    room: "roomB",
    gridItem: 30,
    startTime: "16：25",
  },

  // 17:20
  { type: "time", startTime: "17：20", gridItem: 31 },
  {
    type: "card",
    programId: "1255534",
    room: "roomA",
    gridItem: 32,
    startTime: "17：20",
  },
  {
    type: "card",
    programId: "1264230",
    room: "roomB",
    gridItem: 33,
    startTime: "17：20",
  },

  // 17:45
  { type: "time", startTime: "17：45", gridItem: 34 },
  {
    type: "card",
    programId: "closing",
    room: "roomA",
    gridItem: 35,
    startTime: "17：45",
  },

  // 18:30 After Party
  { type: "time", startTime: "18：30", gridItem: 36 },
  {
    type: "card",
    programId: "afterParty",
    room: "roomA",
    gridItem: 37,
    startTime: "18：30",
  },
];
