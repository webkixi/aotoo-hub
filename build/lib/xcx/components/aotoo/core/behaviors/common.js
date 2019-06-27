const lib = require('../../lib')

let storeEvts = {}
export function resetStoreEvts(params) {
  storeEvts = {}
}

function rightEvent(dsetEvt) {
  if (lib.isString(dsetEvt)) {
    const $id = lib.md5(dsetEvt)

    if (storeEvts[$id]) {
      return storeEvts[$id]
    }
    
    let rightEvt
    if (dsetEvt.indexOf('?')>-1) {
      let myQuery = {}
      const params = dsetEvt.split('@@')
      const evtType = params[0]
      dsetEvt = params[1]
      const evts = dsetEvt.split(',')
      evts.forEach(function(item) {
        if (item) {
          const its = item.split('=')
          const itName = its.splice(0, 1)
          const itQuery = its.join('=')
          const evtObj = lib.formatQuery(itQuery)
          myQuery[itName] = {fun: evtObj.url, param: evtObj.query}
        }
      })
      rightEvt = myQuery[evtType] || {fun: '', param: {}}
      rightEvt.allParam = myQuery
    } else {
      dsetEvt = dsetEvt.replace('@@', '?').replace(/,/g, '&')
      const evtObj = lib.formatQuery(dsetEvt)
      const evtType = evtObj.url
      const evtQuery = evtObj.query
      const evtSelect = evtQuery[evtType]
      const selObj = lib.formatQuery(evtSelect)
      const selFun = selObj.url
      const selParam = selObj.query
      rightEvt = {
        fun: selFun, 
        param: selParam,
        allParam: evtQuery
      }
    }
    storeEvts[$id] = rightEvt
    return rightEvt||{}
  }
}

