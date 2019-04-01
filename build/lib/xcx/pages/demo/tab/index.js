//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')

const tabData = {
  data: [
    {
      title: 'aaa',
      content: 'aaa-content'
    },
    {
      title: 'bbb',
      content: 'bbb-content'
    },
    {
      title: 'ccc',
      content: 'ccc-content'
    },
  ]
}


Pager({
  data: {
    motto: tabData
  }
})
