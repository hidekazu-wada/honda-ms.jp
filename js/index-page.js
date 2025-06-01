/**
 * Index Page - トップページ固有の初期化処理
 * 各機能コンポーネントを組み合わせて初期化
 * Dependencies: text-animation.js, hero-swiper.js
 */

/**
 * DOMContentLoaded時の初期化
 */
document.addEventListener('DOMContentLoaded', () => {
  // ヒーローSwiperを初期化
  if (window.HeroSwiper) {
    window.HeroSwiper.init();
  }
});
