import type { ImageMetadata } from "astro";
import gold1Img from "../../assets/sponsors/gold/gold_1.png";
import gold2Img from "../../assets/sponsors/gold/gold_2.png";
import gold3Img from "../../assets/sponsors/gold/gold_3.png";
import gold4Img from "../../assets/sponsors/gold/gold_4.png";
import gold5Img from "../../assets/sponsors/gold/gold_5.png";
import gold6Img from "../../assets/sponsors/gold/gold_6.png";
import silver1Img from "../../assets/sponsors/silver/silver_1.png";
import silver2Img from "../../assets/sponsors/silver/silver_2.png";
import silver3Img from "../../assets/sponsors/silver/silver_3.png";
import silver4Img from "../../assets/sponsors/silver/silver_4.png";
import silver5Img from "../../assets/sponsors/silver/silver_5.png";
import silver6Img from "../../assets/sponsors/silver/silver_6.png";
import silver7Img from "../../assets/sponsors/silver/silver_7.png";
import silver8Img from "../../assets/sponsors/silver/silver_8.png";
import silver10Img from "../../assets/sponsors/silver/silver_10.png";
import silver11Img from "../../assets/sponsors/silver/silver_11.png";
import drink1Img from "../../assets/sponsors/drink/drink_1.jpg";
import lunch1Img from "../../assets/sponsors/lunch/lunch_1.png";
import lunch2Img from "../../assets/sponsors/lunch/lunch_2.png";
import bronze1Img from "../../assets/sponsors/bronze/bronze_1.jpg";
import bronze2Img from "../../assets/sponsors/bronze/bronze_2.png";
import bronze4Img from "../../assets/sponsors/bronze/bronze_4.png";
import bronze5Img from "../../assets/sponsors/bronze/bronze_5.png";
import bronze6Img from "../../assets/sponsors/bronze/bronze_6.png";
import bronze7Img from "../../assets/sponsors/bronze/bronze_7.png";
import bronze8Img from "../../assets/sponsors/bronze/bronze_8.png";
import bronze9Img from "../../assets/sponsors/bronze/bronze_9.png";
import bronze10Img from "../../assets/sponsors/bronze/bronze_10.jpg";
import bronze11Img from "../../assets/sponsors/bronze/bronze_11.png";
import bronze12Img from "../../assets/sponsors/bronze/bronze_12.png";
import bronze13Img from "../../assets/sponsors/bronze/bronze_13.png";
import bronze14Img from "../../assets/sponsors/bronze/bronze_14.png";
import bronze15Img from "../../assets/sponsors/bronze/bronze_15.jpg";
import bronze16Img from "../../assets/sponsors/bronze/bronze_16.png";
import bronze17Img from "../../assets/sponsors/bronze/bronze_17.png";
import bronze18Img from "../../assets/sponsors/bronze/bronze_18.png";
import bronze19Img from "../../assets/sponsors/bronze/bronze_19.png";
import bronze20Img from "../../assets/sponsors/bronze/bronze_20.png";
import bronze21Img from "../../assets/sponsors/bronze/bronze_21.png";
import bronze22Img from "../../assets/sponsors/bronze/bronze_22.png";
import bronze23Img from "../../assets/sponsors/bronze/bronze_23.png";
import bronze25Img from "../../assets/sponsors/bronze/bronze_25.png";
import bronze26Img from "../../assets/sponsors/bronze/bronze_26.png";
import bronze27Img from "../../assets/sponsors/bronze/bronze_27.png";
import bronze28Img from "../../assets/sponsors/bronze/bronze_28.png";
import bronze29Img from "../../assets/sponsors/bronze/bronze_29.png";
import bronze30Img from "../../assets/sponsors/bronze/bronze_30.jpg";
import bronze31Img from "../../assets/sponsors/bronze/bronze_31.png";
import bronze33Img from "../../assets/sponsors/bronze/bronze_33.png";
import bronze34Img from "../../assets/sponsors/bronze/bronze_34.png";
import bronze35Img from "../../assets/sponsors/bronze/bronze_35.png";
import bronze36Img from "../../assets/sponsors/bronze/bronze_36.png";
import bronze37Img from "../../assets/sponsors/bronze/bronze_37.png";
import gopher2Img from "../../assets/sponsors/gopher/gopher_2.jpeg";
import gopher3Img from "../../assets/sponsors/gopher/gopher_3.png";
import gopher4Img from "../../assets/sponsors/gopher/gopher_4.png";
import gopher5Img from "../../assets/sponsors/gopher/gopher_5.png";
import gopher6Img from "../../assets/sponsors/gopher/gopher_6.png";
import gopher7Img from "../../assets/sponsors/gopher/gopher_7.jpg";
import gopher8Img from "../../assets/sponsors/gopher/gopher_8.png";
import gopher9Img from "../../assets/sponsors/gopher/gopher_9.png";
import gopher10Img from "../../assets/sponsors/gopher/gopher_10.png";
import gopher11Img from "../../assets/sponsors/gopher/gopher_11.png";
import gopher12Img from "../../assets/sponsors/gopher/gopher_12.png";
import gopher13Img from "../../assets/sponsors/gopher/gopher_13.jpeg";
import gopher15Img from "../../assets/sponsors/gopher/gopher_15.jpg";
import gopher16Img from "../../assets/sponsors/gopher/gopher_16.jpg";
import gopher17Img from "../../assets/sponsors/gopher/gopher_17.png";
import gopher18Img from "../../assets/sponsors/gopher/gopher_18.jpg";
import gopher19Img from "../../assets/sponsors/gopher/gopher_19.png";
import gopher20Img from "../../assets/sponsors/gopher/gopher_20.png";
import gopher21Img from "../../assets/sponsors/gopher/gopher_21.png";
import wifi1Img from "../../assets/sponsors/wifi/wifi_1.png";

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
    link: "",
  },
  {
    name: "弁護士ドットコム",
    imageSrc: gold6Img,
    link: "https://www.bengo4.com/corporate/",
  },
];

