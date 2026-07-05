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
  spHeight?: string;
};

export const blankProgram: ProgramBlank = {
  type: "blank",
};

export type ProgramOrganizer = {
  type: "organizer";
  timeString: string;
  title: string;
  height?: string;
  spHeight?: string;
};

export type ProgramLongSession = {
  type: "longSession";
} & ProgramSessionCommon;

export type ProgramShortTalk = {
  type: "shortTalk";
} & ProgramSessionCommon;

export type ProgramSponsorSession = {
  type: "sponsorSession";
  isPlaceholder?: boolean;
} & ProgramSessionCommon;

export type ProgramWorkshop = {
  type: "workshop";
  duration: "40min" | "90min";
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

import { parseProgramsFromRawData } from "./parseRawData";

const organizerPrograms = {
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
    height: "150px",
    spHeight: "150px",
  },
} as const satisfies Record<string, ProgramOrganizer>;

const sponsorPlaceholderPrograms = {
  sponsorSlot1: {
    type: "sponsorSession",
    isPlaceholder: true,
    id: "sponsorSlot1",
    timeString: "12:10 - 12:25",
    title: "Coming Soon",
    difficulty: "beginner",
    speaker: { name: "" },
    room: "roomA",
  },
  sponsorSlot2: {
    type: "sponsorSession",
    isPlaceholder: true,
    id: "sponsorSlot2",
    timeString: "12:30 - 12:45",
    title: "Coming Soon",
    difficulty: "beginner",
    speaker: { name: "" },
    room: "roomA",
  },
  sponsorSlot3: {
    type: "sponsorSession",
    isPlaceholder: true,
    id: "sponsorSlot3",
    timeString: "12:50 - 13:05",
    title: "Coming Soon",
    difficulty: "beginner",
    speaker: { name: "" },
    room: "roomA",
  },
  sponsorSlot4: {
    type: "sponsorSession",
    isPlaceholder: true,
    id: "sponsorSlot4",
    timeString: "13:10 - 13:25",
    title: "Coming Soon",
    difficulty: "beginner",
    speaker: { name: "" },
    room: "roomA",
  },
} as const satisfies Record<string, ProgramSponsorSession>;

const sessionPrograms = parseProgramsFromRawData();

export const programs: Record<string, Program> = {
  ...organizerPrograms,
  ...sponsorPlaceholderPrograms,
  ...sessionPrograms,
};

export type ProgramId = string;

export type ProgramSession = Extract<
  Program,
  { type: "longSession" | "shortTalk" | "sponsorSession" | "workshop" }
>;

export function getProgramSessions(): ProgramSession[] {
  const sessions: ProgramSession[] = [];

  for (const program of Object.values(programs)) {
    if (
      program.type !== "longSession" &&
      program.type !== "shortTalk" &&
      program.type !== "sponsorSession" &&
      program.type !== "workshop"
    ) {
      continue;
    }
    if (program.type === "sponsorSession" && program.isPlaceholder) {
      continue;
    }
    sessions.push(program);
  }

  return sessions;
}

export function getProgram(id: ProgramId | "blank"): Program {
  if (id === "blank") {
    return blankProgram;
  }
  return programs[id] ?? blankProgram;
}
