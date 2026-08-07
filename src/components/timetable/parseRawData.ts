import rawData from "./rawData.json";
import type { Speaker } from "./speaker";
import type {
  Program,
  ProgramLongSession,
  ProgramShortTalk,
  ProgramSponsorSession,
  ProgramWorkshop,
} from "./program";

type RawSpeakerLink = {
  title: string;
  url: string;
  linkType: string;
};

type RawSpeaker = {
  id: string;
  bio: string;
  tagLine: string;
  profilePicture: string | null;
  links: RawSpeakerLink[];
  fullName: string;
};

type RawSession = {
  id: string;
  title: string;
  description: string;
  startsAt: string | null;
  endsAt: string | null;
  speakers: string[];
  categoryItems: number[];
  roomId: number | null;
  status: string;
};

type RawRoom = {
  id: number;
  name: string;
};

type RawData = {
  sessions: RawSession[];
  speakers: RawSpeaker[];
  rooms: RawRoom[];
};

const PROPOSAL_TYPE = {
  SHORT_SESSION: 476013,
  LONG_SESSION: 476014,
  SHORT_WORKSHOP: 476006,
  LONG_WORKSHOP: 476007,
} as const;

const DIFFICULTY = {
  BEGINNER: 479034,
  INTERMEDIATE: 479035,
  ADVANCED: 479036,
} as const;

type SessionType =
  | "longSession"
  | "shortTalk"
  | "sponsorSession"
  | "workshop";

function normalizeDescription(description: string): string {
  return description.replace(/\r\n/g, "\n");
}

function formatTimeString(
  startsAt: string | null,
  endsAt: string | null,
): string {
  if (!startsAt || !endsAt) {
    return "";
  }

  const formatTime = (isoString: string): string => {
    const date = new Date(isoString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return `${formatTime(startsAt)} - ${formatTime(endsAt)}`;
}

function parseSpeaker(rawSpeaker: RawSpeaker): Speaker {
  const xLink = rawSpeaker.links.find((link) => link.linkType === "Twitter");

  return {
    name: rawSpeaker.fullName,
    ...(rawSpeaker.profilePicture
      ? { avatar: rawSpeaker.profilePicture }
      : {}),
    ...(xLink ? { xUrl: xLink.url } : {}),
    ...(rawSpeaker.tagLine ? { company: rawSpeaker.tagLine } : {}),
    ...(rawSpeaker.bio ? { description: normalizeDescription(rawSpeaker.bio) } : {}),
  };
}

function parseSessionType(
  categoryItems: number[],
): SessionType | null {
  if (categoryItems.includes(PROPOSAL_TYPE.LONG_SESSION)) {
    return "longSession";
  }
  if (categoryItems.includes(PROPOSAL_TYPE.SHORT_SESSION)) {
    return "shortTalk";
  }
  if (
    categoryItems.includes(PROPOSAL_TYPE.SHORT_WORKSHOP) ||
    categoryItems.includes(PROPOSAL_TYPE.LONG_WORKSHOP)
  ) {
    return "workshop";
  }
  return null;
}

function parseDifficulty(
  categoryItems: number[],
): ProgramLongSession["difficulty"] {
  if (categoryItems.includes(DIFFICULTY.ADVANCED)) {
    return "advanced";
  }
  if (categoryItems.includes(DIFFICULTY.INTERMEDIATE)) {
    return "intermediate";
  }
  return "beginner";
}

function parseWorkshopDuration(
  categoryItems: number[],
): ProgramWorkshop["duration"] {
  if (categoryItems.includes(PROPOSAL_TYPE.LONG_WORKSHOP)) {
    return "90min";
  }
  return "40min";
}

function parseRoom(
  roomId: number | null,
  rooms: RawRoom[],
): ProgramLongSession["room"] {
  if (roomId === null) {
    return "roomA";
  }

  const roomIndex = rooms.findIndex((room) => room.id === roomId);
  return roomIndex === 1 ? "roomB" : "roomA";
}

function parseSession(
  session: RawSession,
  speakerMap: Map<string, RawSpeaker>,
  rooms: RawRoom[],
): Program | null {
  if (session.status !== "Accepted") {
    return null;
  }

  const sessionType = parseSessionType(session.categoryItems);
  if (!sessionType) {
    return null;
  }

  const speakerId = session.speakers[0];
  if (!speakerId) {
    return null;
  }

  const rawSpeaker = speakerMap.get(speakerId);
  if (!rawSpeaker) {
    return null;
  }

  const common = {
    id: session.id,
    timeString: formatTimeString(session.startsAt, session.endsAt),
    title: session.title,
    difficulty: parseDifficulty(session.categoryItems),
    speaker: parseSpeaker(rawSpeaker),
    room: parseRoom(session.roomId, rooms),
    description: normalizeDescription(session.description),
  };

  switch (sessionType) {
    case "longSession":
      return { type: "longSession", ...common } satisfies ProgramLongSession;
    case "shortTalk":
      return { type: "shortTalk", ...common } satisfies ProgramShortTalk;
    case "sponsorSession":
      return {
        type: "sponsorSession",
        ...common,
      } satisfies ProgramSponsorSession;
    case "workshop":
      return {
        type: "workshop",
        duration: parseWorkshopDuration(session.categoryItems),
        ...common,
      } satisfies ProgramWorkshop;
  }
}

export function parseProgramsFromRawData(): Record<string, Program> {
  const data = rawData as RawData;
  const speakerMap = new Map(
    data.speakers.map((speaker) => [speaker.id, speaker]),
  );
  const programs: Record<string, Program> = {};

  for (const session of data.sessions) {
    const program = parseSession(session, speakerMap, data.rooms);
    if (program && "id" in program) {
      programs[program.id] = program;
    }
  }

  return programs;
}
