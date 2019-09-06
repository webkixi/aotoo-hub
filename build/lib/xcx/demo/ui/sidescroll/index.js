//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')

const scrollType = {
    is: 'scroll',
    "scroll-x": true,
    "scroll-y": false,
  }

function itemSwiper(data, listClass) {
  return {
    type: scrollType,
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
      listClass: 'ul hei-p100 bg-default'
    }),
  },

  onShow: function () {
    
  },

  onReady: function () {

  },

  onLoad: function () {

  }
})
