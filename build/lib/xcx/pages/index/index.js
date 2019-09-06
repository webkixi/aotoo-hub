//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')

import getData from './data'
import adapterModal from './modal'
import inputTips from '../tips/inputtips'


const adapterMenu = (res) => {
  let output = []
  res.map( item => {
    output.push({
      title: {
        title: item.title,
        itemClass: 'size16 fw-bold color-active plr-default bb-default lhei-88-r'
      },
      idf: item.id,
      // liClass: ''
    })
    item.list.map( itemxx => {
      output.push({
        title: [
          !itemxx.isNews
            ? { title: itemxx.title }
            : {
              title: [{title: itemxx.title, itemClass: 'color-minor'}, {title: ' ', itemClass: 'icon-dot-small ss-absolute-r-20-m'}],
              titleClass: 'ss-relative'
            },
          {title: itemxx.littleTitle, itemClass: 'icon-arrows-r color-grey size12'}
        ],
        titleClass: 'item-border flex-row-between-center color-active hei-p100',
        parent: item.id,
        itemClass: 'item-bb-np ss-focus hei-104-r ss-sizing-border plr-default',
        tap: item.id == 'form' ? 'onTap?demo='+item.id+'_'+itemxx.attrx : item.id == 'spider' ? 'onTap?demo='+itemxx.attrx : 'onTap?demo=ui_'+itemxx.attrx
        // tap: 'onTap?demo='+item.id+'/'+itemxx.attrx
      })
    })
  })
  return output
}

Pager({
  data: {
    isScrollx: false,
    headLogo: Pager.item({
      title: [
        {
          img: {
            src: '/images/logo.png',
            itemClass: 'logo-size border-radius-p100 m-auto'
          },
        },
        {
          title: 'SaUi',
          itemClass: 'size22 color-fff mt-10-r fw-bold'
        },
      ],
      body: [
        {
          title: [
            {
              title: 'SaUi是基于Aotoo而来，详细了解!'
            },
            {
              title: 'www.agzgz.com',
              itemClass: 'fw-bold'
            }
          ],
          titleClass: 'size12 color-grey '
        },
        {
          title: '交流打赏',
          itemClass: 'index-btn',
          tap: 'onClickCommunication'
        }
      ],
      itemClass: 'index-header plr-default',
      titleClass: 'ss-center padding-30-r',
      bodyClass: 'flex-row-between-center display-bg-list-default m-auto box-shadow hei-152-r ss-sizing-border'
    }),
    menuData: Pager.tree({
      data: adapterMenu(getData.data),
      listClass: 'ss-tree-list bg-default',
    }),
    tipsX: inputTips
  },

  onTap: function(e, query, inst) {
    const theTap = query.demo.replace(/_/g,"/")
    if (theTap) {
      switch (theTap) {
        case theTap:
          wx.navigateTo({
            url: '../../demo/'+theTap+'/index'
          })
        break;
      }
    }
  },

  onShow: function () {},

  onReady: function () {
    wx.hideLoading()
    this.modalFunc('tipsX', 'update', adapterModal.adapterItemUpdate(getData.actionSideData))
  },

  modalFunc(id, type, data) {
    const that = this
    const $actionSide = this.getElementsById(id)
    that.setData({isScrollx: false})
    $actionSide.hooks.once('hide', function(){
      that.setData({isScrollx: true})
    })
    $actionSide.reset().mid({
     title: [
      type == 'update' ?
        {
          '@item': {
            title: [
              {
                title: '最新更新',
                itemClass: 'm-title-fs'
              },
              {
                title: '持续的更新，只为了更好的累积',
                itemClass: 'm-desc-fs'
              }
            ],
            dot: data,
            titleClass: 'color-fff item-header',
            itemClass: 'item-wrapper item-wrapper-1 hei-p100 wid-p100'
          },
          itemClass: 'index-swiper-modal'
        }
      : {
          "@list": data,
          listClass: 'index-swiper-modal'
        },
        {
          title: ' ',
          itemClass: 'custom-closeIt'
        }
     ]
    }, '2000')
  },

  onClickCommunication: function() {
    this.modalFunc('tipsX', '', adapterModal.adapterItemSwiper())
    
  },
  
  onLoad: function () {
    wx.showLoading({title: '加载中'})
  },

  // gourl(e, param){
  //   const page = param.page
  //   const url = `../../demo/ui/${page}/index`
  //   wx.navigateTo({ url })
  // }
})


