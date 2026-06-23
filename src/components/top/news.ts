export type News = {
  titleJa: string;
  titleEn: string;
  date: string;
  newsSlug?: string;
  url?: string;
  isBlankLink?: boolean;
};

export const news: News[] = [
  {
    titleJa: "[事前告知]チケット販売開始スケジュールのお知らせ",
    titleEn: "Go Conference 2026 Tickets Now on Sale",
    date: "2026.6.19",
    newsSlug: "ticket-sales",
  },
  {
    titleJa: "学生支援制度のお知らせ",
    titleEn: "Student Support Program",
    date: "2026.6.5",
    newsSlug: "student-support",
  },
  {
    titleJa: "Go Conference 2026 プロポーザル募集開始のお知らせ",
    titleEn: "Go Conference 2026 Call for Proposals Now Open",
    date: "2026.5.15",
    newsSlug: "proposal-recruitment",
  },
  {
    titleJa: "ブランドガイドラインを公開しました！",
    titleEn: "Brand Guidelines Released!",
    date: "2026.5.7",
    newsSlug: "brand-guidelines",
  },
  {
    titleJa:
      "Go Conference 2026 のテーマと、ランチ/ドリンク スポンサー募集のお知らせ",
    titleEn: "Go Conference 2026 Theme and Call for Lunch/Drink Sponsors",
    date: "2026.4.22",
    newsSlug: "lunch-drink-sponsor",
  },
  {
    titleJa: "スポンサーの募集を開始しました！",
    titleEn: "Sponsor Recruitment Now Open!",
    date: "2026.3.25",
    newsSlug: "sponsor-recruitment",
  },
  {
    titleJa: "Webサイトを公開しました！",
    titleEn: "Website Launched!",
    date: "2026.3.4",
    newsSlug: "website-launch",
  },
];
