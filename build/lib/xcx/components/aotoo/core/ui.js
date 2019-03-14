export function alert(text) {
  wx.showModal({
    content: text,
    showCancel: false
  });
}