import type { ImageMetadata } from "astro";

type JobBoard = {
  image: ImageMetadata;
  description: string;
  url?: string;
};

export const jobBoards: JobBoard[] = [];
