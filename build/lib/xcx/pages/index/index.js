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
      { title: 'slip', attrx: 'slip', littleTitle: '左滑删除 ', isNews: true},
    ]
  },
  {
    title: 'Feedback 操作反馈',
    id: 'feedback',
    list: [
      { title: 'Modal', attrx: 'modal', littleTitle: '弹出层 ' },
      // { title: 'Toast', attrx: 'toast', littleTitle: '提示 ' },
      { title: 'Score', attrx: 'score', littleTitle: '评分 ', isNews: true },
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
      { title: 'Tabs', attrx: 'tabs', littleTitle: '标签页', isNews: true}
    ]
  },
  // {
  //   title: 'char 雷达图',
  //   id: 'spider',
  //   list: [
  //     { title: 'Spider', attrx: 'spiderchar', littleTitle: '蜘蛛网图 ' },
  //   ]
  // },
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
          !itemxx.isNews
            ? { title: itemxx.title }
            : {
              title: [{title: itemxx.title, itemClass: 'color-minor'}, {title: ' ', itemClass: 'icon-dot-small ss-absolute-r-20-m'}],
              titleClass: 'ss-relative'
            },
          {title: itemxx.littleTitle, itemClass: 'icon-arrows-r color-grey'}
        ],
        titleClass: 'item-border flex-row-between-center',
        parent: item.id,
        itemClass: 'item ss-focus',
        tap: item.id == 'form' ? 'onTap?demo='+item.id+'_'+itemxx.attrx : item.id == 'spider' ? 'onTap?demo='+itemxx.attrx : 'onTap?demo=ui_'+itemxx.attrx
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
    }),
    modal: Pager.item({})
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
    const modal = this.getElementsById('modal')
    const theTap = query.nav.replace(/_/g,"/")
    if (theTap) {
      if (theTap == 'close') {
        if (this.announcement) {
          modal.hide()
        } else {
          this.announcement = true
          modal.hooks.emit('announc', modal)
        }
      }
      else {
        switch (theTap) {
          case theTap:
            wx.redirectTo({
              url: '../'+theTap+'/index'
            })
          break;
        }
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
    const that = this
    this.announcement = true
    let modal = this.getElementsById('modal')
    modal.hooks.once('hide', function(){
      that.announcement = false
    })

    modal.hooks.once('announc', function (md) {
      md.reset()
      .css({
        width: '80%',
        height: '70%',
        padding: '10px',
        overflow: 'hidden',
        top: "-80px",
        "z-index": "999"
      })
      .pop.bot({
        title: {
          title: '新版更新2019-6.24',
          itemClass: 'size20 mb-40-r',
        },
        "@list": {
          data: [
            {title: [
              '更新',
              '优化demo/modal，新增pop/toast弹窗，可以设置弹层内容，现在支持13中弹出方式'
            ], itemClass: 'card-notification'},
            {title: [
              '更新',
              '内核优化，简化组件开发，自动回收组件实例'
            ], itemClass: 'card-notification'},
            {title: [
              '更新',
              '新增slip的demo，简单设置即可生成带左滑菜单的列表'
            ], itemClass: 'card-notification'},
            {title: [
              '更新',
              '内核优化，原计划引入immatable，考虑到包大小的问题，改为引入deepmerge方法，解决组件数据污染的问题'
            ], itemClass: 'card-notification'},
            {title: [
              '更新',
              '支持小程序云开发，通过配置项简单设置'
            ], itemClass: 'card-notification'},
            {title: [
              '更新',
              '优化wxs中的通用touch响应事件'
            ], itemClass: 'card-notification'},
            {title: [
              '更新',
              {title: 'pop/toash弹窗demo', itemStyle: 'margin-top: 10rpx', itemClass: 'mb-20-r btn-primary btn-small level9', aim: 'gourl?page=modal'}
            ], itemClass: 'card-notification'},
            {title: [
              '更新',
              {title: 'slip组件(左滑菜单)', itemClass: 'mb-20-r btn-primary btn-small level9', aim: 'gourl?page=slip'}
            ], itemClass: 'card-notification'},
          ],
          listClass: 'color-default announcement',
          type: {
            is: 'scroll'
          }
        }
      })
    })

    modal.hooks.emit('announc', modal) //显示公告
  },
  
  onLoad: function () {
    
  },
  
  getUserInfo: function(e) {

  },

  gourl(e, param){
    const page = param.page
    const url = `../../demo/ui/${page}/index`
    wx.navigateTo({ url })
  }
})
