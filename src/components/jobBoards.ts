import type { ImageMetadata } from "astro";
import gold1Img from "../assets/jobboard/gold/gold_1.png";
import gold2Img from "../assets/jobboard/gold/gold_2.png";
import gold3Img from "../assets/jobboard/gold/gold_3.png";
import gold4Img from "../assets/jobboard/gold/gold_4.png";
import gold5Img from "../assets/jobboard/gold/gold_5.png";
import gold6Img from "../assets/jobboard/gold/gold_6.png";
import silver2Img from "../assets/jobboard/silver/silver_2.png";
import silver3Img from "../assets/jobboard/silver/silver_3.png";
import silver4Img from "../assets/jobboard/silver/silver_4.png";
import silver5Img from "../assets/jobboard/silver/silver_5.png";
import silver6Img from "../assets/jobboard/silver/silver_6.png";
import silver7Img from "../assets/jobboard/silver/silver_7.jpg";
import silver8Img from "../assets/jobboard/silver/silver_8.png";
import silver10Img from "../assets/jobboard/silver/silver_10.png";
import silver11Img from "../assets/jobboard/silver/silver_11.png";
import lunch2Img from "../assets/jobboard/lunch/lunch_2.png";
import bronze1Img from "../assets/jobboard/bronze/bronze_1.png";
import bronze2Img from "../assets/jobboard/bronze/bronze_2.png";
import bronze4Img from "../assets/jobboard/bronze/bronze_4.png";
import bronze5Img from "../assets/jobboard/bronze/bronze_5.png";
import bronze6Img from "../assets/jobboard/bronze/bronze_6.png";
import bronze7Img from "../assets/jobboard/bronze/bronze_7.jpg";
import bronze8Img from "../assets/jobboard/bronze/bronze_8.png";
import bronze9Img from "../assets/jobboard/bronze/bronze_9.png";
import bronze10Img from "../assets/jobboard/bronze/bronze_10.png";
import bronze11Img from "../assets/jobboard/bronze/bronze_11.png";
import bronze13Img from "../assets/jobboard/bronze/bronze_13.png";
import bronze14Img from "../assets/jobboard/bronze/bronze_14.png";
import bronze15Img from "../assets/jobboard/bronze/bronze_15.png";
import bronze16Img from "../assets/jobboard/bronze/bronze_16.png";
import bronze17Img from "../assets/jobboard/bronze/bronze_17.png";
import bronze18Img from "../assets/jobboard/bronze/bronze_18.png";
import bronze19Img from "../assets/jobboard/bronze/bronze_19.png";
import bronze20Img from "../assets/jobboard/bronze/bronze_20.png";
import bronze21Img from "../assets/jobboard/bronze/bronze_21.png";
import bronze22Img from "../assets/jobboard/bronze/bronze_22.png";
import bronze25Img from "../assets/jobboard/bronze/bronze_25.png";
import bronze26Img from "../assets/jobboard/bronze/bronze_26.png";
import bronze27Img from "../assets/jobboard/bronze/bronze_27.png";
import bronze28Img from "../assets/jobboard/bronze/bronze_28.png";
import bronze29Img from "../assets/jobboard/bronze/bronze_29.png";
import bronze30Img from "../assets/jobboard/bronze/bronze_30.jpg";
import bronze31Img from "../assets/jobboard/bronze/bronze_31.png";
import bronze33Img from "../assets/jobboard/bronze/bronze_33.png";
import bronze34Img from "../assets/jobboard/bronze/bronze_34.png";
import bronze35Img from "../assets/jobboard/bronze/bronze_35.png";
import bronze36Img from "../assets/jobboard/bronze/bronze_36.png";
import bronze37Img from "../assets/jobboard/bronze/bronze_37.png";

type JobBoard = {
  image: ImageMetadata;
  description: string;
  url: string;
};

