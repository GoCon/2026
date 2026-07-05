import type { ProgramId } from "./program";

export type Schedule = {
  startTime: string; // HH：MM のフォーマット
  roomAProgramID: ProgramId | "blank";
  roomBProgramID: ProgramId | "blank";
};

export const sessionSchedule: Schedule[] = [
  {
    startTime: "10：15",
    roomAProgramID: "opening",
    roomBProgramID: "blank",
  },
  {
    startTime: "10：30",
    roomAProgramID: "1264506",
    roomBProgramID: "blank",
  },
  {
    startTime: "11：25",
    roomAProgramID: "1251920",
    roomBProgramID: "1251905",
  },
  {
    startTime: "12：10",
    roomAProgramID: "sponsorSlot1",
    roomBProgramID: "lunch",
  },
  {
    startTime: "12：30",
    roomAProgramID: "sponsorSlot2",
    roomBProgramID: "blank",
  },
  {
    startTime: "12：50",
    roomAProgramID: "sponsorSlot3",
    roomBProgramID: "blank",
  },
  {
    startTime: "13：10",
    roomAProgramID: "sponsorSlot4",
    roomBProgramID: "blank",
  },
  {
    startTime: "13：30",
    roomAProgramID: "1236917",
    roomBProgramID: "1237370",
  },
  {
    startTime: "14：05",
    roomAProgramID: "1255534",
    roomBProgramID: "1257333",
  },
  {
    startTime: "14：40",
    roomAProgramID: "1263399",
    roomBProgramID: "1263912",
  },
  {
    startTime: "15：35",
    roomAProgramID: "1263610",
    roomBProgramID: "1264230",
  },
  {
    startTime: "16：10",
    roomAProgramID: "1264524",
    roomBProgramID: "1264549",
  },
  {
    startTime: "16：40",
    roomAProgramID: "shortExample",
    roomBProgramID: "shortExample",
  },
  {
    startTime: "17：15",
    roomAProgramID: "shortExample",
    roomBProgramID: "shortExample",
  },
  {
    startTime: "17：45",
    roomAProgramID: "closing",
    roomBProgramID: "blank",
  },
];

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
    roomAProgramID: "1257229",
    roomBProgramID: "1259713",
  },
  {
    startTime: "15：30",
    roomAProgramID: "1263141",
    roomBProgramID: "1264403",
  },
];
