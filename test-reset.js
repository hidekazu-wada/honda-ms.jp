/**
 * テスト用: LocalStorageをリセットして初回訪問状態にする
 * ブラウザのコンソールで実行してください
 */

// 初回訪問状態にリセット
localStorage.removeItem('honda-ms-visited');
console.log('✅ LocalStorage cleared - next reload will be treated as first visit');
console.log('💡 Reload the page to test first visit experience');

// 現在の状態確認
console.log('Current visit status:', {
  hasVisited: localStorage.getItem('honda-ms-visited'),
  bodyClasses: document.body.className
});