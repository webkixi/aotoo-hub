/**
 * 作者： 天天修改
 * github: webkixi
 * 小程序的模板真是又长又臭
 */
const app = getApp()
// const lib = require('../lib')
const Core = require('../core')
const lib = Core.lib
const resetItem = lib.resetItem

Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
    addGlobalClass: true
  },
  properties: {
    item: {
      type: Object|String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      // value: {}, // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer: function (params) { // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
        if (!this.init) {
          if (params) {
            if (params.$$id) {
              this.setData({$item: resetItem(params)})
            } else {
              this.update(params)
            }
          }
        }
      } 
    },
    id: String,
    fromList: {
      type: Boolean,
      value: false
    }
  },
  data: {},
  behaviors: [Core.itemMethodBehavior(app)],
  relations: {},
  externalClasses: ['class-name'],
  pageLifetimes: {
    show: function (xxx) {
      // 页面被展示
      // console.log(app.globalData.currentPage);
    },
    hide: function () {
      // 页面被隐藏
    },
    resize: function (size) {
      // 页面尺寸变化
    }
  },
  lifetimes: {
    created: function created() { //组件实例化，但节点树还未导入，因此这时不能用setData
      this.init = true   // 第一次进入
    },

    attached: function attached() { //节点树完成，可以用setData渲染节点，但无法操作节点
      const properties = this.properties
      const item = properties.item
      const fromList = properties.fromList
      item['show'] = item.hasOwnProperty('show') ? item.show : true
      if (fromList) {
        this.setData({ "$item": item })
      } else {
        this.setData({ "$item": resetItem(item) })
      }
    },

    ready: function ready() { //组件布局完成，这时可以获取节点信息，也可以操作节点
      this.init = false
      const activePage = this.activePage = app.activePage
      const $id = this.data.item['$$id'] || this.properties.id || this.data.item['id']
      if ($id) {
        const itemKey = activePage['eles'][$id]
        if (itemKey) {
          activePage['elements'][itemKey] = this
        } else {
          activePage['elements'][$id] = this
        }
      }
    },

    moved: function moved() { //组件实例被移动到树的另一个位置

    },

    detached: function detached() { //组件实例从节点树中移除

    }

  },
});