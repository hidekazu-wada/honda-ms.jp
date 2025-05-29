/**
 * ヒーローセクション Swiper初期化
 * Dependencies: Swiper.js
 */

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
      delay: config.autoplayDelay, // 設定値を使用
      disableOnInteraction: false,
    },
    loop: config.loop, // 設定値を使用
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      bulletClass: 'hero-bullet',
      bulletActiveClass: 'is-active',
    },
    speed: config.fadeSpeed, // 設定値を使用
  });

  return heroSwiper;
}

// DOM読み込み完了後に自動実行
document.addEventListener('DOMContentLoaded', function () {
  initHeroSwiper();
});

// グローバルに関数を公開（必要に応じて外部から呼び出し可能）
window.HeroSwiper = {
  init: initHeroSwiper,
};
