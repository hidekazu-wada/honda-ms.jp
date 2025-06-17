/**
 * 改良版ローディング画面制御：画像読み込み完了後に即座にローディング画面を表示し、
 * フォント読み込みを並行して行う。初回訪問時のユーザー体験を向上させる。
 */

/**
 * ローディング画面制御
 */
class ImprovedLoadingController {
  constructor() {
    this.loadingElement = document.querySelector('#loading-screen');
    this.isFirstVisit = document.body.classList.contains('first-visit');
    this.hasHashInUrl = this.checkForHashInUrl(); // ハッシュ検出を追加
    this.fadeOutDuration = 0.8; // フェードアウト時間（秒）
    this.minLoadingTime = 3000; // 最低表示時間（ミリ秒）
    this.debugMode = false;
    this.textPrepared = false; // テキスト準備完了フラグ
    this.fontLoaded = false; // フォント読み込み完了フラグ
    this.imagesLoaded = false; // 画像読み込み完了フラグ
    this.loadingStartTime = null; // ローディング画面表示開始時刻（画像読み込み完了時）
    this.initStartTime = Date.now(); // 初期化開始時刻

    if (this.debugMode) {
      console.log('🎬 Improved Loading controller created:', {
        hasLoadingElement: !!this.loadingElement,
        isFirstVisit: this.isFirstVisit,
        hasHashInUrl: this.hasHashInUrl,
        currentHash: window.location.hash,
        bodyClasses: document.body.className,
        initStartTime: this.initStartTime,
      });
    }

    // 初期化処理を開始
    this.init();
  }

  /**
   * URLにハッシュパラメータが含まれているかチェック
   * @returns {boolean} ハッシュが存在する場合はtrue
   */
  checkForHashInUrl() {
    const hash = window.location.hash;
    return hash && hash.length > 1; // #以外に文字が含まれている場合
  }

  /**
   * 初期化処理
   */
  init() {
    // テキストアニメーションの準備（常に実行）
    this.prepareTextIfNeeded();

    // ページ内リンクの設定を追加
    if (document.readyState === 'complete') {
      this.setupInPageNavigation();
    } else {
      window.addEventListener('load', () => {
        this.setupInPageNavigation();
      });
    }

    // ハッシュパラメータが含まれている場合はローディング制御をスキップ
    if (this.hasHashInUrl) {
      this.skipLoadingAndShowContent();
      return;
    }

    // 初回訪問の場合のみローディング画面制御を実行
    if (this.isFirstVisit && this.loadingElement) {
      // 画像読み込みを監視
      this.checkImagesLoaded();
    } else {
      // リピート訪問の場合は、フォント読み込み完了後に即座にコンテンツ表示
      if (this.debugMode) {
        console.log('🔄 Return visit - will show content directly after font loading');
      }
      // 既にフォント読み込みが完了している可能性をチェック
      this.checkFontStatusOnInit();
    }
  }