export const commonBehavior = (app, mytype) => {
  mytype = mytype || 'behavior'
  return Behavior({
    properties: {
      id: {
        type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
        // value: '', // 属性初始值（可选），如果未指定则会根据类型选择一个
        // observer: function () { }  // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
      },
      fromComponent: {
        type: String,
        value: ''
      }
    },
    externalClasses: ['class-name'],
    relations: {},
    pageLifetimes: {
      // 页面被展示
      // console.log(app.globalData.currentPage);
      show: function () { },
      // 页面被隐藏
      hide: function () { },
      // 页面尺寸变化
      resize: function (size) { }
    },
    lifetimes: {
      // 初始化，啥数据都没有，但可以给this设置一些预定义值，可以在后面的生命周期调用
      created: function(params) {
        this.uniqId = lib.suid(mytype)
        this.hooks = lib.hooks(this.uniqId)
        this.$$type = mytype
        this.init = true // 第一次进入
        this.mounted = false
      },
      //节点树完成，可以用setData渲染节点，但无法操作节点
      attached: function () { //节点树完成，可以用setData渲染节点，但无法操作节点
        let properties = this.properties
        if (lib.isObject(properties.item)) {
          properties.item = lib.clone(properties.item)
        }
        if (lib.isObject(properties.list)) {
          properties.list = lib.clone(properties.list)
        }
        if (lib.isObject(properties.dataSource)) {
          properties.dataSource = lib.clone(properties.dataSource)
        }
        let props = (properties.item || properties.list || properties.dataSource)
        let id = properties.id
        // this.mountId = props.$$id ? false : id  // 如果$$id，则交给
        this.mountId = id || props.$$id // 如果$$id，则交给
        props['show'] = props.hasOwnProperty('show') ? props.show : true
        this.setData({uniqId: this.uniqId})
      },


      //组件布局完成，这时可以获取节点信息，也可以操作节点
      ready: function (params) {
        const that = this
        this.init = false
        this.mounted = true
        this.hooks.emit('ready')
        this.activePage = app.activePage
        this.originalDataSource = JSON.stringify((this.data.item || this.data.list || this.data.dataSource))
        if (this.data.fromTree) {
          this.treeInst = app['_vars'][this.data.fromTree]
        }
        if (this.data.fromComponent) {
          this.componentInst = app['_vars'][this.data.fromComponent]
        }
        this.mount()
      },

      //组件实例被移动到树的另一个位置
      moved: function () {},

      //组件实例从节点树中移除
      detached: function () {
        setTimeout(() => {
          app['_vars'][this.uniqId] = null
        }, 50);
      }
    },
    methods: {
      getData: function() {
        return this.data.$item || this.data.$list || this.data.$dataSource || {}
      },

      css: function (param = {}) {
        let cssStr = ''
        Object.keys(param).forEach(attr => {
          const val = param[attr]
          cssStr += `${attr}: ${val};`
        })
        if (this.$$is == 'item') {
          this.setData({
            '$item.itemStyle': cssStr
          })
        } 
        else if (this.$$is == 'list' || this.$$is == 'tree') {
          this.setData({
            '$list.itemStyle': cssStr
          })
        }
        else if (this.data.$dataSource) {
          this.setData({
            '$dataSource.itemStyle': cssStr
          })
        }
        return this
      },

      _getAppVars: function(key) {
        const $ds = this.data.$item || this.data.$list || this.data.dataSource
        const id = key || this.data.fromComponent || ($ds && $ds['fromComponent'])
        if (id) {
          return app['_vars'][id] || {}
        }
        return {}
      },

      _preGetAppVars: function(key, params, son) {
        const {fun} = params
        const inst = this._getAppVars(key)
        const $ds = this.data.$item || this.data.$list || this.data.dataSource
        let fromComponent = inst && inst.data && inst.data['fromComponent']
        if (!fromComponent) fromComponent = $ds && $ds['fromComponent']
        if (lib.isEmpty(inst)) {
          return son || {}
        } else {
          if (inst[fun]) return inst
          if (fromComponent) {
            return this._preGetAppVars(fromComponent, params, inst)
          } else {
            return inst
          }
        }
      },

      generateUpdate: function(_keyid, cb) {
        const that = this
        if (_keyid) {
          const keyId = `${_keyid}.`
          this.update = function (param) {
            if (lib.isObject(param)) {
              let target = {}
              Object.keys(param).forEach(key => {
                if (key.indexOf(keyId) == -1) {
                  const nkey = keyId + key
                  target[nkey] = param[key]
                } else {
                  target[key] = param[key]
                }
              })
              param = target
              this.setData(param, function() {
                if (lib.isFunction(cb)) cb.call(that)
              })
            }
          }
        }
        return this
      },
      mount: function(id) {
        const that = this
        this.mountId = id||this.mountId
        if (!this.init) {
          if (this.mountId) {
            this.activePage['elements'][this.mountId] = this
          }
          app['_vars'][this.uniqId] = this
          this.activePage['vars'][this.uniqId] = this
          this.activePage.hooks.on('destory', function () {
            app['_vars'][that.uniqId] = null
          })
        } else {
          this.hooks.on('ready', function() {
            that.mount(id)
          })
        }
      },
      show: function(params) {
        lib.isFunction(this.update) && this.update({ show: true })
      },
      hide: function(params) {
        lib.isFunction(this.update) && this.update({ show: false })
      },
      toggle: function(cb) {
        const data = this.getData()
        const toggleShow = data.show ? false : true
        if (lib.isFunction(this.update)) {
          this.update({show: toggleShow}, function() {
            if (lib.isFunction(cb)) cb(toggleShow)
          })
        }
      },
    }
  })
}

