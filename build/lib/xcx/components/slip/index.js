/**
 * 作者： 天天修改
 * github: webkixi
 * 小程序的模板真是又长又臭
 */
const app = getApp()
const Core = require('../aotoo/core')
const lib = Core.lib

let tpos = {
  instance: undefined,
  start: { x: 0, y: 0 },
  current: undefined,
  distance: 0,
  events: {},
  moving: false,
  timeStamp: {
    gap: 500,
    start: 0,
    end: 0
  }
}

function slipParse(dataSource={}) {
  if (lib.isArray(dataSource.data)){
    dataSource.data = dataSource.data.map(item=>{
      if (lib.isNumber(item) || lib.isString(item)) {
        item = {title: item}
      }
      if (lib.isObject(item)) {
        item.id = lib.suid('slip_')
        item.catchtouchstart = item.catchtouchstart || item.touchstart || true
        item.catchtouchmove = item.catchtouchmove || item.touchmove || true
        item.catchtouchend = item.catchtouchend || item.touchend || true
        item.catchtouchcancel = item.catchtouchcancel || item.touchcancel || true
        if (lib.isArray(item.li)) {
          item.li = item.li.map(itm=>{
            if (itm.tap || itm.fake_tap) {
              itm.fake_tap = itm.fake_tap || itm.tap
              delete itm.tap
            }
            if (itm.aim || itm.catchtap || itm.fake_aim) {
              itm.fake_aim = itm.fake_aim || itm.catchtap || itm.aim
              delete itm.aim
            }
            if (itm.longpress || itm.fake_longpress) {
              itm.fake_longpress = itm.fake_longpress || itm.longpress
              delete itm.longpress
            }
            if (itm.catchlongpress || itm.catchlongpress || itm.fake_catchlongpress) {
              itm.fake_catchlongpress = itm.fake_catchlongpress || itm.catchlongpress || itm.catchlongpress
              delete itm.catchlongpress
            }
            return itm
          })
        }
      }
      return item
    })

    /**
     * option: []  [0] => 方向asdw  [1] => 最小移动距离  [2] => 横向按钮的宽度 [3] => item的类名  [4] => data.length有多少条数据
     */
    dataSource.type = {
      is: 'slip',
      option: dataSource.option || (dataSource.type && dataSource.type.option) || ['a', 10, 60]
    }

    dataSource.type.option.length = dataSource.data.length
  }
  return dataSource
}

/**
 * data: [
 *  {title: 'tabName', content: 'some content'},
 *  {title: 'tabName', content: 'some content'},
 *  {title: 'tabName', content: 'some content'},
 *  {title: 'tabName', content: 'some content'},
 * ],
 * $$id: 'some id',
 * select: 0,
 * multipy: false,
 * singleView: false,
 * show: true
 */
const dealObjectItem = (param) => {
  const tmp = slipParse({data: [param]})
  return tmp.data[0]
}
// 基于list的组件
Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
    addGlobalClass: true
  },
  properties: {
    dataSource: {
      type: Object,
      observer: function (params) {
        if (!this.init) {
          if (params) {
            this.update(params)
            // let dataSource = slipParse.call(this, params)
            // this.setData({ $list: dataSource })
          }
        }
      }
    },
  },
  data: {

  },
  behaviors: [Core.listBehavior(app, 'slip')],
  lifetimes: {
    created: function() {
      this.hooks.on('update', function(param) {
        if (lib.isObject(param)) {
          Object.keys(param).forEach(key=>{
            if (key.indexOf('data') != -1) {
              let val = param[key]
              if (lib.isArray(val)) {
                const tmp = slipParse({data: param[key]})
                param[key] = tmp.data
              } else {
                const tmp = slipParse({data: [val]})
                param[key] = tmp.data[0]
              }
            }
          })
        }
        return param
      })

      this.hooks.on('append', function(param) {
        return dealObjectItem(param)
      })

      this.hooks.on('prepend', function(param) {
        return dealObjectItem(param)
      })

      this.hooks.on('insert', function(param) {
        return dealObjectItem(param)
      })
    },
    attached: function() { //节点树完成，可以用setData渲染节点，但无法操作节点
      let properties = this.properties
      let dataSource = slipParse.call(this, (this.data.$list || properties.dataSource))
      this.setData({ $list: dataSource })
    },
    ready: function() {
      const $list = this.data.$list
      const $type = $list.type
      const $data = $list.data
      let _slip = $type.option
      let slip = {
        direction: _slip[0] || slipObj.direction,
        min: _slip[1] || slipObj.min,
        width: _slip[2] || slipObj.width,
        find: _slip[3] || slipObj.find,
        length: $data.length || 0
      }
      tpos.slip = slip
    }
  },
  methods: {
    reset: function() {
      let initData = JSON.parse(this.originalDataSource)
      this.setData({$list: slipParse(initData)})
      return this
    },
    tstart(e, param, inst) {
      const changeIt = e.touches[0] || e.changedTouches[0]
      const target = e.currentTarget
      const id = target.id
      const pageX = changeIt.pageX
      const pageY = changeIt.pageY

      const query = this.createSelectorQuery()
      const myinst = query.select(`#${id}`)
      myinst.boundingClientRect()
      query.exec(function (res) {
        const _target = res[0]
        if (tpos.instance) {
          if (tpos.instance.id == _target.id) {

          } else {
            // 还原 tpos.instance.id 实例的初始状态
          }
          tpos.instance = Object.assign({}, tpos.instance, {
            top: _target.top,
            left: _target.left,
            right: _target.right,
            bottom: _target.bottom
          })
        } else {
          tpos.instance = {
            id: target.id,
            treeid: target.dateset.treeid,
            top: _target.top,
            left: _target.left,
            right: _target.right,
            bottom: _target.bottom,
            width: _target.width,
            height: _target.height
          }
        }
      })

      tpos = {
        start: {
          x: pageX,
          y: pageY
        },
        timeStamp: {
          start: e.timeStamp
        },
        instance: {
          id: target.id,
          // treeid: target.dateset.treeid
        }
      }
    },
    tmove() {
      // console.log('=========== move');
    },
    tend(e, param, inst) {
      // console.log('=========== end');
    }
  }
})