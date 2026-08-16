import type { Program } from "./program";
import type { Schedule } from "./schedule";
import type { SessionGridCell } from "./sessionGrid";

function normalizeStartTime(startTime: string): string {
  return startTime.replace("：", ":");
}

function addMinutes(hhmm: string, minutes: number): string {
  const [hours, mins] = hhmm.split(":").map(Number);
  const total = hours * 60 + mins + minutes;
  const endHours = Math.floor(total / 60) % 24;
  const endMins = total % 60;
  return `${String(endHours).padStart(2, "0")}:${String(endMins).padStart(2, "0")}`;
}

function durationMinutes(program: Program): number | null {
  switch (program.type) {
    case "longSession":
      return 40;
    case "shortTalk":
      return 20;
    case "sponsorSession":
      return 15;
    case "workshop":
      return program.duration === "90min" ? 90 : 40;
    default:
      return null;
  }
}

export function formatTimeStringFromSchedule(
  startTime: string,
  program: Program,
): string | null {
  const duration = durationMinutes(program);
  if (duration === null) {
    return null;
  }

  const start = normalizeStartTime(startTime);
  return `${start} - ${addMinutes(start, duration)}`;
}

type TimedSlot = {
  programId: string;
  startTime: string;
};

function collectTimedSlots(
  sessionGridCells: SessionGridCell[],
  workshopSchedule: Schedule[],
): TimedSlot[] {
  const slots: TimedSlot[] = [];

  for (const cell of sessionGridCells) {
    if (cell.type === "card") {
      slots.push({ programId: cell.programId, startTime: cell.startTime });
    }
  }

  for (const slot of workshopSchedule) {
    for (const programId of [slot.roomAProgramID, slot.roomBProgramID]) {
      if (programId !== "blank") {
        slots.push({ programId, startTime: slot.startTime });
      }
    }
  }

  return slots;
}

/**
 * sessionGrid / workshopSchedule の開始時刻とプログラム種別の尺から timeString を解決する。
 * 既に timeString があるプログラムは上書きしない。
 */
export function enrichProgramsWithScheduleTime(
  programs: Record<string, Program>,
  sessionGridCells: SessionGridCell[],
  workshopSchedule: Schedule[],
): Record<string, Program> {
  const resolved = new Map<string, string>();

  for (const slot of collectTimedSlots(sessionGridCells, workshopSchedule)) {
    if (resolved.has(slot.programId)) {
      continue;
    }

    const program = programs[slot.programId];
    if (!program || program.type === "blank" || program.type === "organizer") {
      continue;
    }
    if (program.timeString) {
      continue;
    }

    const timeString = formatTimeStringFromSchedule(slot.startTime, program);
    if (timeString) {
      resolved.set(slot.programId, timeString);
    }
  }

  if (resolved.size === 0) {
    return programs;
  }

  const enriched: Record<string, Program> = { ...programs };
  for (const [programId, timeString] of resolved) {
    const program = enriched[programId];
    if (!program || program.type === "blank" || program.type === "organizer") {
      continue;
    }
    enriched[programId] = { ...program, timeString };
  }

  return enriched;
}
