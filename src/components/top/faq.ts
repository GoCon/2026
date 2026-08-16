export type FAQ = {
  questionJa: string;
  answerJa: string;
  questionEn: string;
  answerEn: string;
};

// リンクを表示したい場合は "[表示テキスト](遷移先URL)" の形式で設定

export const faq: FAQ[] = [
  {
    questionJa: "後日アーカイブ動画の公開はありますか？",
    answerJa: "アーカイブ動画の公開を予定しております。詳細は後日お知らせいたします。",
    questionEn: "Will archive videos be available after the event?",
    answerEn: "We plan to make archive videos available. Details will be announced at a later date."
  },
  {
    questionJa: "オンライン配信はありますか？",
    answerJa: "セッションのみ配信となります",
    questionEn: "Will there be an online stream?",
    answerEn: "Only sessions will be streamed online."
  },
  {
    questionJa: "チケットの領収書はどこから取得できますか？",
    answerJa: "購入後のメールから適格事業者番号付きの領収書が取得可能です。",
    questionEn: "Where can I get a receipt for my ticket?",
    answerEn: "A receipt with a qualified invoice number can be obtained from the email you receive after purchase."
  },
  {
    questionJa: "会場内で電源、Wi-Fiは提供されますか？",
    answerJa: "電源、Wi-Fiは提供予定です。",
    questionEn: "Will power outlets and Wi-Fi be available at the venue?",
    answerEn: "Power outlets and Wi-Fi are planned to be provided."
  },
  {
    questionJa: "会場内での飲食は可能ですか？",
    answerJa: "可能です。",
    questionEn: "Is food and drink allowed at the venue?",
    answerEn: "Yes, food and drink are allowed."
  },
  {
    questionJa: "お弁当の配布はありますか？",
    answerJa: "昼休憩時にお弁当の配布がございます。*数に限りがございます。",
    questionEn: "Will boxed lunches be provided?",
    answerEn: "Boxed lunches will be distributed during the lunch break. *Limited quantities available."
  },
  {
    questionJa: "参加キャンセルは可能ですか？",
    answerJa: "キャンセルは可能ですが、返金は行いません。",
    questionEn: "Can I cancel my registration?",
    answerEn: "Cancellations are accepted, but refunds will not be issued."
  },
  {
    questionJa: "参加ポリシーはありますか？",
    answerJa: "運営者、登壇者、その他すべての参加者は [Go Community Code of Conduct](https://go.dev/conduct) に従う必要があります",
    questionEn: "Is there a participation policy?",
    answerEn: "All organizers, speakers, and participants must follow the [Go Community Code of Conduct](https://go.dev/conduct)."
  },
  {
    questionJa: "カンファレンスに関してのお問い合わせ先はどこですか？",
    answerJa: "お問い合わせは [info@gocon.jp](mailto:info@gocon.jp) までお願いいたします。",
    questionEn: "Who should I contact for inquiries about the conference?",
    answerEn: "Please send your inquiries to [info@gocon.jp](mailto:info@gocon.jp)."
  },
];
