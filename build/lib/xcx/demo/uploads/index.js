//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')
const lib = Pager.lib

Pager({
  data: {
    uploads: {
      $$id: 'myupimg',
      server: 'http://localhost:8600/upimg',
      data: [
        {img: '/images/huatong.png'}
      ],
    },
    submitButton: {
      title: '上传图片',
      aim: 'upimg'
    },
  },

  upimg: function (e, param, inst) {
    const upinst = Pager.getElementsById('myupimg')
    upinst.upload().then(res=>{
      console.log(res);
    })
  },


  onShow: function () {
    
  },

  onReady: function () {

  },

  onLoad: function () {

  }
})
