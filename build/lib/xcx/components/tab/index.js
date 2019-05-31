/**
 * 作者： 天天修改
 * github: webkixi
 * 小程序的模板真是又长又臭
 */
const app = getApp()
const Core = require('../aotoo/core')
const lib = Core.lib


function grabData(dataSource) {
  let ds = dataSource
  ds.select = ds.select ? ds.select : 0
  const _menus = []
  const _contents = []
  const _isScroll = ds.scroll || false
  if (lib.isObject(dataSource) && lib.isArray(dataSource.data)) {
    dataSource.data.forEach((item, ii) => {
      if (item.title && item.content) {
        if (lib.isString(item.title)) {
          item.title = {title: item.title}
        }
        _menus.push({
          title: item.title,
          tap: 'tabIndex?idx='+ii,
          itemClass: ds.select == ii ? 'active' : ''
        }) 
        //id: 'tabs-'这个目前必须是固定，下面的获取节点需要啊啊啊
        _contents.push(
          typeof item.content == 'string'
          ? {
              title: item.content,
              // attr: {id: 'tabs-'+ii},
              id: 'tabs-'+ii
            }
          : item.content
        )
      }
    })
  }
  // let toView
  const menus = {
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
  const contents = {
    $$id: '__mytabcontent',
    data: _contents,
    type: ds.multipy ? 
      {
        is: 'scroll',
        'scroll-y': true,
        'scroll-into-view': '',
        bindscroll: 'tabScroll',
        // 'scroll-with-animation': true
      }  
    : {
      is: 'swiper',
      current: 0
    },
    listClass: 'content-box',
    itemClass: 'content-item'
  }

  dataSource['show'] = dataSource.hasOwnProperty('show') ? dataSource.show : true
  return {menus, contents, dataSource}
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
 * show: true，
 * isScroll: false
 * select
 */

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
        if (this.mounted) {
          if (params) {
            const {menus, contents, dataSource} = grabData.call(this, params)
            this.setData({
              $dataSource: dataSource,
              $menus: menus,
              $contents: contents
            })
          }
        }
      }
    }
    // dataSource: Object,
  },
  data: {
    $dataSource: {},
    $menus: {},
    $contents: {}
  },
  behaviors: [Core.baseBehavior(app, 'tap')],
  lifetimes: {
    created: function () {
      this.savePrevSelect = []      //用来判断导航条下边线的的动画
      this.query = wx.createSelectorQuery().in(this)      //获取节点需要的
      this.queryMenus = wx.createSelectorQuery().in(this)      //获取节点需要的
      this.getValue = []        //存储组件内节点的信息
      this.getMenusValue = []        //存储组件内节点的信息
      this.generateUpdate('$dataSource', function() {
        const {menus, contents} = grabData($dataSource)
        this.setData({
          $menus: menus,
          $contents: contents
        })
      })
    },
    attached: function() { //节点树完成，可以用setData渲染节点，但无法操作节点
      let properties = this.properties
      let dataSource = properties.dataSource
      const {menus, contents} = grabData(dataSource)
      this.setData({
        $dataSource: dataSource,
        $menus: menus,
        $contents: contents
      })
    },
    ready: function() {
      const ds = this.data.$dataSource
      this.mount((ds.$$id || ds.id))
      let $contentQuery = []
      let $menusQuery = []
      for(let i = 0; i < ds.data.length; i++) {
        this.query.select('.tab-container >>> #tabs-'+i).boundingClientRect()
      }
      this.queryMenus.selectAll('.tab-container >>> .menu-item').boundingClientRect()
      this.queryMenus.selectViewport().scrollOffset(function(res){
        res.scrollTop // 显示区域的竖直滚动位置
      })
      this.query.exec(function (res) {
        $contentQuery = res
      })
      this.queryMenus.exec(function(res){
        $menusQuery = res[0]
      })
      setTimeout(() => {
        this.getValue = $contentQuery
        this.getMenusValue = $menusQuery
      }, 100);
    },
  },
  methods: {
    isSelect: false,      //点击导航栏时 不触发滚动时会触发的menusFunc
    menusFunc: function(data, idx) {
      this.savePrevSelect.length > 1 ? this.savePrevSelect = this.savePrevSelect.slice(1) : this.savePrevSelect
      return data.map((item, ii) => {
        if (item.itemClass) item.itemClass = ''
        if (ii == idx) {
          this.savePrevSelect.push(idx)
          item.itemClass = this.savePrevSelect.length > 1 ? this.savePrevSelect[0] > this.savePrevSelect[1] ? 'f-right active' : 'active' : 'active'
        }
        return item
      })
    },
    menusScroll: function(idx){
      e.detail.x + this.getMenusValue[idx].width > wx.getSystemInfoSync().screenWidth
    },
    tabIndex: function(e, param) {
      if (param) {
        this.isSelect = true
        const idx = parseInt(param['idx'])
        const $menus = this.data.$menus
        $menus.data = this.menusFunc($menus.data, idx)
        //e.detail.x < this.getMenusValue[idx].width  代表点击的地方是左边
        //e.detail.x + this.getMenusValue[idx].width > wx.getSystemInfoSync().screenWidth 代表点击的区域超过屏幕
        this.data.$dataSource.multipy
        ? e.detail.x + this.getMenusValue[idx].width > wx.getSystemInfoSync().screenWidth || e.detail.x < this.getMenusValue[idx].width
          ?
          this.setData({ 
              $menus,
              '$menus.type.scroll-left': e.detail.x < this.getMenusValue[idx].width ? e.currentTarget.offsetLeft - 30 :  this.getMenusValue[idx].right - wx.getSystemInfoSync().screenWidth + this.getMenusValue[idx].width,
              '$contents.type.scroll-top': this.getValue[idx].top - this.getValue[0].top,   //导航条高（44）+ padding（15） = 59
              '$contents.type.bindscroll': 'tabScroll?content-'+idx,
            })
          :
          this.setData({ 
            $menus,
            '$contents.type.scroll-top': this.getValue[idx].top - this.getValue[0].top,   //导航条高（44）+ padding（15） = 59
            '$contents.type.bindscroll': 'tabScroll?content-'+idx,
          })
        : 
        this.setData({
          $menus,
          '$contents.type.current': idx,
        })
      }
    },
    tabScroll: function(e, param) {
      if (this.isSelect == false) {
        this.getValue.map( (item, ii) => {
          //原理是 a > 0 && a < b, 滚动的值要大于前一个top，且小于当前top, 只为把当前的值 进行menus 滚动
          if ((ii > 0 ? e.detail.scrollTop > (this.getValue[ii - 1].top - this.getValue[0].top - 10) : '') && e.detail.scrollTop <= (item.top - this.getValue[0].top) ){
            const $idx = item.id.substr(item.id.length - 1, 1) - 1
            const $menus = this.data.$menus
            $menus.data = this.menusFunc($menus.data, $idx)
            this.getMenusValue[$idx].right > wx.getSystemInfoSync().screenWidth
            ?
              this.setData({ 
                $menus,
                '$menus.type.scroll-left': this.getMenusValue[$idx].right - wx.getSystemInfoSync().screenWidth + this.getMenusValue[$idx].width,
              })
            :
              this.setData({ 
                $menus,
                '$menus.type.scroll-left': 0      //这个地方有待优化，现在的做法是向上滚的时候，就把scroll-left： 0
              })
          }
        })
      }
      else {
        this.isSelect = false
      }
    }
  }
})