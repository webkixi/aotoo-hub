//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')

const tabData = {
  $$id: 'sstree',
  data: [
    {
      title: '选项一',
      content: '没什么大不了，死不了就还好。A'
    },
    {
      title: '选项二',
      content: '没什么大不了，死不了就还好。B'
    },
    {
      title: '选项三',
      content: '没什么大不了，死不了就还好。C'
    },
  ],
  listClass: 'tabs-default hei-p100 bg-fff'
}


Pager({
  data: {
    motto: tabData
  }
})
