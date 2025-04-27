/**===============================
 * 共通処理
 *
 * Warning:
 *  必ずpluginを除くどのjsよりも一番最初に読み込みすること
 *===============================**/

//グローバル名前空間「MyProfileCommon」
//他のjsから自由に参照できる
window.MyProfileCommon = window.MyProfileCommon || {};

//SPのブレークポイントpx値
MyProfileCommon.breakPointSp = parseInt(
  getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-sp')
);
