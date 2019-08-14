/**
 * 作者： 天天修改
 * github: webkixi
 * 小程序的模板真是又长又臭
 */
const app = getApp()
const Core = require('../aotoo/core')
const lib = Core.lib

// 基于item的组件
Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
    addGlobalClass: true
  },
  properties: {
    item: Object,
  },
  data: {

  },
  behaviors: [Core.itemBehavior(app, 'switch')],
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
      if (this._value) {
        this.update({
          checked: true
        })
      }
    },
    hide: function () {},
    resize: function () {},
  },
  lifetimes: {
    created() {
      this._value = false
    },
    attached: function() { //节点树完成，可以用setData渲染节点，但无法操作节点

    },
    ready: function() {

    }
  },
  methods: {
    value(){
      return this._value
    },
    switchChange(e){
      this._value = e.detail.value
      this.hooks.emit('changeValue', {value: this._value}, this)
      e.type = 'bindchange'
      Core.reactFun.call(this, app, e)
    }
  }
})