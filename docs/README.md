# プロジェクトドキュメント

このディレクトリでは、納品物の構成と各ファイルの役割をまとめています。開発では SCSS を使用しましたが、クライアント側ではコンパイル済みの CSS と JavaScript を編集していただく想定です。

## ファイル構成

```text
honda-ms.jp/
├── index.html                # トップページ
├── pages/                    # 下層ページ群
│   ├── about.html
│   ├── mission.html
│   ├── news.html
│   ├── news-details.html
│   ├── recruit.html
│   ├── service.html
│   └── 404.html
├── css/                      # コンパイル済みCSS
│   ├── destyle.css           # リセットスタイル
│   ├── destyle.css.map       # 上記の sourcemap
│   ├── style.css             # サイト共通スタイル
│   └── style.css.map         # 上記の sourcemap
├── js/                       # サイト共通JavaScript
│   ├── index-page.js         # トップページ初期化
│   ├── hero-swiper.js        # ヒーロースライダー
│   ├── philosophy-swiper.js  # 企業理念スライダー
│   ├── text-animation.js     # テキストアニメーション
│   ├── menu-control.js       # ナビゲーション制御
│   ├── loading-screen-controller.js
│   ├── font-loader.js
│   ├── first-visit-detector.js
│   ├── scroll-fade.js
│   └── error-404-redirect.js
├── assets/                   # 外部ライブラリ
│   ├── css/swiper-bundle.min.css
│   └── js/
│       ├── swiper-bundle.min.js
│       ├── gsap.min.js
│       └── cssua.js
├── images/                   # 画像アセット
├── scss/                     # 開発用SCSS(納品時は不要)
└── docs/                     # ドキュメント
    ├── components.md
    ├── components 2.md
    ├── menu-system-algorithm.md
    └── README.md             # このファイル
```

## 仕様メモ

- HTML と JavaScript、CSS を納品対象としています。SCSS ファイルは開発用のためクライアントには不要です。
- JavaScript は ES5 ベースでモジュール化せずに読み込む構成です。
- CSS は `destyle.css` と `style.css` の 2 ファイルに集約されています。サイトのスタイル調整は `css/style.css` を直接編集してください。
- 画像やライブラリファイルは `images` と `assets` ディレクトリで管理しています。

以上がサイト一式の概要です。詳細なコンポーネント構成やメニュー挙動については、同ディレクトリ内のその他ドキュメントを参照してください。
