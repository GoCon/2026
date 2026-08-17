import type { Program } from "./program";
import { workshopSchedule } from "./schedule";
import { sessionGridCells } from "./sessionGrid";

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
    case "keynote":
      return 40;
    case "workshop":
      return program.duration === "90min" ? 90 : 40;
    default:
      return null;
  }
}

function buildStartTimeByProgramId(): Map<string, string> {
  const startTimes = new Map<string, string>();

  for (const cell of sessionGridCells) {
    if (cell.type === "card" && !startTimes.has(cell.programId)) {
      startTimes.set(cell.programId, cell.startTime);
    }
  }

  for (const slot of workshopSchedule) {
    for (const programId of [slot.roomAProgramID, slot.roomBProgramID]) {
      if (programId !== "blank" && !startTimes.has(programId)) {
        startTimes.set(programId, slot.startTime);
      }
    }
  }

  return startTimes;
}

const startTimeByProgramId = buildStartTimeByProgramId();

/**
 * sessionGrid / workshopSchedule の開始時刻とプログラム種別の尺から表示用時刻を返す。
 * organizer は固定の timeString を持つ。
 */
export function getProgramTimeString(program: Program): string {
  if (program.type === "organizer") {
    return program.timeString;
  }
  if (program.type === "blank" || !("id" in program)) {
    return "";
  }

  const startTime = startTimeByProgramId.get(program.id);
  if (!startTime) {
    return "";
  }

  const duration = durationMinutes(program);
  if (duration === null) {
    return "";
  }

  const start = normalizeStartTime(startTime);
  return `${start} - ${addMinutes(start, duration)}`;
}
