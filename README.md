# Honda Motor Sales Group Website

ホンダ自動車販売グループのコーポレート Web サイト

## 🌐 Live Demo

GitHub Pages: [https://YOUR_GITHUB_USERNAME.github.io/honda-ms.jp/](https://YOUR_GITHUB_USERNAME.github.io/honda-ms.jp/)

## 🚀 Features

- **レスポンシブデザイン**: モバイル、タブレット、デスクトップ対応
- **ハンバーガーメニュー**: SVG ベースの滑らかなアニメーション
- **段階的アニメーション**: 背景スライド → コンテンツフェード
- **Swiper.js**: ヒーローセクションのスライダー
- **GSAP**: テキストアニメーション
- **セマンティック HTML**: アクセシビリティ対応

## 📁 Project Structure

```
honda-ms.jp/
├── index.html              # メインHTML
├── css/
│   ├── destyle.css        # リセットスタイル
│   ├── destyle.css.map
│   ├── style.css          # 共通スタイル
│   └── style.css.map
├── scss/                   # 開発用SCSS
├── js/                     # サイト共通JavaScript
│   ├── index-page.js
│   ├── menu-control.js
│   ├── hero-swiper.js
│   └── ...                # その他スクリプト
├── assets/
│   ├── css/               # 外部ライブラリCSS
│   └── js/                # 外部ライブラリJS
├── images/                 # 画像ファイル
└── docs/                   # 開発ドキュメント
    └── menu-system-algorithm.md  # メニュー実装ガイド
```

## 🛠️ Development

### セットアップ

```bash
git clone https://github.com/YOUR_USERNAME/honda-ms.jp.git
cd honda-ms.jp
```

### SCSS コンパイル

```bash
npm install
npm run build:css
```

### ローカル開発

```bash
# Pythonを使用
python -m http.server 8000

# Node.jsを使用
npx http-server -p 8000
```

## 🎨 Design System

### カラーパレット

- **Honda Red**: #DC143C
- **Base Color 1**: #333333
- **Base Color 2**: #DC143C
- **White**: #FFFFFF

### ブレークポイント

- **Mobile**: ~767px
- **Tablet**: 768px~1023px
- **Desktop**: 1024px~

### フォント

- **Noto Sans JP**: UI 用フォント
- **Noto Serif JP**: 見出し用フォント
- **Inter**: 英数字用フォント

## 📱 Responsive Behavior

### メニューシステム

- **スマホ (≤767px)**: ハンバーガー ⇔ × ボタン切り替え
- **タブレット以上 (≥768px)**: ヘッダーボタン固定、ナビ内に × ボタン

### アニメーション

- **開く**: 背景スライド(0.3s) → 200ms 待機 → コンテンツフェード(0.4s)
- **閉じる**: コンテンツフェード(0.4s) → 200ms 待機 → 背景スライド(0.3s)

## 🧩 Components

### 共通コンポーネント

- **SectionTitle**: セクションタイトル (`--red`, `--white`)
- **PrimaryButton**: プライマリボタン (`--white`, `--dark`)

### ページ固有セクション

- **Header**: 固定ヘッダー + メニュー
- **Hero**: スライダー + テキストアニメーション
- **Mission**: 企業理念セクション
- **Recruit**: 採用情報セクション
- **News**: お知らせセクション
- **Service**: 事業領域セクション
- **Footer**: フッター

## 🔧 Customization

カスタマイズ方法は `docs/menu-system-algorithm.md` を参照してください。

## 📄 License

© Honda Motor Sales Group. All rights reserved.
