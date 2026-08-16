/**
 * Sessionize の生データ (rawData.json) を、サイト表示向けのセッションデータに整形する。
 *
 * - Accepted のみ残す
 * - スピーカー情報をセッションへ埋め込む
 * - categoryItems から type / difficulty / duration を解決する
 * - room / timeString を解決する
 *
 * Usage:
 *   pnpm transform:timetable
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const inputPath = path.join(rootDir, "src/components/timetable/rawData.json");
const outputPath = path.join(rootDir, "src/components/timetable/data.json");

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

type SessionType = "longSession" | "shortTalk" | "workshop";
type Difficulty = "beginner" | "intermediate" | "advanced";
type WorkshopDuration = "40min" | "90min";
type Room = "roomA" | "roomB";

type Speaker = {
  name: string;
  avatar?: string;
  xUrl?: string;
  company?: string;
  description?: string;
};

type ShapedSession = {
  id: string;
  type: SessionType;
  title: string;
  timeString: string;
  difficulty: Difficulty;
  speaker: Speaker;
  room: Room;
  description: string;
  duration?: WorkshopDuration;
};

type ShapedData = {
  sessions: ShapedSession[];
};

type RawSpeakerLink = {
  title: string;
  url: string;
  linkType: string;
};

type RawSpeaker = {
  id: string;
  fullName: string;
  bio?: string;
  tagLine?: string;
  profilePicture?: string | null;
  links?: RawSpeakerLink[];
};

type RawSession = {
  id: string;
  title: string;
  description?: string;
  startsAt?: string | null;
  endsAt?: string | null;
  speakers?: string[];
  categoryItems?: number[];
  roomId?: number | null;
  status: string;
};

type RawRoom = {
  id: number;
  name: string;
};

type RawData = {
  sessions?: RawSession[];
  speakers?: RawSpeaker[];
  rooms?: RawRoom[];
};

function normalizeDescription(description: string): string {
  return description.replace(/\r\n/g, "\n");
}

function formatTimeString(
  startsAt: string | null | undefined,
  endsAt: string | null | undefined,
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

function parseSessionType(categoryItems: number[]): SessionType | null {
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

function parseDifficulty(categoryItems: number[]): Difficulty {
  if (categoryItems.includes(DIFFICULTY.ADVANCED)) {
    return "advanced";
  }
  if (categoryItems.includes(DIFFICULTY.INTERMEDIATE)) {
    return "intermediate";
  }
  return "beginner";
}

function parseWorkshopDuration(categoryItems: number[]): WorkshopDuration {
  if (categoryItems.includes(PROPOSAL_TYPE.LONG_WORKSHOP)) {
    return "90min";
  }
  return "40min";
}

function parseRoom(
  roomId: number | null | undefined,
  rooms: RawRoom[],
): Room {
  if (roomId === null || roomId === undefined) {
    return "roomA";
  }

  const roomIndex = rooms.findIndex((room) => room.id === roomId);
  return roomIndex === 1 ? "roomB" : "roomA";
}

function parseSpeaker(rawSpeaker: RawSpeaker | undefined): Speaker {
  if (!rawSpeaker) {
    return { name: "" };
  }

  const xLink = (rawSpeaker.links ?? []).find(
    (link) => link.linkType === "Twitter",
  );

  return {
    name: rawSpeaker.fullName,
    ...(rawSpeaker.profilePicture
      ? { avatar: rawSpeaker.profilePicture }
      : {}),
    ...(xLink ? { xUrl: xLink.url } : {}),
    ...(rawSpeaker.tagLine ? { company: rawSpeaker.tagLine } : {}),
    ...(rawSpeaker.bio
      ? { description: normalizeDescription(rawSpeaker.bio) }
      : {}),
  };
}

function transformSession(
  session: RawSession,
  speakerMap: Map<string, RawSpeaker>,
  rooms: RawRoom[],
): ShapedSession | null {
  const type = parseSessionType(session.categoryItems ?? []);
  if (!type) {
    return null;
  }

  const speakerId = session.speakers?.[0];
  if (!speakerId) {
    return null;
  }

  const shaped: ShapedSession = {
    id: session.id,
    type,
    title: session.title,
    timeString: formatTimeString(session.startsAt, session.endsAt),
    difficulty: parseDifficulty(session.categoryItems ?? []),
    speaker: parseSpeaker(speakerMap.get(speakerId)),
    room: parseRoom(session.roomId, rooms),
    description: normalizeDescription(session.description ?? ""),
  };

  if (type === "workshop") {
    shaped.duration = parseWorkshopDuration(session.categoryItems ?? []);
  }

  return shaped;
}

function transform(raw: RawData): ShapedData {
  const rooms = raw.rooms ?? [];
  const speakerMap = new Map(
    (raw.speakers ?? []).map((speaker) => [speaker.id, speaker]),
  );

  const sessions = (raw.sessions ?? [])
    .filter((session) => session.status === "Accepted")
    .map((session) => transformSession(session, speakerMap, rooms))
    .filter((session): session is ShapedSession => session !== null);

  return { sessions };
}

function main(): void {
  if (!fs.existsSync(inputPath)) {
    console.error(`Input not found: ${inputPath}`);
    console.error(
      "Place the Sessionize API dump at src/components/timetable/rawData.json",
    );
    process.exit(1);
  }

  const raw = JSON.parse(fs.readFileSync(inputPath, "utf8")) as RawData;
  const shaped = transform(raw);
  fs.writeFileSync(outputPath, `${JSON.stringify(shaped, null, 2)}\n`, "utf8");

  console.log(`Wrote ${outputPath} (${shaped.sessions.length} sessions)`);
}

main();
