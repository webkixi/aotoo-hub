//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')

const tabData = {
  data: [
    {
      title: '选项一',
      content: '如果使用scroll: 1、scrlll对flex是不支持的； 2、scroll-y为true时，要设置高度才能正常滚动'
    },
    {
      title: '选项二',
      content: '如果使用scroll: 1、scrlll对flex是不支持的； 2、scroll-y为true时，要设置高度才能正常滚动。B'
    },
    {
      title: '选项三',
      content: '如果使用scroll: 1、scrlll对flex是不支持的； 2、scroll-y为true时，要设置高度才能正常滚动。C'
    },
    {
      title: '选项四',
      content: '如果使用scroll: 1、scrlll对flex是不支持的； 2、scroll-y为true时，要设置高度才能正常滚动。C'
    },
  ],
  listClass: 'tabs-default-scroll hei-p100 bg-fff'
}


Pager({
  data: {
    motto: tabData
  }
})