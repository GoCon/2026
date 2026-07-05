import { programs, type Program } from "./program";

export type ProgramSession = Extract<
  Program,
  { type: "longSession" | "shortTalk" | "sponsorSession" | "workshop" }
>;

type ProgramDetailStaticPath = {
  params: { programID: string };
  props: { program: ProgramSession };
};

export function getProgramDetailStaticPaths(): ProgramDetailStaticPath[] {
  const paths: ProgramDetailStaticPath[] = [];

  for (const program of Object.values(programs)) {
    if (
      program.type !== "longSession" &&
      program.type !== "shortTalk" &&
      program.type !== "sponsorSession" &&
      program.type !== "workshop"
    ) {
      continue;
    }
    paths.push({
      params: { programID: program.id },
      props: { program },
    });
  }

  return paths;
}
