//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')

Pager({
  data: {
    motto: Pager.list({
      type: {
        is: 'slip',
        option: ['a', 10, 60]
      },
      itemClass: 'move-it',
      data: [
        { 
          title: '标题一，支持tap, longpress响应', 
          li: [{ title: '删除', itemStyle: 'background-color: red', fake_aim: 'xxx' }],
          catchtouchstart: true,
          catchtouchmove: true,
          catchtouchend: true,
          longpress: 'xxx?long',
          tap: 'xxx'
        },
        {
          title: '标题二',
          li: [
            { title: '详情', itemStyle: 'background-color: #cfcfcf' },
            { title: '删除', itemStyle: 'background-color: red', fake_aim: 'xxx?delete' }
          ],
          catchtouchstart: true,
          catchtouchmove: true,
          catchtouchend: true,
        },
        {
          title: '标题三',
          li: [
            { title: '喜欢', itemStyle: 'background-color: #cfcfcf' },
            { title: '相信', itemStyle: 'background-color: #cfcfcf' },
            { title: '守护', itemStyle: 'background-color: #cfcfcf' },
            { title: '详情', itemStyle: 'background-color: #cfcfcf' },
            { title: '删除', itemStyle: 'background-color: red', fake_aim: 'xxx?delete' }
          ],
          catchtouchstart: true,
          catchtouchmove: true,
          catchtouchend: true,
        }
      ],
      listClass: 'slip-item'
    })
  },
  xxx: function (e, param, inst) {
    if (param.long) {
      Pager.alert('longpress响应')
    } else if (param.delete) {
      Pager.alert('点击了删除按钮')
    } else {
      Pager.alert('tap响应')
    }
  }
})
