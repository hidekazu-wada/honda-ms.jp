# 極限統合型マルチページサイト構成ドキュメント

## ファイル構成（現在の実装）

```
honda-ms.jp/
├── index.html             # トップページ（ルート配置）
├── pages/                 # その他ページ別HTML管理
│   └── about.html         # 会社概要
├── css/                   # コンパイル済みCSS
│   ├── style.css          # 共通基盤（背景コンポーネント含む）
│   └── pages/             # ページ別CSS（自動生成）
│       ├── index.css      # トップページ専用（547行の統合CSS）
│       └── about.css      # 会社概要専用（50行）
├── scss/                  # SCSS ソースファイル（極限統合型）
│   ├── style.scss         # 共通基盤（60行）- 背景コンポーネント含む
│   ├── abstracts/         # 統合レイヤー
│   │   └── _variables.scss # 変数・関数・mixins統合版（93行）
│   ├── base/              # 統合レイヤー
│   │   └── _destyle.scss  # リセット・レイアウト・フォント統合版（465行）
│   └── pages/             # ページ別完全自己完結型
│       ├── index.scss     # トップページ（547行）- 全セクション・アニメーション統合
│       └── about.scss     # 会社概要（50行）- 完全自己完結
├── js/
│   ├── index.js           # トップページ専用（完全統合版 - アニメーション・Swiper統合）
│   └── about.js           # 会社概要専用（完全自己完結版）
├── images/
│   ├── common/            # 共通画像（ロゴ、アイコン等）
│   ├── index/             # トップページ画像
│   └── about/             # 会社概要画像
└── docs/
    └── components.md      # このファイル
```

## アーキテクチャの設計思想

### YAGNI 原則（You Aren't Gonna Need It）

「必要になるまで作らない」原則を採用し、過度な抽象化を排除

### Page-Centric 設計

ページを中心とした開発フローで最大の効率を実現

### 極限統合型

関連性の高い要素を積極的に統合し、ファイル数を最小限に抑制

## 統合されたアーキテクチャの特徴

### 1. 明確な対応関係

```
HTMLページ ↔ SCSSファイル ↔ CSSファイル ↔ JavaScriptファイル（1:1:1:1）

index.html ↔ scss/pages/index.scss ↔ css/pages/index.css ↔ js/index.js
about.html ↔ scss/pages/about.scss ↔ css/pages/about.css ↔ js/about.js
```

### 2. 完全自己完結型ページファイル

#### index.scss（547 行）+ index.js（124 行）の統合構成

**SCSS ファイル:**

- **アニメーション定義**: hero-zoom-out 等
- **ミッションセクション**: .mission-section
- **共通コンポーネント**: .section-title, .primary-button
- **ヒーローセクション**: .hero-section
- **完全なレスポンシブ対応**: spx(), ppx(), タブレット・デスクトップ対応

**JavaScript ファイル:**

- **テキストアニメーション**: 1 文字ずつ表示・GSAP 統合
- **Swiper スライダー**: フェード効果・自動再生・ページネーション
- **設定値管理**: 各 JavaScript ファイル内に記載

#### about.scss（50 行）+ about.js（24 行）の統合構成

**SCSS ファイル:**

- **ページ固有 body 設定**: body.page-about
- **ヘッダーセクション**: .about-header
- **将来拡張エリア**: コメントで予約済み

**JavaScript ファイル:**

- **将来拡張用**: 現在は基本的な初期化のみ
- **拡張予定**: スムーススクロール・アニメーション・フォーム処理等

### 3. 最小限の共通ファイル

#### style.scss（60 行）- 共通基盤

```scss
// 1. 変数・関数・mixins読み込み
@use './abstracts/variables' as *;

// 2. CSSリセット・基本設定読み込み
@use './base/destyle';

// 3. 背景コンポーネント（インライン）
.bg-wrapper {
  // 背景画像管理
}
```

#### \_variables.scss（93 行）- 統合レイヤー

```scss
// 1. VARIABLES（デザインカンプサイズ、ブレイクポイント、カラー、フォント）
// 2. FUNCTIONS（ppx(), tpx(), spx()）
// 3. MIXINS（tablet-up, desktop-up, hover）
```

#### \_destyle.scss（465 行）- 統合レイヤー

