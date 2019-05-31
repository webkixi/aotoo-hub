//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')
// import createActionSide from 'components/actionside'

//nav 底部导航
import adapterNav from '../nav/adapter'
import navData from '../nav/data'

const data = [
  {
    title: 'Basic 基础组件',
    id: 'basic',
    list: [
      { title: 'Button', attrx: 'button', littleTitle: '按钮 ' },
      { title: 'Utility', attrx: 'utility', littleTitle: '工具类 ' },
      { title: 'Tag', attrx: 'tag', littleTitle: '标签 ' },
      { title: 'Article', attrx: 'article', littleTitle: '文章 ' },
    ]
  },
  {
    title: 'List 列表',
    id: 'list',
    list: [
      { title: 'Image-text', attrx: 'list', littleTitle: '图文列表 ' },
    ]
  },
  {
    title: 'Feedback 操作反馈',
    id: 'feedback',
    list: [
      { title: 'Modal', attrx: 'modal', littleTitle: '弹出层 ' },
    ]
  },
  {
    title: 'Form 表单',
    id: 'form',
    list: [
      { title: 'Input', attrx: 'input', littleTitle: '文本类 ' },
      { title: 'Number', attrx: 'number', littleTitle: '数字类 ' },
      { title: 'Icon', attrx: 'icon', littleTitle: 'icon替代标题文字 ' },
      { title: 'Switch', attrx: 'switch', littleTitle: '开关 ' },
      { title: 'Union', attrx: 'union', littleTitle: '联动 ' },
      { title: 'Checkbox', attrx: 'checkbox', littleTitle: '多选择框 ' },
      { title: 'Radio', attrx: 'radio', littleTitle: '单选择框 ' },
      { title: 'Slider', attrx: 'slider', littleTitle: '滑动选取器 ' },
      { title: 'Single-picker', attrx: 'singlepicker', littleTitle: '单层弹层选择器 ' },
      { title: 'Multipy-picker', attrx: 'multipypicker', littleTitle: '多层弹层选择器 ' },
      { title: 'Dropdown', attrx: 'dropdown', littleTitle: '下拉菜单 ' },
    ]
  },
  {
    title: 'Navigation 导航组件',
    id: 'navigation',
    list: [
      { title: 'Tabs', attrx: 'tabs', littleTitle: '标签页'}
    ]
  },
  {
    title: 'Yc',
    id: 'yc',
    list: [
      { title: 'Swiper', attrx: 'swiper', littleTitle: '轮播 ' },
      { title: 'Sidescroll', attrx: 'sidescroll', littleTitle: '滚动 ' },
      { title: 'Stickybar', attrx: 'stickybar', littleTitle: '轮播 ' },
    ]
  }
]

const adapterMenu = (res) => {
  let output = []
  res.map( item => {
    output.push({
      title: {
        title: item.title,
        itemClass: 'bg-title'
      },
      idf: item.id,
      liClass: 'bg-fff list-bb bb-default'
    })
    item.list.map( itemxx => {
      output.push({
        title: [
          {title: itemxx.title},
          {title: itemxx.littleTitle, itemClass: 'icon-arrows-r color-grey'}
        ],
        titleClass: 'item-border flex-row-between-center',
        parent: item.id,
        itemClass: 'item ss-focus',
        tap: item.id == 'form' ? 'onTap?demo='+item.id+'_'+itemxx.attrx : 'onTap?demo=ui_'+itemxx.attrx
        // tap: 'onTap?demo='+item.id+'/'+itemxx.attrx
      })
    })
  })
  return output
}

Pager({
  data: {
    headLogo: Pager.item({
      img: {
        src: 'http://agzgz.com/myimgs/logo.png',
        itemClass: 'logo-size'
      },
      title: [
        {
          title: 'Saui',
          itemClass: 'size20 color-active mt-10-r'
        },
        {
          title: 'Saui是基于Aotoo而来。如需详细了解，可打开www.agzgz.com',
          itemClass: 'size12 color-grey'
        }
      ],
      titleClass: 'ss-center plr-default',
      itemClass: 'flex-column-start-center padding-default'
    }),
    menuData: Pager.tree({
      data: adapterMenu(data)
    }),
    nav: Pager.list({
      // type: {
      //   is: 'swiper',
      //   current: '0',
      // },
      data: adapterNav(navData, 0),
      listClass: 'list-nav',
    })
  },

  onLongPress: function(e, inst) {
    Pager.alert('我是长按响应')
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

  oktapme: function(e) {
    // this.setData({
    //   'formData.data[0].title': '这就是类目1'
    // })
    Pager.alert('点我干啥？')
  },

  onShow: function () {
    
  },

  onReady: function () {

  },

  aim: function(e, inst) {
    const target = e.currentTarget
    const currentDset = target.dataset
    const theAim = currentDset.aim
    const aside1 = this.getElementsById('aside1')
    const aside2 = this.getElementsById('aside2')
    if (theAim) {
      switch (theAim) {
        default:
          aside1.right()
          break;
      }

    }
  },
  
  onLoad: function () {
    
  },
  
  getUserInfo: function(e) {

  }
})