  /**
   * 初期化時にフォント読み込み状況をチェック（遅延リトライ方式）
   */
  checkFontStatusOnInit() {
    // document.fonts.ready でフォント読み込み状況を確認
    if (document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (this.debugMode) {
          console.log('🔤 Font status check: fonts are ready - starting text animation');
        }
        this.handleFontLoaded();
      }).catch(() => {
        // フォント読み込み失敗時もアニメーション開始
        if (this.debugMode) {
          console.log('🔤 Font status check: fonts failed but continuing');
        }
        this.handleFontLoaded();
      });
    } else {
      // フォールバック: 500ms後に強制開始
      setTimeout(() => {
        if (!this.fontLoaded) {
          if (this.debugMode) {
            console.log('🔤 Font status check: timeout fallback - starting animation');
          }
          this.handleFontLoaded();
        }
      }, 500);
    }
  }

  /**
   * ローディング画面の画像読み込み状況をチェック
   */
  checkImagesLoaded() {
    if (this.debugMode) {
      console.log('🖼️ Checking loading screen images...');
    }

    const loadingImages = this.loadingElement.querySelectorAll('img');
    
    if (loadingImages.length === 0) {
      // 画像がない場合は即座に表示開始
      this.handleImagesLoaded();
      return;
    }

    let loadedCount = 0;
    const totalImages = loadingImages.length;

    const checkAllLoaded = () => {
      if (loadedCount >= totalImages) {
        this.handleImagesLoaded();
      }
    };

    loadingImages.forEach((img, index) => {
      if (img.complete && img.naturalHeight !== 0) {
        // 既に読み込み済み
        loadedCount++;
        if (this.debugMode) {
          console.log(`🖼️ Image ${index + 1} already loaded`);
        }
      } else {
        // 読み込み待ち
        img.addEventListener('load', () => {
          loadedCount++;
          if (this.debugMode) {
            console.log(`🖼️ Image ${index + 1} loaded (${loadedCount}/${totalImages})`);
          }
          checkAllLoaded();
        });

        img.addEventListener('error', () => {
          loadedCount++; // エラーでも進行
          if (this.debugMode) {
            console.warn(`🖼️ Image ${index + 1} failed to load, continuing anyway`);
          }
          checkAllLoaded();
        });
      }
    });

    // 既に全て読み込み済みの場合
    checkAllLoaded();

    // フォールバック：500ms後に強制的に開始
    setTimeout(() => {
      if (!this.imagesLoaded) {
        if (this.debugMode) {
          console.log('🖼️ Image loading timeout - starting anyway');
        }
        this.handleImagesLoaded();
      }
    }, 500);
  }

  /**
   * 画像読み込み完了時の処理
   */
  handleImagesLoaded() {
    if (this.imagesLoaded) return; // 重複実行防止
    
    this.imagesLoaded = true;
    this.loadingStartTime = Date.now();

    if (this.debugMode) {
      const totalElapsed = this.loadingStartTime - this.initStartTime;
      console.log('🖼️ Images loaded - showing loading screen:', {
        totalElapsedFromInit: totalElapsed + 'ms',
        loadingStartTime: this.loadingStartTime,
      });
    }

    // ローディング画面を表示
    this.showLoadingScreen();

    // フォント読み込みも完了している場合は最低表示時間をチェック
    if (this.fontLoaded) {
      this.checkMinimumLoadingTime();
    }
  }

  /**
   * ローディング画面を表示（初回訪問時のみ）
   */
  showLoadingScreen() {
    if (!this.loadingElement) return;

    if (this.debugMode) {
      console.log('🌟 Showing loading screen');
    }

    // ローディング画面を即座に表示（CSSのgridレイアウトを保持）
    this.loadingElement.style.opacity = '1';
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
      const elapsedFromInit = Date.now() - this.initStartTime;
      const elapsedFromLoading = this.loadingStartTime ? Date.now() - this.loadingStartTime : 0;
      console.log('🔤 handleFontLoaded called:', {
        isFirstVisit: this.isFirstVisit,
        hasLoadingElement: !!this.loadingElement,
        textPrepared: this.textPrepared,
        imagesLoaded: this.imagesLoaded,
        elapsedFromInit: elapsedFromInit + 'ms',
        elapsedFromLoading: elapsedFromLoading + 'ms',
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

    // 初回訪問時：画像読み込み完了を待ってから最低表示時間をチェック
    if (this.imagesLoaded) {
      this.checkMinimumLoadingTime();
    } else {
      // 画像読み込みがまだ完了していない場合は待機
      if (this.debugMode) {
        console.log('🔤 Font loaded but images not ready yet - waiting for images');
      }
    }
  }

  /**
   * 最低表示時間をチェックしてローディング画面を制御
   * 画像読み込み完了時とフォント読み込み完了時の両方から呼び出される
   */
  checkMinimumLoadingTime() {
    // 画像とフォントの両方が完了している場合のみ進行
    if (!this.imagesLoaded || !this.fontLoaded) {
      if (this.debugMode) {
        console.log('⏱️ Waiting for both images and fonts:', {
          imagesLoaded: this.imagesLoaded,
          fontLoaded: this.fontLoaded,
        });
      }
      return;
    }

    const elapsedTime = Date.now() - this.loadingStartTime;
    const remainingTime = this.minLoadingTime - elapsedTime;

    if (this.debugMode) {
      console.log('⏱️ Checking minimum loading time:', {
        elapsedTime: elapsedTime + 'ms',
        remainingTime: remainingTime + 'ms',
        imagesLoaded: this.imagesLoaded,
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
   * ハッシュナビゲーション時のローディングスキップ処理
   */
  skipLoadingAndShowContent() {
    const hash = window.location.hash;
    const targetElement = hash ? document.querySelector(hash) : null;

    // ローディング画面を即座に非表示
    if (this.loadingElement) {
      this.loadingElement.style.display = 'none';
    }

    // is-loadingクラスを即座に削除
    document.body.classList.remove('is-loading');

    // 一時的にスムーズスクロールを無効化
    const originalScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';

    // ハッシュターゲットが存在する場合は手動でナビゲーション実行
    if (targetElement) {
      this.executeHashNavigation(targetElement);
      
      // スクロール完了後に元に戻す
      setTimeout(() => {
        document.documentElement.style.scrollBehavior = originalScrollBehavior || '';
      }, 1000);
    }
  }

  /**
   * 手動でハッシュナビゲーションを実行
   * @param {HTMLElement} targetElement - ジャンプ先の要素
   */
  executeHashNavigation(targetElement) {
    // CSSのscroll-padding-topの値を取得する関数
    const getScrollPaddingTop = () => {
      const computedStyle = window.getComputedStyle(document.documentElement);
      const scrollPaddingTop = computedStyle.getPropertyValue('scroll-padding-top');
      return parseInt(scrollPaddingTop, 10) || 0;
    };
    
    // GSAPやその他のアニメーション完了を待つ
    const waitTime = this.isFirstVisit ? 500 : 300;
    
    setTimeout(() => {
      // まず一旦ページトップにスクロール（即座に）
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });
      
      // 少し待ってから目的地へスムーズスクロール
      setTimeout(() => {
        const scrollOffset = getScrollPaddingTop();
        const targetPosition = targetElement.offsetTop - scrollOffset;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }, 100); // 100ms後にスムーズスクロール開始
    }, waitTime);
  }

  /**
   * ページ内リンクのナビゲーション設定
   */
  setupInPageNavigation() {
    // CSSのscroll-padding-topの値を取得する関数
    const getScrollPaddingTop = () => {
      const computedStyle = window.getComputedStyle(document.documentElement);
      const scrollPaddingTop = computedStyle.getPropertyValue('scroll-padding-top');
      return parseInt(scrollPaddingTop, 10) || 0;
    };

    // ページ内リンクを取得
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        // 既存ページ内でのリンククリック時
        const hash = link.getAttribute('href');
        const target = document.querySelector(hash);
        
        if (target) {
          e.preventDefault();
          const scrollOffset = getScrollPaddingTop();
          const targetPosition = target.offsetTop - scrollOffset;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // URLハッシュを更新
          history.pushState(null, null, hash);
        }
      });
    });

    if (this.debugMode) {
      console.log(`🔗 Set up in-page navigation for ${anchorLinks.length} links`);
    }
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
  loadingController = new ImprovedLoadingController();

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

  console.log('🎬 Improved Loading Controller initialized');
});
