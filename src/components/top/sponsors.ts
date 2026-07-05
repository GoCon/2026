import type { ImageMetadata } from "astro";

export type SponsorWithUrl = {
  name: string;
  imageSrc: ImageMetadata;
  link: string;
};

export type Sponsor = {
  name: string;
  imageSrc: ImageMetadata;
};


import imageA from '../../assets/0_V001.png';
import imageB from '../../assets/1_S101.png';
import imageC from '../../assets/2_S102.png';

import gopher from '../../assets/page-header-gopher.png';

const images = [imageA, imageB, imageC];
const img = (i: number) => images[i % 3];

export const goldSponsors: SponsorWithUrl[] = Array.from({ length: 6 }, (_, i) => ({
  name: `Gold Sponsor ${i + 1}`,
  imageSrc: img(i),
  link: "https://example.com",
}));

export const silverSponsors: SponsorWithUrl[] = Array.from({ length: 12 }, (_, i) => ({
  name: `Silver Sponsor ${i + 1}`,
  imageSrc: img(i),
  link: "https://example.com",
}));

export const drinkSponsors: SponsorWithUrl[] = Array.from({ length: 1 }, (_, i) => ({
  name: `Drink Sponsor ${i + 1}`,
  imageSrc: img(i),
  link: "https://example.com",
}));

export const lunchSponsors: SponsorWithUrl[] = Array.from({ length: 2 }, (_, i) => ({
  name: `Lunch Sponsor ${i + 1}`,
  imageSrc: img(i),
  link: "https://example.com",
}));

export const bronzeSponsors: Sponsor[] = Array.from({ length: 50 }, (_, i) => ({
  name: `Bronze Sponsor ${i + 1}`,
  imageSrc: img(i),
}));

export const gopherSponsors: Sponsor[] = Array.from({ length: 20 }, (_, i) => ({
  name: `Gopher ${i + 1}`,
  imageSrc: gopher,
}));

export const toolSponsors: Sponsor[] = Array.from({ length: 1 }, (_, i) => ({
  name: `Tool Sponsor ${i + 1}`,
  imageSrc: img(i),
}));
