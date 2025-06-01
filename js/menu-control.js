/**
 * Menu Control - 共通メニュー制御処理
 * Honda Motor Sales Group
 *
 * グローバルナビゲーションの開閉制御
 * - ハンバーガーメニューの制御
 * - レスポンシブ対応（タブレット/スマホ分岐）
 * - アニメーション効果（フェード・スライド）
 * - キーボードアクセシビリティ対応
 * - ARIA属性の適切な管理
 */

// メニュー制御スクリプト
document.addEventListener('DOMContentLoaded', function () {
  const menuTrigger = document.querySelector('.header__menu-trigger');
  const globalNav = document.querySelector('.global-nav');
  const navClose = document.querySelector('.global-nav__close');
  const body = document.body;
  let isMenuOpen = false;
  let isAnimating = false; // アニメーション中の重複防止

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

    // 3. 少し待ってからコンテンツをフェードイン
    setTimeout(() => {
      globalNav.classList.add('is-content-visible');
      isAnimating = false;
    }, 200); // 200ms後にコンテンツ表示
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

    // 3. 少し待ってからグローバルナビの背景をスライドアウト
    setTimeout(() => {
      globalNav.classList.remove('is-open');
      isAnimating = false;
    }, 200); // 200ms後に背景を閉じる
  }

  // メニューの開閉切り替え関数
  function toggleMenu() {
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  // ヘッダーのメニューボタンクリック
  menuTrigger.addEventListener('click', toggleMenu);

  // グローバルナビのクローズボタンクリック（デスクトップ用）
  if (navClose) {
    navClose.addEventListener('click', closeMenu);
  }

  // ESCキーでメニューを閉じる
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isMenuOpen) {
      closeMenu();
    }
  });

  // グローバルナビの背景クリックでメニューを閉じる（スマホ用）
  globalNav.addEventListener('click', function (e) {
    if (e.target === globalNav) {
      closeMenu();
    }
  });

  // ウィンドウリサイズ時の処理（タブレット以上⇔スマホ切り替え対応）
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
