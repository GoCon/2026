import type { ImageMetadata } from "astro";

export type Sponsor = {
  name: string;
  imageSrc: ImageMetadata;
  dialog?: {
    openId: string;
    link: string;
    description: string;
  };
};

export const goldSponsors: Sponsor[] = [
];

export const silverSponsors: Sponsor[] = [
];

export const lunchSponsors: Sponsor[] = [
];

export const drinkSponsors: Sponsor[] = [
];

export const bronzeSponsors: Sponsor[] = [
];

export const gopherSponsors: Sponsor[] = [
];

export const toolSponsors: Sponsor[] = [
];
