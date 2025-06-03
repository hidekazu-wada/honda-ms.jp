/**
 * Error 404 Page Auto Redirect Script
 * 404エラーページの自動リダイレクト機能
 * 10秒のカウントダウン後にトップページへ自動移動
 */

/**
 * カウントダウン機能を初期化
 * @param {number} startTime - 開始秒数（デフォルト: 10）
 * @param {string} targetUrl - リダイレクト先URL（デフォルト: トップページ）
 */
function initCountdownRedirect(startTime = 10, targetUrl = '../') {
  // カウントダウン表示要素を取得
  const timeElement = document.querySelector(
    '.error-404-content__paragraph-time'
  );

  // 要素が存在しない場合は処理を終了
  if (!timeElement) {
    console.warn('Error 404: countdown element not found');
    return;
  }

  let currentTime = startTime;

  // 初期値を設定
  timeElement.textContent = currentTime;

  // カウントダウン処理
  const countdown = setInterval(() => {
    currentTime--;

    // 残り時間を表示
    timeElement.textContent = currentTime;

    // デバッグ用ログ（本番環境では削除可能）
    console.log(`Redirect countdown: ${currentTime} seconds remaining`);

    // カウントダウン終了時の処理
    if (currentTime <= 0) {
      clearInterval(countdown);

      // トップページへリダイレクト
      console.log(`Redirecting to: ${targetUrl}`);
      window.location.href = targetUrl;
    }
  }, 1000); // 1秒間隔で実行

  // メモリリークを防ぐため、ページ離脱時にタイマーをクリア
  window.addEventListener('beforeunload', () => {
    clearInterval(countdown);
  });

  return countdown;
}

/**
 * ページ読み込み完了後に自動実行
 */
document.addEventListener('DOMContentLoaded', function () {
  // 404ページでのみ実行
  if (document.body.classList.contains('error-404-page')) {
    // カウントダウン開始
    const countdown = initCountdownRedirect(10, '../');

    // デバッグ用ログ
    console.log('Error 404: Auto redirect countdown started');
  }
});

/**
 * グローバルAPIとして公開（手動制御用）
 */
window.Error404Redirect = {
  init: initCountdownRedirect,
};
