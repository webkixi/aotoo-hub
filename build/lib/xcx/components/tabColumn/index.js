/**
 * 作者： 天天修改
 * github: webkixi
 * 小程序的模板真是又长又臭
 */
const app = null //getApp()
const Core = require('../aotoo/core')
const lib = Core.lib


function grabData(dataSource) {
  let ds = dataSource  
  const select = this ? this.curIdx || 0 : 0     //为了展示最后一次点击， 默认是第一个
  const _menus = []
  const _contents = []
  const _footer = []
  const hasChecked = this ? this.storeId || [] : []     //为了赋值
  const _isScroll = ds.scroll || false
  
  if (lib.isObject(dataSource) && lib.isArray(dataSource.data)) {
    dataSource.data.forEach((item, ii) => {
      if (item.title && item.content) {
        if (lib.isString(item.title)) {
          item.title = {title: item.title}
        }
        _menus.push({
          title: item.title,
          attr: {id: ii},
          aim: 'tabIndex?id='+item.id+'&idx='+ii,
          itemClass: hasChecked.indexOf(ii) > -1 ? select == ii ? 'active hasCheck' : 'hasCheck' : select == ii ? 'active' : ''
        }) 
        _contents.push(
          typeof item.content == 'string'
          ? {
              title: item.content,
              id: 'tabs-'+ii
            }
          : {
            title: item.content,
            itemClass: select != ii ? 'none' : ''
          }
        )
      }
    })
  }
  // let toView
  const menus = {
    $$id: '__mytabmenu',
    type: _isScroll ? {
      is: 'scroll',
      'scroll-x': true,
      'scroll-y': false,
      'scroll-with-animation': true
    } : '',
    data: _menus,
    listClass: 'menu-box',
    itemClass: 'menu-item'
  }
  const contents = ds.multipy ? {
    $$id: '__mytabcontent',
    data: _contents,
    type: {
      is: 'scroll',
      'scroll-y': true,
      'scroll-into-view': '',
      bindscroll: 'tabScroll',
    },
    listClass: 'content-box',
    itemClass: 'content-item'
  }
  : {
    $$id: '__mytabcontent',
    data: _contents,
    listClass: 'content-box',
    itemClass: 'content-item'
  }

  const footer = {
    $$id: '__mytabsfooter',
    data: [
      {
        title: '重置',
        aim: 'onClearPop',
        itemClass: ''
      },
      {
        title: '确认',
        aim: 'onSavePop',
        itemClass: ''
      }
    ],
    listClass: 'footer-box'
  }
  
  dataSource['show'] = dataSource.hasOwnProperty('show') ? dataSource.show : true
  return {menus, contents, footer, dataSource}
}


// 基于item的组件
Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
    addGlobalClass: true
  },
  
  properties: {
    dataSource: {
      type: Object,
      observer: function (params) {
        if (!this.init) {
          if (params) {
            const {menus, contents, footer, dataSource} = grabData.call(this, params)
            this.setData({
              $dataSource: dataSource,
              $menus: menus,
              $contents: contents,
              $footer: footer
            })
          }
        }
      }
    }
  },
  data: {
    $dataSource: {},
    $menus: {},
    $contents: {},
    $footer: {}
  },
  behaviors: [Core.baseBehavior(app, 'tab2')],
  lifetimes: {
    created: function () {
      this.query = wx.createSelectorQuery().in(this)      //获取节点需要的
      this.queryMenus = wx.createSelectorQuery().in(this)      //获取节点需要的
      this.getValue = []        //存储组件内节点的信息
      this.getMenusValue = []        //存储组件内节点的信息
      
      this.curIdx = this.curIdx || 0
      this.storeId = this.storeId || [] 
    },
    attached: function() { //节点树完成，可以用setData渲染节点，但无法操作节点
      let properties = this.properties
      let dataSource = properties.dataSource
      const {menus, contents, footer} = grabData(dataSource)
      this.setData({
        $dataSource: dataSource,
        $menus: menus,
        $contents: contents,
        $footer: footer
      })
    },
    ready: function() {
      const ds = this.data.$dataSource
      this.mount((ds.$$id || ds.id))
    },
  },
  methods: {
    update: function(params, callback) {
      const {menus, contents, footer} = grabData.call(this, params)
      this.setData({
        $menus: menus,
        $contents: contents,
        $footer: footer
      })
      return this
    },
    reset: function(parmas) {
      //传值的时候，是值为准，否则是为最原始的数据
      let oriData = parmas || lib.clone(this.originalDataSource)
      this.curIdx = 0
      this.storeId = [] 
      this.update({data: oriData})
    },

    menusFunc: function(data, idx) {
      return data.map((item, ii) => {
        this.storeId.indexOf(ii) > -1
        ? ii == idx
          ? item.itemClass = 'hasCheck active' 
          : item.itemClass = 'hasCheck'
        : ii == idx
          ? item.itemClass = 'active'
          : item.itemClass = ''
        return item
      })
    },
    menusScroll: function(idx){
      e.detail.x + this.getMenusValue[idx].width > wx.getSystemInfoSync().screenWidth
    },
    contentFunc: function(data,idx) {
      return data.map( (item, ii) => {
        idx == ii
        ? item.itemClass = ''
        : item.itemClass = 'none'
        return item
      })
    },
    tabIndex: function(e, param) {
      if (param) {
        const idx = parseInt(param['idx'])
        const id = param['id']
        const $menus = this.data.$menus
        this.curIdx = idx // 当前值
        const $contents = this.data.$contents
        const $dataSource = this.data.$dataSource
        $menus.data = this.menusFunc($menus.data, idx)
        $contents.data = this.contentFunc($contents.data, idx)
        this.hooks.emit('updateContent', {id})
        // this.activePage.onUpateContent(id)
        $dataSource.select = idx
        this.setData({
          $menus,
          '$contents.data': $contents.data
        })
      }
    },
    tabsMenusChecked: function(){
      const $tabsMenus = this.activePage.getElementsById('__mytabmenu')
      if (this.storeId.indexOf(this.curIdx) < 0){
        this.storeId.push(this.curIdx)
      }
      $tabsMenus.findAndUpdate({id: this.curIdx}, function(res){
        res.itemClass += ' hasCheck '
        return res
      })
    },
    tabsMenusCheckedDel: function(){
      const $tabsMenus = this.activePage.getElementsById('__mytabmenu')
      const that = this
      const index = that.storeId.indexOf(that.curIdx)
      that.storeId.splice(index, 1)
      $tabsMenus.findAndUpdate({id: this.curIdx}, function(res){
        res.itemClass = 'active'
        return res
      })
    }
  }
})