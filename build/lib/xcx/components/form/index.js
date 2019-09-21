/**
 * 作者： 天天修改
 * github: webkixi
 * 小程序的模板真是又长又臭
 */
const app = getApp()
const Core = require('../aotoo/core')
const lib = Core.lib

/**
 * data: [
 *  {
 *    title, 
 *    input[
 *      placeholder,
 *      id,
 *      name,
 *      value,
 *      disabled,
 *      type,
 *      attr
 *    ], 
 *    desc, 
 *    itemClass, 
 *    required, 
 *    show, 
 *    union
 *   },
 *   ...
 *   ...
 * ],
 * $$id: 'some id',
 * show: true
 */

const CLASS_NAMES = ['itemClass', 'class']
    , TYPE_TEXT = ['text', 'password', 'select', 'tel', 'date', 'span', 'textarea']
    , TYPE_PLHOLDER = ['text', 'password']
    , TYPE_RADIO = ['radio', 'checkbox']
    , TYPE_BUTTON = ['button', 'submit']

const containerAttributs = { // attrs
  uid: undefined,  // 索引
  title: undefined,
  desc: undefined,
  itemClass: 'input-item',
  listClass: '',
  itemStyle: undefined,
  listStyle: '',
  required: undefined,
  show: true,
  union: undefined
}

const inputAttributs = {
  uid: undefined,  // input的唯一id
  uAddress: undefined, // input在$validInputs中的寻址地址
  title: undefined,
  desc: undefined,
  error: undefined,
  eye: undefined,   // 密码键盘的显示密码的眼睛
  readonly: false,
  test: undefined, // 校验
  show: true,
  attr: undefined,

  maxlength: undefined,
  placeholder: undefined,
  id: undefined,
  name: undefined,
  value: undefined,
  type: 'text',
  disabled: false,
  union: undefined,
  attr: undefined,
  itemClass: 'input-item-input',
  inputClass: '',
  class: undefined,
  itemStyle: undefined,
  style: undefined,

  // 用于checkbox与radio
  titles: undefined,
  descs: undefined,
  values: undefined,
  checked: undefined,

  // button
  plain: undefined,
  size: undefined,
  loading: undefined,
  'form-type': undefined,
  'open-type': undefined,
  'hover-class': undefined,
  'hover-stop-propagation': undefined,
  'hover-start-time': undefined,
  'hover-stay-time': undefined,
  'lang': 'en',
  'session-from': undefined,
  'send-message-title': undefined,
  'send-message-path': undefined,
  'send-message-img': undefined,
  'app-parameter': undefined,
  'show-message-card': undefined,
  'bindgetuserinfo': undefined,
  'bindcontact': undefined,
  'bindgetphonenumber': undefined,
  'binderror': undefined,
  'bindopensetting': undefined,
  'bindlaunchapp': undefined,
  'tap': undefined,

  // sloder
  min: undefined,
  max: undefined,
  step: undefined,
  color: undefined,
  'selected-color': undefined,
  activeColor: undefined,
  backgroundColor: undefined,
  'block-size': undefined,
  'block-color': undefined,
  'show-value': undefined,


  // picker
  mode: undefined,
  'bindcancel': undefined,
  'bindinput': undefined,
  'bindfocus': undefined,
  'bindblur': undefined,
  'bindconfirm': undefined,
  'bindchange': undefined,
  'bindchanging': undefined,
  'bindcolumnchange': undefined,
  
  'cursor-spacing': undefined,   
  'confirm-type': undefined,
  'confirm-hold': undefined,
  'confirm-hold': undefined,
  'adjust-position': undefined,
}

const inputAttributsAccessKeys = Object.keys(inputAttributs)
const containerAttributsAccessKeys = Object.keys(containerAttributs)

function resetUIitem(params, cls='input-item-title') {
  if (params) {
    if (lib.isString(params)) {
      params = {title: params}
    }
    if (lib.isObject(params)) {
      params.itemClass = cls + ' ' + (params.itemClass || '')
    }
    if (lib.isArray(params)) {
      params = {
        title: params,
        itemClass: cls
      }
    }
    return params
  }
}

