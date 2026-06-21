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

import img1 from "../../assets/footer_logo.svg";
import img2 from "../../assets/page-header-gopher.png";

export const goldSponsors: SponsorWithDialog[] = [
  { name: "gold sponsor",  imageSrc: img1 ,dialog:{openId:"gold1", link:"http://localhost:4321", description: "dummy description. dummy description. dummy description. dummy description. dummy description. dummy description. dummy description. dummy description. dummy description."}},
  { name: "gold sponsor",  imageSrc: img1 ,dialog:{openId:"gold2", link:"", description: "dummy description. dummy description. dummy description. dummy description. dummy description. dummy description. dummy description. dummy description. dummy description."}},
  { name: "gold sponsor",  imageSrc: img1 ,dialog:{openId:"gold3", link:"http://localhost:4321", description: ""}},
  { name: "gold sponsor",  imageSrc: img1 ,dialog:{openId:"gold4", link:"http://localhost:4321", description: "dummy description. dummy description. dummy description. dummy description. dummy description. dummy description. dummy description. dummy description. dummy description."}},
  { name: "gold sponsor",  imageSrc: img1 ,dialog:{openId:"gold5", link:"http://localhost:4321", description: "dummy description. dummy description. dummy description. dummy description. dummy description. dummy description. dummy description. dummy description. dummy description."}},
  { name: "gold sponsor",  imageSrc: img1 ,dialog:{openId:"gold6", link:"http://localhost:4321", description: "dummy description. dummy description. dummy description. dummy description. dummy description. dummy description. dummy description. dummy description. dummy description."}},
];

export const silverSponsors: SponsorWithDialog[] = [
  { name: "silver sponsor",  imageSrc: img1 ,dialog:{openId:"silver1", link:"http://localhost:4321", description: "dummy description. dummy description. dummy description. dummy description. dummy description. dummy description. dummy description. dummy description. dummy description."}},
  { name: "silver sponsor",  imageSrc: img1 ,dialog:{openId:"silver2", link:"", description: "dummy description. dummy description. dummy description. dummy description. dummy description. dummy description. dummy description. dummy description. dummy description."}},
  { name: "silver sponsor",  imageSrc: img1 ,dialog:{openId:"silver3", link:"http://localhost:4321", description: ""}},
  { name: "silver sponsor",  imageSrc: img1 ,dialog:{openId:"silver4", link:"http://localhost:4321", description: "dummy description. dummy description. dummy description. dummy description. dummy description. dummy description. dummy description. dummy description. dummy description."}},
  { name: "silver sponsor",  imageSrc: img1 ,dialog:{openId:"silver5", link:"http://localhost:4321", description: "dummy description. dummy description. dummy description. dummy description. dummy description. dummy description. dummy description. dummy description. dummy description."}},
  { name: "silver sponsor",  imageSrc: img1 ,dialog:{openId:"silver6", link:"http://localhost:4321", description: "dummy description. dummy description. dummy description. dummy description. dummy description. dummy description. dummy description. dummy description. dummy description."}},
];

export const lunchSponsors: SponsorWithDialog[] = [
  { name: "lunch sponsor",  imageSrc: img1 ,dialog:{openId:"lunch1", link:"http://localhost:4321", description: "dummy description. dummy description. dummy description. dummy description. dummy description. dummy description. dummy description. dummy description. dummy description."}},
  { name: "lunch sponsor",  imageSrc: img1 ,dialog:{openId:"lunch2", link:"", description: "dummy description. dummy description. dummy description. dummy description. dummy description. dummy description. dummy description. dummy description. dummy description."}},

];

export const drinkSponsors: SponsorWithDialog[] = [
  { name: "drink sponsor",  imageSrc: img1 ,dialog:{openId:"drink1", link:"http://localhost:4321", description: "dummy description. dummy description. dummy description. dummy description. dummy description. dummy description. dummy description. dummy description. dummy description."}},
];

export const bronzeSponsors: Sponsor[] = [
  { name: "bronze sponsor",  imageSrc: img1 },
  { name: "bronze sponsor",  imageSrc: img1 },
  { name: "bronze sponsor",  imageSrc: img1 },
  { name: "bronze sponsor",  imageSrc: img1 },
  { name: "bronze sponsor",  imageSrc: img1 },
  { name: "bronze sponsor",  imageSrc: img1 },
  { name: "bronze sponsor",  imageSrc: img1 },
  { name: "bronze sponsor",  imageSrc: img1 },
  { name: "bronze sponsor",  imageSrc: img1 },
  { name: "bronze sponsor",  imageSrc: img1 },
  { name: "bronze sponsor",  imageSrc: img1 },
  { name: "bronze sponsor",  imageSrc: img1 },
  { name: "bronze sponsor",  imageSrc: img1 },
];

export const gopherSponsors: Sponsor[] = [
  { name: "gopher sponsor",  imageSrc: img2 },
  { name: "gopher sponsor",  imageSrc: img2 },
  { name: "gopher sponsor",  imageSrc: img2 },
  { name: "gopher sponsor",  imageSrc: img2 },
  { name: "gopher sponsor",  imageSrc: img2 },
  { name: "gopher sponsor",  imageSrc: img2 },
  { name: "gopher sponsor",  imageSrc: img2 },
  { name: "gopher sponsor",  imageSrc: img2 },
  { name: "gopher sponsor",  imageSrc: img2 },
  { name: "gopher sponsor",  imageSrc: img2 },
  { name: "gopher sponsor",  imageSrc: img2 },
];

export const toolSponsors: Sponsor[] = [
  { name: "tool sponsor",  imageSrc: img1 },
];
