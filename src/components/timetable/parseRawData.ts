import sessionData from "./data.json";
import type { Speaker } from "./speaker";
import type { Program } from "./program";

type SessionProgram = {
  id: string;
  type: "longSession" | "shortTalk" | "sponsorSession" | "workshop";
  title: string;
  timeString: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  speaker: Speaker;
  room: "roomA" | "roomB";
  description?: string;
  duration?: "40min" | "90min";
};

type SessionData = {
  sessions: SessionProgram[];
};

export function parseProgramsFromRawData(): Record<string, Program> {
  const data = sessionData as unknown as SessionData;
  const programs: Record<string, Program> = {};

  for (const session of data.sessions) {
    programs[session.id] = session as Program;
  }

  return programs;
}