// 依照依赖规范输出配置
function normAsset(params, normAst=[]) {
  let nInput = {}
  Object.keys(params).forEach(key => normAst.includes(key) ? nInput[key] = params[key] : '')
  return nInput
}

function resetPickersValues(params, e) {
  if (lib.isArray(params.values)) {
    let titles = params.titles ? params.titles : []
    let value = params.value ? params.value : []
    let values = params.values
    let len = values.length

    for (let ii = 0; ii < len; ii++) {
      let columnVals = values[ii]
      if (!lib.isArray(columnVals)) {
        console.log('picker类型的组件要求input.values为二维数组! 类似[[], []]')
        break;
      }
      let _titles = []
      let _select = 0
      columnVals.forEach((item, jj) => {
        if (item.select) _select = jj
        if (typeof item == 'string' || typeof item == 'number') {
          item = {title: item.toString()}
        }
        if (item.title) {
          _titles.push(item.title)
        }
      })
      if (e && (value[ii] || value[ii]==0)) {
        _select = value[ii]
      }
      value[ii] = _select
      titles[ii] = _titles
    }
    params.value = value
    params.titles = titles
  }
  return params
}

// let _watcher = {}

// 规范input的属性
function normInput(params, profile) {
  const that = this
  if (lib.isObject(params)) {
    params.disabled = params.hasOwnProperty('disabled') ? params.disabled : false
    params.uid = params.hasOwnProperty('uid') ? params.uid : lib.suid('input_input_')
    params.uAddress = [profile.uid, params.uid].join('.') // 0 => item的uid, 1=>input的uid

    if (params.union) {
      const union = params.union
      if (union.target || union.id) {
        const selfId = params.id || params.name
        const target = union.target || union.id
        const cb = union.callback
        if (typeof cb == 'function') {
          let tmp = {
            id: selfId,
            address: '',
            assets: {},
            inputData: {},
            setData: function() {
              that.setData.apply(that, arguments)
            },
            save: function(param) {
              if (param && lib.isObject(param)) {
                this.setData({ [tmp.address]: param })
              } else {
                that.setData({[tmp.address]: tmp.inputData })
              }
            }
          }
          this.hooks.on('change', function(param) {
            const {id, point} = param   // point为观察的点的inputData
            if (id == target) {
              const res = that.getAddressInfo(params.uAddress)
              tmp.assets = that.getAddressInfo(params.uAddress).inputData
              tmp.inputData = tmp.assets
              tmp.address = res.address
              cb.call(tmp, {value: point.value})
            }
          })
          // _watcher = Object.assign(_watcher, tmp)
        }
      }
    }
    
    if (params.type !== 'span') {
      if (params.title) {
        params.title = resetUIitem(params.title)
      }
  
      if (params.desc) {
        params.desc = resetUIitem(params.desc, 'input-item-desc')
      }
  
      if (params.error) {
        params.error = resetUIitem(params.error, 'input-item-error')
      }
  
      if (params.type == 'password') {
        params.eye = params.hasOwnProperty('eye') ? params.eye : true
      }
  
      if (params.type == 'picker') {
        params = resetPickersValues(params)
      }
  
      if (params.type == 'dropdown') {
        if (lib.isObject(params.titles)){
          params.eye = 'icon-arrows-b'
          params.titles.show = false
          if (lib.isArray(params.titles.data)){
            params.titles.type = {
              is: 'scroll',
              'scroll-y': true,
              bindscroll: 'inputItemDropdownScroll?abc=123'
            }
            params.titles.listClass = "input-item-dropdown-options"
            params.titles.itemClass = "input-item-dropdown-options-item"
            params.titles.data = params.titles.data.map((item, ii)=>{
              if (typeof item == 'string') {
                item = {title: item}
              }
              if (item.parent) {
                item.aim = `inputItemDropdown?address=${params.uAddress}&index=${ii}&value=${item.value}&text=${item.title}`
              } else {
                item.tap = `inputItemDropdown?address=${params.uAddress}&index=${ii}&value=${item.value}&text=${item.title}`
              }
              return item
            })
          }
        }
      }
    }
    return normAsset(params, inputAttributsAccessKeys)
  }
}

