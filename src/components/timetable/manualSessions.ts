import type { SessionProgram } from "./sessionProgram";
import mirrativAvatar from "../../assets/sponsors/session-avatars/lunch_1.jpg";
import eurekaAvatar from "../../assets/sponsors/session-avatars/drink_1.jpeg";
import m3Avatar from "../../assets/sponsors/session-avatars/lunch_2.png";

/**
 * 基調講演・スポンサーセッションなど Sessionize 外の手動入力。
 *
 * - id は sessionGrid と対応させること（keynote / sponsorSlot1〜3）
 * - 時刻・部屋は sessionGrid から自動解決される
 * - 未入力の枠はこの配列に含めない（プレースホルダー表示のまま）
 */
export const manualSessions: SessionProgram[] = [
  // {
  //   id: "keynote",
  //   type: "keynote",
  //   title: "基調講演のタイトル",
  //   speaker: {
  //     name: "登壇者名",
  //     avatar: "https://example.com/avatar.jpg",
  //     xUrl: "https://x.com/example",
  //     company: "所属",
  //     description: "登壇者紹介",
  //   },
  //   description: "セッション概要",
  // },
  {
    id: "sponsorSlot1",
    type: "sponsorSession",
    title: "株式会社ミラティブ: 動画配信サーバーにおけるGC負荷低減の取り組み",
    speaker: {
      name: "八谷航太（ヤタガイ コウタ）",
      avatar: mirrativAvatar.src,
    },
    description:
      "動画配信サーバーでは、動画セグメントの処理ごとに、大きく短命なメモリ領域の高頻度な割り当てが発生します。こういったワークロードにおいて、Goランタイムからのメモリ割り当てではオブジェクト数とサイズが爆発し、GCのスキャンやGCアシストによる負荷が激増、結果的にスループットが低下します。上記の問題に対応するためにとっている、mmapによる手動メモリ管理の手法と類似する手法、それによるアプリケーションの性能向上について紹介いたします。",
  },
  {
    id: "sponsorSlot2",
    type: "sponsorSession",
    title:
      "株式会社エウレカ: Podは生きているのにGoだけが落ちる：GOGCとGOMEMLIMITで追うInvisible OOM Killの謎",
    speaker: {
      name: "Takeshi Watanabe",
      avatar: eurekaAvatar.src,
    },
    description:
      "【ショートセッション／中級者向け】\n\n我々が提供するペアーズの本番運用中のGo APIサーバーで、まれにtarget 5xxが発生しGoプロセスだけがpanic logなしに落ちる事象が続いていました。一方で、PodはOOMKilledにならず、同じコンテナ内のNginxは生き続けており、Kubernetes上の状態や通常のアプリケーションログだけでは原因を特定しづらい、いわゆる“Invisible OOM Kill”と呼べる状態でした。\n\n本セッションでは、この見えにくい障害を、Goランタイム・Kubernetes・コンテナ内の複数プロセスという複数のレイヤーから一つずつ紐解いていきます。なぜPodは生きているように見えたのか、なぜGoプロセスだけが落ちたのか、なぜメモリ使用量が少なく見えていたのにOOMが起きたのか。調査の過程で見えてきたGOGCとGOMEMLIMITの関係、Go以外のメモリを考慮した値決め、GCやレイテンシに与える影響について、実際のメトリクスと意思決定を交えて紹介します。\n最終的には、本番APIサーバーの安定性を高めながらmemory limitを8GBから3GBへ削減しました。その過程で得られた、Goアプリケーションをコンテナ環境で安全かつ効率的に動かすための監視・設定・ロールアウトの考え方を共有します。",
  },
  {
    id: "sponsorSlot3",
    type: "sponsorSession",
    title:
      "エムスリー株式会社: 更なる可用性を求めて、5年間運用したKotlinのアプリケーションをGoでリプレイスする話",
    speaker: {
      name: "田口 健介",
      avatar: m3Avatar.src,
    },
    description:
      "クリニック向けの予約・受付・キャッシュレス決済サービス「デジスマ診療」では長らくKotlinのアプリケーションをKubernetes上で運用してきました。\nデジスマ診療はクリニックの診療オペレーションに組み込まれており、高い水準のシステムの可用性が求められます。そこで更なる可用性の向上のため、KotlinのアプリケーションをGoでリプレイスする意思決定をしました。\n本セッションでは、Kotlin（JVM）アプリケーションを運用して見つかった課題と、それをGoでリプレイスする意思決定に至った経緯や効果についてお話しします。",
  },
];
