(function() {
  // ハッシュが存在する場合の早期制御
  if (window.location.hash) {
    // ハッシュを保存
    window.__savedHash = window.location.hash;
    
    // 即座にページトップへ（ブラウザのデフォルトジャンプを防ぐ）
    window.scrollTo(0, 0);
    
    // 一時的にスクロールを無効化
    document.documentElement.style.scrollBehavior = 'auto';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    
    // スクロール制御を解除する関数
    function releaseScrollLock() {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.documentElement.style.scrollBehavior = '';
    }
    
    // DOMContentLoadedが既に発火している場合
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      setTimeout(releaseScrollLock, 100);
    } else {
      // DOMContentLoaded後に解除
      document.addEventListener('DOMContentLoaded', function() {
        setTimeout(releaseScrollLock, 100);
      });
    }
  }
})();