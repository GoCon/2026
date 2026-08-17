import type { Speaker } from "./speaker";

type SessionProgramBase = {
  id: string;
  title: string;
  speaker: Speaker;
  room: "roomA" | "roomB";
  description?: string;
};

export type SessionProgram =
  | (SessionProgramBase & {
      type: "keynote";
    })
  | (SessionProgramBase & {
      type: "longSession" | "shortTalk" | "sponsorSession" | "workshop";
      difficulty: "beginner" | "intermediate" | "advanced";
      duration?: "40min" | "90min";
    });
