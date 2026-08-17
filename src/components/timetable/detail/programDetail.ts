import { getProgramSessions, type ProgramSession } from "../program";

export { getProgramSessions };
export type { ProgramSession };

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
