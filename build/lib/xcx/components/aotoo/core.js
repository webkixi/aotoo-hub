const lib = require('./lib')
const subListKey = ['header', 'body', 'footer', 'li', 'dot']
let storeEvts = {}
function rightEvent(dsetEvt) {
  if (storeEvts[dsetEvt]) {
    return storeEvts[dsetEvt]
  }
  
  let rightEvt
  if (dsetEvt.indexOf('?')>-1) {
    let myQuery = {}
    const params = dsetEvt.split('@@')
    const evtType = params[0]
    dsetEvt = params[1]
    const evts = dsetEvt.split(',')
    evts.forEach(function(item) {
      const its = item.split('=')
      const itName = its.splice(0, 1)
      const itQuery = its.join('=')
      const evtObj = lib.formatQuery(itQuery)
      myQuery[itName] = {fun: evtObj.url, param: evtObj.query}
    })
    rightEvt = myQuery[evtType]
  } else {
    dsetEvt = dsetEvt.replace('@@', '?').replace(/,/g, '&')
    const evtObj = lib.formatQuery(dsetEvt)
    const evtType = evtObj.url
    const evtQuery = evtObj.query
    const evtSelect = evtQuery[evtType]
    const selObj = lib.formatQuery(evtSelect)
    const selFun = selObj.url
    const selParam = selObj.query
    rightEvt = {fun: selFun, param: selParam}
  }
  storeEvts[dsetEvt] = rightEvt
  return rightEvt
}

let elements = {}
let actions = {}

function pageDataElement(data) {
  let nData
  let eles = {}
  let acts = {}
  if (lib.isObject(data)) {
    if (data['$$id']) {
      const $id = data['$$id']
      eles[$id] = $id
      if (data.methods) {
        const methods = data.methods
        if (lib.isObject(methods)) {
          acts[$id] = Object.assign(acts, methods)
          delete data.methods
        }
      }
    } else {
      nData = {}
      Object.keys(data).forEach(key=>{
        let item = data[key]
        if (lib.isObject(item)) {
          if (item['$$id']) {
            const $id = item['$$id']
            eles[$id] = key
    
            if (item.methods) {
              if (lib.isObject(item.methods)) {
                acts[$id] = Object.assign(acts, methods)
                delete item.methods
              }
            }
    
            if (lib.data && lib.isArray(item.data)) {
              item.data = item.data.map(sub => {
                if (lib.isObject(sub) && sub['$$id']) {
                  const obj = pageDataElement(sub)
                  eles = Object.assign(eles, obj.eles)  // tree/@list 模式适用,  tree/li模式需要区分是否为idf项
                  acts = Object.assign(acts, obj.acts)
                }
                return sub
              })
            }
          }
        }
        nData[key] = item
      })
    }
  }
  nData = nData || data
  return {eles, acts, nData}
}

function mergeActions(inst, acts) {
  if (lib.isObject(acts)) {
    Object.entries(acts).forEach(function(item) {
      const mtdKey = item[0]
      const mtdFun = item[1]
      if (lib.isFunction(mtdFun)) {
        inst[mtdKey] = mtdFun
      }
    })
  }
}

let activePage
core.getElementsById = function (id) {
  if (activePage) {
    return activePage.getElementsById(id)
  }
}

function core(params) {
  if (lib.isObject(params)) {
    let app = getApp(params.appConfig)
    app.hooks = lib.hooks('aotoo')

    if (params.data) {
      let myData = params.data
      var {eles, acts, nData} = pageDataElement(myData)
      params.data = nData
      app['_vars'] = {}
    }

    const oldLoad = params.onLoad
    params.onLoad = function () {
      this.elements = {}
      this.eles = eles || {}
      this.acts = acts || {}
      
      this.getElementsById = function(key) {
        return this.elements[key] || this.selectComponent('#'+key)
      }
      app.activePage = activePage = this
      if (typeof oldLoad == 'function') {
        // oldLoad.apply(this, arguments)
        setTimeout(() => {
          oldLoad.apply(this, arguments)
        }, 150);
      }
    }

    const oldReady = params.onReady
    params.onReady = function() {
      const that = this

      const elements = this.eles
      const actions = this.acts
      const actionIds = Object.keys(actions)
      actionIds.forEach($$id => {
        const defineMethods = actions[$$id]
        if (elements[$$id]) {
          const instId = elements[$$id]
          if (that.elements[instId]) {
            let $component = that.elements[instId]
            mergeActions($component, defineMethods)
          }
        }
      })

      if (typeof oldReady == 'function') {
        oldReady.apply(this, arguments)
        // setTimeout(() => {
        //   oldReady.apply(this, arguments)
        // }, 100);
      }
    }

    const oldUnload = params.onUnload
    params.onUnload = function() {
      elements = {}
      actions = {}
      app.activePage = undefined
      activePage = null
      storeEvts = {}

      app.hooks.emit('destory')
      lib.resetSuidCount()
      if (typeof oldUnload == 'function') {
        oldUnload.apply(this, arguments)
      }
    }

    Page(params)
  }
}

core.item = function(data, prefix) {
  if (data) {
    if (lib.isString(data) || lib.isNumber(data)) {
      data = {title: data}
    }

    if (lib.isObject(data)) {
      data['$$id'] = data['$$id'] || prefix || lib.suid('item__')
    }

    data.show = data.hasOwnProperty('show') ? data.show : true
  }
  return data
}

core.list = function(list, prefix) {
  if (typeof list == 'object') {
    if (lib.isArray(list)) {
      list = {data: list}
    }
    list['$$id'] = list['$$id'] || prefix || lib.suid('list__')
    list['show'] = list.hasOwnProperty('show') ? list.show : true
    return list
  }
}

