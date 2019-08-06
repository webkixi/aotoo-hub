/**
 * 作者： 天天修改
 * github: webkixi
 * 小程序的模板真是又长又臭
 */
const app = getApp()
const Core = require('../aotoo/core')
const lib = Core.lib

function slipParse(dataSource={}) {
  if (lib.isArray(dataSource.data)){
    dataSource.data = dataSource.data.map(item=>{
      if (lib.isNumber(item) || lib.isString(item)) {
        item = {title: item}
      }
      if (lib.isObject(item)) {
        item.id = lib.suid('slip_')
        item.catchtouchstart = 'tstart'
        item.catchtouchmove = 'tmove'
        item.catchtouchend = 'tend'
        item.catchtouchcancel = 'tcancel'
        // item.catchtouchstart = item.catchtouchstart || item.touchstart || true
        // item.catchtouchmove = item.catchtouchmove || item.touchmove || true
        // item.catchtouchend = item.catchtouchend || item.touchend || true
        // item.catchtouchcancel = item.catchtouchcancel || item.touchcancel || true
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

    dataSource.type.option[4] = dataSource.data.length
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
            this.reset([]).update(params)
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
      this.startTimmer = ''
      this.hooks.on('update', function(param) {
        if (lib.isArray(param)) {
          param = { data: param }
        }
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
      this.slipOption = {
        direction: _slip[0] || slipObj.direction,
        min: _slip[1] || slipObj.min,
        width: _slip[2] || slipObj.width,
        find: _slip[3] || slipObj.find,
        length: $data.length || 0
      }
    }
  },
  methods: {
    reset: function(param) {
      // let initData = JSON.parse(this.originalDataSource)
      let initData = lib.clone(this.originalDataSource)
      if (param) initData.data = param
      this.setData({$list: slipParse(initData)})
      return this
    },
    tstart(e, param, inst) {
      clearTimeout(this.startTimmer)
      this.startTimmer = setTimeout(() => {
        this.findAndUpdate(e, function(param) {
          param.itemClass = param.itemClass + ' active'
          return param
        })
      }, 700);
      this.hooks.emit('touchstart', e)
    },
    tmove(e, param, inst) {
      this.hooks.emit('touchmove', e)
    },
    tend(e, param, inst) {
      clearTimeout(this.startTimmer)
      this.findAndUpdate(e, function (param) {
        param.itemClass = param.itemClass.replace(' active', '').replace('active', '')
        return param
      })
      
      // let that = this
      // let _data = this.getData().data
      // let $data = lib.clone(_data)

      // let currentTarget = e.currentTarget
      // let dataset = currentTarget.dataset
      // let slipDone = dataset.slipDone
      // let {index, offset} = slipDone
      // index = parseInt(index)
      // offset = parseInt(offset)
      // if (offset > 0) {
      //   $data.splice((offset+1), 0, _data[index])
      //   $data.splice(index, 1)
      // } else {
      //   $data.splice((index + offset), 0, _data[index])
      //   $data.splice((index+1), 1)
      // }

      // setTimeout(() => {
      //   that.update($data)
      // }, 200);

      this.hooks.emit('touchend', e)
    },
  }
})

/***************************************
 * 生成从minNum到maxNum的随机数。
 * 如果指定decimalNum个数，则生成指定小数位数的随机数
 * 如果不指定任何参数，则生成0-1之间的随机数。
 *
 * @minNum：[数据类型是Integer]生成的随机数的最小值（minNum和maxNum可以调换位置）
 * @maxNum：[数据类型是Integer]生成的随机数的最大值
 * @decimalNum：[数据类型是Integer]如果生成的是带有小数的随机数，则指定随机数的小数点后的位数
 *
 ****************************************/
function randomNum(maxNum, minNum, decimalNum) {
  var max = 0,
    min = 0;
  minNum <= maxNum ? (min = minNum, max = maxNum) : (min = maxNum, max = minNum);
  switch (arguments.length) {
    case 1:
      return Math.floor(Math.random() * (max + 1));
      break;
    case 2:
      return Math.floor(Math.random() * (max - min + 1) + min);
      break;
    case 3:
      return (Math.random() * (max - min) + min).toFixed(decimalNum);
      break;
    default:
      return Math.random();
      break;
  }
}