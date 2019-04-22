const lib = require('../../lib')
import {
  commonBehavior,
  commonMethodBehavior
} from "./common";

export const itemBehavior = function(app, mytype) {
  mytype = mytype || 'item'
  return Behavior({
    behaviors: [commonBehavior(app, mytype), commonMethodBehavior(app, mytype)],
    properties: {
      item: {
        type: Object|String, 
        observer: function (params) { 
          if (!this.init) {
            if (params) {
              if (params.$$id) {
                this.setData({$item: lib.resetItem(params, this)})
              } else {
                this.update(params)
              }
            }
          }
        } 
      },
      id: String,
    },
    data: {
      $item: {}
    },
    lifetimes: {
      created: function() {
        this.$$is = 'item'
      },
      ready: function () { //组件布局完成，这时可以获取节点信息，也可以操作节点
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
      }
    },
    methods: {
      attr: function (params) {
        return this.data.$item.attr
      },
      reset: function() {
        this.setData({$item: JSON.parse(this.originalDataSource)})
        return this
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
          const _item = lib.resetItem(this.data.$item, this)
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
}

export const itemComponentBehavior = function(app, mytype) {
  return Behavior({
    behaviors: [itemBehavior(app, mytype)],
    definitionFilter(defFields, definitionFilterArr) {
      // 监管组件的setData
      defFields.methods = defFields.methods || {}
      defFields.methods._setData = function (data, opts, callback) {
        if (lib.isFunction(opts)) {
          callback = opts
          opts = {}
        }
        if (this.init) {
          if (data && lib.isObject(data)) {
            let myitem = data.$item || data.item || data.dataSource || {}
            data.$item = lib.resetItem(myitem, this)
          }
        }
        const originalSetData = this._originalSetData // 原始 setData
        originalSetData.call(this, data, callback) // 做 data 的 setData
      }
    },
    lifetimes: {
      created: function () {
        this._originalSetData = this.setData // 原始 setData
        this.setData = this._setData // 封装后的 setData
      },
      ready: function () { //组件布局完成，这时可以获取节点信息，也可以操作节点
        this.mount()
      },
    }
  })
}