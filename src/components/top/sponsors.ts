import type { ImageMetadata } from "astro";
import gold1Img from "../../assets/sponsors/gold/gold_1.png";
import gold2Img from "../../assets/sponsors/gold/gold_2.png";
import gold3Img from "../../assets/sponsors/gold/gold_3.png";
import gold4Img from "../../assets/sponsors/gold/gold_4.png";
import gold5Img from "../../assets/sponsors/gold/gold_5.png";
import gold6Img from "../../assets/sponsors/gold/gold_6.png";
import silver2Img from "../../assets/sponsors/silver/silver_2.png";
import silver3Img from "../../assets/sponsors/silver/silver_3.png";
import silver4Img from "../../assets/sponsors/silver/silver_4.png";
import silver5Img from "../../assets/sponsors/silver/silver_5.png";
import silver6Img from "../../assets/sponsors/silver/silver_6.png";
import silver7Img from "../../assets/sponsors/silver/silver_7.png";
import silver8Img from "../../assets/sponsors/silver/silver_8.png";
import silver10Img from "../../assets/sponsors/silver/silver_10.png";
import silver11Img from "../../assets/sponsors/silver/silver_11.png";
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
  {
    name: "GMO Flatt Security株式会社",
    imageSrc: gold1Img,
    link: "https://flatt.tech/",
  },
  {
    name: "株式会社LayerX",
    imageSrc: gold2Img,
    link: "https://jobs.layerx.co.jp/",
  },
  {
    name: "株式会社TOKIUM",
    imageSrc: gold3Img,
    link: "https://engineer.recruit.tokium.jp/",
  },
  {
    name: "株式会社タイミー",
    imageSrc: gold4Img,
    link: "https://product-recruit.timee.co.jp/",
  },
  {
    name: "ディップ株式会社",
    imageSrc: gold5Img,
    link: "https://recruit-dip.com/",
  },
  {
    name: "弁護士ドットコム",
    imageSrc: gold6Img,
    link: "https://www.bengo4.com/corporate/",
  },
];

export const silverSponsors: SponsorWithUrl[] = [
  // { name: "株式会社CARTA HOLDINGS", imageSrc: silver1Img, link: "" },
  {
    name: "株式会社Datachain",
    imageSrc: silver2Img,
    link: "https://careers.datachain.jp/",
  },
  {
    name: "合同会社DMM.com",
    imageSrc: silver3Img,
    link: "https://dmm-corp.com/",
  },
  {
    name: "株式会社Finatextホールディングス",
    imageSrc: silver4Img,
    link: "",
  },
  {
    name: "株式会社miive",
    imageSrc: silver5Img,
    link: "https://careers.miive.jp/",
  },
  {
    name: "REALITY株式会社",
    imageSrc: silver6Img,
    link: "https://reality.inc/",
  },
  {
    name: "株式会社U-NEXT",
    imageSrc: silver7Img,
    link: "https://www.unext.co.jp/",
  },
  {
    name: "株式会社エブリー",
    imageSrc: silver8Img,
    link: "https://corp.every.tv/",
  },
  // { name: "エムスリー株式会社", imageSrc: silver9Img, link: "" },
  {
    name: "株式会社カオナビ",
    imageSrc: silver10Img,
    link: "https://corp.kaonavi.jp/",
  },
  {
    name: "株式会社サイバーエージェント",
    imageSrc: silver11Img,
    link: "https://hrmos.co/pages/cyberagent-group",
  },
  // { name: "フリー株式会社", imageSrc: silver12Img, link: "" },
  // { name: "株式会社ベースマキナ", imageSrc: silver13Img, link: "" },
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
