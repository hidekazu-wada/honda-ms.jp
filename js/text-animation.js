/**
 * Text Animation - GSAPテキストアニメーション機能
 * 1文字ずつフェードインするテキストアニメーション
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
 */
function startGsapAnimation() {
  // テキストアニメーション設定（直接定義）
  const config = {
    line1Stagger: 0.12, // 1行目の文字間隔（秒）
    line2Stagger: 0.14, // 2行目の文字間隔（秒）
    lineDelay: 500, // 行間の遅延（ミリ秒）
    duration: 1, // 1文字のアニメーション時間（秒）
  };

  const line1 = document.getElementById('line1');
  const line2 = document.getElementById('line2');
  if (line1) wrapChars(line1);
  if (line2) wrapChars(line2);

  gsap.to('#line1 span', {
    opacity: 1,
    duration: config.duration,
    stagger: config.line1Stagger,
    ease: 'power2.out',
    onComplete: () => {
      setTimeout(() => {
        gsap.to('#line2 span', {
          opacity: 1,
          duration: config.duration,
          stagger: config.line2Stagger,
          ease: 'power2.out',
        });
      }, config.lineDelay);
    },
  });
}

/**
 * グローバルAPIとして公開
 */
window.TextAnimation = {
  startGsapAnimation,
  wrapChars, // 個別の関数も公開（将来の拡張性のため）
};
