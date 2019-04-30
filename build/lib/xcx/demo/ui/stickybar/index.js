//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')
const swiperType = {
    is: 'swiper',
    "indicator-dots": false,
    "indicator-color": "rgba(0, 0, 0, .2)",
    "previous-margin": "30rpx",
    "next-margin": "30rpx",
    circular: false,
    duration: 300
  }

function itemSwiper(data, listClass) {
  return {
    type: swiperType,
    data: data,
    itemClass: 'd-swiper-title',
    listClass: 'd-swiper-ul ds-li-' + listClass
  }
}

const destructiveGarbage = itemSwiper([
  {title: {title: '基础信息1', itemClass: 'xxx', aim: 'aim?a=1&b=2'}},
  {title: '基础信息2'},
  {title: '基础信息3'},
], 'bg-dc251a')

const recycleGarbage = itemSwiper([
  {title: '绿色信息1'},
  {title: '绿色信息2'},
  {title: '绿色信息3'},
], 'bg-02943e')

const unrecycleGarbage = itemSwiper([
  {title: '黄色信息1'},
  {title: '黄色信息2'},
  {title: '黄色信息3'},
], 'bg-0092df')

const kitchenGarbage = itemSwiper([
  {title: '蓝色信息1'},
  {title: '蓝色信息2'},
  {title: '蓝色信息3'},
], 'bg-0092df')

const otherGarbage = itemSwiper([
  {title: '灰色信息1'},
  {title: '灰色信息2'},
  {title: '灰色信息3'},
], 'bg-e99718')

function formatTitle(title) {
  return {
    title: title,
    itemClass: 'item-title'
  }
}

Pager({
  data: {
    menuData: Pager.list({
      type: {
        is: 'scroll'
      },
      data: [
        {
          title: formatTitle('红色信息'),
          "@list": destructiveGarbage
        }, {
          title: formatTitle('绿色信息'),
          "@list": recycleGarbage, itemClass: 'item-title'
        }, {
          title: formatTitle('蓝色信息'),
          "@list": kitchenGarbage, itemClass: 'item-title'
        }, {
          title: formatTitle('黄色信息'),
          "@list": otherGarbage, itemClass: 'item-title'
        },
      ],
      class: 'd-swiper-item',
      listClass: 'ul'
    }),

    stickyBottomBar: Pager.item({
      title: [{
        title: '',
        img: {src: '/images/huatong.png', itemStyle: 'width: 60px;'},
        touchstart: 'onRecode',
        touchend: 'onStopRecode',
        itemClass: 'recodeButton'
      }],
      itemClass: 'stickyBottomBar'
    })
  },

  onRecode: function(e, param, inst) {
    console.log('=========== 11111');
  },

  onStopRecode: function(e, param, inst) {
    console.log('========= 22222');
    wx.showToast({
      title: '正在识别……',
      icon: 'loading',
      duration: 2000
    })
  },

  onShow: function () {
    
  },

  onReady: function () {

  },

  onLoad: function () {

  },

  aim: function(e, param, inst) {
    console.log('====== mmmmm');
    const target = e.currentTarget
    const currentDset = target.dataset
    const theAim = currentDset.aim
  }
})
