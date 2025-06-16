/**
 * ハッシュナビゲーション詳細デバッグスクリプト
 * ページ読み込みからハッシュジャンプまでの全プロセスを監視
 */

class HashNavigationDebugger {
  constructor() {
    this.logs = [];
    this.startTime = Date.now();
    this.targetElement = null;
    
    this.log('🔍 HashNavigationDebugger initialized');
    this.init();
  }

  log(message, data = null) {
    const timestamp = Date.now() - this.startTime;
    const logEntry = {
      time: timestamp,
      message: message,
      data: data,
      hash: window.location.hash,
      scrollY: window.scrollY,
      bodyClasses: document.body.className
    };
    
    this.logs.push(logEntry);
    
    if (data) {
      console.log(`[${timestamp}ms] ${message}`, data);
    } else {
      console.log(`[${timestamp}ms] ${message}`);
    }
  }

  init() {
    // 初期状態をログ
    this.log('📍 Initial state', {
      hash: window.location.hash,
      scrollY: window.scrollY,
      readyState: document.readyState,
      bodyClasses: document.body.className
    });

    // ハッシュターゲット要素をチェック
    this.checkHashTarget();

    // 各種イベントリスナーを設定
    this.setupEventListeners();

    // 定期的な状態チェック
    this.startPeriodicCheck();
  }

  checkHashTarget() {
    const hash = window.location.hash;
    if (hash && hash.length > 1) {
      const targetId = hash.substring(1);
      this.targetElement = document.getElementById(targetId);
      
      this.log('🎯 Hash target check', {
        hash: hash,
        targetId: targetId,
        elementFound: !!this.targetElement,
        elementVisible: this.targetElement ? this.isElementVisible(this.targetElement) : false,
        elementPosition: this.targetElement ? this.getElementPosition(this.targetElement) : null
      });
    }
  }

  isElementVisible(element) {
    const rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0 && rect.top >= 0 && rect.bottom <= window.innerHeight;
  }

  getElementPosition(element) {
    const rect = element.getBoundingClientRect();
    return {
      top: rect.top,
      left: rect.left,
      bottom: rect.bottom,
      right: rect.right,
      offsetTop: element.offsetTop,
      scrollTop: document.documentElement.scrollTop || document.body.scrollTop
    };
  }

  setupEventListeners() {
    // DOMContentLoaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.log('📄 DOMContentLoaded fired');
        this.checkHashTarget();
      });
    }

    // ウィンドウload
    window.addEventListener('load', () => {
      this.log('🌐 Window load fired');
      this.checkHashTarget();
    });

    // ハッシュ変更
    window.addEventListener('hashchange', (event) => {
      this.log('🔄 Hash changed', {
        oldURL: event.oldURL,
        newURL: event.newURL,
        newHash: window.location.hash
      });
      this.checkHashTarget();
    });

    // スクロールイベント
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        this.log('📜 Scroll event', {
          scrollY: window.scrollY,
          scrollX: window.scrollX
        });
      }, 100);
    });

    // GSAPのScrollTrigger関連
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        if (window.ScrollTrigger) {
          this.log('🎬 GSAP ScrollTrigger detected', {
            triggers: ScrollTrigger.getAll().length
          });
        }
      }, 500);
    });

    // body classの変更を監視
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          this.log('🏷️ Body class changed', {
            oldClasses: mutation.oldValue,
            newClasses: document.body.className
          });
        }
      });
    });

    observer.observe(document.body, {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: ['class']
    });
  }

  startPeriodicCheck() {
    // 最初の5秒間、500msごとに状態をチェック
    let checkCount = 0;
    const maxChecks = 10;
    
    const intervalId = setInterval(() => {
      checkCount++;
      
      this.log(`⏰ Periodic check #${checkCount}`, {
        hash: window.location.hash,
        scrollY: window.scrollY,
        bodyClasses: document.body.className,
        targetVisible: this.targetElement ? this.isElementVisible(this.targetElement) : null
      });

      if (checkCount >= maxChecks) {
        clearInterval(intervalId);
        this.log('✅ Periodic checking completed');
        this.showSummary();
      }
    }, 500);
  }

  showSummary() {
    console.group('📊 Hash Navigation Debug Summary');
    console.log('Total logs:', this.logs.length);
    console.log('Target element found:', !!this.targetElement);
    console.log('Final scroll position:', window.scrollY);
    console.log('Final hash:', window.location.hash);
    
    if (this.targetElement) {
      console.log('Target element position:', this.getElementPosition(this.targetElement));
      console.log('Target element visible:', this.isElementVisible(this.targetElement));
    }
    
    console.log('All logs:', this.logs);
    console.groupEnd();
  }

  // 手動でハッシュナビゲーションをテスト
  testHashNavigation() {
    if (this.targetElement) {
      this.log('🧪 Manual hash navigation test');
      this.targetElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  }
}

// グローバルに公開
window.HashDebugger = new HashNavigationDebugger();

// 手動テスト用の関数をグローバルに追加
window.testHashJump = () => {
  if (window.HashDebugger) {
    window.HashDebugger.testHashNavigation();
  }
};