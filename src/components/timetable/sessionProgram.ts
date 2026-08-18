import type { Speaker } from "./speaker";

type SessionProgramBase = {
  id: string;
  title: string;
  speaker: Speaker;
  description?: string;
};

export type SessionProgram =
  | (SessionProgramBase & {
      type: "keynote";
    })
  | (SessionProgramBase & {
      type: "longSession" | "shortTalk" | "workshop";
      difficulty: "beginner" | "intermediate" | "advanced";
      duration?: "40min" | "90min";
    })
  | (SessionProgramBase & {
      type: "sponsorSession";
      difficulty?: "beginner" | "intermediate" | "advanced";
      duration?: "40min" | "90min";
    });
