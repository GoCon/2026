import type { Speaker } from "./speaker";

export type Program =
  | ProgramOrganizer
  | ProgramLongSession
  | ProgramShortTalk
  | ProgramSponsorSession
  | ProgramWorkshop
  | ProgramKeynote
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
  difficulty?: "beginner" | "intermediate" | "advanced";
} & Omit<ProgramSessionCommon, "difficulty">;

export type ProgramWorkshop = {
  type: "workshop";
  duration: "40min" | "90min";
} & ProgramSessionCommon;

export type ProgramKeynote = {
  type: "keynote";
  isPlaceholder?: boolean;
} & Omit<ProgramSessionCommon, "difficulty">;

export type ProgramSessionCommon = {
  id: string;
  title: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  speaker: Speaker;
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
    timeString: "12:05 - 14:00",
    title: "お昼休憩",
    spHeight: "150px",
  },
} as const satisfies Record<string, ProgramOrganizer>;

/** 未入力時のみ使う基調講演プレースホルダー（セッションカードと同じ見た目） */
const keynotePlaceholder: ProgramKeynote = {
  type: "keynote",
  isPlaceholder: true,
  id: "keynote",
  title: "Coming Soon",
  speaker: { name: "" },
};

/** 未入力時のみ使うスポンサー枠プレースホルダー */
const sponsorPlaceholderPrograms = {
  sponsorSlot1: {
    type: "sponsorSession",
    isPlaceholder: true,
    id: "sponsorSlot1",
    title: "Coming Soon",
    speaker: { name: "" },
  },
  sponsorSlot2: {
    type: "sponsorSession",
    isPlaceholder: true,
    id: "sponsorSlot2",
    title: "Coming Soon",
    speaker: { name: "" },
  },
  sponsorSlot3: {
    type: "sponsorSession",
    isPlaceholder: true,
    id: "sponsorSlot3",
    title: "Coming Soon",
    speaker: { name: "" },
  },
} as const satisfies Record<string, ProgramSponsorSession>;

const sessionPrograms = parseProgramsFromRawData();

function withPlaceholders(
  sessions: Record<string, Program>,
): Record<string, Program> {
  const result: Record<string, Program> = {
    ...organizerPrograms,
  };

  if (!sessions.keynote) {
    result.keynote = keynotePlaceholder;
  }

  for (const [id, placeholder] of Object.entries(sponsorPlaceholderPrograms)) {
    if (!sessions[id]) {
      result[id] = placeholder;
    }
  }

  return {
    ...result,
    ...sessions,
  };
}

export const programs: Record<string, Program> =
  withPlaceholders(sessionPrograms);

export type ProgramId = string;

export type ProgramSession = Extract<
  Program,
  {
    type:
      | "longSession"
      | "shortTalk"
      | "sponsorSession"
      | "workshop"
      | "keynote";
  }
>;

export function getProgramSessions(): ProgramSession[] {
  const sessions: ProgramSession[] = [];

  for (const program of Object.values(programs)) {
    if (
      program.type !== "longSession" &&
      program.type !== "shortTalk" &&
      program.type !== "sponsorSession" &&
      program.type !== "workshop" &&
      program.type !== "keynote"
    ) {
      continue;
    }
    if (program.type === "sponsorSession" && program.isPlaceholder) {
      continue;
    }
    if (program.type === "keynote" && program.isPlaceholder) {
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
