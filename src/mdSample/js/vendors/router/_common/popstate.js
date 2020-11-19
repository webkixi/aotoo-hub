// 消除各个浏览器中的差异
// chrome在早期版本中(~70版本左右)，监听popstate有bug(pc/移动兼容问题)，下列做法避免之
export default function(HOOKS) {
  var blockPopstateEvent = document.readyState !== "complete";

  window.addEventListener("load", function () {
    setTimeout(function () {
      blockPopstateEvent = false;
    }, 0)
  }, false)

  window.addEventListener("popstate", function (evt) {
    if (blockPopstateEvent && document.readyState == "complete") {
      evt.preventDefault()
      evt.stopImmediatePropagation()
    } else {
      HOOKS.emit('__goback', evt)
    }
  }, false)
}