export const jobBoards: JobBoard[] = [
  // Gold
  {
    image: gold1Img,
    description: "GMO Flatt Security株式会社",
    url: "https://recruit.flatt.tech/",
  },
  {
    image: gold2Img,
    description: "株式会社LayerX",
    url: "https://jobs.layerx.co.jp/",
  },
  {
    image: gold3Img,
    description: "株式会社TOKIUM",
    url: "https://engineer.recruit.tokium.jp/",
  },
  {
    image: gold4Img,
    description: "株式会社タイミー",
    url: "https://product-recruit.timee.co.jp/",
  },
  {
    image: gold5Img,
    description: "ディップ株式会社",
    url: "https://recruit-dip.com/",
  },
  {
    image: gold6Img,
    description: "弁護士ドットコム",
    url: "https://hrmos.co/pages/bengo4/jobs/0009602",
  },
  // Silver
  {
    image: silver2Img,
    description: "株式会社Datachain",
    url: "https://careers.datachain.jp/",
  },
  {
    image: silver3Img,
    description: "合同会社DMM.com",
    url: "https://dmm-corp.com/recruit/engineer/",
  },
  {
    image: silver4Img,
    description: "株式会社Finatextホールディングス",
    url: "https://finatext.com/recruit",
  },
  {
    image: silver5Img,
    description: "株式会社miive",
    url: "https://careers.miive.jp/",
  },
  {
    image: silver6Img,
    description: "REALITY株式会社",
    url: "https://hrmos.co/pages/1218800560317673472/jobs",
  },
  {
    image: silver7Img,
    description: "株式会社U-NEXT",
    url: "https://hrmos.co/pages/unext/jobs",
  },
  {
    image: silver8Img,
    description: "株式会社エブリー",
    url: "https://corp.every.tv/recruits/engineer",
  },
  {
    image: silver10Img,
    description: "株式会社カオナビ",
    url: "https://recruit.kaonavi.jp/engineer",
  },
  {
    image: silver11Img,
    description: "株式会社サイバーエージェント",
    url: "https://hrmos.co/pages/cyberagent-group",
  },
  // Lunch
  // エムスリー株式会社: ジョブボード未登録
  {
    image: lunch2Img,
    description: "株式会社ミラティブ",
    url: "https://www.mirrativ.co.jp/",
  },
  // Drink: 株式会社エウレカ ジョブボード画像未提出
  // Bronze
  {
    image: bronze1Img,
    description: "株式会社 MIXI",
    url: "https://mixigroup-recruit.mixi.co.jp/",
  },
  {
    image: bronze2Img,
    description: "BBSakura Networks株式会社",
    url: "https://www.bbsakura.net/ja/recruit",
  },
  // Bloomberg LP: ジョブボード画像未提出
  {
    image: bronze4Img,
    description: "株式会社BuySell Technologies",
    url: "https://engineer.buysell-technologies.com/",
  },
  {
    image: bronze5Img,
    description: "ENECHANGE株式会社",
    url: "https://engineer-recruit.enechange.co.jp/",
  },
  {
    image: bronze6Img,
    description: "株式会社GENDA",
    url: "https://genda.jp/careers/",
  },
  {
    image: bronze7Img,
    description: "株式会社Hacobu",
    url: "https://career.hacobu.jp/?utm_source=gocon&utm_medium=sponsor&utm_campaign=gocon2026&utm_content=jobboard",
  },
  {
    image: bronze8Img,
    description: "株式会社hacomono",
    url: "https://www.hacomono.co.jp/recruit/engineer/",
  },
  {
    image: bronze9Img,
    description: "HENNGE株式会社",
    url: "https://recruit.hennge.com/en/gip/",
  },
  {
    image: bronze10Img,
    description: "株式会社HRBrain",
    url: "https://career.hrbrain.co.jp/",
  },
  {
    image: bronze11Img,
    description: "株式会社KiteRa",
    url: "https://www.kitera.co.jp/recruit/golang/",
  },
  // LINEヤフー株式会社: 未登録
  {
    image: bronze13Img,
    description: "movus technologies株式会社",
    url: "https://corp.mo-vus.com/recruit",
  },
  {
    image: bronze14Img,
    description: "Repro株式会社",
    url: "https://company.repro.io/recruit/",
  },
  {
    image: bronze15Img,
    description: "Sansan株式会社",
    url: "https://media.sansan-engineering.com/",
  },
  {
    image: bronze16Img,
    description: "株式会社SODA",
    url: "https://soda-inc.jp/",
  },
  {
    image: bronze17Img,
    description: "株式会社straya",
    url: "https://recruit.straya.jp/engineer/",
  },
  {
    image: bronze18Img,
    description: "株式会社TRUSTDOCK",
    url: "https://trustdock.co.jp/recruit",
  },
  {
    image: bronze19Img,
    description: "株式会社アンドパッド",
    url: "https://hrmos.co/pages/andpad/jobs/2",
  },
  {
    image: bronze20Img,
    description: "株式会社オプティム",
    url: "https://www.optim.co.jp/recruit/",
  },
  {
    image: bronze21Img,
    description: "株式会社カナリー",
    url: "https://recruit.canary-app.jp/",
  },
  {
    image: bronze22Img,
    description: "株式会社カミナシ",
    url: "https://careers.kaminashi.jp/",
  },
  // 株式会社ギークニア: 未登録
  // 株式会社ギフティ: 未登録
  {
    image: bronze25Img,
    description: "株式会社スタンバイ",
    url: "https://recruit.stanby.co.jp/",
  },
  {
    image: bronze26Img,
    description: "株式会社スマートバンク",
    url: "https://smartbank.co.jp/recruit/engineer-summary/",
  },
  {
    image: bronze27Img,
    description: "株式会社ディー・エヌ・エー",
    url: "https://dena.com/jp/recruit/",
  },
  {
    image: bronze28Img,
    description: "株式会社ドワンゴ",
    url: "https://www.wantedly.com/companies/dwango",
  },
  {
    image: bronze29Img,
    description: "株式会社ネットプロテクションズ",
    url: "https://hrmos.co/pages/netprotections/jobs?category=2224669944269824001,2224669944269824002,2224669944269824003",
  },
  {
    image: bronze30Img,
    description: "株式会社はてな",
    url: "https://hatena.co.jp/recruit/engineer",
  },
  {
    image: bronze31Img,
    description: "株式会社バニッシュ・スタンダード",
    url: "https://recruit.v-standard.com/about",
  },
  // ハンディ株式会社: 未登録
  {
    image: bronze33Img,
    description: "フラー株式会社",
    url: "https://recruit.fuller-inc.com/",
  },
  {
    image: bronze34Img,
    description: "株式会社メルカリ",
    url: "https://careers.mercari.com/jobs/engineering/engineering/",
  },
  {
    image: bronze35Img,
    description: "ロゴスウェア株式会社",
    url: "https://recruit.logosware.com/",
  },
  {
    image: bronze36Img,
    description: "東急株式会社",
    url: "https://10q89s.jp/",
  },
  {
    image: bronze37Img,
    description: "東京科学大学デジタル創作同好会traP",
    url: "https://trap.jp/post/2944/",
  },
];
