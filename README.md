# Go Conference 2026 ウェブサイト

Go Conference 2026 の公式ウェブサイトです。Astro 5 で構築されています。

## 必要環境

- **Node.js**: 24 以上
- **パッケージマネージャ**: pnpm（推奨）

## プロジェクト構成

```text
/
├── docs/   # 開発に伴う各種ドキュメント
├── src/
│   ├── assets/             # 画像・SVG 等
│   ├── components/
│   │   ├── GlobalStyles.astro  # デザイントークン・グローバルスタイル
│   │   └── Welcome.astro
│   ├── layouts/
│   │   └── Layout.astro    # 共通レイアウト
│   └── pages/
│       └── index.astro
├── astro.config.mjs
└── package.json
```

## コマンド

ルートディレクトリで以下を実行します。

| コマンド         | 説明                                        |
| :--------------- | :------------------------------------------ |
| `pnpm install`   | 依存関係のインストール                      |
| `pnpm dev`       | 開発サーバー起動（`localhost:4321`）        |
| `pnpm build`     | 本番ビルド（`./dist/` に出力）              |
| `pnpm preview`   | ビルドのローカルプレビュー                  |
| `pnpm format`    | Prettier でフォーマット                     |
| `pnpm lint`      | ESLint でリント                             |
| `pnpm astro ...` | Astro CLI（例: `astro add`, `astro check`） |

## ドキュメント

- [グローバルスタイルの使い方](docs/global-styles.md) — デザイントークン・ユーティリティクラス・フォントの利用方法
