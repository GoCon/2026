# グローバルスタイルの使い方

サイト全体のデザイントークンとグローバルスタイルは `src/components/GlobalStyles.astro` で定義されています。`Layout.astro` で読み込まれており、全ページで利用できます。

## 読み込み方法

新規ページでは `Layout.astro` をレイアウトに指定すれば、グローバルスタイルが自動で適用されます。

```astro
---
import Layout from "../layouts/Layout.astro";
---

<Layout>
  <!-- コンテンツ -->
</Layout>
```

スタンドアロンで使う場合は、コンポーネント内で次のように読み込みます。

```astro
---
import GlobalStyles from "./GlobalStyles.astro";
---

<GlobalStyles />
```

---

## デザイントークン（CSS 変数）

`GlobalStyles` は `:root` に CSS 変数を定義しています。コンポーネントやページの `<style>` で `var(--トークン名)` として参照してください。

### プリミティブカラー（直接指定用）

| 変数名                     | 用途・色                 |
| -------------------------- | ------------------------ |
| `--primitive-black`        | 黒 (`#333333`)           |
| `--primitive-white`        | 白 (`#ffffff`)           |
| `--primitive-light-gray`   | 薄いグレー (`#d5e1e8`)   |
| `--primitive-dark-gray`    | 濃いグレー (`#798992`)   |
| `--primitive-yellow`       | イエロー (`#f4c928`)     |
| `--primitive-cyan`         | シアン (`#55d3c2`)       |
| `--primitive-blue`         | ブルー (`#00c1e5`)       |
| `--primitive-navy`         | ネイビー (`#103972`)     |
| `--primitive-red`          | レッド (`#fd7045`)       |
| `--primitive-light-blue`   | 薄いブルー (`#edfcff`)   |
| `--primitive-light-yellow` | 薄いイエロー (`#fffae9`) |
| `--primitive-light-cyan`   | 薄いシアン (`#eefffd`)   |

### セマンティックカラー（表面・背景）

| 変数名                                        | 用途                     |
| --------------------------------------------- | ------------------------ |
| `--surface-primary`                           | メイン背景               |
| `--surface-secondary`                         | サブ背景                 |
| `--surface-disabled`                          | 無効状態の背景           |
| `--surface-primary-dark`                      | ダーク用メイン（赤）     |
| `--surface-secondary-dark`                    | ダーク用サブ（ネイビー） |
| `--surface-room-a` / `--surface-room-a-light` | ルーム A 用              |
| `--surface-room-b` / `--surface-room-b-light` | ルーム B 用              |

### テキストカラー

| 変数名             | 用途                   |
| ------------------ | ---------------------- |
| `--text-primary`   | 本文                   |
| `--text-secondary` | サブテキスト           |
| `--text-on-fill`   | ボタン等の上に乗る文字 |
| `--text-accent`    | アクセント（青）       |
| `--text-accent2`   | アクセント2（赤）      |

### 角丸（radius）

| 変数名                | 用途                         |
| --------------------- | ---------------------------- |
| `--radius-section`    | セクション（PC: 80px）       |
| `--radius-section-sp` | セクション（SP: 80px）       |
| `--radius-button`     | ボタン（ピル型 999px）       |
| `--radius-objects`    | カード等オブジェクト（16px） |

### 余白（space）

| 変数名         | 値    |
| -------------- | ----- |
| `--space-xxxs` | 4px   |
| `--space-xxs`  | 8px   |
| `--space-xs`   | 16px  |
| `--space-s`    | 24px  |
| `--space-m`    | 40px  |
| `--space-l`    | 80px  |
| `--space-xl`   | 120px |

### ワイヤーフレーム用（開発時）

| 変数名                    | 用途   |
| ------------------------- | ------ |
| `--wireframe-gray`        | グレー |
| `--wireframe-black`       | 黒     |
| `--wireframe-background`  | 背景1  |
| `--wireframe-background2` | 背景2  |

---

## 使用例

### コンポーネントでトークンを使う

```astro
---
// src/components/Button.astro
---

<button class="my-button">送信</button>

<style>
  .my-button {
    background: var(--surface-room-a);
    color: var(--text-on-fill);
    padding: var(--space-xxs) var(--space-s);
    border-radius: var(--radius-button);
    font-family: inherit;
  }
</style>
```

### セクションの背景と余白

```css
.section {
  background: var(--surface-secondary);
  padding: var(--space-l) var(--space-m);
  border-radius: var(--radius-section);
}
```

---

## テキスト用ユーティリティクラス

グローバルスタイルでは、以下のクラスが定義されています。要素に `class` で指定して使います。

### 本文

| クラス名                   | サイズ | 太さ   | 行間 |
| -------------------------- | ------ | ------ | ---- |
| `.text-body-large`         | 16px   | normal | 1.75 |
| `.text-body-large-strong`  | 16px   | bold   | 1.75 |
| `.text-body-medium`        | 14px   | normal | 1.75 |
| `.text-body-medium-strong` | 14px   | bold   | 1.75 |
| `.text-body-small`         | 12px   | normal | 1.75 |
| `.text-body-small-strong`  | 12px   | bold   | 1.75 |

### 見出し・タイトル

| クラス名              | サイズ（PC） | サイズ（SP 768px以下） |
| --------------------- | ------------ | ---------------------- |
| `.text-section-title` | 48px bold    | 32px bold              |
| `.text-page-title`    | 68px bold    | 40px bold（Barlow）    |
| `.text-h4`            | 24px bold    | 20px bold              |
| `.text-h5`            | 20px bold    | 20px bold              |

### 使用例

```html
<h1 class="text-page-title">Go Conference 2026</h1>
<h2 class="text-section-title">プログラム</h2>
<p class="text-body-large">本文テキストです。</p>
<span class="text-body-small">補足やキャプション</span>
```

---

## フォント

- **本文・UI:** Noto Sans JP（`@fontsource-variable/noto-sans-jp`）
- **SP のページタイトル:** Barlow（`@fontsource/barlow`）

`body` には `font-family: "Noto Sans JP", sans-serif` が指定されているため、特に指定しなければ Noto Sans JP が継承されます。Barlow を使う場合は `font-family: "Barlow", sans-serif` を指定してください。

---

## トークンの追加・変更

新しいトークンやユーティリティクラスを追加する場合は、`src/components/GlobalStyles.astro` を編集します。

- **プリミティブは極力増やさず**、既存のプリミティブを組み合わせたセマンティックトークン（`--surface-*`, `--text-*`）を追加することを推奨します。
- レスポンシブで変えたい値は、`@media` 内で上書きするか、トークン自体をメディアクエリ内で再定義してください。
- 変更後はこのドキュメント（`docs/global-styles.md`）も更新してください。
