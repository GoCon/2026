import { workshopSchedule } from "./schedule";
import { sessionGridCells, type SessionGridRoom } from "./sessionGrid";

export type ProgramRoom = SessionGridRoom;

function buildRoomByProgramId(): Map<string, ProgramRoom> {
  const rooms = new Map<string, ProgramRoom>();

  for (const cell of sessionGridCells) {
    if (cell.type === "card" && !rooms.has(cell.programId)) {
      rooms.set(cell.programId, cell.room);
    }
  }

  for (const slot of workshopSchedule) {
    if (slot.roomAProgramID !== "blank" && !rooms.has(slot.roomAProgramID)) {
      rooms.set(slot.roomAProgramID, "roomA");
    }
    if (slot.roomBProgramID !== "blank" && !rooms.has(slot.roomBProgramID)) {
      rooms.set(slot.roomBProgramID, "roomB");
    }
  }

  return rooms;
}

const roomByProgramId = buildRoomByProgramId();

/**
 * sessionGrid / workshopSchedule の手動配置から部屋を返す。
 * Sessionize 由来データには部屋情報を含めない。
 */
export function getProgramRoom(programId: string): ProgramRoom {
  const room = roomByProgramId.get(programId);
  if (!room) {
    throw new Error(
      `Program ${programId} は sessionGrid.ts / schedule.ts に配置されていません`,
    );
  }
  return room;
}
