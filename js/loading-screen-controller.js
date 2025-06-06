/**
 * Loading Screen Controller - シンプル版
 * 初回訪問時のローディング画面制御
 * Dependencies: GSAP, text-animation.js
 */

/**
 * ローディング画面制御
 */
class SimpleLoadingController {
  constructor() {
    this.loadingElement = document.querySelector('#loading-screen');
    this.isFirstVisit = document.body.classList.contains('first-visit');
    this.fadeOutDuration = 0.8; // フェードアウト時間（秒）
    this.minLoadingTime = 3000; // 最低表示時間（ミリ秒）
    this.debugMode = true;
    this.textPrepared = false; // テキスト準備完了フラグ
    this.fontLoaded = false; // フォント読み込み完了フラグ
    this.loadingStartTime = Date.now(); // ローディング開始時刻

    if (this.debugMode) {
      console.log('🎬 Loading controller created:', {
        hasLoadingElement: !!this.loadingElement,
        isFirstVisit: this.isFirstVisit,
        bodyClasses: document.body.className,
        loadingStartTime: this.loadingStartTime,
      });
    }

    // 初期化後にテキスト準備を実行
    this.prepareTextIfNeeded();
  }

  /**
   * テキストアニメーションの準備（ローディング中に実行）
   */
  prepareTextIfNeeded() {
    // テキストアニメーション準備は初回・リピート問わず実行
    if (
      window.TextAnimation &&
      typeof window.TextAnimation.prepareTextAnimation === 'function'
    ) {
      if (this.debugMode) {
        console.log('📝 Preparing text animation during loading');
      }

      window.TextAnimation.prepareTextAnimation();
      this.textPrepared = true;
    } else {
      // TextAnimationがまだ読み込まれていない場合は少し待ってリトライ
      setTimeout(() => {
        this.prepareTextIfNeeded();
      }, 100);
    }
  }

  /**
   * フォント読み込み完了時の処理（外部から呼び出される）
   */
  handleFontLoaded() {
    this.fontLoaded = true;

    if (this.debugMode) {
      const elapsedTime = Date.now() - this.loadingStartTime;
      console.log('🔤 handleFontLoaded called:', {
        isFirstVisit: this.isFirstVisit,
        hasLoadingElement: !!this.loadingElement,
        textPrepared: this.textPrepared,
        elapsedTime: elapsedTime + 'ms',
      });
    }

    if (!this.isFirstVisit || !this.loadingElement) {
      // 初回訪問でない、またはローディング要素がない場合
      if (this.debugMode) {
        console.log(
          '🔄 Not first visit or no loading element - starting text animation directly'
        );
      }
      this.startTextAnimation();
      return;
    }

    // 初回訪問時：最低表示時間をチェック
    this.checkMinimumLoadingTime();
  }

  /**
   * 最低表示時間をチェックしてローディング画面を制御
   */
  checkMinimumLoadingTime() {
    const elapsedTime = Date.now() - this.loadingStartTime;
    const remainingTime = this.minLoadingTime - elapsedTime;

    if (this.debugMode) {
      console.log('⏱️ Checking minimum loading time:', {
        elapsedTime: elapsedTime + 'ms',
        remainingTime: remainingTime + 'ms',
        fontLoaded: this.fontLoaded,
      });
    }

    if (remainingTime <= 0) {
      // 最低表示時間は既に経過済み
      if (this.debugMode) {
        console.log('✅ Minimum time already elapsed - hiding loading screen');
      }
      this.hideLoadingScreen();
    } else {
      // 最低表示時間まで待機
      if (this.debugMode) {
        console.log(
          `⏳ Waiting additional ${remainingTime}ms for minimum loading time`
        );
      }

      setTimeout(() => {
        if (this.debugMode) {
          console.log(
            '✅ Minimum loading time reached - hiding loading screen'
          );
        }
        this.hideLoadingScreen();
      }, remainingTime);
    }
  }

  /**
   * ローディング画面をフェードアウト
   */
  hideLoadingScreen() {
    if (this.debugMode) {
      console.log('🌅 Starting loading screen fade out');
    }

    // GSAPが利用可能かチェック
    if (typeof gsap === 'undefined') {
      console.error('GSAP not available - using fallback');
      this.loadingElement.style.display = 'none';
      this.startTextAnimation();
      return;
    }

    // GSAPでフェードアウト
    gsap.to(this.loadingElement, {
      opacity: 0,
      duration: this.fadeOutDuration,
      ease: 'power2.out',
      onComplete: () => {
        // 完全に非表示
        this.loadingElement.style.display = 'none';

        if (this.debugMode) {
          console.log('✨ Loading screen hidden - starting text animation');
        }

        // テキストアニメーション開始
        this.startTextAnimation();
      },
    });
  }

  /**
   * テキストアニメーションを開始
   */
  startTextAnimation() {
    if (this.debugMode) {
      console.log(
        '📝 startTextAnimation called - textPrepared:',
        this.textPrepared
      );
    }

    // 少し遅延を入れる
    setTimeout(() => {
      if (
        window.TextAnimation &&
        typeof window.TextAnimation.startGsapAnimation === 'function'
      ) {
        if (this.debugMode) {
          console.log('📝 Starting text animation');
        }

        window.TextAnimation.startGsapAnimation();
      } else {
        console.warn('TextAnimation not available:', window.TextAnimation);
      }
    }, 300);
  }
}

/**
 * グローバルインスタンス
 */
let loadingController = null;

/**
 * 初期化
 */
document.addEventListener('DOMContentLoaded', () => {
  loadingController = new SimpleLoadingController();

  // グローバルAPIとして公開
  window.LoadingScreenController = {
    handleFontLoaded: () => {
      console.log('🔗 Global handleFontLoaded called');
      if (loadingController) {
        loadingController.handleFontLoaded();
      } else {
        console.warn('🔗 loadingController instance not found');
      }
    },
  };

  console.log('🎬 Simple Loading Controller initialized');
});
