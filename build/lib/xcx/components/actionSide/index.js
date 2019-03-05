/**
 * 作者： 天天修改
 * github: webkixi
 * 小程序的模板真是又长又臭
 */
const app = getApp()
const Core = require('../aotoo/core')
const lib = Core.lib

function cls(param) {
  return (param && (param.class || param.itemClass)) || ''
}

function sty(param) {
  return (param && (param.style || param.itemStyle)) || ''
}

function content(param, myclass) {
  let beforAim = false
  if (lib.isObject(param)) {
    delete param.class
    delete param.itemClass
    delete param.style
    delete param.itemStyle
    if (!myclass) {
      beforAim = true
      if (param.dot) {
        // param.dot = [].concat(param.dot).concat({title: 'co', class: 'closeIt'})
        param.dot = [].concat(param.dot).concat({icon: {class: 'icon-guanbida closeIt', aim: 'closeIt'}})
      } else {
        // param.dot = [{title: 'co', class: 'closeIt'}]
        param.dot = [{icon: {class: 'icon-guanbida closeIt', aim: 'closeIt'}}]
      }
    }
  } else {
    if (!myclass) {
      beforAim = true
      // param = { dot: [{title: 'co', class: 'closeIt'}] }
      param = { dot: [{icon: {class: 'icon-guanbida closeIt', aim: 'closeIt'}}] }
    }
  }

  return param
}

function paramCb(param, cb) {
  if (lib.isFunction(param)) {
    cb = param
    param = null
  }
  return {param, cb}
}

// 基于item的组件
Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
    addGlobalClass: true
  },
  behaviors: [Core.itemBehavior(app, 'actionSide')],
  lifetimes: {
    attached: function() { //节点树完成，可以用setData渲染节点，但无法操作节点
      let properties = this.properties
      let item       = properties.item
      item.itemClass = 'actionSide'
      item.__actionMask = 'actionMask'
      item = Core.setItem(item)
      this.setData({
        $item: item,
      })
    },
    ready: function() {
      const that = this
      this.hooks.on('beforeAim', function (param) {
        const {event} = param
        const dataset = event.currentTarget.dataset
        const aim = dataset.aim
        if (aim && aim == 'closeIt') {
          that.hide()
          return 0
        }
      })
    }
  },
  methods: {
    show: function (p, c) {
      const {param, cb} = paramCb(p, c)
      const myContent = content.call(this, param) || {}
      this.update({
        'itemClass': 'actionSide moveit',
        ...myContent
      }, cb)
    },
    hide: function (param) {
      const itemClass = this.data.$item.itemClass
      const fromLeft = itemClass.indexOf('actionSide-left') > -1
      const fromBot = itemClass.indexOf('actionSide-bot') > -1
      const fromTop = itemClass.indexOf('actionSide-top') > -1
      const itCls = fromLeft ? 'actionSide-left' : fromBot ? 'actionSide-bot' : fromTop ? 'actionSide-top' : 'actionSide'
      this.update({
        itemClass: itCls,
        __actionMask: 'actionMask'
      })
    },
    right: function (p, c) {
      const {param, cb} = paramCb(p, c)
      let myclass = lib.isString(param) ? param : cls(param)
      let myStyle = sty(param)
      let myContent = content.call(this, param, myclass) || {}
      this.update({
        itemClass: `actionSide ${myclass} moveit`,
        itemStyle: myStyle,
        __actionMask: myclass ? 'actionMask show' : 'actionMask',
        ...myContent
      }, cb)
    },
    left: function (p, c) {
      const {param, cb} = paramCb(p, c)
      let myclass = lib.isString(param) ? param : cls(param)
      let myStyle = sty(param)
      let myContent = content.call(this, param, myclass) || {}
      this.update({
        itemClass: `actionSide-left ${myclass} moveit`,
        itemStyle: myStyle,
        __actionMask: myclass ? 'actionMask show' : 'actionMask',
        ...myContent
      }, cb)
    },
    bot: function (p, c) {
      const {param, cb} = paramCb(p, c)
      let myclass = lib.isString(param) ? param : cls(param)
      let myStyle = sty(param)
      let myContent = content.call(this, param, myclass) || {}
      this.update({
        itemClass: `actionSide-bot ${myclass} moveit`,
        itemStyle: myStyle,
        __actionMask: myclass ? 'actionMask show' : 'actionMask',
        ...myContent
      }, cb)
    },
    top: function (p, c) {
      const {param, cb} = paramCb(p, c)
      let myclass = lib.isString(param) ? param : cls(param)
      let myStyle = sty(param)
      let myContent = content.call(this, param, myclass) || {}
      this.update({
        itemClass: `actionSide-top ${myclass} moveit`,
        itemStyle: myStyle,
        __actionMask: myclass ? 'actionMask show' : 'actionMask',
        ...myContent
      }, cb)
    },
  }
})