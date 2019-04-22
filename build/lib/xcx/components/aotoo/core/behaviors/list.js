const lib = require('../../lib')
import {
  commonBehavior,
  commonMethodBehavior
} from "./common";

const {
  reSetItemAttr,
  reSetList
} = lib

function updateSelf(params) {
  if (params) {
    let list = params
    let listProps = (() => {
      let props = {}
      Object.keys(list).forEach(key => {
        if (key != 'data') props[key] = list[key]
      })
      return props
    })()

    if (list.itemMethod && lib.isObject(list.itemMethod)) {
      Object.keys(list.itemMethod).forEach(fn=>{
        this[fn] = list.itemMethod[fn]
      })
      delete list.itemMethod
    }

    let mylist = list
    const fromTree = this.data.fromTree
    mylist = fromTree ? lib.listToTree(mylist, fromTree) : reSetList.call(this, list)
    this.setData({
      $list: mylist,
      props: listProps,
    })
  }
}

export const listBehavior = function(app, mytype) {
  mytype = mytype || 'list'
  return Behavior({
    behaviors: [commonBehavior(app, mytype), commonMethodBehavior(app, mytype)],
    properties: {
      list: {
        type: Object, 
        observer: function (params) {
          if (!this.init) {
            updateSelf.call(this, params)
          }
        } 
      },
      fromTree: {
        type: Boolean|String,  // 来自tree，tree的结构依赖list生成
        value: false   // 来自tree实例的 uniqId
      },
      id: String,
      fromComponent: {
        type: String,
        value: ''
      }
    },
    data: {
      $list: {}
    },
    lifetimes: {
      created: function() {
        this.$$is = 'list'
      },
      attached: function attached() { //节点树完成，可以用setData渲染节点，但无法操作节点
        const properties = this.properties
        const list = properties.list || properties.dataSource
        updateSelf.call(this, list)
      },

      ready: function () { //组件布局完成，这时可以获取节点信息，也可以操作节点
        const fromTree = this.data.$list.fromTree // 来自tree实例的 uniqId
        const activePage = this.activePage
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
      }
    },
    methods: {
      reset: function() {
        this.setData({$list: JSON.parse(this.originalDataSource)})
        return this
      },

      update: function (param, callback) {
        const cb = lib.isFunction(callback) ? callback : null
        if (lib.isObject(param)) {
          let target = {}
          Object.keys(param).forEach(key => {
            let nkey = key
            if (key.indexOf('$list.') == -1) {
              nkey = '$list.' + key
            }
            target[nkey] = reSetItemAttr.call(this, param[key], this.data.props)
          })
          param = target
          this.setData(param, cb)
        }
        if (lib.isArray(param)) {
          let target = Object.assign({data: param}, this.data.props)
          const mylist = reSetList.call(this, target)
          this.setData({ $list: mylist }, cb)
        }
        return this
      },
      
      __newItem: function(params) {
        if (lib.isArray(params)) {
          return params.map(param => {
            return reSetItemAttr.call(this, param, this.data.props)
          })
        } else {
          return reSetItemAttr.call(this, params, this.data.props)
        }
      },

      findIndex: function (params, bywhat='attr') {
        let $selectIndex
        if (params) {
          let $list = this.data.$list
          let $data = $list.data
          for (let ii = 0; ii < $data.length; ii++) {
            const item = $data[ii]
            const attr = item.attr
            const treeid = attr['data-treeid']||attr['treeid']

            if (bywhat == 'attr') {
              if (lib.isObject(params)) {
                Object.keys(params).forEach(function (key, jj) {
                  if (jj == 0) {  // 只匹配params的第一个参数
                    if (item[key] == params[key]) $selectIndex = ii;
                  }
                })
                if ($selectIndex) break;
              } 

              if (lib.isString(params)) {
                if (treeid == params) {
                  $selectIndex = ii;
                  break;
                }
              }
            }

            if (bywhat == 'class') {
              if (lib.isString(params)) {
                const cls = item.itemClass || item.class
                if (cls.indexOf(params) > -1) {
                  $selectIndex = $selectIndex ? $selectIndex.concat(ii) : [ii]
                }
              }
            }
          }
        }
        return $selectIndex
      },

      find: function (params, bywhat) {
        const index = this.findIndex(params, bywhat)
        if (index || index === 0) {
          if (lib.isArray(index)) {
            return index.map((idx) => this.data.$list.data[idx])
          }
          let res = this.data.$list.data[index]
          res.__realIndex = index
          return res
        }
      },

      findAndUpdate: function (treeid, cb) {
        const res = this.find(treeid)
        const index = res.__realIndex
        const isFun = lib.isFunction(cb)
        let result
        if (res) {
          if (!isFun) return res
          result = cb(res)
          if (result) {
            this.update({ [`data[${index}]`]: result })
          }
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

      delete: function (treeid) {
        if (lib.isString(treeid)) {
          let $list = this.data.$list
          let $data = $list.data
          let $selectIndex = this.findIndex(treeid)
          if ($selectIndex || $selectIndex == 0) {
            $data.splice($selectIndex, 1)
            this.setData({ $list })
          }
        }
        return this
      },

      insert: function (treeid, pay) {
        if (lib.isString(treeid)) {
          if (pay) {
            pay = this.__newItem(pay)
            let $list = this.data.$list
            let $data = $list.data
            let $selectIndex = this.findIndex(treeid)
            if ($selectIndex || $selectIndex == 0) {
              $data.splice($selectIndex, 0, pay)
              this.setData({ $list })
            }
          }
        }
        return this
      },

      _scrollMethod: function (e) {
        return listReactFun.call(this, e, 'scroll')

        // if (this.treeInst) {
        //   this.treeInst._scrollMethod(e)
        //   return
        // }

        // const $list = this.data.$list
        // const mytype = $list.type
        // const {fun, param} = this._rightEvent(e)

        // if (mytype && mytype.is == 'scroll') {
        //   this.hooks.emit('bindscroll', e)
        //   this.hooks.emit('bindscrolltoupper', e)
        //   this.hooks.emit('bindscrolltolower', e)
        // }
        
        // const activePage = this.activePage
        // const parentInstance = this.componentInst
        // const evtFun = activePage[fun]
        // const thisFun = this[fun]
        // const isEvt = lib.isFunction(evtFun)

        // if (parentInstance && lib.isFunction(parentInstance[fun])) {
        //   parentInstance[fun].call(parentInstance, e, param)
        // } else {
        //   if (lib.isFunction(thisFun)) {
        //     thisFun(e, param, this)
        //   } else {
        //     if (isEvt) evtFun.call(activePage, e, param, that)
        //   }
        // }
      },

      _swiperMethod: function (e) {
        return listReactFun.call(this, e, 'swiper')
      },
    }
  })
}

function listReactFun(e, type="list") {
  if (this.treeInst) {
    return this.treeInst.listReactFun.call(this.treeInst, e, type)
  }

  const $list = this.data.$list
  const mytype = $list.type

  if (type == 'swiper') {
    this.hooks.emit('bindchange', e)
    this.hooks.emit('bindtransition', e)
    this.hooks.emit('bindanimationfinish', e)
  }

  if (type == 'scroll') {
    this.hooks.emit('bindscroll', e)
    this.hooks.emit('bindscrolltoupper', e)
    this.hooks.emit('bindscrolltolower', e)
  }

  const activePage = this.activePage
  let parentInstance = this.componentInst
  const {fun, param} = this._rightEvent(e)
  const evtFun = activePage[fun]
  const thisFun = this[fun]
  const isEvt = lib.isFunction(evtFun)
  if (lib.isEmpty(parentInstance)) {
    parentInstance = undefined
  }

  if (parentInstance && lib.isFunction(parentInstance[fun])) {
    parentInstance[fun].call(parentInstance, e, param)
  } else {
    if (lib.isFunction(thisFun)) {
      thisFun.call(this, e, param, this)
    } else {
      if (isEvt) evtFun.call(activePage, e, param, (parentInstance||that))
    }
  }
}

export const listComponentBehavior = function(app, mytype) {
  mytype = mytype || 'list'
  return Behavior({
    behaviors: [listBehavior(app, mytype)],
  })
}