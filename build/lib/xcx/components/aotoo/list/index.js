/**
 * 作者： 天天修改
 * github: webkixi
 * 小程序的模板真是又长又臭
 */
const app = getApp()
const Core = require('../core')
const lib = Core.lib

// 数据模型
// const defaultListOptions = {
//   data: [
//     // String / Json 
//   ],
//   listClass: '',
//   listStyle: '',
//   itemClass: '',
//   itemStyle: '',
//   itemMethod: {},
// }

Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
    addGlobalClass: true
  },
  behaviors: [Core.listBehavior(app, 'list')],
  methods: {
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