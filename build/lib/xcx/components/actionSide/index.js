/**
 * 作者： 天天修改
 * github: webkixi
 * 小程序的模板真是又长又臭
 */
const app = getApp()
const Core = require('../aotoo/core')
const lib = Core.lib

function cls(param) {
  return (param && (param.itemClass || param.class)) || ''
}

function sty(param) {
  return (param && (param.itemStyle || param.style)) || ''
}

function content(param, myclass) {
  // if (lib.isObject(param)) {
  //   delete param.class
  //   delete param.itemClass
  //   delete param.style
  //   delete param.itemStyle
  //   // if (!myclass) {
  //   //   param.dot = param.dot ? [].concat(param.dot).concat({
  //   //     class: 'icono-crossCircle closeIt',
  //   //     aim: 'hide'
  //   //   }) : [{
  //   //     class: 'icono-crossCircle closeIt',
  //   //     aim: 'hide'
  //   //   }]
  //   // }
  // } else {
  //   // if (!myclass) {
  //   //   param = {title: param, dot: [{class: 'icono-crossCircle closeIt', aim: 'hide'}] }
  //   // }
  // }

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
  behaviors: [Core.itemComponentBehavior(app, 'actionSide')],
  lifetimes: {
    attached: function() { //节点树完成，可以用setData渲染节点，但无法操作节点
      let properties = this.properties
      let item       = properties.item
      if (lib.isObject(item)) {
        item.itemClass = 'actionSide'
        item.__actionMask = 'actionMask'
        if (item.dot) {
          item.dot = [].concat(item.dot).concat({itemClass: 'icono-crossCircle closeIt', aim: 'hide'})
        } else {
          item.dot = [{itemClass: 'icono-crossCircle closeIt', aim: 'hide'}]
        }
        this.setData({ $item: lib.resetItem(item) })
      }
    },
    ready: function() {
      const that = this
      setTimeout(() => {
        this.originalDataSource = JSON.stringify(this.data.$item)
      }, 300);
    }
  },
  methods: {
    // closeIt: function(event, param, ctx) {
    //   const dataset = event.currentTarget.dataset
    //   const aim = dataset.aim
    //   if (aim && aim == 'closeIt') {
    //     this.hide()
    //     return 0
    //   }
    // },
    show: function (p, c) {
      const {param, cb} = paramCb(p, c)
      const myContent = content.call(this, param) || {}
      this.update({
        ...myContent,
        'itemClass': 'actionSide-right moveit',
      }, cb)
    },
    hide: function (param) {
      const itemClass = this.data.$item.itemClass
      const fromLeft = itemClass.indexOf('actionSide-left') > -1
      const fromBot = itemClass.indexOf('actionSide-bot') > -1
      const fromTop = itemClass.indexOf('actionSide-top') > -1
      const fromRight = itemClass.indexOf('actionSide-right') > -1
      // const itCls = fromRight ? 'actionSide-right' : fromLeft ? 'actionSide-left' : fromBot ? 'actionSide-bot' : fromTop ? 'actionSide-top' : 'actionSide'
      const itCls = 'actionSide'
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
        ...myContent,
        itemClass: `actionSide-right ${myclass} moveit`,
        itemStyle: myStyle,
        __actionMask: myclass ? 'actionMask show' : 'actionMask',
      }, cb)
    },
    left: function (p, c) {
      const {param, cb} = paramCb(p, c)
      let myclass = lib.isString(param) ? param : cls(param)
      let myStyle = sty(param)
      let myContent = content.call(this, param, myclass) || {}
      this.update({
        ...myContent,
        itemClass: `actionSide-left ${myclass} moveit`,
        itemStyle: myStyle,
        __actionMask: myclass ? 'actionMask show' : 'actionMask',
      }, cb)
    },
    bot: function (p, c) {
      const {param, cb} = paramCb(p, c)
      let myclass = lib.isString(param) ? param : cls(param)
      let myStyle = sty(param)
      let myContent = content.call(this, param, myclass) || {}
      this.update({
        ...myContent,
        itemClass: `actionSide-bot ${myclass} moveit`,
        itemStyle: myStyle,
        __actionMask: myclass ? 'actionMask show' : 'actionMask',
      }, cb)
    },
    top: function (p, c) {
      const {param, cb} = paramCb(p, c)
      let myclass = lib.isString(param) ? param : cls(param)
      let myStyle = sty(param)
      let myContent = content.call(this, param, myclass) || {}
      this.update({
        ...myContent,
        itemClass: `actionSide-top ${myclass} moveit`,
        itemStyle: myStyle,
        __actionMask: myclass ? 'actionMask show' : 'actionMask',
      }, cb)
    },
  }
})