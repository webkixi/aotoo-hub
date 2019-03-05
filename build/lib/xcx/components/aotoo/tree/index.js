/**
 * 作者： 天天修改
 * github: webkixi
 * 小程序的模板真是又长又臭
 */
const app = getApp()
const Core = require('../core')
const lib = Core.lib
const resetItem = lib.resetItem

// let isTree = false
function reSetItemAttr(item, list) {
  if (typeof item == 'boolean') return item
  if (typeof item == 'string' || typeof item == 'number') {
    item = { title: item }
  }
  
  const clsIndex = lib.suid('index-') // 将data-index置入每条数据的class中，这样不用去动结构
  const $ii = clsIndex
  
  if (list.itemMethod) {
    var itm = list.itemMethod
    if (typeof itm == 'object') {
      Object.keys(itm).forEach(evt => {
        item[evt] = itm[evt]
      })
    }
  }
  
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

  if (lib.isObject(item)) {
    if (item['attr']) {
      if (!item['attr']['data-treeid']) item['attr']['data-treeid'] = $ii
    } else {
      if (item['$$typeof']) {
        item = {title: item, attr: {'data-treeid': $ii}}
      } else {
        item['attr'] = {'data-treeid': $ii}
      }
    }
  }

  const newItem = resetItem(item)
  return newItem
}


function reSetArray(data, list) {
  if (lib.isArray(data)) {
    list.data = data.map(item => reSetItemAttr(item, list))
  }
  return list
}

function reSetList(list) {
  if (lib.isObject(list)) {
    return reSetArray(list.data, list)
  }
}

function updateSelf(params) {
  if (params) {
    const list = params
    const listProps = (()=>{
      let props = {}
      Object.keys(list).forEach(key=>{
        if (key!='data') props[key] = list[key]
      })
      return props
    })()

    const myList = reSetList(list)
    myList['show'] = myList.hasOwnProperty('show') ? myList.show : true
    this.setData({
      $list: myList,
      props: listProps,
      uniqId: this.uniqId
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
      // observer: function (params) {} // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
      observer: function (params) { 
        if (!this.init) {
          updateSelf.call(this, params)
        }
      } 
    },
    id: String,
  },
  data: {},
  behaviors: [Core.commonMethodBehavior],
  relations: {},
  externalClasses: ['class-name'],
  pageLifetimes: {
    show: function (xxx) {
      // 页面被展示
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
      const uniqId = this.uniqId = lib.suid(('tree_'))
      this.hooks = lib.hooks(this.uniqId)
      this.children = {}
      app['_vars'][uniqId] = this
      app.hooks.on('destory', function(params) {
        app['_vars'][uniqId] = null
      })
    },
    
    attached: function attached() { //节点树完成，可以用setData渲染节点，但无法操作节点
      const properties = this.properties
      const list = properties.list
      updateSelf.call(this, list)
    },

    ready: function ready() { //组件布局完成，这时可以获取节点信息，也可以操作节点
      this.init = false
      const activePage = this.activePage = app.activePage
      if (this.data.$list['$$id']) {
        const $id = this.data.$list['$$id']
        const listKey = activePage['eles'][$id]
        if (listKey) {
          activePage['elements'][listKey] = this
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
        this.setData(param)
      }
      if (lib.isArray(param)) {
        let target = Object.assign({data: param}, this.data.props)
        const mylist = reSetList(target)
        this.setData({ 
          $list: mylist,
        })
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
      if (lib.isString(params)) {
        let $list = this.data.$list
        let $data = $list.data
        for (let ii = 0; ii < $data.length; ii++) {
          const item = $data[ii]

          if (bywhat == 'attr') {
            const treeid = item.attr['data-treeid']
            if (treeid == params) {
              $selectIndex = ii;
              break;
            }
          }

          if (bywhat == 'class') {
            const cls = item.itemClass || item.class
            if (cls.indexOf(params) > -1) {
              $selectIndex = ii;
              break;
            }
          }
        }
      }
      return $selectIndex
    },

    find: function(params, bywhat) {
      const index = this.findIndex(params, bywhat)
      if (index || index == 0) {
        return this.data.$list[index]
      }
    },

    attr: function (treeid) {
      if (lib.isString(treeid)) {
        return this.find(treeid).attr
      }
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
      if (lib.isString(params)) {
        let $list = this.data.$list
        let $data = $list.data
        let $selectIndex = this.findIndex(params)
        if ($selectIndex || $selectIndex == 0) {
          $data.splice($selectIndex, 1)
          this.setData({$list})
        }
      }
      return this
    },
    
    insert: function(params) {
      if (lib.isString(params)) {
        if (pay) {
          pay = this.__newItem(pay)
          let $list = this.data.$list
          let $data = $list.data
          let $selectIndex = this.findIndex(params)
          if ($selectIndex || $selectIndex == 0) {
            $data.splice($selectIndex, 0, pay)
            this.setData({$list})
          }
        }
      }
      return this
    },

    // itemMethod: function (e) {
    //   const item = this.data.item
    //   const activePage = this.activePage
    //   const typeEvt = e.type == 'longpress' ? (item['longtap'] || item['longpress']) : item[e.type]
    //   const evtFun = activePage[typeEvt]
    //   if (evtFun && typeof evtFun == 'function') {
    //     evtFun(e, this)
    //   }
    // },

    // catchItemMethod: function (e) {
    //   const item = this.data.item
    //   const activePage = this.activePage
    //   const oType = e.type
    //   const nType = 'catch' + oType
    //   const typeEvt = oType == 'longpress' ? (item['catchlongtap'] || item['catchlongpress']) : item[nType]
    //   const evtFun = activePage[typeEvt]
    //   if (evtFun && typeof evtFun == 'function') {
    //     evtFun(e, this)
    //   }
    // },
    // aim: function (e) {
    //   const activePage = this.activePage
    //   const evtFun = activePage['aim']
    //   if (evtFun && typeof evtFun == 'function') {
    //     evtFun(e, this)
    //   }
    // }
  }
});