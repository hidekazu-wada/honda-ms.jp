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
    
    // DOMContentLoaded後に解除
    document.addEventListener('DOMContentLoaded', function() {
      // 少し遅延を入れて確実に制御
      setTimeout(function() {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        document.documentElement.style.scrollBehavior = '';
      }, 100);
    });
  }
})();