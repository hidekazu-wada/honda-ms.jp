# レスポンシブメニューシステム実装ガイド（生成 AI 用プロンプト）

## 📖 実装目標

以下の機能を持つレスポンシブメニューシステムを作成してください：

1. **ハンバーガーメニュー ⇔ × ボタンの切り替え**
2. **段階的アニメーション演出**（背景スライド → コンテンツフェード）
3. **レスポンシブ対応**（スマホとタブレット/デスクトップで動作を分岐）
4. **SVG ベースのアイコン切り替え**（CSS アニメーションではなく）

---

## 🏗️ ファイル構成

```
project/
├── index.html          # メインHTML
├── css/
│   └── style.css      # スタイル
└── js/
    └── menu.js        # メニュー制御
```

---

## 📄 HTML ファイル (index.html)

### ヘッダー部分

```html
<header class="header">
  <div class="header__inner">
    <div class="header__logo">
      <img src="logo.png" alt="Logo" class="header__logo-image" />
    </div>

    <!-- メニューボタン -->
    <button
      class="header__menu-trigger"
      type="button"
      aria-expanded="false"
      aria-label="メニューを開く"
    >
      <span class="header__menu-icon">
        <!-- ハンバーガーSVG -->
        <svg
          class="header__menu-hamburger"
          xmlns="http://www.w3.org/2000/svg"
          width="68"
          height="42"
          viewBox="0 0 68 42"
          fill="none"
        >
          <path
            d="M0 2H68"
            stroke="red"
            stroke-width="4"
            stroke-linejoin="round"
          />
          <path
            d="M0 21H68"
            stroke="red"
            stroke-width="4"
            stroke-linejoin="round"
          />
          <path
            d="M0 40H68"
            stroke="red"
            stroke-width="4"
            stroke-linejoin="round"
          />
        </svg>

        <!-- ×ボタンSVG -->
        <svg
          class="header__menu-close"
          xmlns="http://www.w3.org/2000/svg"
          width="68"
          height="42"
          viewBox="0 0 68 42"
          fill="none"
        >
          <path
            d="M1.52393 39.7505L66.4758 2.25049"
            stroke="red"
            stroke-width="5"
            stroke-linejoin="round"
          />
          <path
            d="M1.52393 2.25049L66.4758 39.7505"
            stroke="red"
            stroke-width="5"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      <span class="header__menu-text"></span>
    </button>
  </div>
</header>
```

### グローバルナビゲーション部分

```html
<nav class="global-nav">
  <div class="global-nav__inner">
    <!-- 閉じるボタン（タブレット/デスクトップ用） -->
    <button
      class="global-nav__close"
      type="button"
      aria-label="メニューを閉じる"
    >
      <div class="global-nav__close-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="68"
          height="42"
          viewBox="0 0 68 42"
          fill="none"
        >
          <path
            d="M1.52393 39.7505L66.4758 2.25049"
            stroke="white"
            stroke-width="5"
            stroke-linejoin="round"
          />
          <path
            d="M1.52393 2.25049L66.4758 39.7505"
            stroke="white"
            stroke-width="5"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <span class="global-nav__close-text"></span>
    </button>

    <!-- メニューコンテンツ -->
    <div class="global-nav__content">
      <ul class="global-nav__list">
        <li class="global-nav__item">
          <a href="#" class="global-nav__link">TOP</a>
        </li>
        <li class="global-nav__item">
          <a href="#" class="global-nav__link">企業理念</a>
        </li>
        <li class="global-nav__item">
          <a href="#" class="global-nav__link">事業内容</a>
        </li>
        <!-- 他のメニュー項目 -->
      </ul>
    </div>
  </div>
</nav>
```

### body 要素への状態クラス適用

```html
<body class="is-loading">
  <!-- 上記のheader, navが入る -->
</body>
```

---

## 🎨 CSS ファイル (css/style.css)

### ヘッダースタイル

