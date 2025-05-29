/**
 * サイト設定ファイル
 * CMS移植時に管理画面から変更可能にする項目
 */
window.SiteConfig = {
  // ヒーローセクション設定
  hero: {
    // Swiperスライダー設定
    swiper: {
      autoplayDelay: 5000, // スライド表示時間（ミリ秒）
      fadeSpeed: 2500, // フェード速度（ミリ秒）
      loop: true, // ループ再生
    },
    // テキストアニメーション設定
    textAnimation: {
      line1Stagger: 0.12, // 1行目の文字間隔（秒）
      line2Stagger: 0.14, // 2行目の文字間隔（秒）
      lineDelay: 500, // 行間の遅延（ミリ秒）
      duration: 1, // 1文字のアニメーション時間（秒）
    },
    // スライドデータ構造（CMS移植時の参考）
    // 注意: 現在は静的HTMLを使用、この設定は移植時の参考用
    slidesData: [
      {
        id: 1,
        desktopImage: {
          webp: 'images/index/hero/slide01-desktop.webp',
          png: 'images/index/hero/fallback/slide01-desktop.png',
        },
        mobileImage: {
          webp: 'images/index/hero/slide01-mobile.webp',
          png: 'images/index/hero/fallback/slide01-mobile.png',
        },
        alt: 'ヒーローイメージ 1',
      },
      {
        id: 2,
        desktopImage: {
          webp: 'images/index/hero/slide02-desktop.webp',
          png: 'images/index/hero/fallback/slide02-desktop.png',
        },
        mobileImage: {
          webp: 'images/index/hero/slide02-mobile.webp',
          png: 'images/index/hero/fallback/slide02-mobile.png',
        },
        alt: 'ヒーローイメージ 2',
      },
      {
        id: 3,
        desktopImage: {
          webp: 'images/index/hero/slide03-desktop.webp',
          png: 'images/index/hero/fallback/slide03-desktop.png',
        },
        mobileImage: {
          webp: 'images/index/hero/slide03-mobile.webp',
          png: 'images/index/hero/fallback/slide03-mobile.png',
        },
        alt: 'ヒーローイメージ 3',
      },
      {
        id: 4,
        desktopImage: {
          webp: 'images/index/hero/slide04-desktop.webp',
          png: 'images/index/hero/fallback/slide04-desktop.png',
        },
        mobileImage: {
          webp: 'images/index/hero/slide04-mobile.webp',
          png: 'images/index/hero/fallback/slide04-mobile.png',
        },
        alt: 'ヒーローイメージ 4',
      },
      {
        id: 5,
        desktopImage: {
          webp: 'images/index/hero/slide05-desktop.webp',
          png: 'images/index/hero/fallback/slide05-desktop.png',
        },
        mobileImage: {
          webp: 'images/index/hero/slide05-mobile.webp',
          png: 'images/index/hero/fallback/slide05-mobile.png',
        },
        alt: 'ヒーローイメージ 5',
      },
      {
        id: 6,
        desktopImage: {
          webp: 'images/index/hero/slide06-desktop.webp',
          png: 'images/index/hero/fallback/slide06-desktop.png',
        },
        mobileImage: {
          webp: 'images/index/hero/slide06-mobile.webp',
          png: 'images/index/hero/fallback/slide06-mobile.png',
        },
        alt: 'ヒーローイメージ 6',
      },
    ],
  },

  // フォント読み込み設定
  fonts: {
    loadTimeout: 3000, // フォント読み込みタイムアウト（ミリ秒）
  },
};
