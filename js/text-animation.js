/**
 * 文字列を span に分割し、GSAP で順番にフェードインさせるアニメーション機能。
 * 準備と開始を個別に呼び出せる API を提供する。
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
 * テキストアニメーションの準備（事前実行用）
 */
function prepareTextAnimation() {
  console.log('📝 Preparing text animation');

  const mainTitle = document.getElementById('main-title');
  const line1 = document.getElementById('line1');
  const line2 = document.getElementById('line2');

  // 必要な要素が存在しない場合は処理をスキップ
  if (!line1 || !line2) {
    console.log('📝 Text animation elements not found - skipping preparation');
    return false;
  }

  if (line1) wrapChars(line1);
  if (line2) wrapChars(line2);

  // 準備完了時にクラスを追加して表示
  if (mainTitle) {
    mainTitle.classList.add('text-ready');
    console.log('📝 Text preparation complete - title now visible');
  }
  
  return true;
}

/**
 * GSAPを使用したテキストアニメーション実行（準備済み前提）
 */
function startGsapAnimation() {
  console.log('📝 Starting GSAP animation');

  // 必要な要素の存在確認
  const line1 = document.getElementById('line1');
  const line2 = document.getElementById('line2');
  
  if (!line1 || !line2) {
    console.log('📝 Text animation elements not found - skipping animation');
    return;
  }

  // テキストアニメーション設定（直接定義）
  const config = {
    line1Stagger: 0.12, // 1行目の文字間隔（秒）
    line2Stagger: 0.14, // 2行目の文字間隔（秒）
    lineDelay: 500, // 行間の遅延（ミリ秒）
    duration: 1, // 1文字のアニメーション時間（秒）
  };

  // 準備が完了していない場合は準備から実行
  if (!line1.querySelector('span')) {
    console.log('📝 Text not prepared - preparing now');
    const prepared = prepareTextAnimation();
    if (!prepared) {
      return; // 準備に失敗した場合は処理を終了
    }
  }

  // line1のspanが存在する場合のみアニメーション実行
  const line1Spans = line1.querySelectorAll('span');
  const line2Spans = line2.querySelectorAll('span');
  
  if (line1Spans.length === 0) {
    console.warn('📝 No spans found in line1 - animation skipped');
    return;
  }

  gsap.to('#line1 span', {
    opacity: 1,
    duration: config.duration,
    stagger: config.line1Stagger,
    ease: 'power2.out',
    onComplete: () => {
      if (line2Spans.length > 0) {
        setTimeout(() => {
          gsap.to('#line2 span', {
            opacity: 1,
            duration: config.duration,
            stagger: config.line2Stagger,
            ease: 'power2.out',
          });
        }, config.lineDelay);
      }
    },
  });
}

/**
 * グローバルAPIとして公開
 */
window.TextAnimation = {
  prepareTextAnimation, // 新しく追加：事前準備用
  startGsapAnimation,
  wrapChars, // 個別の関数も公開（将来の拡張性のため）
};
