/**
 * Philosophy Swiper - 企業理念セクション用スライダー機能
 * カスタムナビゲーション付きの手動スライダー
 * Dependencies: Swiper.js
 */

/**
 * 企業理念Swiperを初期化
 * @param {string} selector - Swiperコンテナのセレクタ（デフォルト: '.philosophy-swiper'）
 * @param {Object} customConfig - カスタム設定（オプション）
 * @returns {Swiper} Swiperインスタンス
 */
function initPhilosophySwiper(
  selector = '.philosophy-swiper',
  customConfig = {}
) {
  // デフォルト設定
  const defaultConfig = {
    loop: false, // ループ再生を無効化
    speed: 800, // スライド切り替え速度（ミリ秒）
    autoHeight: true, // 高さ自動調整
  };

  // 設定をマージ
  const config = { ...defaultConfig, ...customConfig };

  const philosophySwiper = new Swiper(selector, {
    // 基本設定
    loop: config.loop,
    speed: config.speed,
    autoHeight: config.autoHeight,

    // スライド間のスペース
    spaceBetween: 100,

    // 一度に表示するスライド数
    slidesPerView: 1,

    // カスタムナビゲーション
    navigation: {
      nextEl: '.philosophy-nav--next',
      prevEl: '.philosophy-nav--prev',
    },

    // キーボードナビゲーション
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },

    // アクセシビリティ設定
    a11y: {
      enabled: true,
      prevSlideMessage: '前のスライドへ',
      nextSlideMessage: '次のスライドへ',
      slideLabelMessage: 'スライド {{index}} / {{slidesLength}}',
    },
  });

  return philosophySwiper;
}

/**
 * ページ読み込み後に自動初期化
 */
document.addEventListener('DOMContentLoaded', function () {
  // philosophy-swiperクラスが存在する場合のみ初期化
  const philosophySwiperElement = document.querySelector('.philosophy-swiper');
  if (philosophySwiperElement) {
    const swiper = initPhilosophySwiper();

    // デバッグ用ログ（本番環境では削除）
    console.log('Philosophy Swiper initialized:', swiper);
  }
});

/**
 * グローバルAPIとして公開
 */
window.PhilosophySwiper = {
  init: initPhilosophySwiper,
};
