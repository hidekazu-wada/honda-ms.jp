/**
 * Index Page Configuration
 * トップページ専用設定
 */
window.IndexPageConfig = {
  // ヒーローセクション設定（既存の設定を移行）
  hero: {
    swiper: {
      autoplayDelay: 5000,
      fadeSpeed: 2500,
      loop: true,
    },
    textAnimation: {
      line1Stagger: 0.12,
      line2Stagger: 0.14,
      lineDelay: 500,
      duration: 1,
    },
    // スライドデータ（既存の設定を移行）
    slidesData: [
      {
        id: 1,
        desktopImage: {
          webp: '../images/index/hero/slide01-desktop.webp',
          png: '../images/index/hero/fallback/slide01-desktop.png',
        },
        mobileImage: {
          webp: '../images/index/hero/slide01-mobile.webp',
          png: '../images/index/hero/fallback/slide01-mobile.png',
        },
        alt: 'ヒーローイメージ 1',
      },
      // 他のスライドデータ...
    ],
  },
};
