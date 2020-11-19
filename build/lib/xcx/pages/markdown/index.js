//index.js
//获取应用实例
const app = getApp()
const Pager = require('../../components/aotoo/core/index')
const indexMd = require('./index.md')
Pager({
  data: {
    markdownConfig: {
      listClass: 'card-it',
      content: indexMd
    },
  }
})
