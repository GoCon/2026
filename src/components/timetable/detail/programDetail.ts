import { programs, type Program } from "../program";

export type ProgramSession = Extract<
  Program,
  { type: "longSession" | "shortTalk" | "sponsorSession" | "workshop" }
>;

export function getProgramSessions(): ProgramSession[] {
  const sessions: ProgramSession[] = [];

  for (const program of Object.values(programs)) {
    if (
      program.type !== "longSession" &&
      program.type !== "shortTalk" &&
      program.type !== "sponsorSession" &&
      program.type !== "workshop"
    ) {
      continue;
    }
    sessions.push(program);
  }

  return sessions;
}

type ProgramDetailStaticPath = {
  params: { programID: string };
  props: { program: ProgramSession };
};

export function getProgramDetailStaticPaths(): ProgramDetailStaticPath[] {
  return getProgramSessions().map((program) => ({
    params: { programID: program.id },
    props: { program },
  }));
}
