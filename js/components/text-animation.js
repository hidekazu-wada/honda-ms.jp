/**
 * テキストアニメーション機能
 * Dependencies: GSAP
 */

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
    duration: config.duration, // 設定値を使用
    stagger: config.line1Stagger, // 設定値を使用
    ease: 'power2.out',
    onComplete: () => {
      setTimeout(() => {
        gsap.to('#line2 span', {
          opacity: 1,
          duration: config.duration, // 設定値を使用
          stagger: config.line2Stagger, // 設定値を使用
          ease: 'power2.out',
        });
      }, config.lineDelay); // 設定値を使用
    },
  });
}

// グローバルに関数を公開（他のスクリプトから呼び出し可能にする）
window.TextAnimation = {
  wrapChars,
  startGsapAnimation,
};
