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
├── scss/                   # SCSS ソースファイル（コンポーネント駆動型）
│   ├── style.scss          # 共通スタイルエントリーポイント
│   ├── abstracts/          # 抽象化レイヤー（変数、関数、mixins）
│   ├── base/               # ベースレイヤー（リセット、基本設定）
│   ├── layout/             # レイアウトコンポーネント（header、footer等）
│   ├── components/         # コンポーネントレイヤー（個別機能）
│   │   ├── common/         # 共通コンポーネント
│   │   └── pages/          # ページ固有コンポーネント
│   └── pages/              # ページ別メインSCSS
│       ├── index.scss      # トップページスタイル
│       └── about.scss      # 会社概要スタイル
├── js/
│   ├── components/         # コンポーネント別JavaScriptファイル
│   │   ├── text-animation.js  # テキストアニメーション機能
│   │   └── hero-swiper.js     # Swiperスライダー初期化
│   └── pages/              # ページ別JavaScript
│       ├── index.js        # トップページJS（将来）
│       └── about.js        # 会社概要JS（将来）
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

### コンポーネント駆動型アーキテクチャ

- **Abstracts Layer**: 変数、関数、mixins の抽象化
- **Base Layer**: リセットと基本設定
- **Components Layer**: 機能別コンポーネント

### CMS 移植時のメリット

1. **ファイル単位での修正**: 特定コンポーネントのみ変更可能
2. **独立性**: 各コンポーネントが他に影響しない
3. **段階的移植**: コンポーネント単位で順次 CMS 化可能

## JavaScript 構成の方針

### インライン維持

- **フォント読み込み検知**: 性能重視で head 内インライン
- **理由**: FOUT（Flash of Unstyled Text）防止のため

### 外部ファイル化

- **テキストアニメーション**: `js/components/text-animation.js`
- **Swiper スライダー**: `js/components/hero-swiper.js`
- **理由**: CMS 移植時のコンポーネント分離を容易にするため

## CMS 移植準備

### 1. コンポーネント分離済み

HTML ファイル内でコメントによりコンポーネントが明確に分離されています。

### 2. 設定外部化済み

主要な設定値は `config/site-config.js` に集約されています。

### 3. JavaScript 分離済み

コンポーネント単位で JavaScript ファイルが分離されています。

### 4. SCSS 構造化済み

コンポーネント駆動型 SCSS アーキテクチャで管理されています。

### 5. ドキュメント完備

- コンポーネント構成: `docs/components.md`
- 依存関係と設定項目の詳細記載

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
// scss/components/_hero.scss
// ヒーローセクションのスタイルのみ変更
```

## 白鷺 CMS 移植時のポイント

1. **設定の動的化**: `config/site-config.js` の値を管理画面から変更可能に
2. **画像パスの動的化**: ハードコードされた画像パスを CMS の画像管理機能と連携
3. **テキスト内容の動的化**: ハードコードされたテキストを CMS のフィールドと連携
4. **JavaScript の読み込み順序維持**: 設定 → ライブラリ → コンポーネント の順序を保持
5. **コンポーネント別管理**: 各コンポーネントの HTML、CSS、JS ファイルを個別に管理可能
6. **SCSS 段階的移植**: コンポーネント単位でスタイルの移植が可能

詳細は `docs/components.md` を参照してください。
