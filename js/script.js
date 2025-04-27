//===============================
// 共通
//===============================

//SPのブレークポイントpx値
const breakPointSp = parseInt(
  getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-sp')
);

// ================================
// ナビゲーション関連
// ================================

//ナビゲーション展開クラス切り替えメソッド
function toggleNavOpenClass(isNavOpen = null) {
  $('body').toggleClass('is-nav-open', isNavOpen);
}

/**
 * リンクの種類により適切な処理を行うメソッド
 *
 * #で始まるページ内リンクの場合はスクロール、
 * それ以外は通常のリンク挙動
 * @param {string} href - リンク先のURL
 * @return {boolean} - ページ内リンクだったらtrue、それ以外はfalse
 **/
function handleLinkNavigation(href) {
  if (href === null) {
    console.error('リンク先が指定されていません');
    return false;
  }

  //#もしくは''で始まるかどうかチェック(ページ内リンクかどうか)
  const isPageInternalLink = href.startsWith('#') || href === '';

  if (isPageInternalLink) {
    //ページ内リンクとして処理
    scrollToTargetElement(href);
    return true;
  } else {
    //外部リンクなので通常動作
    return false;
  }
}

//aタグのhrefで指定したIDの要素にスクロールするメソッド
function scrollToTargetElement(scrollToElementId) {
  //要素のIDからスクロール位置を返す
  const calculateScrollPosition = (targetElementId) => {
    //空もしくは"#"のみ場合はページTOPへ
    if (targetElementId === '' || targetElementId === '#') {
      return 0;
    }

    const targetElement = document.querySelector(targetElementId);

    // ヘッダーにセクションのh2が隠れないようにoffsetで調整している
    const headerHeight = document.querySelector('header').offsetHeight;
    const position = targetElement.offsetTop;
    const offsetManual = 40; //空白微調整したい時用
    //TODO:できたら自動的に要素が画面中央らへんに収まるコード書いてみる

    return position - (headerHeight + offsetManual);
  };

  //スクロールアニメーション実行
  const startScrollAnimation = (posY) => {
    $('html').animate(
      {
        scrollTop: posY,
      },
      {
        duration: 300,
      }
    );
  };

  toggleNavOpenClass(false);

  const pos = calculateScrollPosition(scrollToElementId);
  startScrollAnimation(pos);
}

//ハンバーガーメニュー開閉処理
$('.nav_btn').on('click', () => {
  toggleNavOpenClass();
});

$('nav')
  .find('a[href]')
  .on('click', (e) => {
    const isInternalLink = handleLinkNavigation($(e.target).attr('href'));
    //ページ内リンクのみデフォルトaタグ動作防止
    if (isInternalLink) {
      e.preventDefault();
    }
  });

$('header')
  .find('h1 a')
  .on('click', (e) => {
    const isInternalLink = handleLinkNavigation($(e.target).attr('href'));
    //ページ内リンクのみデフォルトaタグ動作防止
    if (isInternalLink) {
      e.preventDefault();
    }
  });

// ================================
// メインビジュアルスライド関連
// ================================

$('#mainvisual').slick({
  dots: true,
  autoplay: true,
  speed: 800,
  //NOTE:画面いっぱいの画像要素にarrowが有効になっていると
  //画面幅+arrow分確保され、画面全体の表示領域がバグるので明示的OFF。
  arrows: false,
  responsive: [
    {
      //SP幅
      breakpoint: breakPointSp,
      settings: {
        //NOTE:スマホだと見栄えと操作性悪いのでフェード式
        fade: true,
        swipe: false,
        cssEase: 'linear',
        dots: false,
      },
    },
  ],
});

// ===============================
// PHOTOのフェードイン
// ===============================
const $photoList = $('.photo_list');
const $photoCards = $('.photo_card');

$(window).on('scroll', () => {
  const viewportWidth = window.innerWidth;

  //in-viewのclassを付与
  const attachInViewClass = ($jqElement) => {
    if ($jqElement.hasClass('in-view')) {
      return;
    }

    //ビューポートアニメーション
    $jqElement.addClass('in-view');

    //回転のアニメーション遅延実行
    setTimeout(() => {
      $jqElement.addClass('in-view-after');
    }, 1500);
  };

  //スマホの場合
  if (viewportWidth <= breakPointSp) {
    //各カード要素個別にアニメーションさせる
    $photoCards.each(function () {
      const $card = $(this);
      const isInView = $card.inView('topOnly', 90);
      if (isInView) {
        attachInViewClass($card);
      }
    });
  }
  //PCの場合
  else {
    //カードの親要素に掛かったらアニメーション開始
    const isInView = $photoList.inView('topOnly', 150);
    if (isInView) {
      attachInViewClass($photoList);
    }
  }
});

// ===============================
// WORKSのフェードイン
// ===============================
const $worksCards = $('.works_card');

$(window).on('scroll', () => {
  //in-viewのclassを付与
  const attachInViewClass = ($jqElement) => {
    if ($jqElement.hasClass('in-view')) {
      return;
    }

    //ビューポートアニメーション
    $jqElement.addClass('in-view');
  };

  //各カード要素個別にアニメーションさせる
  $worksCards.each(function () {
    const $card = $(this);
    const isInView = $card.inView('topOnly', 120);
    if (isInView) {
      attachInViewClass($card);
    }
  });
});
