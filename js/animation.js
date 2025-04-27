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
  if (viewportWidth <= MyProfileCommon.breakPointSp) {
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
