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
    roomAProgramID: "longExample",
    roomBProgramID: "blank",
  },
  {
    startTime: "11：25",
    roomAProgramID: "longExample",
    roomBProgramID: "longLongExample",
  },
  {
    startTime: "12：10",
    roomAProgramID: "sponsorExample",
    roomBProgramID: "blank",
  },
  {
    startTime: "12：30",
    roomAProgramID: "sponsorExample",
    roomBProgramID: "blank",
  },
  {
    startTime: "12：50",
    roomAProgramID: "sponsorExample",
    roomBProgramID: "blank",
  },
  {
    startTime: "13：10",
    roomAProgramID: "sponsorExample",
    roomBProgramID: "blank",
  },
  {
    startTime: "13：30",
    roomAProgramID: "shortExample",
    roomBProgramID: "shortExample",
  },
  {
    startTime: "14：05",
    roomAProgramID: "shortExample",
    roomBProgramID: "shortExample",
  },
  {
    startTime: "14：40",
    roomAProgramID: "longExample",
    roomBProgramID: "longExample",
  },
  {
    startTime: "15：35",
    roomAProgramID: "shortExample",
    roomBProgramID: "shortExample",
  },
  {
    startTime: "16：10",
    roomAProgramID: "shortExample",
    roomBProgramID: "shortExample",
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
    roomAProgramID: "workshopExample",
    roomBProgramID: "workshopExample",
  },
  {
    startTime: "12：10",
    roomAProgramID: "lunch",
    roomBProgramID: "lunch",
  },
  {
    startTime: "13：30",
    roomAProgramID: "workshopExample",
    roomBProgramID: "workshopExample",
  },
  {
    startTime: "15：30",
    roomAProgramID: "workshopExample",
    roomBProgramID: "workshopExample",
  },
];
