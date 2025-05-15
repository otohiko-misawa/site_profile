// ================================
// スライダー関連
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
      breakpoint: MyProfileCommon.breakPointSp,
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

$('.works_slide').slick({
  centerMode: true,
  centerPadding: '60px',
  dots: true,
  autoplay: true,
  speed: 800,
  arrows: false,
  responsive: [
    {
      //SP幅
      breakpoint: MyProfileCommon.breakPointSp,
      settings: {},
    },
  ],
});