core.tree = function(data) {
  return core.list(data, lib.suid('tree__'))
}

const commonMethodBehavior = Behavior({
  methods: {
    show: function(params) {
      this.update({ show: true })
    },
    hide: function(params) {
      this.update({ show: false })
    },
    toggle: function(cb) {
      const data = this.getData()
      const toggleShow = data.show ? false : true
      this.update({show: toggleShow}, function() {
        if (lib.isFunction(cb)) cb(toggleShow)
      })
    },
    aim: function (e) {
      const target = e.currentTarget
      const currentDset = target.dataset
      let query
      let theAim = currentDset.aim

      if (theAim) {
        const aimObj = lib.formatQuery(theAim)
        theAim = aimObj.url
        query = aimObj.query
        e.currentTarget.dataset.aim = theAim
        e.currentTarget.dataset._query = query
      }

      const activePage = this.activePage
      const evtFun = activePage['aim']
      let vals = this.hooks.emit('beforeAim', {ctx: this, event: e})
      if (vals) {
        vals = [].concat(vals)
        vals.forEach(function(val) {
          if (val !== 0) {  // 返回值为0则不透传
            if (lib.isFunction(evtFun)) {
              evtFun(e, query, this)
            }
          }
        })
      } else {
        if (lib.isFunction(evtFun)) {
          evtFun(e, query, this)
        }
      }
    },
    
    getData: function() {
      return this.data.$item || this.data.$list
    },

    itemMethod: function (e) {
      // const item = this.data.$item
      const currentTarget = e.currentTarget
      const dataset = currentTarget.dataset
      const activePage = this.activePage

      let dsetEvt = e.type+'@@'+dataset['evt']
      // const evtObj = lib.formatQuery(dsetEvt)
      // const evtType = evtObj.url
      // const evtQuery = evtObj.query
      // const evtSelect = evtQuery[e.type]
      // const selObj = lib.formatQuery(evtSelect)
      // const selFun = selObj.url
      // const selParam = selObj.query
      const {fun, param} = rightEvent(dsetEvt)
      e.currentTarget.dataset._query = param
      const evtFun = activePage[fun]
      if (lib.isFunction(evtFun)) {
        evtFun(e, param, this)
      }
    },

    catchItemMethod: function (e) {
      // const item = this.data.item
      const currentTarget = e.currentTarget
      const dataset = currentTarget.dataset
      const activePage = this.activePage
      const oType = e.type
      const nType = 'catch' + oType

      let dsetEvt = nType + '@@' + dataset['evt']
      const {fun, param} = rightEvent(dsetEvt)
      e.currentTarget.dataset._query = param
      const evtFun = activePage[fun]
      if (lib.isFunction(evtFun)) {
        evtFun(e, param, this)
      }
    },

    update: function (param, callback) {
      if (lib.isObject(param)) {
        let target = {}
        Object.keys(param).forEach(key => {
          if (key.indexOf('$item.') == -1) {
            const nkey = '$item.' + key
            target[nkey] = param[key]
          } else {
            target[key] = param[key]
          }
        })
        param = target

        this.setData(param)
        const _item = lib.resetItem(this.data.$item)
        const cb = lib.isFunction(callback) ? callback : null
        this.setData({
          item: _item,
          $item: _item
        }, cb)
      }
      return this
    }
  }
})

const itemMethodBehavior = function(app, mytype) {
  return Behavior({
    behaviors: [commonMethodBehavior],
    lifetimes: {
      created: function() {
        this.uniqId = lib.suid((mytype || 'behavior_'))
        this.hooks = lib.hooks(this.uniqId)
      },
      
      attached: function attached() { //节点树完成，可以用setData渲染节点，但无法操作节点
        // let properties = this.properties
        // let item = properties.item
        // let id = properties.id
        // this.mountId = item.id || id || mytype
      },

      ready: function () { //组件布局完成，这时可以获取节点信息，也可以操作节点
        this.activePage = app.activePage
        this.originalItem = JSON.stringify(this.data.item)
        // if (this.mountId) {
        //   this.activePage['elements'][this.mountId] = this
        // }
      },

      moved: function () { //组件实例被移动到树的另一个位置

      },

      detached: function () { //组件实例从节点树中移除

      }
    },
    methods: {
      reset: function() {
        this.setData({$item: JSON.parse(this.originalItem)})
        return this
      }
    }
  })
}

core.itemBehavior = function(app, mytype) {
  return Behavior({
    behaviors: [itemMethodBehavior(app, mytype)],
    properties: {
      item: {
        type: Object,
        value: {}
      },
      id: String,
    },
    data: {
      $item: {}
    },
    relations: {},
    externalClasses: ['class-name'],
    pageLifetimes: {
      show: function () {
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
      attached: function attached() { //节点树完成，可以用setData渲染节点，但无法操作节点
        let properties = this.properties
        let item = properties.item
        let id = properties.id
        this.mountId = item.id || id || mytype
      },
      ready: function ready() { //组件布局完成，这时可以获取节点信息，也可以操作节点
        if (this.mountId) {
          this.activePage['elements'][this.mountId] = this
        }
      },
    }
  })
}

function alert(text) {
  wx.showModal({
    content: text,
    showCancel: false
  });
}

function setItem(item) {
  let $item = item
  if (!item.hasOwnProperty('show')){
    $item = core.item(item)
  }
  $item = lib.resetItem($item)
  return $item
}

core.lib = lib
core.alert = alert
core.setItem = setItem
core.itemMethodBehavior = itemMethodBehavior
core.commonMethodBehavior = commonMethodBehavior
core.hooks = lib.hooks
module.exports = core