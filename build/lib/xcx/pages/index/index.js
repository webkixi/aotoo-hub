//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')
// import createActionSide from 'components/actionside'

function createActionSide(params) {
  return params
}

const aside1 = createActionSide({
  id: 'aside1',
  title: [
    {title: '关闭我', aim: 'close'},
    {title: '打开新侧弹', aim: 'open_new'},
  ]
})

const aside2 = createActionSide({
  id: 'aside2',
  title: 'haha modal',
  aim: 'close_1'
})

const menuListData = [
  {
    title: [{
        img: {
          src: 'https://img13.360buyimg.com/n7/jfs/t1/3/15/4536/138660/5b997bf8Ed72ebce7/819dcf182d743897.jpg',
          class: 'item-pic-45 mr10'
        },
      },
      {
        title: '99',
        class: 'icon-dot icon-dot-more'
      }
    ],
    li: [{
      body: [{
          title: {
            title: '我是标题',
            class: 'item-title'
          }
        },
        {
          title: {
            title: '12:22',
            class: 'item-time'
          }
        }
      ],
      footer: [{
          title: {
            title: '简介简介简介简介简介',
            class: 'item-desc'
          }
        },
        {
          icon: {
            class: 'item-icon icon-apptubiao-110'
          }
        }
      ]
    }]
  },
  {
    img: {
      src: 'https://img13.360buyimg.com/n7/jfs/t1/3/15/4536/138660/5b997bf8Ed72ebce7/819dcf182d743897.jpg',
      class: 'item-pic-45 mr10'
    },
    li: [{
      body: [{
          title: {
            title: '我是标题',
            class: 'item-title'
          }
        },
        {
          title: {
            title: '12:22',
            class: 'item-time'
          }
        }
      ],
      footer: [{
          title: {
            title: '简介简介简介简介简介',
            class: 'item-desc'
          }
        },
        {
          icon: {
            class: 'item-icon icon-apptubiao-110'
          }
        }
      ]
    }],
    dot: [{
      title: {
        title: '99',
        class: 'icon-dot icon-dot-more'
      }
    }]
  },
  {
    img: {
      src: 'https://img13.360buyimg.com/n7/jfs/t1/3/15/4536/138660/5b997bf8Ed72ebce7/819dcf182d743897.jpg',
      class: 'item-pic-45 mr10'
    },
    li: [{
      body: [{
          title: {
            title: '我是标题',
            class: 'item-title'
          }
        },
        {
          title: {
            title: '12:22',
            class: 'item-time'
          }
        }
      ],
      footer: [{
          title: {
            title: '简介简介简介简介简介',
            class: 'item-desc'
          }
        },
        {
          icon: {
            class: 'item-icon icon-apptubiao-110'
          }
        }
      ]
    }],
    dot: [{
      title: {
        title: '2',
        class: 'icon-dot icon-dot-small'
      }
    }]
  },
  {
    img: {
      src: 'https://img13.360buyimg.com/n7/jfs/t1/3/15/4536/138660/5b997bf8Ed72ebce7/819dcf182d743897.jpg',
      class: 'item-pic-45 mr10'
    },
    li: [{
      body: [{
          title: {
            title: '我是标题',
            class: 'item-title'
          }
        },
        {
          title: {
            title: '12:22',
            class: 'item-time'
          }
        }
      ],
      footer: [{
          title: {
            title: '简介简介简介简介简介',
            class: 'item-desc'
          }
        },
        {
          icon: {
            class: 'item-icon icon-apptubiao-110'
          }
        }
      ]
    }],
    dot: [{
      title: {
        title: '',
        class: 'icon-dot'
      }
    }]
  }
]