```css
/* ヘッダー固定配置 */
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 120px;
  background-color: white;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 60px;
}

/* メニューボタン */
.header__menu-trigger {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
  font-family: sans-serif;
}

/* SVGアイコンコンテナ */
.header__menu-icon {
  position: relative;
  width: 24px;
  height: 24px;
}

.header__menu-icon svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: opacity 0.3s ease;
}

/* SVG切り替え（スマホ用） */
.header__menu-hamburger {
  opacity: 1;
}

.header__menu-close {
  opacity: 0;
}

.is-active .header__menu-hamburger {
  opacity: 0;
}

.is-active .header__menu-close {
  opacity: 1;
}

/* タブレット以上では切り替えを無効化 */
@media (min-width: 768px) {
  .is-active .header__menu-hamburger {
    opacity: 1;
  }

  .is-active .header__menu-close {
    opacity: 0;
  }
}

/* メニューテキスト */
.header__menu-text {
  font-size: 24px;
  font-weight: 500;
  line-height: 1;
}

.header__menu-text::after {
  content: 'MENU';
}

.is-active .header__menu-text::after {
  content: 'CLOSE';
}

/* タブレット以上では切り替えを無効化 */
@media (min-width: 768px) {
  .is-active .header__menu-text::after {
    content: 'MENU';
  }
}
```

### グローバルナビゲーションスタイル

```css
/* グローバルナビ基本設定 */
.global-nav {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background-color: #dc3545; /* 赤色背景 */
  z-index: 50;
  transform: translateX(100%); /* 初期状態：画面外 */
  transition: transform 0.3s ease;
  overflow-y: auto;
}

/* タブレット以上 */
@media (min-width: 768px) {
  .global-nav {
    width: 600px;
    z-index: 200; /* ヘッダーより上 */
  }
}

/* 開いた状態 */
.global-nav.is-open {
  transform: translateX(0);
}

.global-nav__inner {
  padding: 60px;
  color: white;
  height: 100%;
}

/* 閉じるボタン（タブレット/デスクトップ用） */
.global-nav__close {
  position: absolute;
  top: 30px;
  right: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
  color: white;
  font-family: sans-serif;
  opacity: 0;
  transition: opacity 0.4s ease;
}

/* スマホでは非表示 */
@media (max-width: 767px) {
  .global-nav__close {
    display: none;
  }
}

/* コンテンツ表示時に閉じるボタンも表示 */
.is-content-visible .global-nav__close {
  opacity: 1;
}

.global-nav__close-icon {
  width: 34px;
  height: 21px;
}

.global-nav__close-icon svg {
  width: 100%;
  height: 100%;
}

.global-nav__close-text {
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
}

.global-nav__close-text::after {
  content: 'CLOSE';
}

/* メニューコンテンツ */
.global-nav__content {
  padding-top: 120px;
  opacity: 0;
  transition: opacity 0.4s ease;
}

@media (min-width: 768px) {
  .global-nav__content {
    padding-top: 100px;
  }
}

/* コンテンツ表示状態 */
.is-content-visible .global-nav__content {
  opacity: 1;
}

/* メニューリスト */
.global-nav__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.global-nav__item {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.global-nav__link {
  display: block;
  padding: 20px 0;
  color: white;
  text-decoration: none;
  font-size: 32px;
  font-weight: 500;
  transition: opacity 0.3s ease;
}

.global-nav__link:hover {
  opacity: 0.7;
}
```

### body の状態管理

```css
/* メニューが開いている時はスクロールを無効化 */
.is-menu-open {
  overflow: hidden;
}
```

---

## ⚙️ JavaScript ファイル (js/menu.js)

### 基本構造

