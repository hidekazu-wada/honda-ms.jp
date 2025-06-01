/**
 * Font Loader - 共通フォント読み込み処理
 * Honda Motor Sales Group
 *
 * @param {Object} options - オプション設定
 * @param {number} options.timeout - フォールバックタイムアウト時間（ミリ秒）
 * @param {Function} options.onReady - フォント読み込み完了時のコールバック
 * @param {Function} options.onTimeout - タイムアウト時のコールバック
 */
function initFontLoader(options = {}) {
  const { timeout = 3000, onReady = null, onTimeout = null } = options;

  /**
   * フォント読み込み完了時の共通処理
   */
  function handleFontLoaded() {
    document.body.classList.remove('is-loading');
    document.body.classList.add('is-loaded');

    // ページ固有の処理を実行
    if (onReady && typeof onReady === 'function') {
      onReady();
    }
  }

  /**
   * タイムアウト時の処理
   */
  function handleTimeout() {
    if (document.body.classList.contains('is-loading')) {
      handleFontLoaded();

      // タイムアウト時の固有処理を実行
      if (onTimeout && typeof onTimeout === 'function') {
        onTimeout();
      }
    }
  }

  // フォント読み込み完了を待つ
  document.fonts.ready.then(handleFontLoaded);

  // フォールバック: 指定された時間経過したら強制的に表示
  setTimeout(handleTimeout, timeout);
}

// グローバルスコープに公開
window.initFontLoader = initFontLoader;