```scss
// 1. destyle.css v4.0.1 ベース
// 2. カスタムbody設定（背景画像、フォント、ローディング状態）
// 3. 基本レイアウト・タイポグラフィ設定
```

## 開発ワークフロー

### 新セクション追加（既存ページ）

```bash
# 1. HTMLに新セクション追加（例: index.html）
<!-- NEW SECTION: News -->
<section class="news-section">
  <!-- 新セクションの内容 -->
</section>

# 2. scss/pages/index.scss に直接スタイル追記
.news-section {
    // 新セクションのスタイルを直接記述
    // レスポンシブ対応も含めて完結
}

# 3. Live Sass Compiler で自動コンパイル
# または手動コンパイル
npx sass scss/pages/index.scss css/pages/index.css
```

### 新ページ追加

```bash
# 1. HTMLページ作成
pages/services.html

# 2. 完全自己完結型SCSSファイル作成
scss/pages/services.scss

# 3. 必要に応じてページ設定作成

# 4. コンパイル実行
npx sass scss/pages/services.scss css/pages/services.css
```

### 共通要素変更

```bash
# 変数・関数・mixins変更
scss/abstracts/_variables.scss

# 背景・共通コンポーネント変更
scss/style.scss

# 全ページに影響するため注意
```

## CMS 移植時のメリット

### 1. 明快な移植マッピング

```erb
<!-- トップページテンプレート -->
<%= stylesheet_link_tag 'application' %>      <!-- style.css -->
<%= stylesheet_link_tag 'pages/index' %>      <!-- pages/index.css -->

<!-- 会社概要テンプレート -->
<%= stylesheet_link_tag 'application' %>      <!-- style.css -->
<%= stylesheet_link_tag 'pages/about' %>      <!-- pages/about.css -->
```

### 2. ページ別データ管理の簡潔性

```ruby
# pages_controller.rb
def index
  # index.scss の全セクション対応
  @hero_slides = HeroSlide.published.ordered
  @mission_content = MissionContent.current
end

def about
  # about.scss の全セクション対応
  @about_content = AboutContent.current
end
```

### 3. 段階的移植の容易性

```bash
# フェーズ1: 共通基盤移植
scss/style.scss → app/assets/stylesheets/application.scss
scss/abstracts/_variables.scss → app/assets/stylesheets/abstracts/
scss/base/_destyle.scss → app/assets/stylesheets/base/

# フェーズ2: ページ別移植（独立実行可能）
scss/pages/index.scss → app/assets/stylesheets/pages/index.scss
scss/pages/about.scss → app/assets/stylesheets/pages/about.scss
```

## パフォーマンス特性

### 1. CSS サイズ最適化

- **共通 CSS**: 約 15KB（style.css）
- **トップページ CSS**: 約 20KB（pages/index.css）
- **会社概要 CSS**: 約 3KB（pages/about.css）

### 2. 開発効率性

- **ファイル探し時間**: ゼロ（明確な 1:1 対応）
- **変更影響範囲**: 明確（ページ別完全分離）
- **新規開発**: 高速（テンプレートパターン確立）

## Live Sass Compiler 設定

### 現在の最適化設定

```json
// .vscode/settings.json
{
  "liveSassCompile.settings.formats": [
    {
      "format": "expanded",
      "extensionName": ".css",
      "savePath": "/css",
      "savePathReplacementPairs": {
        "/scss/pages/": "/css/pages/",
        "/scss/": "/css/"
      }
    }
  ],
  "liveSassCompile.settings.includeItems": [
    "/scss/style.scss",
    "/scss/pages/**/*.scss"
  ]
}
```

### コンパイル結果

```
scss/style.scss → css/style.css
scss/pages/index.scss → css/pages/index.css
scss/pages/about.scss → css/pages/about.css
```

## スケーラビリティ

### ファイル数の予測

```
10ページサイト:
- SCSS: 13ファイル（共通3 + ページ10）
- CSS: 11ファイル（共通1 + ページ10）

50ページサイト:
- SCSS: 53ファイル（共通3 + ページ50）
- CSS: 51ファイル（共通1 + ページ50）
```

### メンテナンス性

- **局所性**: 変更は該当ページファイルのみ
- **予測性**: ファイル構造が常に一定
- **独立性**: ページ間の依存関係ゼロ

この極限統合型アーキテクチャにより、100 ページ規模のサイトでも効率的な開発と CMS 移植が可能になります。
