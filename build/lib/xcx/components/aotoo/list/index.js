/**
 * 作者： 天天修改
 * github: webkixi
 * 小程序的模板真是又长又臭
 */
const app = getApp()
const Core = require('../core')
const lib = Core.lib
const resetItem = lib.resetItem

function reSetItemAttr(item, list){
  if (typeof item == 'boolean') return item
  if (typeof item == 'string' || typeof item == 'number') {
    item = {title: item}
  }

  if (list.itemMethod ){
    var itm = list.itemMethod
    if (typeof itm == 'object') {
      Object.keys(itm).forEach(evt=>{
        item[evt] = itm[evt]
      })
    }
  }

  const clsIndex = lib.suid('index-') // 将data-index置入每条数据的class中，这样不用去动结构

  let itmc = list.itemClass || list.class || ''
  let myClass = item['itemClass'] || item['class'] || item['className'] || ''
  // itmc = itmc ? `${clsIndex} ${itmc}` : clsIndex
  item['itemClass'] = myClass ? itmc + ' ' + myClass : itmc

  if (list.itemStyle || list.style) {
    var itsy = list.itemStyle || list.style
    if (item['style'] || item['itemStyle']) {
      var myStyle = item['style'] || item['itemStyle']
      item['style'] = myStyle
    } else {
      item['style'] = itsy
    }
  }
  const newItem = resetItem(item)
  return newItem
}

function reSetArray(data, list) {
  if (typeof data == 'object' && Array.isArray(data)) {
    data = data.map(item => reSetItemAttr(item, list))
  }
  list.data = data
  return list
}

function reSetList(list) {
  if (typeof list == 'object' && !Array.isArray(list)) {
    list['show'] = list.hasOwnProperty('show') ? list.show : true
    return reSetArray(list.data, list)
  }
}

function updateSelf(params) {
  if (params) {
    const list = params
    const listProps = (() => {
      let props = {}
      Object.keys(list).forEach(key => {
        if (key != 'data') props[key] = list[key]
      })
      return props
    })()
    
    let mylist = list
    const fromTree = this.data.fromTree
    mylist = fromTree ? lib.listToTree(mylist, fromTree) : reSetList.call(this, list)
    this.setData({
      $list: mylist,
      props: listProps
    })
  }
}


const defaultListOptions = {
  data: [
    // String / Json 
  ],
  listClass: '',
  listStyle: '',
  itemClass: '',
  itemStyle: '',
  itemMethod: {},
}

Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
    addGlobalClass: true
  },
  properties: {
    list: {
      type: Object, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      // value: {}, // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer: function (params) { // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
        if (!this.init) {
          updateSelf.call(this, params)
        }
      } 
    },
    // list: {
    //   data: [],
    //   itemMethod: 'xxx',
    //   listClass: 'abc',
    //   listStyle: '...',
    //   type: 'scroll', // swipe, slide
    // },
    id: String,
    fromTree: {
      type: Boolean|String,  // 来自tree，tree的结构依赖list生成
      value: false   // 来自tree实例的 uniqId
    }
  },
  data: {},
  behaviors: [Core.commonMethodBehavior],
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
      this.init = true
      this.uniqId = lib.suid(('list_'))
      this.hooks = lib.hooks(this.uniqId)
    },
    
    attached: function attached() { //节点树完成，可以用setData渲染节点，但无法操作节点
      const properties = this.properties
      const list = properties.list
      updateSelf.call(this, list)
    },

    ready: function ready() { //组件布局完成，这时可以获取节点信息，也可以操作节点
      this.init = false
      const activePage = this.activePage = app.activePage
      const fromTree = this.data.$list.fromTree // 来自tree实例的 uniqId
      if (this.data.$list['$$id']) {
        const $id = this.data.$list['$$id']
        if (lib.isString(fromTree)) {
          const treeInst = app['_vars'][fromTree]
          treeInst['children'][$id] = this   // $id由tree算法定义 一般值为 level1 level2...
        } else {
          const listKey = activePage['eles'][$id]
          if (listKey) {
            activePage['elements'][listKey] = this
          } else {
            activePage['elements'][$id] = this
          }
        }
      }
    },

    moved: function moved() { //组件实例被移动到树的另一个位置

    },

    detached: function detached() { //组件实例从节点树中移除

    }

  },
  methods: {
    update: function (param, callback) {
      const cb = lib.isFunction(callback) ? callback : null
      if (lib.isObject(param)) {
        let target = {}
        Object.keys(param).forEach(key => {
          let nkey = key
          if (key.indexOf('$list.') == -1) {
            nkey = '$list.' + key
          }
          target[nkey] = reSetItemAttr(param[key], this.data.props)
        })
        param = target
        this.setData(param, cb)
      }
      if (lib.isArray(param)) {
        let target = Object.assign({data: param}, this.data.props)
        const mylist = reSetList(target)
        this.setData({ $list: mylist })
      }
      return this
    },
    
    __newItem: function(params) {
      if (lib.isArray(params)) {
        return params.map(param => {
          return reSetItemAttr(param, this.data.props)
        })
      } else {
        return reSetItemAttr(params, this.data.props)
      }
    },

    findIndex: function (params, bywhat='attr') {
      let $selectIndex
      if (params) {
        let $list = this.data.$list
        let $data = $list.data
        for (let ii = 0; ii < $data.length; ii++) {
          const item = $data[ii]

          if (bywhat == 'attr') {
            const attr = item.attr
            if (attr && lib.isObject(params)) {
              // 只允许但条件查询
              Object.keys(params).forEach(function(key, jj) {
                if (jj == 0) {
                  if (attr[key] == params[key]) {
                    $selectIndex = ii;
                  }
                }
              })
              if ($selectIndex) break;
            } else {
              continue;
            }
          }

          if (bywhat == 'class') {
            if (lib.isString(params)) {
              const cls = item.class
              if (cls.indexOf(params) > -1) {
                $selectIndex = ii;
                break;
              }
            }
          }
        }
      }
      return $selectIndex
    },
    
    append: function(params) {
      if (params) {
        let $list = this.data.$list
        let $data = $list.data
        $list.data = $data.concat(this.__newItem(params))
        this.setData({$list})
      }
    },

    prepend: function(params) {
      if (params) {
        let $list = this.data.$list
        let $data = $list.data
        $list.data = [].concat(this.__newItem(params)).concat($data)
        this.setData({$list})
      }
    },

    delete: function(params) {
      if (params) {
        let $list = this.data.$list
        let $data = $list.data
        let $selectIndex
        if (lib.isString(params)) {
          $selectIndex = this.findIndex(params, 'class')
        } else {
          if (lib.isObject(params)) {
            $selectIndex = this.findIndex(params)
          }
        }
        if ($selectIndex || $selectIndex == 0) {
          $data.splice($selectIndex, 1)
          this.setData({$list})
        }
      }
      return this
    },
    insert: function(params, pay) {
      if (lib.isString(params)) {
        if (pay) {
          pay = this.__newItem(pay)
          let $list = this.data.$list
          let $data = $list.data
          let $selectIndex
          if (lib.isString(params)) {
            $selectIndex = this.findIndex(params, 'class')
          } else {
            if (lib.isObject(params)) {
              $selectIndex = this.findIndex(params)
            }
          }
          if ($selectIndex || $selectIndex == 0) {
            $data.splice($selectIndex, 0, pay)
            this.setData({$list})
          }
        }
      }
      return this
    }
  }
});