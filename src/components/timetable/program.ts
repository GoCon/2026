import type { Speaker } from "./speaker";

export type Program =
  | ProgramOrganizer
  | ProgramLongSession
  | ProgramShortTalk
  | ProgramSponsorSession
  | ProgramWorkshop
  | ProgramBlank;

type ProgramBlank = {
  type: "blank";
};

export const blankProgram: ProgramBlank = {
  type: "blank",
};

export type ProgramOrganizer = {
  type: "organizer";
  timeString: string;
  title: string;
};

export type ProgramLongSession = {
  type: "longSession";
} & ProgramSessionCommon;

export type ProgramShortTalk = {
  type: "shortTalk";
} & ProgramSessionCommon;

export type ProgramSponsorSession = {
  type: "sponsorSession";
} & ProgramSessionCommon;

export type ProgramWorkshop = {
  type: "workshop";
} & ProgramSessionCommon;

export type ProgramSessionCommon = {
  id: string;
  timeString: string;
  title: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  speaker: Speaker;
  room: "roomA" | "roomB";
  description?: string;
};

export const programs = {
  opening: {
    type: "organizer",
    timeString: "10:15 - 10:20",
    title: "オープニング",
  },
  closing: {
    type: "organizer",
    timeString: "17:45 - 18:00",
    title: "クロージング",
  },
  lunch: {
    type: "organizer",
    timeString: "12:05 - 13:30",
    title: "お昼休憩",
  },
  longExample: {
    id: "longExample",
    type: "longSession",
    timeString: "13:30 - 14:00",
    title: "Long Session Example",
    difficulty: "beginner",
    room: "roomA",
    speaker: {
      name: "Speaker Name",
    },
  },
  longLongExample: {
    id: "longLongExample",
    type: "longSession",
    timeString: "13:30 - 14:00",
    title:
      "Long Session Example Long Session Example Long Session Example Long Session Example Long Session Example Long Session Example Long Session Example Long Session Example",
    difficulty: "beginner",
    room: "roomA",
    speaker: {
      name: "Speaker Name",
    },
  },
  shortExample: {
    id: "shortExample",
    type: "shortTalk",
    timeString: "14:00 - 14:30",
    title: "Short Talk Example",
    room: "roomA",
    difficulty: "beginner",
    speaker: {
      name: "Speaker Name",
    },
  },
  sponsorExample: {
    id: "sponsorExample",
    type: "sponsorSession",
    timeString: "14:30 - 15:00",
    title: "Sponsor Session Example",
    difficulty: "beginner",
    speaker: {
      name: "Speaker Name",
    },
    room: "roomA",
  },
  workshopExample: {
    id: "workshopExample",
    type: "workshop",
    timeString: "15:00 - 15:30",
    title: "Workshop Example",
    difficulty: "beginner",
    speaker: {
      name: "Speaker Name",
    },
    room: "roomA",
  },
} as const satisfies Record<string, Program>;

export type ProgramId = keyof typeof programs;

export function getProgram(id: ProgramId | "blank"): Program {
  if (id === "blank") {
    return blankProgram;
  }
  return programs[id];
}
