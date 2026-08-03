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


export const goldSponsors: SponsorWithUrl[] = [
];

export const silverSponsors: SponsorWithUrl[] = [
];

export const drinkSponsors: SponsorWithUrl[] = [
];

export const lunchSponsors: SponsorWithUrl[] = [
];

export const bronzeSponsors: Sponsor[] = [
];

export const gopherSponsors: Sponsor[] = [
];

export const toolSponsors: Sponsor[] = [
];