//nav 底部导航
// import adapterNav from '../nav/adapter'
// import navData from '../nav/data'

    // nav: Pager.list({
    //   // type: {
    //   //   is: 'swiper',
    //   //   current: '0',
    //   // },
    //   data: adapterNav(navData, 0),
    //   listClass: 'list-nav',
    // }),

  // onNav: function(e, query, inst){
  //   const modal = this.getElementsById('modal')
  //   const theTap = query.nav.replace(/_/g,"/")
  //   if (theTap) {
  //     if (theTap == 'close') {
  //       if (this.announcement) {
  //         modal.hide()
  //       } else {
  //         this.announcement = true
  //         modal.hooks.emit('announc', modal)
  //       }
  //     }
  //     else {
  //       switch (theTap) {
  //         case theTap:
  //           wx.redirectTo({
  //             url: '../'+theTap+'/index'
  //           })
  //         break;
  //       }
  //     }
  //   }
  // },

// let modal = this.getElementsById('modal')
    // modal.hooks.once('hide', function(){
    //   that.setData({isScrollx: true})
    //   that.announcement = false
    // })
    // modal.hooks.once('announc', function (md) {
    //   md.reset()
    //   .css({
    //     width: '90%',
    //     height: '70%',
    //     overflow: 'hidden',
    //     'border-radius': '10rpx',
    //     top: "-80px",
    //     "z-index": "999"
    //   })
    //   .pop.bot({
    //     title: {
    //       title: '新版更新2019-6.24',
    //       itemClass: 'modal-head-index',
    //     },
    //     body: [{
    //       "@list": {
    //         data: [
    //           {title: [
    //             '更新',
    //             '优化demo/modal，新增pop/toast弹窗，可以设置弹层内容，现在支持13中弹出方式'
    //           ], itemClass: 'card-notification'},
    //           {title: [
    //             '更新',
    //             '内核优化，简化组件开发，自动回收组件实例'
    //           ], itemClass: 'card-notification'},
    //           {title: [
    //             '更新',
    //             '新增slip的demo，简单设置即可生成带左滑菜单的列表'
    //           ], itemClass: 'card-notification'},
    //           {title: [
    //             '更新',
    //             '内核优化，原计划引入immatable，考虑到包大小的问题，改为引入deepmerge方法，解决组件数据污染的问题'
    //           ], itemClass: 'card-notification'},
    //           {title: [
    //             '更新',
    //             '支持小程序云开发，通过配置项简单设置'
    //           ], itemClass: 'card-notification'},
    //           {title: [
    //             '更新',
    //             '优化wxs中的通用touch响应事件'
    //           ], itemClass: 'card-notification'},
    //           {title: [
    //             '更新',
    //             {title: 'pop/toash弹窗demo', itemStyle: 'margin-top: 10rpx', itemClass: 'mb-20-r btn-primary btn-small level9', aim: 'gourl?page=modal'}
    //           ], itemClass: 'card-notification'},
    //           {title: [
    //             '更新',
    //             {title: 'slip组件(左滑菜单)', itemClass: 'mb-20-r btn-primary btn-small level9', aim: 'gourl?page=slip'}
    //           ], itemClass: 'card-notification'},
    //         ],
    //         listClass: 'color-default announcement',
    //         type: {
    //           is: 'scroll'
    //         }
    //       },
    //       itemClass: 'hei-p100'
    //     }],
    //     bodyClass: 'modal-body-index',
    //     enableMask: true
    //   })
    // })

    // modal.hooks.emit('announc', modal) //显示公告