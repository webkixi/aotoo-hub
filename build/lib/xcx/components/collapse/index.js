/**
 * 作者： 天天修改
 * github: webkixi
 * 小程序的模板真是又长又臭
 */
const app = getApp()
const Core = require('../aotoo/core')
const lib = Core.lib

function collapseParse(source={}){
  let data = source.data
  if (lib.isArray(data)) {
    data = data.map(item=> {
      if (lib.isString(item) || lib.isNumber(item)) {
        item = {title: item}
      }

      if (lib.isObject(item)) {
        if (item.idf && !item.parent) {
          item.liClass = 'xxx'
          item.show = false
          item.catchtap = 'toggleChildren'
          if (lib.isString(item.title)) {
            item.title = {
              title: item.title,
              class: 'item icon-arrows-a-r color-999'
            }
          }
        }
      }
      return item
    })
  }
  source.data = data
  return source
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
    dataSource: Object,
  },
  data: {
    $dataSource: {},
  },
  behaviors: [Core.treeComponentBehavior(app, 'collapse')],
  lifetimes: {
    attached: function() { //节点树完成，可以用setData渲染节点，但无法操作节点
      let properties = this.properties
      let dataSource = collapseParse(properties.dataSource)
      this.setData({
        $list: dataSource
      })
    },
    ready: function() {
      const ds = this.data.$list
      this.mount((ds.$$id || ds.id))
    }
  },
  methods: {
    toggleChildren: function (e, param, inst) {
      const currentTarget = e.currentTarget
      const dataset = currentTarget.dataset
      const treeid = dataset.treeid
      this.findAndUpdate(treeid, function(res) {
        let title = res.title
        if (title.class.indexOf('icon-arrows-a-r')>-1) {
          res.title.class = 'item icon-arrows-a-b color-999'
          setTimeout(() => inst.children.level1.show(), 100);
        } else {
          res.title.class = 'item icon-arrows-a-r color-999'
          setTimeout(() => inst.children.level1.hide(), 100);
        }
        return res
      })
      // if (inst && inst.children && inst.children.level1) {
      //   inst.children.level1.toggle()
      // }
    }
  }
})