// 规范input容器的属性
function normInputProfile(params) {
  if (params) {
    if (params.title) {
      params.title = resetUIitem(params.title, 'profile-item-title')
    }

    if (params.desc) {
      params.desc = resetUIitem(params.desc, 'profile-item-desc')
    }

    return normAsset(params, containerAttributsAccessKeys)
  }
}

// 规范input容器的属性
function normContainer(params) {
  return normAsset(params, containerAttributsAccessKeys)
}

function getTypeName(item){
  if (TYPE_RADIO.indexOf(item.type) > -1) {
    return lib.isString(item.name) ? (item.name || item.id) : lib.isArray(item.name) ? item.name[0] : ''
  } else {
    if (item.type) {
      return item.id||item.name
    }
  }
}

/**
 * 
 * @param {*} data 
 * @param {*} index 
 * 数据模型
 * {title: '', input: []/{}, desc: ''}
 */
function getItemAllocation(data, index) {
  let itemProfile = {}
  if (lib.isObject(data)) {

    // 容器属性
    Object.keys(data).forEach(key => {
      if (key != 'input') {
        // 设置样式
        if (CLASS_NAMES.indexOf(key) > -1) {
          itemProfile['itemClass'] = data[key] ? 'inputItem ' + data[key] : 'inputItem'
        } else {
          itemProfile[key] = data[key]
        }
      }
    }) 
    itemProfile.uid = itemProfile.hasOwnProperty('uid') ? itemProfile.uid : lib.suid('input_profile_')
    itemProfile = Object.assign({}, containerAttributs, normInputProfile(itemProfile))

    let assets = []
    let inputs = [].concat((data.input || []))
    inputs.forEach(item => {
      if (lib.isObject(item)) {
        assets.push(Object.assign({}, inputAttributs, normInput.call(this, item, itemProfile)))
      }
    })

    // map id to state.allocation
    let itemAllocation = {}
    assets.forEach(item => {
      const _name = getTypeName(item)
      if (_name) itemAllocation[_name] = item
    })

    return {
      itemAllocation,
      assets,
      itemProfile
    }
  }
}

// 表单资源集合，所有的表单元素的浅层资源类
function createAllocation(data) {
  let allocation = {}
  let nData = []
  data.forEach((item, ii) => {
    if (typeof item == 'object') {
      const {itemAllocation, assets, itemProfile} = getItemAllocation.call(this, item, ii)
      allocation = Object.assign(allocation, itemAllocation)
      let nItem = { profile: itemProfile, input: assets }
      nItem.uid = itemProfile.uid || lib.suid('input_item_')
      if (nItem) nData.push(nItem)
    }
  })
  return {allocation, data: nData}
}

function createProps(params) {
  let props = {}
  if (params) {
    Object.keys(params).forEach(key=>{
      if (key!='data') {
        props[key] = params[key]
      }
    })
  }
  props = normContainer(props)
  props.show = props.hasOwnProperty('show') ? props.show : true
  return props
}

function initForm(params) {
  let dataSource = params
  const props = this.props = createProps((dataSource || {}))
  const {allocation, data} = createAllocation.call(this, (dataSource.data||[]))
  this.allocation = allocation
  dataSource.data = this.validInputs = data
  this.setData({
    $dataSource: dataSource,
    $validInputs: this.validInputs,
    $props: props
  })
}

