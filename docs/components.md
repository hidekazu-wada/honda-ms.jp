# マルチページサイト構成ドキュメント

## ファイル構成

```
honda-ms.jp/
├── index.html             # トップページ（ルート配置）
├── pages/                 # その他ページ別HTML管理
│   ├── about.html         # 会社概要
│   ├── services.html      # サービス一覧（将来）
│   └── contact.html       # お問い合わせ（将来）
├── config/
│   ├── site-config.js     # サイト全体設定
│   └── pages/             # ページ別設定
│       ├── index.js       # トップページ設定
│       ├── about.js       # 会社概要設定
│       └── services.js    # サービス設定（将来）
├── css/                   # コンパイル済みCSS
│   ├── style.css          # 共通スタイル
│   └── pages/             # ページ別CSS（自動生成）
│       ├── index.css      # トップページ専用
│       └── about.css      # 会社概要専用
├── scss/                  # SCSS ソースファイル（新構造）
│   ├── style.scss         # 共通スタイルのエントリーポイント
│   ├── abstracts/         # 抽象化レイヤー
│   │   ├── _variables.scss # 変数定義
│   │   ├── _functions.scss # 関数定義
│   │   └── _mixins.scss   # mixin定義
│   ├── base/              # ベースレイヤー
│   │   ├── _destyle.scss  # CSSリセット
│   │   ├── _typography.scss # フォント基本設定
│   │   └── _layout.scss   # レイアウト基本設定
│   ├── layout/            # 共通レイアウト
│   │   ├── _header.scss   # ヘッダー（将来実装）
│   │   ├── _footer.scss   # フッター（将来実装）
│   │   └── _navigation.scss # ナビゲーション（将来実装）
│   ├── components/        # コンポーネントレイヤー
│   │   ├── common/        # 共通コンポーネント
│   │   │   ├── _background.scss # 背景コンポーネント
│   │   │   ├── _buttons.scss    # ボタン（将来）
│   │   │   └── _forms.scss      # フォーム（将来）
│   │   └── pages/         # ページ固有コンポーネント
│   │       ├── _hero.scss # トップページ専用ヒーロー
│   │       ├── _about.scss # 会社概要専用（将来）
│   │       └── _services.scss # サービス専用（将来）
│   ├── pages/             # ページ別メインSCSS
│   │   ├── index.scss     # トップページスタイル
│   │   ├── about.scss     # 会社概要スタイル（将来）
│   │   └── services.scss  # サービススタイル（将来）
│   └── _animations.scss   # アニメーション定義
├── js/
│   ├── common/            # 共通機能（将来）
│   │   ├── site-init.js   # サイト初期化
│   │   └── utils.js       # ユーティリティ
│   ├── components/        # コンポーネント別
│   │   ├── common/        # 共通コンポーネント（将来）
│   │   └── pages/         # ページ固有（将来）
│   └── pages/             # ページ別メインJS
│       ├── index.js       # トップページJS（将来）
│       └── about.js       # 会社概要JS（将来）
├── images/
│   ├── common/            # 共通画像（ロゴ、アイコン等）
│   ├── index/             # トップページ画像
│   ├── about/             # 会社概要画像
│   ├── services/          # サービス画像
│   └── contact/           # お問い合わせ画像
└── docs/
    └── components.md      # このファイル
```

## アーキテクチャの特徴

### 1. 共通 vs ページ固有の明確な分離

#### 共通要素

- **SCSS**: `style.scss` - 全ページで読み込み
- **JavaScript**: サイト全体設定、フォント読み込み
- **コンポーネント**: 背景、ヘッダー、フッター等

#### ページ固有要素

- **SCSS**: `pages/[page-name].scss` - 各ページで個別読み込み
- **JavaScript**: `pages/[page-name].js` - 各ページで個別読み込み
- **設定**: `config/pages/[page-name].js` - ページ別設定

### 2. スケーラブルな構造

#### 新ページ追加時の手順

```bash
# 1. ページHTMLを作成（index.html以外はpages/ディレクトリに配置）
pages/services.html

# 2. ページ別SCSS作成
scss/pages/services.scss

# 3. ページ別設定作成
config/pages/services.js

# 4. ページ別JavaScript作成（必要に応じて）
js/pages/services.js

# 5. ページ固有コンポーネント作成（必要に応じて）
scss/components/pages/_services.scss
```

**注意**: `index.html`は特別にルートディレクトリに配置され、他のページは`pages/`ディレクトリで管理されます。

## CMS 移植時のメリット

### 1. ページテンプレート管理

```erb
<!-- トップページテンプレート -->
<%= render 'layouts/application' do %>
  <%= render 'pages/index' %>
<% end %>

<!-- 会社概要テンプレート -->
<%= render 'layouts/application' do %>
  <%= render 'pages/about' %>
<% end %>
```

### 2. 共通パーツの再利用

```erb
<!-- 共通レイアウト -->
<%= render 'shared/header' %>
<%= render 'shared/background' %>
<%= yield %>
<%= render 'shared/footer' %>
```

### 3. ページ別データ管理

```ruby
# pages_controller.rb
def index
  @hero_slides = HeroSlide.published.ordered
  @hero_content = HeroContent.current
end

def about
  @about_content = AboutContent.current
  @company_info = CompanyInfo.current
end
```

### 4. アセット管理の最適化

```erb
<!-- 共通CSS -->
<%= stylesheet_link_tag 'application' %>

<!-- ページ固有CSS -->
<%= stylesheet_link_tag "pages/#{controller_name}" if asset_exists?("pages/#{controller_name}.css") %>

<!-- ページ固有JavaScript -->
<%= javascript_include_tag "pages/#{controller_name}" if asset_exists?("pages/#{controller_name}.js") %>
```

## 開発・運用のワークフロー

### 1. 新ページ開発時

1. **共通要素の確認**: 既存の共通コンポーネントを活用
2. **ページ固有要素の特定**: 新しく作る必要があるコンポーネント
3. **段階的実装**: 共通 → ページ固有 → 統合テスト

### 2. CMS 移植時

1. **共通パーツの移植**: ヘッダー、フッター、背景等
2. **ページテンプレートの作成**: 各ページの ERB テンプレート
3. **データモデルの実装**: ページ別のコンテンツ管理
4. **段階的リリース**: ページ単位での CMS 化

## Live Sass Compiler 設定

### 複数ファイルコンパイル対応

```json
// .vscode/settings.json
{
  "liveSassCompile.settings.formats": [
    {
      "format": "expanded",
      "extensionName": ".css",
      "savePath": "/css"
    }
  ],
  "liveSassCompile.settings.includeItems": [
    "/scss/style.scss",
    "/scss/pages/**/*.scss"
  ]
}
```

この構造により、数十ページ規模のサイトでも効率的な開発と CMS 移植が可能になります。
