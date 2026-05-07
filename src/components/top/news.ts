import { withBaseURL } from "../../utils/url";

export type News = {
  title: string;
  date: string;
  url?: string;
  isBlankLink?: boolean;
};

export const news: News[] = [
  {
    title: "ブランドガイドラインを公開しました！",
    date: "2026.05.7",
    url: withBaseURL("news/brand-guidelines"),
  },
  {
    title:
      "Go Conference 2026 のテーマと、ランチ/ドリンク スポンサー募集のお知らせ",
    date: "2026.04.22",
    url: withBaseURL("news/lunch-drink-sponsor"),
  },
  {
    title: "スポンサーの募集を開始しました！",
    date: "2026.03.25",
    url: withBaseURL("news/sponsor-recruitment"),
  },
  {
    title: "Webサイトを公開しました！",
    date: "2026.03.04",
    url: withBaseURL("news/website-launch"),
  },
];