// 基于item的组件
Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
    addGlobalClass: true
  },
  properties: {
    dataSource: {
      type: Object,
      observer: function (params) { 
        if (this.mounted && !this.init) {
          if (params) {
            initForm.call(this, params)
          }
        }
      }
    }
  },
  data: {
    $dataSource: {},
  },
  behaviors: [Core.baseBehavior(app, 'form')],
  lifetimes: {
    created: function () {
      this.generateUpdate('$dataSource')
      this.$$is = 'form'
    },
    attached: function() { //节点树完成，可以用setData渲染节点，但无法操作节点
      let properties = this.properties
      let dataSource = properties.dataSource
      initForm.call(this, dataSource)
    },
    ready: function() {
      const ds = this.data.$dataSource
      // if (ds.$$id) this.mount((ds.$$id))
      this.mount((ds.$$id))
      this.parentInstance = this._getAppVars(ds.fromComponent)
      this.componentInst = this.parentInstance
      if (lib.isEmpty(this.parentInstance)) {
        this.parentInstance = undefined
      } else {
        this.parentInstance.form = this
      }
    }
  },
  methods: {
    find: function (uid) {
      let rightIt
      let rightIndex
      const $validInputs = this.data.$validInputs
      if (uid) {
        if (uid.indexOf('.') == -1) {
          $validInputs.forEach( (item, ii) => {
            if (item.uid == uid) {
              rightIndex = ii
              rightIt = item
            }
          })
          if (rightIt) {
            return {index: rightIndex, info: rightIt}
          }
        }

        if (uid.indexOf('.')>-1) {
          this.getAddressInfo(uid)
        }
      }
    },
    // address 取值来自input的data-address
    // address 为uid字符串，包含item.uid和input.uid，以 . 为分隔符
    getAddressInfo: function (address) {
      let findAddress
      let findIt
      let itemIndex
      let inputIndex
      let itemData
      let inputData
      let itemProfile
      const $validInputs = this.data.$validInputs
      if (address && $validInputs.length) {
        const [profile_uid, input_uid] = address.split('.')
        const res = this.find(profile_uid)
        if (res) {
          itemData = [res.info]
          itemIndex = res.index
          itemProfile = res.info.profile
        }
        if (input_uid && itemData.length) {
          inputData = itemData[0].input.filter((ipt, jj) => {
            if (ipt.uid == input_uid) {
              inputIndex = jj
              return true
            }
          })
        }

        if (inputData) {
          findAddress = `$validInputs[${itemIndex}].input[${inputIndex}]`
          findIt = inputData
        } else {
          if (itemData) {
            findAddress = `$validInputs[${itemIndex}]`
            findIt = itemData
          }
        }
        if (findAddress) {
          return {address: findAddress, inputData: findIt[0], profile: itemProfile}
        }
      }
    },
    
    addWarn: function (id, message) {
      this.value(id, { error: message })
    },
    
    addDesc: function (id, message) {
      this.value(id, { desc: message })
    },
    
    removeWarn: function(id) {
      this.value(id, {error: null})
    },
    
    removeDesc: function(id) {
      this.value(id, {desc: null})
    },

    disabled: function(id, val) {
      if (typeof val === 'boolean') {
        this.value(id, {disabled: val})
      } else {
        this.value(id, {disabled: true})
      }
    },

    // 清空某个表单的值
    empty: function(keyid) {
      const allocation = this.allocation
      let willEmpty = {}
      if (keyid) {
        Object.keys(allocation).forEach(id=>{
          if (id === keyid) willEmpty[id] = {value: ''}
        })
      } else {
        Object.keys(allocation).forEach(id=>{
          willEmpty[id] = {value: ''}
        })
      }
      this.value(willEmpty)
    },
    
    profile: function (id, val) {
      const allocation = this.allocation
      if (id) {
        if (lib.isString(id)) {
          const ipData = allocation[id]
          const address = ipData['uAddress']
          const profileId = address.split('.')[0]
          let res = this.find(profileId)
          if (res && val) {
            if (lib.isObject(val)) {
              res.info.profile = Object.assign(res.info.profile, val)
              this.setData({
                [`$validInputs[${res.index}]`]: res.info
              })
            }
          }
        }
      }
    },
    
    value: function(id, val) {
      const allocation = this.allocation
      if (id) {
        if (val) {
          if (lib.isString(id)) {
            if (allocation[id] && val) {
              const ipData = allocation[id] 
              const address = ipData['uAddress']
              let willUpdate = {}
              let res = this.getAddressInfo(address)
              if (res) {
                if (lib.isString(val)) {
                  res.inputData.value = val
                  let resault = res.inputData
                  res.inputData = resault = normInput.call(this, resault, res.profile)
                  willUpdate = {[res.address]: resault}
                } else {
                  if (lib.isObject(val)) {
                    let resault = Object.assign({}, res.inputData, val)
                    res.inputData = resault = normInput.call(this, resault, res.profile)
                    willUpdate = { [res.address]: resault }
                  }
                }
                allocation[id] = res.inputData
                this.setData(willUpdate)
              }
            }
          }
        } else {
          if (lib.isObject(id)) {
            let willUpdate = {}
            Object.keys(id).forEach($id=>{
              const myval = id[$id]
              const ipData = allocation[$id]
              if (ipData) {
                const address = ipData['uAddress']
                let res = this.getAddressInfo(address)
                if (res) {
                  if (lib.isString(myval)) {
                    res.inputData.value = myval
                    willUpdate[res.address] = res.inputData
                  } else {
                    if (lib.isObject(myval)) {
                      let resault = Object.assign({}, res.inputData, myval)
                      willUpdate[res.address] = resault
                    }
                  }
                  allocation[$id] = res.inputData
                }
              }
            })
            this.setData(willUpdate)
          } else {
            return allocation[id]
          }
        }
      } else {
        return allocation
      }
    },

    // 下拉菜单的列表项为scroll-view
    // 滚动式触发以下方法
    inputItemDropdownScroll: function (e, param) {
      // console.log(e);
      // console.log(param);
    },
    // dropdown
    // e evtent
    // param 经过 core itemMethod解析过后的数据，包含?abc=xxx等query信息
    inputItemDropdown: function (e, param={}) {
      const mytype = e.type
      const dataset = e.currentTarget.dataset
      const detail = e.detail
      let {address, index, value, text} = param
      let res = this.getAddressInfo(address||dataset.address)
      if (res) {
        if (dataset.eye) {
          const state = !res.inputData.titles.show
          res.inputData.titles.show = state
          res.inputData.eye = state ? 'icon-arrows-t' :'icon-arrows-b'
        } else {
          if (text) {
            res.inputData.titles.show = false
          }
          setAllocation.call(this, res, {value: (value||'') })
          res.inputData.value = text||''
          res.param = param
        }
        runFormBindFun.call(this, 'bindchange', res, e)
        runFormBindFun.call(this, 'bindinput', res, e)
        runFormBindFun.call(this, 'bindblur', res, e)
      }
    },

    inputBtnMethod(e){
      e.__type = 'bind'+e.type
      const mytype = e.type
      const dataset = e.currentTarget.dataset
      const detail = e.detail

      const address = dataset.address
      const res = this.getAddressInfo(address)
      const activePage = this.activePage
      const {fun, param, allParam} = this._rightEvent(e)

      switch (mytype) {
        case 'getuserinfo':
          runFormBindFun.call(this, 'bindgetuserinfo', res, e)
          break;

        case 'contact':
          runFormBindFun.call(this, 'bindcontact', res, e)
          break;

        case 'getphonenumber':
          runFormBindFun.call(this, 'bindgetphonenumber', res, e)
          break;

          
          case 'opensetting':
            runFormBindFun.call(this, 'bindopensetting', res, e)
            break;
            
        case 'error':
          runFormBindFun.call(this, 'binderror', res, e)
          break;

        case 'launchapp':  // e.type == 'error'，这个应该是小程序的bug
          runFormBindFun.call(this, 'bindlaunchapp', res, e)
          break;
      }
    },

    inputItemMethod: function(e) {
      const mytype = e.type
      const dataset = e.currentTarget.dataset
      const detail = e.detail

      const address = dataset.address
      const res = this.getAddressInfo(address)
      const activePage = this.activePage
      const {fun, param, allParam} = this._rightEvent(e)

      if (res) {
        var id = res.inputData.id || res.inputData.name
      }
      switch (mytype) {
        case 'confirm':
          runFormBindFun.call(this, 'bindconfirm', res, e)
          break;
          
        case 'focus':
          if (res.inputData.type == 'dropdown') {
            res.inputData.titles.show = true
            res.inputData.eye = 'icon-arrows-t'
          }
          runFormBindFun.call(this, 'bindfocus', res, e)
          break;

        case 'blur':
          if (res.inputData.type == 'dropdown') {
            // res.inputData.titles.show = false
            // res.inputData.eye = 'icon-arrows-b'
          }
          setAllocation.call(this, res, {value: detail.value})
          runFormBindFun.call(this, 'bindblur', res, e)
          break;

        case 'input':
          setAllocation.call(this, res, {value: detail.value})
          if (!res.inputData.readonly) {
            res.inputData.value = detail.value
          }
          runFormBindFun.call(this, 'bindinput', res, e)
          break;

        case 'tap':
          const targetFun = this.parentInstance&&this.parentInstance[fun] || activePage[fun]
          if (lib.isFunction(targetFun)) {
            const tapctx = this.parentInstance || activePage
            targetFun.call(tapctx, e, param, this)
          }
          break;
      
        default:
          break;
      }
    },

    openCloseEey: function(e) {
      const dataset = e.currentTarget.dataset
      const address = dataset.address
      const res = this.getAddressInfo(address)
      // console.log(res.address, res.inputData);
      if (res) {
        res.inputData.type = res.inputData.type == 'password' ? 'text' : 'password'
        res.inputData.eye && (res.inputData.eye = typeof res.inputData.eye == 'boolean' ? 'icon-close-eye mr-10-r size16 color-227ce1' : true)
        this.setData({ [res.address]: res.inputData })
      }
    },

    rcChange: function (e) {
      const dataset = e.currentTarget.dataset
      const detail = e.detail
      const res = this.getAddressInfo(dataset.address)
      if (res) {
        const type = res.inputData.type
        res.inputData.value = detail.value
        setAllocation.call(this, res, {value: detail.value})
        // this.setData({[res.address]: res.inputData})
        runFormBindFun.call(this, 'bindchange', res, e)
        runFormBindFun.call(this, 'bindchanging', res, e)
      }
    },

    pickersChange: function(e) {
      // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
      const dataset = e.currentTarget.dataset
      const detail = e.detail
      const res = this.getAddressInfo(dataset.address)
      if (res && e.type != 'cancel') {
        const type = res.inputData.type
        const column = detail.column
        const value = detail.value
        if (column || column === 0) {
          res.inputData.value[column] = value
        } else {
          res.inputData.value = value
        }
        setAllocation.call(this, res, {value: res.inputData.value})
        if (column || column === 0) {
          runFormBindFun.call(this, 'bindcolumnchange', res, e, 'pickers')
        } else {
          runFormBindFun.call(this, 'bindchange', res, e, 'pickers')
        }
      } else {
        runFormBindFun.call(this, 'bindcancel', res, e, 'cancel')
      }
    }
  }
})

