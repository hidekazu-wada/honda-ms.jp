// GSAP ScrollTrigger を使ったスクロールフェードアニメーション
document.addEventListener('DOMContentLoaded', () => {
  // GSAPとScrollTriggerの存在確認
  if (typeof gsap === 'undefined') {
    console.error('GSAP is not loaded');
    return;
  }

  if (typeof ScrollTrigger === 'undefined') {
    console.error('ScrollTrigger is not loaded');
    return;
  }

  // ScrollTriggerプラグインを登録
  gsap.registerPlugin(ScrollTrigger);

  // アニメーション設定
  const animationConfig = {
    duration: 0.6,
    ease: 'power2.out',
    translateY: 10,
  };

  // .fade-in-up クラスを持つ全ての要素を取得
  const fadeElements = document.querySelectorAll('.fade-in-up');

  if (fadeElements.length === 0) {
    console.log('No .fade-in-up elements found');
    return;
  }

  console.log(`Found ${fadeElements.length} fade-in-up elements`);

  // 各要素にGSAPアニメーションを設定
  fadeElements.forEach((element, index) => {
    // ScrollTriggerでfromToアニメーション
    gsap.fromTo(
      element,
      {
        // 初期状態（from）
        opacity: 0,
        y: animationConfig.translateY,
      },
      {
        // 終了状態（to）
        opacity: 1,
        y: 0,
        duration: animationConfig.duration,
        ease: animationConfig.ease,
        scrollTrigger: {
          trigger: element,
          start: 'top 90%', // 要素の上端が画面の90%位置に来たら開始
          end: 'bottom 10%', // 要素の下端が画面の10%位置に来たら終了
          toggleActions: 'play none none none', // 一度だけ再生
          // markers: true, // デバッグ用（本番では削除）
          onStart: () => {
            console.log(
              `Animating element ${index + 1}:`,
              element.tagName,
              element.textContent?.substring(0, 30)
            );
          },
        },
      }
    );
  });

  console.log('GSAP ScrollTrigger fade animations initialized');
});
