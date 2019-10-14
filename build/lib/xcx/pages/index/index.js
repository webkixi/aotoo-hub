//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')

import getData from './data'
import adapterModal from './modal'
// import inputTips from '../tips/inputtips'


const adapterMenu = (res) => {
  let output = []
  res.map( item => {
    output.push({
      title: {
        title: item.title,
        itemClass: 'size16 fw-bold color-active plr-default bb-default lhei-88-r'
      },
      idf: item.id,
    })
    item.list.map( itemxx => {
      output.push({
        title: [
          {
            title: itemxx.title,
            itemClass: !itemxx.isNews || 'icon-dot-small-before-tr color-minor' 
          },
          {title: itemxx.littleTitle, itemClass: 'icon-arrows-r color-grey size12'}
        ],
        titleClass: 'flex-row-between-center color-active hei-p100',
        parent: item.id,
        itemClass: 'ss-focus hei-104-r ss-sizing-border item-border',
        tap: item.id == 'form' ? 'onTap?demo='+item.id+'/'+itemxx.attrx
            : item.id == 'spider' ? 'onTap?demo='+itemxx.attrx
            : itemxx.attrx == 'selection' ? 'onTap?demo=selection' 
            : itemxx.attrx == 'car' ? 'onTap?demo=car' 
            : 'onTap?demo=ui/'+itemxx.attrx 
      })
    })
  })
  return output
}

Pager({
  data: {
    isScrollx: true,
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
      listClass: 'ss-tree-list bg-default list-bb',
    }),
    tipsX: {
      $$id: 'tipsX'
    }
  },

  onTap: function(e, query, inst) {
    // const theTap = query.demo.replace(/_/g,"/")
    const theTap = query.demo
    if (theTap) {
      switch (theTap) {
        case 'selection':
          wx.navigateTo({
            url: '../../cityselect/selection/index'
          })
        break;
        case 'car':
          wx.navigateTo({
            url: '../../cityselect/car/index'
          })
        break;
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
    this.modalFunc('tipsX', 'update')
    // this.modalFunc('tipsX', 'update', adapterModal.adapterItemUpdate(getData.actionSideData))
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
      // type == 'update' ?
      //   {
      //     '@item': {
      //       title: [
      //         {
      //           title: '最新更新',
      //           itemClass: 'm-title-fs'
      //         },
      //         {
      //           title: '持续的更新，只为了更好的累积',
      //           itemClass: 'm-desc-fs'
      //         }
      //       ],
      //       dot: data,
      //       titleClass: 'color-fff item-header',
      //       itemClass: 'item-wrapper item-wrapper-1 hei-p100 wid-p100'
      //     },
      //     itemClass: 'index-swiper-modal'
      //   }
      // : {
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
            body: [
              {
                title: [
                  {
                    title: '1、城市选择',
                    itemClass: 'color-active'
                  },
                  {
                    title: '数据直接在cloud请求回来，不足是数据过大，导致第一次加载过慢，卡顿，目前正在修补中',
                  }
                ],
                titleClass: 'mb-10-r'
              },
              {
                title: [
                  {
                    title: '2、汽车品牌',
                    itemClass: 'color-active'
                  },
                  {
                    title: '数据是放在本地，加载速度比城市选择快。不足是，一次性请求的图片过多（已使用了官方的懒加载），导致会出现短暂的白屏，目前正在修补中',
                  }
                ]
              },
            ],
            titleClass: 'color-fff item-header',
            bodyClass: 'item-body color-grey wid-p86 lhei-40-r flex-column ss-left display-bg-minor',
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
    }, '200000')
  },

  onClickCommunication: function() {
    this.modalFunc('tipsX', '', adapterModal.adapterItemSwiper())
  },
  
  onLoad: function () {
  },
})
