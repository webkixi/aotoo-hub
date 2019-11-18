/**
 * 作者： 天天修改
 * github: webkixi
 * 小程序的模板真是又长又臭
 */
const app = null //getApp()
const Core = require('../aotoo/core')
const lib = Core.lib

function chooseParse(source={}, id){
  let data = source.data
  const _menus = []
  const _contents = []
  if (lib.isObject(source) && lib.isArray(data)) {
    data.map(item => {
      _menus.push({
        title: item.title,
        id: item.title,    //为了scroll-into-view
        aim: 'onClickCityMenu?id='+item.title
      })
      _contents.push({
        title: item.content || '',
        id: item.title
      })
    })
  }
  const menus = {
    $$id: lib.suid('mytabchoosemenus_'),
    data: _menus,
    listClass: 'selectionMenus pt-20-r',
    // listClass: 'selectionMenus pt-20-r ss-fixed-r',
    itemClass: 'size10'
  }
  const contents = {
    $$id: lib.suid('mytabchoosecontent_'),
    data: _contents,
    type: {
      is: 'scroll',
      'scroll-y': true,
      'scroll-into-view': 'scorllLocaltion',
      'bindscroll': 'onScroll',
    },
    listClass: 'size16 hei-p100 selection-scroll',
    itemClass: 'xxss'
  }
  const lettertip = {
    $$id: lib.suid('mytabchoosetip_'),
  }

  source['show'] = source.hasOwnProperty('show') ? source.show : true
  return {menus, contents, lettertip, source}
}

/**
 * data: [
 *  {title: 'tabName', content: 'some content'},
 *  {title: 'tabName', content: 'some content'},
 *  {title: 'tabName', content: 'some content'},
 *  {title: 'tabName', content: 'some content'},
 * ],
 * $$id: 'some id',
 * select: 0,
 * multipy: false,
 * singleView: false,
 * show: true
 */

// 基于item的组件
Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
    addGlobalClass: true
  },
  properties: {
    source: Object,
  },
  data: {
    $source: {},
    $lettertip: {}
  },
  behaviors: [Core.treeComponentBehavior(app, 'choose')],
  lifetimes: {
    created: function(){
      this.saveMenusPrevVal = []
      this.saveCurrentId = ''
      this.isActive = false      //判断是否能进入滚动时更新menus
      this.isActive2 = false     //二次判断是否已存在当前属性，存在就禁止再更新menus
      this.isMenus = false
      this.isClickMenus = false     //点击右侧栏目时 不触发滚动切换的事件

      this.storeClientRectAll = []
      this.xx = ''
      wx.clearStorageSync('topVals')
    },
    attached: function() { //节点树完成，可以用setData渲染节点，但无法操作节点
      let properties = this.properties
      let dataSource = properties.source 
      const {menus, contents, lettertip} = chooseParse(dataSource)
      this.setData({
        $source: dataSource,
        $menus: menus,
        $contents: contents,
        $lettertip: lettertip
      })
    },
    ready: function() {
      const ds = this.data.$source
      this.mount((ds.$$id || ds.id || ''))
    }
  },
  methods: {
    reset: function(params){
      params = params ? params : [] 
      const {menus, contents, lettertip} = chooseParse.call(this, params)
      this.setData({
        $source: params,
        $menus: menus,
        $contents: contents,
        $lettertip: lettertip
      })
      return this
    },
    update: function(params, callback) {
      this.setData({
        '$contents.data': params
      })
      this.updateSelectorQuery()
      return this
    },
    updateItems: function(params, id, callback) {
      this.setData({
        [`$contents.data[${id}].title`]: params,
      })
      this.updateSelectorQuery()
      return this
    },
    updateSelectorQuery: function() {
      const query = wx.createSelectorQuery().in(this)      //获取节点需要的
      let getTops = []
      //注意：获取节点信息 一定要在wxml开始查找 select的id或class一定要已经存在
      query.selectAll('.tab-choose >>> .xxss').boundingClientRect()
      query.exec(res=>{
        this.storeClientRectAll = res[0]
      })
      // setTimeout(() => {
      //   //注意：this.getSystemHeight = wx.getSystemInfoSync().windowHeight  但是windowHeight获取不到？？？
      //   this.getSystemHeight = wx.getSystemInfoSync().screenHeight - wx.getSystemInfoSync().batteryLevel - wx.getSystemInfoSync().statusBarHeight
      // }, 50);
    },
    onScroll: function(e, param) {
      //滚动时触发 fixed菜单的切换  这里快速滚动还是有问题
      const scrollTop = e.detail.scrollTop + e.currentTarget.offsetTop
      if (!this.isClickMenus) {
        this.storeClientRectAll.map((item, ii) => {
          //以下的判断 都是为了防止滚动时，也一直更新$clickcitymenu
            if (scrollTop > item.top) {
              this.saveMenusPrevVal.length > 1 ? this.saveMenusPrevVal = this.saveMenusPrevVal.splice(1) : this.saveMenusPrevVal
              this.saveMenusPrevVal.push(item.id)
              this.isActive = true
            }
        })
        if (this.isActive) {
          if (!this.isActive2) {
            this.saveCurrentId = this.saveMenusPrevVal.length > 1 ? this.saveMenusPrevVal[1] : this.saveMenusPrevVal[0]
            this.onScrollIng(this.saveCurrentId, 'scroll')
            this.isActive2 = true
          }
          else {
            if (this.saveCurrentId != this.saveMenusPrevVal[1]){
              this.isActive2 = false
            }
          }
        }
      }
      this.isClickMenus = false
    },
    onScrollIng: function(id, type) {
      if (this.data.$source.showMenusStatus) {
        const $clickcitymenu = this.activePage.getElementsById(this.data.$menus.$$id)
        const that = this
        const org = $clickcitymenu.getData().data     //原始数据
        org.map(item => {
          item.itemClass = 'item size10'
          item.id == id ? item.itemClass += ' active' : ''
          return item
        })
        $clickcitymenu.setData({
          '$list.data': org
        })
        if (type == 'scroll'){
          that.isActive = false
          return false
        }
        
      }
    },
    onClickCityMenu: function (e, param, inst) {
      // const $scrollcitylist = this.activePage.getElementsById('__mytabchoosecontent')
      const $content = this.activePage.getElementsById(this.data.$contents.$$id)
      const $letterToast = this.activePage.getElementsById(this.data.$lettertip.$$id)
      let letter = param['id']
      this.saveMenusPrevVal.length > 1 ? this.saveMenusPrevVal = this.saveMenusPrevVal.splice(1) : this.saveMenusPrevVal
      this.hooks.emit('updateContent', {id: letter})
      this.isClickMenus = true
      $content.setData({
        '$list.type.scroll-into-view': letter,
      })
      $letterToast.lettertipx({
        title: {
          title: letter,
          itemClass: 'item-circle-solid'
        },
        itemClass: 'popups-wrap-trans'
      })
      this.onScrollIng(letter, '')
      this.saveMenusPrevVal.push(letter)
    }
  }
}) 