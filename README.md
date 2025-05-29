# Honda Motor Sports Website

白鷺 CMS 移植対応版の静的サイトです。

## プロジェクト概要

- **フレームワーク**: なし（純粋な HTML/CSS/JavaScript）
- **スタイル**: SCSS → CSS（Live Sass Compiler 使用）
- **スライダー**: Swiper.js
- **アニメーション**: GSAP
- **フォント**: Google Fonts

## ファイル構成

```
honda-ms.jp/
├── index.html              # トップページ（ルート配置）
├── pages/                  # その他ページ別HTML管理
│   └── about.html          # 会社概要ページ
├── config/
│   ├── site-config.js      # サイト設定（CMS移植時重要）
│   └── pages/              # ページ別設定
│       ├── index.js        # トップページ設定
│       └── about.js        # 会社概要設定
├── css/
│   ├── style.css           # 共通スタイル（コンパイル済み）
│   └── pages/              # ページ別CSS（コンパイル済み）
│       ├── index.css       # トップページ専用
│       └── about.css       # 会社概要専用
├── scss/                   # SCSS ソースファイル（極限統合型）
│   ├── style.scss          # 共通基盤（背景コンポーネント含む）
│   ├── abstracts/          # 統合レイヤー
│   │   └── _variables.scss # 変数・関数・mixins統合版
│   ├── base/               # 統合レイヤー
│   │   └── _destyle.scss   # リセット・レイアウト・フォント統合版
│   └── pages/              # ページ別完全自己完結型
│       ├── index.scss      # トップページ（全セクション・アニメーション統合）
│       └── about.scss      # 会社概要（全セクション統合）
├── js/
│   ├── index.js            # トップページ専用（完全統合版 - アニメーション・Swiper統合）
│   └── about.js            # 会社概要専用（完全自己完結版）
├── images/                 # 画像ファイル
│   ├── common/             # 共通画像
│   ├── index/              # トップページ画像
│   └── about/              # 会社概要画像
├── docs/
│   └── components.md       # マルチページ構成詳細
└── README.md               # このファイル
```

## 開発環境

### 必要なツール

- Live Sass Compiler (VS Code 拡張機能)
- Node.js (npm 依存関係管理用)

### 依存関係

```bash
npm install
```

## SCSS 構成の特徴

### 極限統合型アーキテクチャ

- **極簡素化**: 最小限のファイル数で最大の効率
- **Page-Centric**: ページごとに完全自己完結
- **1 ページ = 1CSS ファイル**: CMS 移植時の明確な対応関係

### 統合されたレイヤー

1. **abstracts/\_variables.scss**: 変数・関数・mixins 統合（93 行）
2. **base/\_destyle.scss**: リセット・レイアウト・フォント統合（465 行）
3. **pages/index.scss**: 全セクション・アニメーション・コンポーネント統合（547 行）
4. **pages/about.scss**: 会社概要用完全自己完結（50 行）
5. **style.scss**: 共通基盤・背景コンポーネント統合（60 行）

### CMS 移植時のメリット

1. **明確な対応関係**: 1HTML ページ ↔ 1SCSS ファイル ↔ 1CSS ファイル
2. **簡素な構造**: ファイル探しに迷わない
3. **自己完結性**: 各ページのスタイルが独立
4. **効率的保守**: 変更箇所が明確

## 開発フロー

### 新セクション追加

```bash
# 1. HTMLに新セクション追加
# 2. scss/pages/index.scss に直接スタイル記述
# 3. コンパイル実行
npx sass scss/pages/index.scss css/pages/index.css
```

### 新ページ追加

```bash
# 1. pages/contact.html 作成
# 2. scss/pages/contact.scss 作成（完全自己完結型）
# 3. コンパイル実行
npx sass scss/pages/contact.scss css/pages/contact.css
```

### 共通要素変更

```scss
// 変数・関数・mixins変更
scss/abstracts/_variables.scss

// 背景・共通コンポーネント変更
scss/style.scss
```

## JavaScript 構成の方針

### インライン維持

- **フォント読み込み検知**: 性能重視で head 内インライン
- **理由**: FOUT（Flash of Unstyled Text）防止のため

### Page-Centric 統合型

- **トップページ**: `js/index.js` - テキストアニメーション・Swiper 完全統合（124 行）
- **会社概要**: `js/about.js` - 完全自己完結型（将来拡張用）
- **理由**: 1 ページ = 1JS ファイルで保守性向上・CMS 移植時の明確な対応関係

## CMS 移植準備

### 1. 極限シンプル構造

最小限のファイル構成で迷いのない開発フロー

### 2. 明確な対応関係

- `index.html` ↔ `scss/pages/index.scss` ↔ `css/pages/index.css`
- `pages/about.html` ↔ `scss/pages/about.scss` ↔ `css/pages/about.css`

### 3. 設定外部化済み

主要な設定値は `config/site-config.js` に集約されています。

### 4. JavaScript 統合済み

Page-Centric 型で JavaScript ファイルが統合されています。

## 設定変更方法

### アニメーション速度変更

```javascript
// config/site-config.js
hero: {
  textAnimation: {
    line1Stagger: 0.12,  // この値を変更
    line2Stagger: 0.14   // この値を変更
  }
}
```

### スライダー設定変更

```javascript
// config/site-config.js
hero: {
  swiper: {
    autoplayDelay: 5000, // この値を変更
    fadeSpeed: 2500      // この値を変更
  }
}
```

### スタイル変更

```scss
// scss/pages/index.scss
// 該当セクションのスタイルを直接変更
// 例: .hero-section, .mission-section など
```

## 白鷺 CMS 移植時のポイント

1. **設定の動的化**: `config/site-config.js` の値を管理画面から変更可能に
2. **画像パスの動的化**: ハードコードされた画像パスを CMS の画像管理機能と連携
3. **テキスト内容の動的化**: ハードコードされたテキストを CMS のフィールドと連携
4. **JavaScript の読み込み順序維持**: 設定 → ライブラリ → コンポーネント の順序を保持
5. **1 対 1 の明確な対応**: HTML ページ ↔ SCSS ファイル ↔ CSS ファイルの関係維持
6. **統合型スタイル管理**: 各ページのスタイルが 1 ファイルに集約され保守しやすい

## アーキテクチャ設計思想

### YAGNI 原則採用

「必要になるまで作らない」原則に基づき、過度な抽象化を排除

### Page-Centric 設計

ページを中心とした開発フローで最大の効率を実現

### 極限統合型

関連性の高い要素を積極的に統合し、ファイル数を最小限に抑制

詳細は `docs/components.md` を参照してください。
