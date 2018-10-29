const app = getApp()

Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    innerText: {
      type: String,
      value: 'default value'
    },
    props: {
      type: Object,
      value: {}
    }
  },
  data: {
    // 这里是一些组件内部数据
    listData: {}
  },

  lifetimes: {
    created: function (params) { //组件实例化，但节点树还未导入，因此这时不能用setData
      
    },

    attached: function (params) { //节点树完成，可以用setData渲染节点，但无法操作节点
      let myProps = this.properties.props
      if (myProps['$$type']) {
        this.properties.propsData = myProps.getPropsData()
      } else {
        this.properties.propsData = myProps
      }
    },

    ready: function (params) { //组件布局完成，这时可以获取节点信息，也可以操作节点
      this.setData({
        listData: this.properties.propsData
      })
    },

    moved: function (params) { //组件实例被移动到树的另一个位置
      
    },

    detached: function (params) { //组件实例从节点树中移除
      
    },

  },

  
  methods: {
    // 这里是一个自定义方法
    customMethod: function () {
      console.log('========= oooooo');
    }
  }
})