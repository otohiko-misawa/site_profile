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

  //#もしくは''で始まるかどうかチェック(明示的なページ内リンクかどうか)
  const isPageInternalLink = href.startsWith('#') || href === '';

  //現在のページのファイル名取得(将来WordPressにも対応)
  const currentPageUrl = window.location.pathname;
  const currentPageFileName = currentPageUrl.split('/').pop(); // パスの最後の部分を取得（ファイル名）
  const currentPageName = currentPageFileName.replace(/\.[^/.]+$/, ''); // 拡張子があれば削除
  console.log('url: ' + currentPageUrl);
  console.log('fileName: ' + currentPageFileName);
  console.log('name: ' + currentPageName);

  //現在のページ名を含むリンク(index.html#aboutなども含む)
  const hrefWithoutHashId = href.includes('#') ? href.split('#')[0] : href;
  const isCurrentPageLink =
    currentPageName && hrefWithoutHashId.includes(currentPageName);

  if (isPageInternalLink || isCurrentPageLink) {
    //#がある場合はid部分だけ抽出
    let targetId = '';
    if (href.includes('#')) {
      targetId = href.substring(href.indexOf('#'));
    }

    //ページ内リンクとして処理
    scrollToTargetElement(targetId);
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
