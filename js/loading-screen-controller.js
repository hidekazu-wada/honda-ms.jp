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
    this.debugMode = true;

    if (this.debugMode) {
      console.log('🎬 Loading controller created:', {
        hasLoadingElement: !!this.loadingElement,
        isFirstVisit: this.isFirstVisit,
        bodyClasses: document.body.className,
      });
    }
  }

  /**
   * フォント読み込み完了時の処理（外部から呼び出される）
   */
  handleFontLoaded() {
    if (this.debugMode) {
      console.log('🔤 handleFontLoaded called:', {
        isFirstVisit: this.isFirstVisit,
        hasLoadingElement: !!this.loadingElement,
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

    if (this.debugMode) {
      console.log('🔤 Font loaded - hiding loading screen');
    }

    // ローディング画面をフェードアウト
    this.hideLoadingScreen();
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
      console.log('📝 startTextAnimation called');
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
