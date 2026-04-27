export type Staff = {
  id: number
  name: string
  avatar: string
  sns: Sns
  communities: string[]
  comment: string
}

export interface Sns {
  url: string
  type: string
}

export const staffs: Staff[] = [
  {
    id: 1,
    name: "もっちー",
    avatar: "mochi_2225.jpg",
    sns: {
      url: "https://x.com/mochi_2225",
      type: "x"
    },
    communities: [
      "Go Conference"
    ],
    comment: "",
  },
  {
    id: 2,
    name: "Masahiro Sakuraba",
    avatar: "masakurapa.png",
    sns: {
      url: "https://x.com/masakurapa",
      type: "x"
    },
    communities: [
      "Go Conference"
    ],
    comment: ""
  },
  {
    id: 3,
    name: "satoken",
    avatar: "satoken.png",
    sns: {
      url: "https://x.com/ken5owata",
      type: "x"
    },
    communities: [
      "TinyGo Keeb",
      "低レベル勉強会",
      "秘密結社オープンフォース"
    ],
    comment: ""
  }
];
