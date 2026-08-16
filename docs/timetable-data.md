# タイムテーブルデータのライフサイクル

セッション・スピーカーなどのタイムテーブルデータは Sessionize API から取得し、整形したうえでサイトに組み込みます。

## 全体の流れ

```text
Sessionize API
      │
      │  1. 取得（build 前に実行）
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
      │  3. ビルド時に読み込み（parseRawData.ts）
      ▼
サイト表示（プログラム詳細・タイムテーブルなど）
```

## 1. API からの取得

- Sessionize API からセッション・スピーカー等のデータを取得する
- 取得結果を `src/components/timetable/rawData.json` に置く
- 取得は **ビルド前** に行う
- 取得処理の自動化は **追って対応予定**（現状は手動運用を想定）

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
  - `categoryItems` から `type` / `difficulty` / `duration` を解決する
  - `room` / `timeString` を解決する
  - サイト未使用のフィールドを除去する
- `parseRawData.ts` は整形済み JSON を `Program` のマップへ載せる薄い読み込み層

## 4. 整形済みデータ（git 追跡対象）

- ファイル: `src/components/timetable/data.json`
- 利用時に使いやすい形（スピーカー埋め込み済みなど）で git 追跡する
- タイムテーブル上の配置（枠・開始時刻など）は、データ本体とは別に `schedule.ts` などで管理する

## 運用上の注意

| 対象 | git | 役割 |
| ---- | --- | ---- |
| API 生データ (`rawData.json`) | 管理外 | 整形の入力。不要フィールドを含む |
| 整形スクリプト (`scripts/transform-timetable-data.ts`) | 追跡する | 生データ → 利用しやすい整形済みデータ |
| 整形済みデータ (`data.json`) | 追跡する | ビルド・サイト表示の入力 |
| 取得の自動化 | 未対応 | build 前実行の自動化は今後対応 |

データ更新時は次の順で行う。

1. Sessionize API のレスポンスを `rawData.json` に保存する
2. `pnpm transform:timetable` で `data.json` を生成する
3. `data.json` の変更のみをコミットする
