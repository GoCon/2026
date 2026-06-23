import type { ImageMetadata } from "astro";

export type SponsorWithDialog = {
  name: string;
  imageSrc: ImageMetadata;
  dialog: {
    openId: string;
    link: string;
    description: string;
  };
};

export type Sponsor = {
  name: string;
  imageSrc: ImageMetadata;
};


export const goldSponsors: SponsorWithDialog[] = [
];

export const silverSponsors: SponsorWithDialog[] = [
];

export const lunchSponsors: SponsorWithDialog[] = [
];

export const drinkSponsors: SponsorWithDialog[] = [
];

export const bronzeSponsors: Sponsor[] = [
];

export const gopherSponsors: Sponsor[] = [
];

export const toolSponsors: Sponsor[] = [
];