Pager({
  data: {
    menuData: Pager.list({
      data: [
        { title: [
            {title: 'string', class: 'item' },
            {title: '简单字符', class: 'item icon-arrows-a-r color-999', aim: 'demo-string'},
        ]},
        { title: [
            {title: 'response', class: 'item' },
            {title: '响应标签', class: 'item icon-arrows-a-r color-999', aim: 'demo-link'},
        ]},
        { title: [
            {title: 'icon', class: 'item' },
            {title: '小图标', class: 'item icon-arrows-a-r color-999', aim: 'demo-icon'},
        ]},
        { title: [
            {title: 'longpress', class: 'item' },
            {title: '长按响应', class: 'item icon-arrows-a-r color-999', aim: 'demo-longpress'},
        ]},
        { title: [
            {title: 'titles', class: 'item' },
            {title: '一组title', class: 'item icon-arrows-a-r color-999', aim: 'demo-titles'},
        ]},
        { title: [
            {title: 'pic', class: 'item' },
            {title: '图片', class: 'item icon-arrows-a-r color-999', aim: 'demo-onepic'},
        ]},
        { title: [
            {title: 'pics', class: 'item' },
            {title: '图片组', class: 'item icon-arrows-a-r color-999', aim: 'demo-pics'},
        ]},
        { title: [
            {title: 'sort', class: 'item' },
            {title: '自定义排序', class: 'item icon-arrows-a-r color-999', aim: 'demo-sort'},
        ]},
        { title: [
            {title: 'list', class: 'item' },
            {title: '列表文档', class: 'item icon-arrows-a-r color-999', aim: 'demo-list'},
        ]},
        { title: [
            {title: 'tree', class: 'item' },
            {title: '树结构', class: 'item icon-arrows-a-r color-999', aim: 'demo-tree'},
        ]},
        { title: [
            {title: 'actionSide', class: 'item' },
            {title: '侧弹', class: 'item icon-arrows-a-r color-999', aim: 'demo-as'},
        ]},
        { title: [
            {title: 'otherComponent', class: 'item' },
            {title: '自定义组件', class: 'item icon-arrows-a-r color-999', aim: 'demo-component'},
        ]},
        { title: [
            {title: 'tab', class: 'item' },
            {title: '自定义组件', class: 'item icon-arrows-a-r color-999', aim: 'demo-tab'},
        ]},
        { title: [
            {title: 'list', class: 'item' },
            {title: '新列表', class: 'item icon-arrows-a-r color-999', aim: 'demo-newlist'},
        ]},
        { title: [
            {title: 'form', class: 'item' },
            {title: '表单', class: 'item icon-arrows-a-r color-999', aim: 'demo-form'},
        ]},
      ],
      itemClass: 'li item-normal',
      listClass: 'ul'
    }),

    aside1,
    aside2,
  },

  onLongPress: function(e, inst) {
    Pager.alert('我是长按响应')
  },

  onTap: function(e, inst) {

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
        case 'demo-string':
          wx.navigateTo({
            url: '../demo/index?demo=string'
          })
          break;
        case 'demo-link':
          wx.navigateTo({
            url: '../demo/index?demo=link'
          })
          break;
        case 'demo-icon':
          wx.navigateTo({
            url: '../demo/index?demo=icon'
          })
          break;
        case 'demo-longpress':
          wx.navigateTo({
            url: '../demo/index?demo=longpress'
          })
          break;

        case 'demo-titles':
          wx.navigateTo({
            url: '../demo/index?demo=titles'
          })
          break;
        case 'demo-onepic':
          wx.navigateTo({
            url: '../demo/index?demo=pic'
          })
          break;

        case 'demo-pics':
          wx.navigateTo({
            url: '../demo/index?demo=pics'
          })
          break;

        case 'demo-sort':
          wx.navigateTo({
            url: '../demo/index?demo=sort'
          })
          break;

        case 'demo-list':
          wx.navigateTo({
            url: '../demo/index?demo=list'
          })
          break;

        case 'demo-tree':
          wx.navigateTo({
            url: '../demo/index?demo=tree'
          })
          break;

        case 'demo-demo':
          wx.navigateTo({
            url: '../demo/index?demo=tree'
          })
          break;

        case 'demo-as':
          wx.navigateTo({
            url: '../demo/index?demo=actionSide'
          })
          break;

        case 'demo-component':
          wx.navigateTo({
            url: '../demo/index?demo=component'
          })
          break;

        case 'demo-tab':
          // wx.navigateTo({
          //   url: '../demo/index?demo=tab'
          // })
          wx.navigateTo({
            url: '../demo/tab/index'
          })
          break;

        case 'demo-newlist':
          wx.navigateTo({
            url: '../../demo/ui/list/index'
          })
          break;

        case 'demo-form':
          wx.navigateTo({
            url: '../../demo/form/index/index'
            // url: '../../demo/form/union/index'
            // url: '../demo/form/index'
          })
          break;
      
        default:
          aside1.right()
          break;
      }

      // if (theAim == 'open') aside1.right()
      // if (theAim == 'open_new') aside2.show()
      // if (theAim == 'close') aside1.hide()
      // if (theAim == 'close_1') aside2.hide()
    }
  },
  
  onLoad: function () {
    
  },
  
  getUserInfo: function(e) {

  }
})
