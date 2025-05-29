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

  // ミッションセクション設定
  mission: {
    animation: {
      staggerDelay: 0.1, // 各アイテムのアニメーション遅延時間
      fadeInDuration: 0.8, // フェードインの持続時間
      slideUpDistance: 30, // スライドアップの距離（px）
    },
    content: {
      title: 'ミッション',
      mainText:
        'ここにメインのミッションテキストが入ります。後から編集してください。',
      values: [
        {
          id: 1,
          title: '価値1',
          description: 'ここに価値1の説明が入ります。後から編集してください。',
        },
        {
          id: 2,
          title: '価値2',
          description: 'ここに価値2の説明が入ります。後から編集してください。',
        },
        {
          id: 3,
          title: '価値3',
          description: 'ここに価値3の説明が入ります。後から編集してください。',
        },
      ],
    },
  },
};
