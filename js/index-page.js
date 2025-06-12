/**
 * トップページの初期化スクリプト。現在はヒーロースライダーの起動のみを行う。
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
