//index.js
//获取应用实例
const app = getApp()
const Pager = require('../../components/aotoo/core/index')
let miHtml = require('./mi.html')

Pager({
  data: {
    htmlConfig: {
      options: {
        img: {mode: 'scaleToFill'}
      },
      listClass: 'card-it',
      content: miHtml
    }
  },

  onReady(){}
})
