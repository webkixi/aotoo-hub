/**
 * 弹出层 广告
 */
import _message from "components/items/message";

function isDuringDate (beginDateStr, endDateStr) {
  var curDate = new Date(),
      beginDate = new Date(beginDateStr),
      endDate = new Date(endDateStr);
  if (curDate >= beginDate && curDate <= endDate) {
      return true;
  }
  return false;
}


const message = _message()

function setAdCookie () {
  var curDate = new Date();
  //当前时间戳  
  var curTamp = curDate.getTime();
  //当前日期
  var curDay = curDate.toLocaleDateString();
  // var brow = $.browser;
  var curWeeHours = 0;
  curWeeHours = new Date(curDay).getTime() - 1;
  // if (brow.safari) {
  //     //当日凌晨的时间戳,减去一毫秒是为了防止后续得到的时间不会达到00:00:00的状态  
  //     curWeeHours = new Date(curDay).getTime() + (8 * 60 * 60 * 1000) - 1;
  // } else {
  //     curWeeHours = new Date(curDay).getTime() - 1;
  // }
  //当日已经过去的时间（毫秒）  
  var passedTamp = curTamp - curWeeHours;
  //当日剩余时间  
  var leftTamp = 24 * 60 * 60 * 1000 - passedTamp;
  var leftTime = new Date();
  leftTime.setTime(leftTamp + curTamp);
  document.cookie = 'showAd=true;expires='+leftTime.toGMTString()
}

module.exports = function (data1, data2) {
  // data1= '2018/09/17', data2 = '2030/09/17'
  
  const kk = ui_item({
    body: [{img: {src: '/images/ui/saui.jpeg'}, itemClass: 'item-pic-lg'}],
    dot: [{title: ' ', itemClass: 'item-close close-circle-2', aim: 'onClosex'}],
    footerClass: 'item-footer',
    bodyClass: 'item-body',
    itemClass: 'ss-modal item-ad',
    methods: {
      onClosex() {
        message.close()
      }
    }
  })
  const status = isDuringDate(data1, data2)
  const xx = document.cookie.indexOf('showAd') < 0 ? true : false
  if (status && xx || !data1) {
    message.modal(<kk.UI/>)
    setAdCookie()
  }
}