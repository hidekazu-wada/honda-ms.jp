/**
 * LocalStorage を利用して初回訪問かどうかを判定し、結果を body クラスや
 * カスタムイベントとして公開するユーティリティ。履歴リセットも可能。
 */

/**
 * 初回訪問判定のための設定
 */
const VISIT_CONFIG = {
  // LocalStorageのキー名
  storageKey: 'honda-ms-visited',
  // 保存する値（訪問済みフラグ）
  visitedValue: 'true',
  // デバッグモード（本番環境では false に設定）
  debugMode: true,
};

/**
 * 初回訪問かどうかを判定する
 * @returns {boolean} true: 初回訪問, false: リピート訪問
 */
function isFirstVisit() {
  try {
    // LocalStorageから訪問履歴を取得
    const hasVisited = localStorage.getItem(VISIT_CONFIG.storageKey);

    // 訪問履歴がない場合は初回訪問
    const isFirstTime = hasVisited === null;

    // デバッグログ出力
    if (VISIT_CONFIG.debugMode) {
      console.log('Visit Status Check:', {
        isFirstVisit: isFirstTime,
        storageValue: hasVisited,
        timestamp: new Date().toISOString(),
      });
    }

    return isFirstTime;
  } catch (error) {
    // LocalStorageが使用できない場合（プライベートブラウジング等）
    console.warn('LocalStorage access failed:', error);
    // エラー時は初回訪問として扱う（安全側に倒す）
    return true;
  }
}

/**
 * 訪問履歴を記録する（初回訪問時に呼び出す）
 */
function recordVisit() {
  try {
    // 訪問済みフラグをLocalStorageに保存
    localStorage.setItem(VISIT_CONFIG.storageKey, VISIT_CONFIG.visitedValue);

    // デバッグログ出力
    if (VISIT_CONFIG.debugMode) {
      console.log('Visit recorded successfully:', {
        storageKey: VISIT_CONFIG.storageKey,
        value: VISIT_CONFIG.visitedValue,
        timestamp: new Date().toISOString(),
      });
    }
  } catch (error) {
    // LocalStorageへの書き込みが失敗した場合
    console.warn('Failed to record visit:', error);
  }
}

/**
 * 訪問履歴をリセットする（開発・テスト用）
 */
function resetVisitHistory() {
  try {
    localStorage.removeItem(VISIT_CONFIG.storageKey);

    if (VISIT_CONFIG.debugMode) {
      console.log('Visit history reset successfully');
    }
  } catch (error) {
    console.warn('Failed to reset visit history:', error);
  }
}

/**
 * 初回訪問判定を実行し、適切な処理を行う
 * @returns {object} 訪問ステータス情報
 */
function checkVisitStatus() {
  const firstTime = isFirstVisit();

  // 初回訪問の場合は訪問履歴を記録
  if (firstTime) {
    recordVisit();
  }

  // 訪問ステータスを返す
  return {
    isFirstVisit: firstTime,
    isReturnVisitor: !firstTime,
    checkedAt: new Date().toISOString(),
  };
}

/**
 * グローバルAPIとして公開
 */
window.FirstVisitDetector = {
  // メイン機能
  check: checkVisitStatus,
  isFirstVisit: isFirstVisit,
  recordVisit: recordVisit,

  // 開発・テスト用
  reset: resetVisitHistory,

  // 設定
  config: VISIT_CONFIG,
};

/**
 * 自動実行（ページ読み込み時）
 * ローディング画面で使用する場合のための初期化
 */
document.addEventListener('DOMContentLoaded', function () {
  // 訪問ステータスをチェック
  const visitStatus = checkVisitStatus();

  // body要素にクラスを追加（CSS制御用）
  if (visitStatus.isFirstVisit) {
    document.body.classList.add('first-visit');
  } else {
    document.body.classList.add('return-visit');
  }

  // カスタムイベントを発火（他のスクリプトで使用可能）
  const event = new CustomEvent('visitStatusReady', {
    detail: visitStatus,
  });
  document.dispatchEvent(event);

  // デバッグ情報をコンソールに出力
  if (VISIT_CONFIG.debugMode) {
    console.log('=== First Visit Detector Initialized ===');
    console.log('Visit Status:', visitStatus);
    console.log('Body Classes:', document.body.className);
  }
});