```javascript
document.addEventListener('DOMContentLoaded', function () {
  // 要素の取得
  const menuTrigger = document.querySelector('.header__menu-trigger');
  const globalNav = document.querySelector('.global-nav');
  const navClose = document.querySelector('.global-nav__close');
  const body = document.body;

  // 状態管理変数
  let isMenuOpen = false;
  let isAnimating = false; // 重複クリック防止

  // タブレット以上判定関数
  function isTabletOrDesktop() {
    return window.innerWidth >= 768;
  }

  // メニューを開く関数
  function openMenu() {
    if (isAnimating) return;
    isAnimating = true;
    isMenuOpen = true;

    // 1. ヘッダーボタンの状態変更（スマホのみ）
    if (!isTabletOrDesktop()) {
      menuTrigger.classList.add('is-active');
      menuTrigger.setAttribute('aria-label', 'メニューを閉じる');
    }
    menuTrigger.setAttribute('aria-expanded', 'true');
    body.classList.add('is-menu-open');

    // 2. グローバルナビの背景をスライドイン
    globalNav.classList.add('is-open');

    // 3. 200ms後にコンテンツをフェードイン
    setTimeout(() => {
      globalNav.classList.add('is-content-visible');
      isAnimating = false;
    }, 200);
  }

  // メニューを閉じる関数
  function closeMenu() {
    if (isAnimating) return;
    isAnimating = true;
    isMenuOpen = false;

    // 1. ヘッダーボタンの状態変更（スマホのみ）
    if (!isTabletOrDesktop()) {
      menuTrigger.classList.remove('is-active');
      menuTrigger.setAttribute('aria-label', 'メニューを開く');
    }
    menuTrigger.setAttribute('aria-expanded', 'false');
    body.classList.remove('is-menu-open');

    // 2. まずコンテンツをフェードアウト
    globalNav.classList.remove('is-content-visible');

    // 3. 200ms後に背景をスライドアウト
    setTimeout(() => {
      globalNav.classList.remove('is-open');
      isAnimating = false;
    }, 200);
  }

  // メニューの開閉切り替え関数
  function toggleMenu() {
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  // イベントリスナーの設定
  menuTrigger.addEventListener('click', toggleMenu);

  // グローバルナビのクローズボタン（デスクトップ用）
  if (navClose) {
    navClose.addEventListener('click', closeMenu);
  }

  // ESCキーでメニューを閉じる
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isMenuOpen) {
      closeMenu();
    }
  });

  // グローバルナビの背景クリックでメニューを閉じる
  globalNav.addEventListener('click', function (e) {
    if (e.target === globalNav) {
      closeMenu();
    }
  });

  // ウィンドウリサイズ時の処理
  window.addEventListener('resize', function () {
    if (isMenuOpen) {
      // リサイズ時にメニューが開いている場合、状態をリセット
      if (isTabletOrDesktop()) {
        // タブレット以上に切り替わった場合、ヘッダーボタンをリセット
        menuTrigger.classList.remove('is-active');
      } else {
        // スマホに切り替わった場合、ヘッダーボタンを活性化
        menuTrigger.classList.add('is-active');
      }
    }
  });
});
```

---

## 🎯 重要な実装ポイント

### 1. **SVG 切り替えの仕組み**

- 2 つの SVG を重ね配置し、`opacity`で切り替え
- スマホのみで切り替わり、タブレット以上では固定
- `@media (min-width: 768px)`でタブレット以上の動作を制御

### 2. **段階的アニメーション**

- **開く**: 背景スライド → 200ms 待機 → コンテンツフェード
- **閉じる**: コンテンツフェード → 200ms 待機 → 背景スライド
- `setTimeout`で時差を作成

### 3. **レスポンシブ分岐**

- `isTabletOrDesktop()`関数で画面幅判定
- スマホ（767px 以下）とタブレット以上（768px 以上）で動作分岐
- ウィンドウリサイズ時の状態調整

### 4. **状態管理**

- `isMenuOpen`: メニューの開閉状態
- `isAnimating`: アニメーション中の重複防止
- `is-active`, `is-open`, `is-content-visible`クラスで状態制御

### 5. **アクセシビリティ**

- `aria-expanded`属性の適切な管理
- `aria-label`でボタンの説明
- ESC キーでメニューを閉じる機能

---

## 📋 実装チェックリスト

実装後に以下を確認してください：

- [ ] スマホでハンバーガー ⇔ × ボタンが切り替わる
- [ ] タブレット以上でヘッダーボタンが固定される
- [ ] メニューが段階的にアニメーションする（背景 → コンテンツ）
- [ ] 連続クリックでも破綻しない
- [ ] ESC キーでメニューが閉じる
- [ ] レスポンシブ切り替えが正常動作する
- [ ] アクセシビリティ属性が適切に更新される

---

## 🔧 カスタマイズ例

### 色の変更

```css
/* メニューボタンの色 */
.header__menu-hamburger path,
.header__menu-close path {
  stroke: #your-color; /* 任意の色に変更 */
}

/* 背景色 */
.global-nav {
  background-color: #your-background; /* 任意の背景色 */
}
```

### アニメーション速度の調整

```css
/* CSS側 */
.global-nav {
  transition: transform 0.5s ease; /* 0.3s → 0.5s */
}

.global-nav__content {
  transition: opacity 0.6s ease; /* 0.4s → 0.6s */
}
```

```javascript
// JavaScript側
setTimeout(() => {
  globalNav.classList.add('is-content-visible');
  isAnimating = false;
}, 300); // 200ms → 300ms
```

### ブレークポイントの変更

```css
/* 768px → 任意の値 */
@media (min-width: 1024px) {
  /* タブレット/デスクトップ用スタイル */
}
```

```javascript
function isTabletOrDesktop() {
  return window.innerWidth >= 1024; // 768 → 1024
}
```

---

_このガイドを生成 AI に渡すことで、同じメニューシステムを実装できます。各コードブロックをそのまま該当ファイルにコピー&ペーストし、必要に応じてカスタマイズしてください。_