function setAllocation(res, val) {
  var id = res.inputData.id || res.inputData.name
  let itemInput = this.allocation[id]
  if (itemInput) {
    if (lib.isObject(val)) {
      this.allocation[id] = Object.assign({}, itemInput, val)
      if (val.value) {
        if (itemInput.value != val.value) {
          itemInput = this.allocation[id]
          this.hooks.emit('change', {id, point: itemInput})
        }
      }
    }
  }
}

function runFormBindFun(fn, res, e, from) {
  let activePage = this.activePage
  let {fun, param, allParam} = this._rightEvent(e)
  let funNm = fun
  res.param = param
  if (lib.isString(res.inputData[fn])) {
    let funName = res.inputData[fn]
    let targetObj = (this.componentInst && !lib.isEmpty(this.componentInst)) || activePage
    let fun = (funNm&&targetObj[funNm]) || targetObj[funName]
    if (lib.isFunction(fun)) {
      let resData = ''
      let result = fun(e, res, this)
      if (result) {
        resData = result.inputData ? result.inputData : result
        if (from == 'pickers') {
          resData = resetPickersValues(resData, e)
        }
        from == 'cancel' ? '' : this.setData({[res.address]: resData})
      } else {
        /** 什么都不做 ? */
      }
    } else {
      from == 'cancel' ? '' : this.setData({[res.address]: res.inputData})
    }
  } else {
    let selfUpdate = ['picker', 'pickers', 'dropdown', 'checkbox', 'radio']
    if (selfUpdate.indexOf(res.inputData['type'])>-1) {
      from == 'cancel' ? '' : this.setData({[res.address]: res.inputData})
    }
  }
}