export const commonMethodBehavior = (app, mytype) => {
  return Behavior({
    behaviors: [],
    methods: {
      // aim: function (e) {
      //   if (this.treeInst) {
      //     this.treeInst.aim.call(this.treeInst, e)
      //     return false
      //   }
      //   const that = this
      //   const activePage = this.activePage
      //   const target = e.currentTarget
      //   const currentDset = target.dataset
      //   const parentInstance = this._getAppVars()
      //   let query
      //   let theAim = currentDset.aim

      //   if (theAim) {
      //     const aimObj = lib.formatQuery(theAim)
      //     theAim = aimObj.url
      //     query = aimObj.query
      //     e.currentTarget.dataset.aim = theAim
      //     e.currentTarget.dataset._query = query
      //   }

      //   const evtFun = activePage['aim']
      //   const isEvt = lib.isFunction(evtFun)
      //   let vals = this.hooks.emit('beforeAim', {ctx: this, event: e, aim: theAim, param: query})
      //   if (parentInstance && lib.isFunction(parentInstance['aim'])) {
      //     parentInstance['aim'].call(parentInstance, e)
      //   } else {
      //     if (vals) {
      //       vals.forEach(function(val) {
      //         if (val !== 0 && isEvt) evtFun.call(activePage, e, query, that) // 返回值为0则不透传
      //       })
      //     } else {
      //       if (isEvt) evtFun.call(activePage, e, query, that)
      //     }
      //   }
      // },

      _rightEvent: function (e) {
        const is = this.$$is
        const currentTarget = e.currentTarget
        const dataset = currentTarget.dataset
        let dsetEvt = e.type+'@@'+dataset['evt']
        if (is == 'list' || is == 'tree') {
          const mytype = this.data.$list.type
          if (mytype && (mytype.is == 'scroll' || mytype.is == 'swiper')) {
            dsetEvt = 'bind'+dsetEvt
          }
        }
        const tmp = rightEvent(dsetEvt)
        e.currentTarget.dataset._query = tmp.param
        return tmp
      },

      itemMethod: function (e) {
        itemReactFun.call(this, app, e)
      },

      catchItemMethod: function (e) {
        itemReactFun.call(this, app, e, 'catch')
      },
    }
  })
}

function itemReactFun(app, e, prefix) {
  if (this.treeInst) {
    this.treeInst[(prefix ? 'catchItemMethod' : 'itemMethod')].call(this.treeInst, e, prefix)
    return false
  }
  const that = this
  const currentTarget = e.currentTarget
  const dataset = currentTarget.dataset
  const activePage = this.activePage
  
  // const oType = e.type.indexOf('catch') == 0 ? e.type.replace('catch', '') : e.type
  const oType = e.type
  let nType = prefix ? prefix + oType : oType
  nType = nType.replace('catchcatch', 'catch')
  
  let dsetEvtStr = dataset['evt'].replace(/fake_/g, '').replace(/aim/g, 'catchtap')
  let dsetEvt = nType + '@@' + dsetEvtStr
  let rEvt = rightEvent(dsetEvt)
  let {fun, param, allParam} = rEvt
  if (fun === 'true') return
  if (!fun && prefix) {
    if (allParam[oType]) {
      const tmp = allParam[oType]
      if (typeof tmp == 'object') {
        fun = tmp.fun
        param = tmp.param
      } else {
        const tmp = lib.formatQuery(allParam[oType])
        fun = tmp.url
        param = tmp.query
      }
    }
  }
  
  if (fun) {
    let parentInstance = this._preGetAppVars(null, rEvt)
    if (lib.isEmpty(parentInstance)) {
      parentInstance = undefined
    }
    
    e.currentTarget.dataset._query = param
    const evtFun = activePage[fun] || app.activePage[fun]
    const thisFun = this[fun]
    const isEvt = lib.isFunction(evtFun)
    let vals = this.hooks.emit('beforeBind', {ctx: this, event: e, funName: fun, param})
    if (parentInstance && lib.isFunction(parentInstance[fun])) {
      parentInstance[fun].call(parentInstance, e, param, that)
    } else {
      if (vals) {
        vals.forEach(function (val) {
          if (val !== 0 && isEvt) evtFun.call(activePage, e, param, that) // 返回值为0则不透传
        })
      } else {
        if (lib.isFunction(thisFun)) {
          thisFun.call(this, e, param, this)
        } else {
          if (isEvt) evtFun.call(activePage, e, param, that)
          else {
            console.warn(`找不到定义的${fun}方法`);
          }
        }
      }
    }
  }
}