//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')
// import createActionSide from 'components/actionside'

//nav 底部导航
import adapterNav from '../nav/adapter'
import navData from '../nav/data'



Pager({
  data: {
    moto: Pager.item({
      title: [
        {
          title: '如有建议，问题，可加此交流群',
          itemClass: 'size16 mb-10-r'
        },
        {
          img: 'https://7373-ss-1-4vn7o-1259184764.tcb.qcloud.la/qq.jpg?sign=d732bb8f8afff56c23168fb065e1f686&t=1557884675',
        },
        {
          title: '您的赞赏，是对作者最大的支持！！',
          itemClass: 'size16 mb-10-r mt-40-r',
        },
        {
          img: 'https://7373-ss-1-4vn7o-1259184764.tcb.qcloud.la/pay.jpeg?sign=d4eba9ce1c8e12ee8709452c1a608e2f&t=1558523193',
          tap: 'onImg?src=https://7373-ss-1-4vn7o-1259184764.tcb.qcloud.la/pay.jpeg?sign=d4eba9ce1c8e12ee8709452c1a608e2f&t=1558523193'
        },
      ],
      itemClass: 'flex-column-start-center padding-default bg-fff ss-my scroll-wrap-nav'
    }),
    nav: Pager.list({
      data: adapterNav(navData, 1),
      listClass: 'list-nav',
    })
  },

  onLongPress: function(e, inst) {
    Pager.alert('我是长按响应')
  },
  onImg: function(e){
    var current = e.currentTarget.dataset._query.src;
    wx.previewImage({
      current: current,
      urls: [current]
    })    
  },
  onNav: function(e, query, inst){
    const theTap = query.nav.replace(/_/g,"/")
    if (theTap) {
      switch (theTap) {
        case theTap:
          wx.redirectTo({
            url: '../'+theTap+'/index'
          })
        break;
      }
    }
  },


  onShow: function () {
    
  },

  onReady: function () {

  },
  
  onLoad: function () {
    
  },
  
  getUserInfo: function(e) {

  }
})
