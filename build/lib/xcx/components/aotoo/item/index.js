/**
 * 作者： 天天修改
 * github: webkixi
 * 小程序的模板真是又长又臭
 */
const app = getApp()
const Core = require('../core')
const lib = Core.lib
const resetItem = lib.resetItem

Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
    addGlobalClass: true
  },
  behaviors: [Core.itemBehavior(app)],
  lifetimes: {
    attached: function attached() { //节点树完成，可以用setData渲染节点，但无法操作节点
      this.setData({
        "$item": resetItem(this.properties.item)
      })
    }
  },
});