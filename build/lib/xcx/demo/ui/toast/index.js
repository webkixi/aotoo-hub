//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')

const articleData = {
  title: [
    {
      title: 'toast',
      itemClass: 'btn-default',
      tap: 'onClick'
    }
  ],
  titleClass: 'ml-40-r',
  itemClass: 'pages-wrap-default bg-fff'
}

const toastCom = {

}

Pager({
  data: {
    motto: Pager.item(articleData)
  },
  onClick: function(e, query, inst){
    wx.showModal({
      title: 'total',
      icon: 'success',
      duration: 2000
    })
    
  }
})