export const silverSponsors: SponsorWithUrl[] = [
  {
    name: "株式会社CARTA HOLDINGS",
    imageSrc: silver1Img,
    link: "https://hrmos.co/pages/cartaholdings/jobs/fl-e001?utm_source=gocon_2026&utm_medium=Paid+Other&utm_campaign=gocon_2026",
  },
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
    link: "https://finatext.com/recruit",
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
  {
    name: "株式会社エウレカ",
    imageSrc: drink1Img,
    link: "https://career.pairs.lv/",
  },
];

export const lunchSponsors: SponsorWithUrl[] = [
  {
    name: "エムスリー株式会社",
    imageSrc: lunch1Img,
    link: "https://jobs.m3.com/engineer",
  },
  {
    name: "株式会社ミラティブ",
    imageSrc: lunch2Img,
    link: "https://www.mirrativ.co.jp/",
  },
];

export const bronzeSponsors: Sponsor[] = [
  { name: "株式会社 MIXI", imageSrc: bronze1Img },
  { name: "BBSakura Networks株式会社", imageSrc: bronze2Img },
  // { name: "Bloomberg LP", imageSrc: bronze3Img },
  { name: "株式会社BuySell Technologies", imageSrc: bronze4Img },
  { name: "ENECHANGE株式会社", imageSrc: bronze5Img },
  { name: "株式会社GENDA", imageSrc: bronze6Img },
  { name: "株式会社Hacobu", imageSrc: bronze7Img },
  { name: "株式会社hacomono", imageSrc: bronze8Img },
  { name: "HENNGE株式会社", imageSrc: bronze9Img },
  { name: "株式会社HRBrain", imageSrc: bronze10Img },
  { name: "株式会社KiteRa", imageSrc: bronze11Img },
  { name: "LINEヤフー株式会社", imageSrc: bronze12Img },
  { name: "movus technologies株式会社", imageSrc: bronze13Img },
  { name: "Repro株式会社", imageSrc: bronze14Img },
  { name: "Sansan株式会社", imageSrc: bronze15Img },
  { name: "株式会社SODA", imageSrc: bronze16Img },
  { name: "株式会社straya", imageSrc: bronze17Img },
  { name: "株式会社TRUSTDOCK", imageSrc: bronze18Img },
  { name: "株式会社アンドパッド", imageSrc: bronze19Img },
  { name: "株式会社オプティム", imageSrc: bronze20Img },
  { name: "株式会社カナリー", imageSrc: bronze21Img },
  { name: "株式会社カミナシ", imageSrc: bronze22Img },
  { name: "株式会社ギークニア", imageSrc: bronze23Img },
  // { name: "株式会社ギフティ", imageSrc: bronze24Img },
  { name: "株式会社スタンバイ", imageSrc: bronze25Img },
  { name: "株式会社スマートバンク", imageSrc: bronze26Img },
  { name: "株式会社ディー・エヌ・エー", imageSrc: bronze27Img },
  { name: "株式会社ドワンゴ", imageSrc: bronze28Img },
  { name: "株式会社ネットプロテクションズ", imageSrc: bronze29Img },
  { name: "株式会社はてな", imageSrc: bronze30Img },
  { name: "株式会社バニッシュ・スタンダード", imageSrc: bronze31Img },
  // { name: "ハンディ株式会社", imageSrc: bronze32Img },
  { name: "フラー株式会社", imageSrc: bronze33Img },
  { name: "株式会社メルカリ", imageSrc: bronze34Img },
  { name: "ロゴスウェア株式会社", imageSrc: bronze35Img },
  { name: "東急株式会社", imageSrc: bronze36Img },
  { name: "東京科学大学デジタル創作同好会traP", imageSrc: bronze37Img },
];

export const gopherSponsors: Sponsor[] = [
  // { name: "blami", imageSrc: gopher1Img },
  { name: "chihiro", imageSrc: gopher2Img },
  { name: "Go Sueyoshi (sue445)", imageSrc: gopher3Img },
  { name: "haruyama480", imageSrc: gopher4Img },
  { name: "hiro", imageSrc: gopher5Img },
  { name: "JJ", imageSrc: gopher6Img },
  { name: "kazuhiro1982", imageSrc: gopher7Img },
  { name: "KojiKa", imageSrc: gopher8Img },
  { name: "Koya Hachiya", imageSrc: gopher9Img },
  { name: "Kyoto.go", imageSrc: gopher10Img },
  { name: "masakurapa", imageSrc: gopher11Img },
  { name: "Miki", imageSrc: gopher12Img },
  { name: "momi", imageSrc: gopher13Img },
  // { name: "sadah", imageSrc: gopher14Img },
  { name: "Songmu", imageSrc: gopher15Img },
  { name: "turbofish", imageSrc: gopher16Img },
  { name: "utgwkk", imageSrc: gopher17Img },
  { name: "Yamato", imageSrc: gopher18Img },
  { name: "Yuki Tetsuka", imageSrc: gopher19Img },
  { name: "おーたかこーたろー", imageSrc: gopher20Img },
  { name: "すてにゃん", imageSrc: gopher21Img },
  // { name: "瀬上 祐匡", imageSrc: gopher22Img },
];

export const toolSponsors: Sponsor[] = [
  { name: "株式会社LayerX", imageSrc: gold2Img },
];

export const wifiSponsors: Sponsor[] = [
  { name: "インターネット・ゼミ", imageSrc: wifi1Img },
];
