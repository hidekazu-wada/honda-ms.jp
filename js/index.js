/**
 * Index Page JavaScript - 完全統合版
 * トップページ専用のすべての機能を1ファイルに統合
 * Dependencies: GSAP, Swiper.js
 * Settings: config/site-config.js
 */

// ================================================
// TEXT ANIMATION FUNCTIONS
// ================================================

/**
 * テキストを1文字ずつspanで囲む関数
 * @param {HTMLElement} element - 対象の要素
 */
function wrapChars(element) {
  const text = element.textContent || '';
  element.innerHTML = '';
  text.split('').forEach((char) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.opacity = '0';
    element.appendChild(span);
  });
  element.style.display = 'block';
}

/**
 * GSAPを使用したテキストアニメーション実行
 * config/site-config.js の設定値を使用
 */
function startGsapAnimation() {
  // 設定値を取得（フォールバック値付き）
  const config = window.SiteConfig?.hero?.textAnimation || {
    line1Stagger: 0.12,
    line2Stagger: 0.14,
    lineDelay: 500,
    duration: 1,
  };

  const line1 = document.getElementById('line1');
  const line2 = document.getElementById('line2');
  if (line1) wrapChars(line1);
  if (line2) wrapChars(line2);

  gsap.to('#line1 span', {
    opacity: 1,
    duration: config.duration,
    stagger: config.line1Stagger,
    ease: 'power2.out',
    onComplete: () => {
      setTimeout(() => {
        gsap.to('#line2 span', {
          opacity: 1,
          duration: config.duration,
          stagger: config.line2Stagger,
          ease: 'power2.out',
        });
      }, config.lineDelay);
    },
  });
}

// ================================================
// HERO SWIPER FUNCTIONS
// ================================================

/**
 * ヒーローSwiperを初期化
 * config/site-config.js の設定値を使用
 */
function initHeroSwiper() {
  // 設定値を取得（フォールバック値付き）
  const config = window.SiteConfig?.hero?.swiper || {
    autoplayDelay: 5000,
    fadeSpeed: 2500,
    loop: true,
  };

  const heroSwiper = new Swiper('.hero-swiper', {
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    autoplay: {
      delay: config.autoplayDelay,
      disableOnInteraction: false,
    },
    loop: config.loop,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      bulletClass: 'hero-bullet',
      bulletActiveClass: 'is-active',
    },
    speed: config.fadeSpeed,
  });

  return heroSwiper;
}

// ================================================
// INITIALIZATION
// ================================================

// DOM読み込み完了後に自動実行
document.addEventListener('DOMContentLoaded', function () {
  initHeroSwiper();
});

// ================================================
// GLOBAL API
// ================================================

// グローバルに関数を公開（フォント読み込み完了時に呼び出し）
window.TextAnimation = {
  wrapChars,
  startGsapAnimation,
};

window.HeroSwiper = {
  init: initHeroSwiper,
};
