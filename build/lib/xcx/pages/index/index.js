//index.js
//获取应用实例
const app = getApp()
const Pager = require('../../components/aotoo/core/index')
const lib = Pager.lib

Pager({
  data: {
    htmlConfig: {
      itemClass: 'nav-item',
      title: 'html组件',
      url: '/pages/html/index#class=nav-btn'
    },

    docConfig: {
      itemClass: 'nav-item',
      title: '文档说明',
      url: '/pages/markdown/index#class=nav-btn'
    }
  }
})
