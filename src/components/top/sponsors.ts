import type { ImageMetadata } from "astro";
import gopher3Img from "../../assets/sponsors/gopher/gopher_3.png";
import gopher5Img from "../../assets/sponsors/gopher/gopher_5.png";
import gopher7Img from "../../assets/sponsors/gopher/gopher_7.jpg";
import gopher8Img from "../../assets/sponsors/gopher/gopher_8.png";
import gopher9Img from "../../assets/sponsors/gopher/gopher_9.png";
import gopher11Img from "../../assets/sponsors/gopher/gopher_11.png";
import gopher12Img from "../../assets/sponsors/gopher/gopher_12.png";
import gopher15Img from "../../assets/sponsors/gopher/gopher_15.jpg";
import gopher17Img from "../../assets/sponsors/gopher/gopher_17.png";
import gopher18Img from "../../assets/sponsors/gopher/gopher_18.jpg";
import gopher19Img from "../../assets/sponsors/gopher/gopher_19.png";
import gopher20Img from "../../assets/sponsors/gopher/gopher_20.png";
import gopher21Img from "../../assets/sponsors/gopher/gopher_21.png";

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
  // { name: "blami", imageSrc: gopher1Img },
  // { name: "chihiro", imageSrc: gopher2Img },
  { name: "Go Sueyoshi (sue445)", imageSrc: gopher3Img },
  // { name: "haruyama480", imageSrc: gopher4Img },
  { name: "hiro", imageSrc: gopher5Img },
  // { name: "JJ", imageSrc: gopher6Img },
  { name: "kazuhiro1982", imageSrc: gopher7Img },
  { name: "KojiKa", imageSrc: gopher8Img },
  { name: "Koya Hachiya", imageSrc: gopher9Img },
  // { name: "Kyoto.go", imageSrc: gopher10Img },
  { name: "masakurapa", imageSrc: gopher11Img },
  { name: "Miki", imageSrc: gopher12Img },
  // { name: "momi", imageSrc: gopher13Img },
  // { name: "sadah", imageSrc: gopher14Img },
  { name: "Songmu", imageSrc: gopher15Img },
  // { name: "turbofish", imageSrc: gopher16Img },
  { name: "utgwkk", imageSrc: gopher17Img },
  { name: "Yamato", imageSrc: gopher18Img },
  { name: "Yuki Tetsuka", imageSrc: gopher19Img },
  { name: "おーたかこーたろー", imageSrc: gopher20Img },
  { name: "すてにゃん", imageSrc: gopher21Img },
  // { name: "瀬上 祐匡", imageSrc: gopher22Img },
];

export const toolSponsors: Sponsor[] = [
];
