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
    url: "https://docs.google.com/forms/d/e/1FAIpQLSdH5gsb4teQ5hdFi9GaCFtNdNNCw1G4qdzyw2NoSWYQCYplow/viewform",
    isBlankLink: true,
  },
  {
    title: "Webサイトを公開しました！",
    date: "2026.03.04",
  },
];
