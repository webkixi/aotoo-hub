//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')

const tabData = {
  scroll: true,
  multipy: true,
  data: [
    {
      title: '选项一',
      content: '如果使用scroll, scroll标签对flex是不支持的111111',
    },
    {
      title: '选项二',
      content: '如果使用scroll, scroll标签对flex是不支持的122222',
    },
    {
      title: '选项三',
      content: '如果使用scroll, scroll标签对flex是不支持的33333',
    },
    {
      title: '选项四',
      content: '如果使用scroll, scroll标签对flex是不支持的44444',
    },
    {
      title: '选项五',
      content: '如果使用scroll, scroll标签对flex是不支持的5555',
    },
    {
      title: '选项六',
      content: '如果使用scroll, scroll标签对flex是不支持的66666',
    },
    {
      title: '选项七',
      content: '如果使用scroll, scroll标签对flex是不支持的777777',
    }
  ],
  listClass: 'tabs-default-scroll hei-p100 ',
  // itemClass: 'card-bg'
}


Pager({
  data: {
    motto: tabData
  },
  onLoad: function(e){
    console.log(e)
  }
  // onLoad(){
  //   setTimeout(() => {
  //     this.setData({
  //       motto: tabData
  //     })
  //   }, 3000);
  // }
})
