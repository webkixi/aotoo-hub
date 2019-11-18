/**
 * 作者： 天天修改
 * github: webkixi
 * 小程序的模板真是又长又臭
 */
const app = null //getApp()
const Core = require('../aotoo/core')
const lib = Core.lib



// 基于item的组件
Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
    addGlobalClass: true
  },
  // properties: {
  //   $item: Object
  // },
  data: {},
  behaviors: [Core.itemBehavior(app, '_Pop')],
  lifetimes: {
    attached: function() { //节点树完成，可以用setData渲染节点，但无法操作节点
      // let properties = this.properties
      // let dataSource = properties.$item
      // this.setData({
      //   $item: dataSource
      // })
    },
    ready: function() {
      // const ds = this.data
      // this.mount((ds.$$id || ds.id))
    }
  },
  methods: {
    onHide: function() {
      this.hooks.emit('hide')
      this.update({ itemClass: 'none' })
    },
    top: function(params) {
      const {title, itemClass} = params
      this.update({
        title: {
          title: title,
          itemClass: 'input-tips'
        },
        itemClass: itemClass || 'popups-wrap-input',
        tap: 'onHide'
      }, function(){
        setTimeout(() => this.hide(), 500);
      })
    },
    mid: function(params, time) {
      const {title, itemClass} = params
      this.update({
        title: title,
        itemClass: itemClass || 'popups-wrap',
        tap: 'onHide'
      }, function(){
        setTimeout(() => this.onHide(), time || 500);
      })
    },
    lettertipx: function(params, time) {
      const {title, itemClass} = params
      const that = this
      that.setData({
        '$item': {
          title: title,
          itemClass: itemClass || 'popups-wrap',
          // tap: 'onHide'
        }
      })
      setTimeout(() => {
        that.setData({
          '$item.itemClass': 'none'
        })
      }, time || 500);
    }
  }
})