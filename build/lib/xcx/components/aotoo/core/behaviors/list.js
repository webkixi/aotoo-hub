const lib = require('../../lib')
import {
  commonBehavior,
  commonMethodBehavior,
  setPropsHooks
} from "./common";

const {
  reSetItemAttr,
  reSetArray,
  reSetList,
  isArray,
  isObject,
  isString
} = lib

function updateSelf(params) {
  if (params && isObject(params)) {
    params = setPropsHooks.call(this, params)
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
    mylist = fromTree ? lib.listToTree.call(this, mylist, fromTree) : reSetList.call(this, list)
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
            // this.reset()
            updateSelf.call(this, params)
          }
        } 
      },

      dataSource: {
        type: Object, 
        observer: function (params) {
          if (!this.init) {
            this.reset()
            updateSelf.call(this, params)
          }
        } 
      },
      
      fromTree: {
        type: Boolean|String,  // 来自tree，tree的结构依赖list生成
        value: false   // 来自tree实例的 uniqId
      },
      
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
      }
    },
    methods: {
      reset: function(param) {
        // this.setData({$list: JSON.parse(this.originalDataSource)})
        let oriData = lib.clone(this.originalDataSource)
        if (param) oriData.data = param
        this.setData({$list: oriData})
        return this
      },

      addClass: function(listCls) {
        listCls = lib.isString(listCls) ? listCls.split(' ') : undefined
        if (listCls) {
          let $list = this.data.$list
          let $listClass = $list.listClass && $list.listClass.split(' ') || []
          listCls = listCls.filter(cls=> $listClass.indexOf(cls) == -1 )
          $listClass = $listClass.concat(listCls)
          this.update({
            listClass: $listClass.join(' ')
          })
        }

      },

      hasClass: function (listCls) {
        listCls = lib.isString(listCls) ? listCls.split(' ') : undefined
        if (listCls) {
          let $list = this.data.$list
          let $listClass = $list.listClass && $list.listClass.split(' ') || []
          listCls = listCls.filter(cls => $listClass.indexOf(cls) !== -1)
          return listCls.length ? true : false
        }
      },

      removeClass: function (listCls) {
        listCls = lib.isString(listCls) ? listCls.split(' ') : undefined
        if (listCls) {
          let $list = this.data.$list
          let $listClass = $list.listClass && $list.listClass.split(' ') || []
          let indexs = []
          $listClass.forEach((cls, ii)=>{
            if (listCls.indexOf(cls) !== -1) {
              indexs.push(ii)
            }
          })
          if (indexs.length) {
            indexs.forEach(index => $listClass.splice(index, 1))
          }
          this.update({
            listClass: $listClass.join(' ')
          })
        }

      },

      update: function (param, callback) {
        const that = this
        const cb = lib.isFunction(callback) ? callback : null
        const updateFun = (opts) => {
          let param = opts
          if (lib.isArray(param)) {
            param = {data: param}
          }

          if (lib.isObject(param)) {
            let target = {}
            Object.keys(param).forEach(key => {
              if (param[key] || param[key] === 0) {
                let nkey = key.indexOf('$list.') == -1 ? '$list.' + key : key
                let nval = param[key]
                if (isArray(nval)) {
                  nval = reSetArray.call(this, param[key], this.data.$list).data
                } else {
                  if (key.indexOf('title') > -1 || key.indexOf('img')>-1 || isObject(nval)) {
                    if (key.indexOf('@') === -1) {
                      nval = reSetItemAttr.call(this, param[key], this.data.$list)
                    }
                  }
                }
                target[nkey] = nval
              }
            })
            if (lib.isArray(target['$list.data'])) {
              that.setData({ '$list.data': [] })
            }
            that.setData(target, cb)
          }
  
          // if (lib.isArray(param)) {
          //   let target = Object.assign({data: []}, this.data.$list)
          //   target.data = param
          //   let mylist = reSetList.call(this, target)
          //   that.reset([]).setData({ $list: mylist }, cb)
          // }
        }

        let result = this.hooks.emit('update', param)
        if (result && result[0]) {
          result = result[0]
          if (lib.isFunction(result.then)) {
            result.then( res => updateFun(res)).catch(err => err)
          } else {
            updateFun(result)
          }
        } else {
          updateFun(param)
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
          if (params.type && params.currentTarget && params.changedTouches) {
            const dataset = params.currentTarget.dataset
            const treeid = dataset.treeid
            if (treeid) {
              params = {"data-treeid": treeid}
            } else {
              return 
            }
          }
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
                    if (item.attr&&(item.attr[key] === params[key]) ||
                      item[key] == params[key]
                    ) $selectIndex = ii;
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
                const _params = params.replace('.', '')
                if (cls.indexOf(_params) > -1) {
                  $selectIndex = $selectIndex ? $selectIndex.concat(ii) : [ii]
                }
              }
            }

            if (bywhat == 'id') {
              if (lib.isString(params)) {
                const id = item.id
                const _params = params.replace('#', '')
                if (id === _params) {
                  $selectIndex = ii;
                  break;
                }
              }
            }
          }
        }
        return $selectIndex
      },

      find: function (params, bywhat) {
        let index
        if (lib.isString(params)) {
          let strNum = parseInt(params)
          if (strNum && lib.isNumber(strNum)) {
            params = strNum
          }
        }

        if (lib.isNumber(params)) {
          let $list = this.data.$list
          let $data = $list.data
          return $data[params]
        } 

        index = this.findIndex(params, bywhat)
        if (index || index === 0) {
          if (lib.isArray(index)) {
            return index.map((idx) => this.data.$list.data[idx])
          }
          let res = this.data.$list.data[index]
          res.__realIndex = index
          return res
        }
      },

      findAndUpdate: function (params, cb) {
        const res = this.find(params)
        if (res) {
          const index = res.__realIndex
          const isFun = lib.isFunction(cb)
          let result
          if (!isFun) return res
          result = cb(res)
          if (result) {
            this.update({ [`data[${index}]`]: result })
          }
        }
      },

      attr: function (params) {
        const res = this.find(params)
        if (res) {
          return res.attr
        }
      },

      append: function(params) {
        const that = this
        if (params) {
          let $list = this.data.$list
          let $data = $list.data
          let appendFun = (opts) => {
            $list.data = $data.concat(that.__newItem(opts))
            that.setData({$list})
          }

          let result = this.hooks.emit('append', params)
          if (result && result[0]) {
            result = result[0]
            if (lib.isFunction(result.then)) {
              result.then(res=> appendFun(res) ).catch(err=>err)
            } else {
              appendFun(result)
            }
          } else {
            appendFun(params)
          }
        }
        return this
      },

      prepend: function(params) {
        const that = this
        if (params) {
          let $list = this.data.$list
          let $data = $list.data
          let prependFun = (opts) => {
            $list.data = [].concat(this.__newItem(opts)).concat($data)
            that.setData({$list})
          }

          let result = this.hooks.emit('prepend', params)
          if (result && result[0]) {
            result = result[0]
            if (lib.isFunction(result.then)) {
              result.then(res => prependFun(res)).catch(err => err)
            } else {
              prependFun(result)
            }
          } else {
            prependFun(params)
          }
        }
        return this
      },

      delete: function (params) {
        let $list = this.data.$list
        let $data = $list.data
        let $selectIndex = this.findIndex(params)
        if ($selectIndex || $selectIndex == 0) {
          $data.splice($selectIndex, 1)
          this.setData({ $list })
        }
        return this
      },

      insert: function (params, pay) {
        const that = this
        let $list = this.data.$list
        let $data = $list.data
        if (lib.isString(params)) {
          let $selectIndex = this.findIndex(params)
          let insertFun = (payload) => {
            if (payload) {
              payload = that.__newItem(payload)
              if ($selectIndex || $selectIndex == 0) {
                $data.splice($selectIndex, 0, payload)
                that.setData({ $list })
              }
            }
          }

          let result = this.hooks.emit('insert', pay)
          if (result && result[0]) {
            result = result[0]
            if (lib.isFunction(result.then)) {
              result.then(res=> insertFun(res) ).catch(err=>err)
            } else {
              insertFun(result)
            }
          } else {
            insertFun(pay)
          }
        }
        return this
      },

      _scrollMethod: function (e) {
        return listReactFun.call(this, app, e, 'scroll')

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
        return listReactFun.call(this, app, e, 'swiper')
      },
    }
  })
}

function listReactFun(app, e, type="list") {
  const that = this
  if (this.treeInst) {
    return type == 'swiper' ? this.treeInst._swiperMethod.call(this.treeInst, e, type) : this.treeInst._scrollMethod.call(this.treeInst, e, type)
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

  if (fun) {
    const evtFun = activePage[fun] || app.activePage[fun]
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
        else {
          console.warn(`找不到定义的${fun}方法`);
        }
      }
    }
  }
}

export const listComponentBehavior = function(app, mytype) {
  mytype = mytype || 'list'
  return Behavior({
    behaviors: [listBehavior(app, mytype)],
  })
}