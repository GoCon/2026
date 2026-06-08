import type { ImageMetadata } from "astro";

import sampleImage1 from "../assets/jobBoards/sample1.jpg";
import sampleImage2 from "../assets/jobBoards/sample2.jpg";
import sampleImage3 from "../assets/jobBoards/sample3.jpg";
import sampleImage4 from "../assets/jobBoards/sample4.jpg";

type JobBoard = {
  image: ImageMetadata;
  description: string;
  url?: string;
};

export const jobBoards: JobBoard[] = [
  {
    image: sampleImage1,
    description: "Job Board 1",
    url: "#",
  },
  {
    image: sampleImage2,
    description: "Job Board 1",
    url: "#",
  },
  {
    image: sampleImage3,
    description: "Job Board 1",
    url: "#",
  },
  {
    image: sampleImage4,
    description: "Job Board 1",
    url: "#",
  },
  {
    image: sampleImage1,
    description: "Job Board 1",
    url: "#",
  },
  {
    image: sampleImage1,
    description: "Job Board 1",
    url: "#",
  },
  {
    image: sampleImage1,
    description: "Job Board 1",
    url: "#",
  },
];
