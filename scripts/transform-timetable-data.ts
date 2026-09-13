/**
 * Sessionize の生データ (rawData.json) を、サイト表示向けのセッションデータに整形する。
 *
 * - Accepted のみ残す
 * - スピーカー情報をセッションへ埋め込む
 * - categoryItems から type / difficulty / duration を解決する（欠けていればエラー）
 * - 登壇資料 URL は埋め込み形式へ変換し slidesUrl として残す
 *   （想定外ドメインは元 URL。変換不可は needsManual。既存の URL は上書きしない）
 * - 部屋・開始時刻は Sessionize に含まれないため、ここでは扱わない
 *   （sessionGrid.ts / schedule.ts で手動紐づけする）
 *
 * Usage:
 *   pnpm transform:timetable
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  isPreservableSlidesUrl,
  parseSlideEmbed,
  SLIDES_URL_NEEDS_MANUAL,
  toSlidesUrl,
} from "../src/components/timetable/parseSlideEmbed.ts";

const rootDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
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

type ProposalKind =
  | { type: "shortTalk" }
  | { type: "longSession" }
  | { type: "workshop"; duration: WorkshopDuration };

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
  difficulty: Difficulty;
  speaker: Speaker;
  description: string;
  duration?: WorkshopDuration;
  slidesUrl?: string;
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

type RawQuestionAnswer = {
  questionId: number;
  answerValue?: string | null;
};

type RawSession = {
  id: string;
  title: string;
  description?: string;
  speakers?: string[];
  categoryItems?: number[];
  questionAnswers?: RawQuestionAnswer[];
  status: string;
};

const SLIDES_QUESTION_ID = 138931;

type RawData = {
  sessions?: RawSession[];
  speakers?: RawSpeaker[];
};

const PROPOSAL_KINDS: ReadonlyArray<readonly [number, ProposalKind]> = [
  [PROPOSAL_TYPE.SHORT_SESSION, { type: "shortTalk" }],
  [PROPOSAL_TYPE.LONG_SESSION, { type: "longSession" }],
  [PROPOSAL_TYPE.SHORT_WORKSHOP, { type: "workshop", duration: "40min" }],
  [PROPOSAL_TYPE.LONG_WORKSHOP, { type: "workshop", duration: "90min" }],
];

const DIFFICULTY_KINDS: ReadonlyArray<readonly [number, Difficulty]> = [
  [DIFFICULTY.BEGINNER, "beginner"],
  [DIFFICULTY.INTERMEDIATE, "intermediate"],
  [DIFFICULTY.ADVANCED, "advanced"],
];

function normalizeDescription(description: string): string {
  return description.replace(/\r\n/g, "\n");
}

function extractSlidesUrl(session: RawSession): string | undefined {
  const answer = (session.questionAnswers ?? []).find(
    (qa) => qa.questionId === SLIDES_QUESTION_ID,
  );
  const value = answer?.answerValue?.trim();
  if (!value) {
    return undefined;
  }

  return toSlidesUrl(parseSlideEmbed(value));
}

function resolveSlidesUrl(
  session: RawSession,
  existingSlidesUrls: Map<string, string>,
): string | undefined {
  const parsed = extractSlidesUrl(session);
  const existing = existingSlidesUrls.get(session.id);

  if (
    existing &&
    isPreservableSlidesUrl(existing) &&
    (!parsed || parsed === SLIDES_URL_NEEDS_MANUAL)
  ) {
    return existing;
  }

  return parsed;
}

function loadExistingSlidesUrls(filePath: string): Map<string, string> {
  const map = new Map<string, string>();
  if (!fs.existsSync(filePath)) {
    return map;
  }

  const existing = JSON.parse(fs.readFileSync(filePath, "utf8")) as {
    sessions?: Array<{ id?: string; slidesUrl?: string }>;
  };
  for (const session of existing.sessions ?? []) {
    if (session.id && session.slidesUrl) {
      map.set(session.id, session.slidesUrl);
    }
  }
  return map;
}

function requireExactlyOne<T>(
  categoryItems: number[],
  mapping: ReadonlyArray<readonly [number, T]>,
  label: string,
  sessionId: string,
): T {
  const matched = mapping.filter(([id]) => categoryItems.includes(id));
  if (matched.length === 0) {
    throw new Error(
      `Session ${sessionId}: ${label} が categoryItems にありません`,
    );
  }
  if (matched.length !== 1) {
    throw new Error(`Session ${sessionId}: ${label} が複数あります`);
  }
  const [, value] = matched[0];
  return value;
}

function parseSpeaker(rawSpeaker: RawSpeaker, sessionId: string): Speaker {
  if (!rawSpeaker.fullName) {
    throw new Error(`Session ${sessionId}: speaker の fullName がありません`);
  }

  const xLink = (rawSpeaker.links ?? []).find(
    (link) => link.linkType === "Twitter",
  );

  return {
    name: rawSpeaker.fullName,
    ...(rawSpeaker.profilePicture ? { avatar: rawSpeaker.profilePicture } : {}),
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
  existingSlidesUrls: Map<string, string>,
): ShapedSession {
  const categoryItems = session.categoryItems;
  if (!categoryItems || categoryItems.length === 0) {
    throw new Error(`Session ${session.id}: categoryItems がありません`);
  }

  const proposal = requireExactlyOne(
    categoryItems,
    PROPOSAL_KINDS,
    "Proposal Type",
    session.id,
  );
  const difficulty = requireExactlyOne(
    categoryItems,
    DIFFICULTY_KINDS,
    "Proposal Level",
    session.id,
  );

  if (!session.title) {
    throw new Error(`Session ${session.id}: title がありません`);
  }
  if (session.description == null || session.description.trim() === "") {
    throw new Error(`Session ${session.id}: description がありません`);
  }

  const speakerIds = session.speakers ?? [];
  if (speakerIds.length === 0) {
    throw new Error(`Session ${session.id}: speakers がありません`);
  }
  if (speakerIds.length !== 1) {
    throw new Error(`Session ${session.id}: speakers が複数あります`);
  }
  const speakerId = speakerIds[0];

  const rawSpeaker = speakerMap.get(speakerId);
  if (!rawSpeaker) {
    throw new Error(
      `Session ${session.id}: speaker ${speakerId} が見つかりません`,
    );
  }

  const shaped: ShapedSession = {
    id: session.id,
    type: proposal.type,
    title: session.title,
    difficulty,
    speaker: parseSpeaker(rawSpeaker, session.id),
    description: normalizeDescription(session.description),
  };

  if (proposal.type === "workshop") {
    shaped.duration = proposal.duration;
  }

  const slidesUrl = resolveSlidesUrl(session, existingSlidesUrls);
  if (slidesUrl) {
    shaped.slidesUrl = slidesUrl;
  }

  return shaped;
}

function transform(
  raw: RawData,
  existingSlidesUrls: Map<string, string>,
): ShapedData {
  if (!raw.sessions) {
    throw new Error("rawData.json に sessions がありません");
  }
  if (!raw.speakers) {
    throw new Error("rawData.json に speakers がありません");
  }

  const speakerMap = new Map(
    raw.speakers.map((speaker) => [speaker.id, speaker]),
  );

  const sessions = raw.sessions
    .filter((session) => session.status === "Accepted")
    .map((session) =>
      transformSession(session, speakerMap, existingSlidesUrls),
    );

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
  const existingSlidesUrls = loadExistingSlidesUrls(outputPath);
  const shaped = transform(raw, existingSlidesUrls);
  fs.writeFileSync(outputPath, `${JSON.stringify(shaped, null, 2)}\n`, "utf8");

  console.log(`Wrote ${outputPath} (${shaped.sessions.length} sessions)`);
}

main();
