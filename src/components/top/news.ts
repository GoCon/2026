import { withBaseURL } from "../../utils/url";

export type News = {
  title: string;
  date: string;
  url?: string;
  isBlankLink?: boolean;
};

export const news: News[] = [
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
