# タイムテーブルデータのライフサイクル

セッション・スピーカーなどのタイムテーブルデータは Sessionize API から取得し、整形したうえでサイトに組み込みます。
基調講演・スポンサーセッションは Sessionize 外のため、別ファイルに手動で入力します。

## 全体の流れ

```text
Sessionize API
      │
      │  1. 取得（手動、または GitHub Actions が水曜・土曜に実行）
      ▼
生データ（git 管理外）
  src/components/timetable/rawData.json
      │
      │  2. 整形スクリプト
  scripts/transform-timetable-data.ts
      ▼
整形済みデータ（git 追跡）
  src/components/timetable/data.json
      │
      ├──────────────────────────────────────┐
      │                                      │
      │  3. ビルド時に読み込み                 │ 手動入力
      │     (parseRawData.ts)                ▼
      │                      src/components/timetable/manualSessions.ts
      │                                      │
      └──────────────────┬───────────────────┘
                         ▼
サイト表示（プログラム詳細・タイムテーブルなど）
```

## 1. API からの取得

- Sessionize API からセッション・スピーカー等のデータを取得する
- 取得結果を `src/components/timetable/rawData.json` に置く
- API URL はリポジトリに置かず、環境変数 `SESSIONIZE_API_URL`（GitHub Actions では repository secret）で渡す
- 取得スクリプト: `scripts/fetch-timetable-data.ts`
- 実行: `SESSIONIZE_API_URL=... pnpm fetch:timetable`

ローカルでの実行例:

```sh
export SESSIONIZE_API_URL='https://sessionize.com/api/v2/<id>/view/All'
pnpm fetch:timetable
pnpm transform:timetable
git diff -- src/components/timetable/data.json
```

`SESSIONIZE_API_URL` はリポジトリに含めない。1 コマンドだけなら次でもよい。

```sh
SESSIONIZE_API_URL='https://sessionize.com/api/v2/<id>/view/All' pnpm fetch:timetable
```
- 自動取得は GitHub Actions（`.github/workflows/sync-sessionize.yml`）が水曜・土曜の 08:05 JST に実行する
  - `data.json` に差分があれば PR を作成する
  - 差分がなければ何もしない
  - Actions タブの「Run workflow」から手動実行もできる（`workflow_dispatch`）

## 2. 生データ

- ファイル: `src/components/timetable/rawData.json`（作業用に `tmp.json` も同様に除外）
- API レスポンスは不要なフィールドを含むため、**リポジトリでは git 管理外**とする（`.gitignore` で除外）
- ローカルでの作業用ファイルとして保持し、整形の入力とする
- コミット対象にしないこと

## 3. 整形

- 整形スクリプト: `scripts/transform-timetable-data.ts`
- 実行: `pnpm transform:timetable`（Node の type stripping で実行）
- 整形時に次を行う
  - Accepted セッションのみ残す
  - スピーカー情報をセッションへ埋め込む
  - `categoryItems` から `type` / `difficulty` / `duration` を解決する（欠けていればエラー）
  - サイト未使用のフィールドを除去する
  - 表示用の時刻・部屋は含めない（カード表示時に `sessionGrid` / `schedule` から解決）
- `parseRawData.ts` は整形済み JSON と手動入力を `Program` のマップへ載せる薄い読み込み層

## 4. 整形済みデータ（git 追跡対象）

- ファイル: `src/components/timetable/data.json`
- 利用時に使いやすい形（スピーカー埋め込み済みなど）で git 追跡する
- タイムテーブル上の配置（枠・開始時刻・部屋）は、データ本体とは別に `sessionGrid.ts` / `schedule.ts` などで管理する
- **`pnpm transform:timetable` で上書きされる**ため、基調講演・スポンサーはここに書かない

## 5. 基調講演・スポンサーセッション（手動入力）

- ファイル: `src/components/timetable/manualSessions.ts`
- `SessionProgram` 型のオブジェクト配列として入力する（型チェックが効く）
- `transform:timetable` の影響を受けない
- 未入力の枠はプレースホルダー表示のまま（基調講演は「基調講演」、スポンサーは「詳細未定」）
- エントリを追加すると、タイムテーブルカード・詳細ページ・OGP が通常セッションと同様に出る

### 使う id（タイムテーブル配置と対応）

| id             | 種別             | 枠                 |
| -------------- | ---------------- | ------------------ |
| `keynote`      | `keynote`        | 10:30 基調講演     |
| `sponsorSlot1` | `sponsorSession` | 12:20 スポンサー 1 |
| `sponsorSlot2` | `sponsorSession` | 12:45 スポンサー 2 |
| `sponsorSlot3` | `sponsorSession` | 13:10 スポンサー 3 |

### 入力例

`manualSessions.ts` の配列にオブジェクトを追加する。

```ts
import type { SessionProgram } from "./sessionProgram";

export const manualSessions: SessionProgram[] = [
  {
    id: "keynote",
    type: "keynote",
    title: "基調講演のタイトル",
    speaker: {
      name: "登壇者名",
      avatar: "https://example.com/avatar.jpg",
      xUrl: "https://x.com/example",
      company: "所属",
      description: "登壇者紹介",
    },
    description: "セッション概要",
  },
  {
    id: "sponsorSlot1",
    type: "sponsorSession",
    title: "スポンサーセッションのタイトル",
    difficulty: "beginner",
    speaker: {
      name: "登壇者名",
      avatar: "https://example.com/avatar.jpg",
      company: "所属",
      description: "登壇者紹介",
    },
    description: "セッション概要",
  },
];
```

- `difficulty` はスポンサー・通常セッション向け（`"beginner"` / `"intermediate"` / `"advanced"`）。基調講演には不要
- スポンサーは必要な枠だけ追加すればよい（例: Slot1 だけ埋めて Slot2/3 は Coming Soon のまま）

時刻・部屋は `sessionGrid.ts` / `schedule.ts` から表示時に解決するため、入力データには含めない。

## 運用上の注意

| 対象                                                   | git      | 役割                                                    |
| ------------------------------------------------------ | -------- | ------------------------------------------------------- |
| API 生データ (`rawData.json`)                          | 管理外   | 整形の入力。不要フィールドを含む                        |
| 整形スクリプト (`scripts/transform-timetable-data.ts`) | 追跡する | 生データ → 利用しやすい整形済みデータ                   |
| 整形済みデータ (`data.json`)                           | 追跡する | CFP セッション等のビルド・サイト表示入力                |
| 手動セッション (`manualSessions.ts`)                   | 追跡する | 基調講演・スポンサーセッション                          |
| 取得の自動化                                           | 追跡する | 水曜・土曜の GitHub Actions。URL は secret `SESSIONIZE_API_URL` |

データ更新時は次の順で行う。

1. `SESSIONIZE_API_URL` を指定して `pnpm fetch:timetable` を実行する（または GitHub Actions に任せる）
2. `pnpm transform:timetable` で `data.json` を生成する
3. 基調講演・スポンサーは `manualSessions.ts` を編集する
4. `data.json` / `manualSessions.ts` の変更をコミットする
