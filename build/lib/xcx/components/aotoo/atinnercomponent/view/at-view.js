const app = getApp()

function mergeItemEvent(key, props, item) {
  return item[key] || props[key] || ''
}

Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    props: {
      type: Object,
      value: {}
    },
    item: {
      type: Object,
      value: {}
    },
    id: {
      type: String,
      value: ''
    }
  },
  data: {
    // 这里是一些组件内部数据
    _props: {},
    _item: {}
  },
  lifetimes: {
    created: function () { //组件实例化，但节点树还未导入，因此这时不能用setData

    },

    attached: function () { //节点树完成，可以用setData渲染节点，但无法操作节点
      const properties = this.properties
      const props = properties.props
      const item = properties.item
      this.setData({
        _props: props,
        _item: item,
        id: properties.id
      })
    },

    ready: function () { //组件布局完成，这时可以获取节点信息，也可以操作节点
      const that = this
      const properties = this.properties
      const myProps = properties.props
      const myItem = properties.item
      const compInst = app[myProps['$$id']]
      if (compInst) {
        let pageContext = compInst.ctx.ctx
        Object.keys(pageContext).forEach(function(key) {
          if (key.indexOf('handle__')>-1 && typeof pageContext[key] == 'function') {
            that[key] = function (e) {
              pageContext[key].call(pageContext, e, myItem)
            }
          }
        })
      }
    },

    moved: function () { //组件实例被移动到树的另一个位置

    },

    detached: function () { //组件实例从节点树中移除

    },

  },
  methods: {
    
  }
})