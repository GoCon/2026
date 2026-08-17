import sessionData from "./data.json";
import { manualSessions } from "./manualSessions";
import type { Program } from "./program";
import type { SessionProgram } from "./sessionProgram";

export type { SessionProgram } from "./sessionProgram";

type SessionData = {
  sessions: SessionProgram[];
};

function sessionsToPrograms(
  sessions: SessionProgram[],
): Record<string, Program> {
  const programs: Record<string, Program> = {};
  for (const session of sessions) {
    programs[session.id] = session as Program;
  }
  return programs;
}

/**
 * Sessionize 由来 (data.json) と手動入力 (manualSessions.ts) をマージする。
 * 同じ id がある場合は manualSessions 側を優先する。
 */
export function parseProgramsFromRawData(): Record<string, Program> {
  const fromSessionize = sessionsToPrograms(
    (sessionData as SessionData).sessions,
  );
  const fromManual = sessionsToPrograms(manualSessions);

  return {
    ...fromSessionize,
    ...fromManual,
  };
}
