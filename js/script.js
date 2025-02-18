// ================================
// ナビゲーション関連ロジック
// ================================
//ナビゲーション展開クラス切り替えメソッド
function toggleNavOpenClass(isNavOpen = null) {
  $('body').toggleClass('is-nav-open', isNavOpen);
}

//ハンバーガーメニュー開閉処理
$('.nav_btn').on('click', () => {
  toggleNavOpenClass();
});

//aタグから各セクションへのスクロール処理
document.querySelectorAll('nav a[href]').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); //デフォルトaタグの遷移イベントを切る

    const calculateScrollPosition = (element) => {
      // ヘッダーにセクションのh2が隠れないようにoffsetで調整している
      const headerHeight = document.querySelector('header').offsetHeight;
      const position = element.offsetTop;
      const offsetManual = 40; //空白微調整したい時用

      return position - (headerHeight + offsetManual);
    };
    const startScrollAnimation = (posY) => {
      //NOTE:
      // アニメーション部分のみ使い勝手がいいjQueryにしてみる
      $('html').animate(
        {
          scrollTop: posY,
        },
        {
          duration: 300,
        }
      );
    };

    const targetId = e.target.getAttribute('href');
    if (targetId === '') {
      console.error('nav a[href]にリンクが未設定');
      return;
    }

    toggleNavOpenClass(false);

    //"#"のみ場合はページTOP
    if (targetId === '#') {
      startScrollAnimation(0);
      return;
    }

    const targetElm = document.querySelector(targetId);

    const pos = calculateScrollPosition(targetElm);
    startScrollAnimation(pos);
  });
});
