import type { ProgramId } from "./program";

export type Schedule = {
  startTime: string; // HH：MM のフォーマット
  roomAProgramID: ProgramId | "blank";
  roomBProgramID: ProgramId | "blank";
};

/** ワークショップタブ用。セッション配置は sessionGrid.ts を正とする。 */
export const workshopSchedule: Schedule[] = [
  {
    startTime: "11：25",
    roomAProgramID: "1259723",
    roomBProgramID: "1264338",
  },
  {
    startTime: "12：10",
    roomAProgramID: "lunch",
    roomBProgramID: "lunch",
  },
  {
    startTime: "13：30",
    roomAProgramID: "1264403",
    roomBProgramID: "1263141",
  },
  {
    startTime: "15：30",
    roomAProgramID: "1259713",
    roomBProgramID: "1257229",
  },
];
