/**
 * ヒーローセクションの Swiper を初期化するスクリプト。
 * フェード効果付き自動再生とページネーションを備える。
 */

/**
 * ヒーローSwiperを初期化
 * @param {string} selector - Swiperコンテナのセレクタ（デフォルト: '.hero-swiper'）
 * @param {Object} customConfig - カスタム設定（オプション）
 * @returns {Swiper} Swiperインスタンス
 */
function initHeroSwiper(selector = '.hero-swiper', customConfig = {}) {
  // デフォルト設定
  const defaultConfig = {
    autoplayDelay: 5000, // スライド表示時間（ミリ秒）
    fadeSpeed: 2500, // フェード速度（ミリ秒）
    loop: true, // ループ再生
  };

  // 設定をマージ
  const config = { ...defaultConfig, ...customConfig };

  const heroSwiper = new Swiper(selector, {
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

/**
 * グローバルAPIとして公開
 */
window.HeroSwiper = {
  init: initHeroSwiper,
};
