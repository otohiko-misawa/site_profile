// ================================
// ナビゲーション関連ロジック
// ================================

//ナビゲーション展開クラス切り替えメソッド
function toggleNavOpenClass(isNavOpen = null) {
  $('body').toggleClass('is-nav-open', isNavOpen);
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
    //NOTE:
    // ここは、アニメーション操作のみ使い勝手がいいjQuery
    $('html').animate(
      {
        scrollTop: posY,
      },
      {
        duration: 300,
      }
    );
  };

  if (scrollToElementId === '') {
    console.error('nav a[href]にリンクが未設定');
    return;
  }

  toggleNavOpenClass(false);

  const pos = calculateScrollPosition(scrollToElementId);
  startScrollAnimation(pos);
}

//ハンバーガーメニュー開閉処理
$('.nav_btn').on('click', () => {
  toggleNavOpenClass();
});

document.querySelectorAll('nav a[href]').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); //デフォルトaタグの遷移イベントを切る
    scrollToTargetElement(e.target.getAttribute('href'));
  });
});

document.querySelector('header h1 a').addEventListener('click', (e) => {
  e.preventDefault(); //デフォルトaタグの遷移イベントを切る
  scrollToTargetElement(e.target.getAttribute('href'));
});
