const app = getApp()
const {
  guid,
  suid,
  objTypeof,
  isFunction,
  isString,
  isNumber,
  isObject,
  isArray,
  sClone, // simple clone
  delItem
} = require('./utils')

function sortItem(item) {
  let sortKeys = ['title', 'img', 'li']
  let notUseKeys = ['title', 'img', 'li']
  let oriKeys = []
  let finalKey = ''
  Object.keys(item).forEach(function(key, index) {
    if (sortKeys.indexOf(key)>-1) {
      oriKeys.push(key)
      notUseKeys = delItem(notUseKeys, key)
    }
  })
  if (oriKeys.length) {
    oriKeys = oriKeys.concat(notUseKeys)
    oriKeys.forEach(function(key) {
      finalKey += key.charAt(0)
    })
    item.__template = 'title-'+finalKey
  }
  return item
}

function predefineImg(item) {
  if (item.img) {
    if (typeof item.img == 'string') {
      item.img = [ {src: item.img} ]
    } else {
      item.img = [].concat(item.img)
    }
    item.img = item.img.map(image=>{
      const uniqueKey = { uniqueKey: suid('img_') }
      return Object.assign(image, uniqueKey)
    })
  }
  return item
}

const specialTag = [
  'scroll',
  'swiper',
  'movearea',
  'label',
  'form',
  'picker',
  'pickerview',
]


function valideIndex(index) {
  return index || index == 0 ? true : false
}

function getHashKey(prefix="root_") {
  return suid(prefix)
}

function getItemClass(item) {
  if (isObject(item) && (item['className']||item['itemClass']||item['class'])) {
    return {
      className: item['className'] || item['itemClass'] || item['class'] 
    }
  }
}

// thisState.data.find
// uniqueKey
// hashKey
function getPathData(data, part, target) {
  if (part == 'root') {
    return data
  }
  if (part.indexOf('.children')>-1) {
    const ary = part.split('.')
    return data[ary[0]]['children'][target['index']]
  } else {
    return data[part][target['index']]
  }
}

function _setPathData(itemData, paths, content) {
  const key = paths[0]
  if (itemData[key]) {
    paths.shift()
    if (paths.length) {
      itemData[key] = _setPathData(itemData[key], paths, content)
    } else {
      itemData[key] = content
    }
  }
  return itemData // 没有匹配到key值会将原数据返回,匹配到数据会将新数据返回
}

function setPathData(addList, sdata, hashKey, dataPath, content) {
  let tmpObj
  const rootTarget = sdata.find(function(o) { return o['uniqueKey'] == hashKey })
  const rootAddress = addList.find(function(o) { return o['hashKey'] == hashKey })

  if (dataPath && dataPath.indexOf('___')>-1) {
    const paths = dataPath.split('___')
    tmpObj = _setPathData(rootTarget, paths, content)
  } else {
    tmpObj = content
  }
  sdata[rootAddress['index']] = tmpObj
  return sdata
}

// function saveTreeKeys(control, params) {
//   params = params ? [].concat(params) : []
//   control.saxer.set('treeKeys', params)
// }

function setItemKey(datas=[], depth=0, parentIndex, parentKey, part) {
  const myData = []
  let myKeys = []
  let start = datas.startIndex||0

  for (let ii = 0, jj = start; ii < datas.length; ii++, jj++) {
    let item = datas[ii]
    const itemKey = part ? getHashKey(part + '_') : getHashKey()
    let keyItem = valideIndex(parentIndex)
    ? { index: jj, hashKey: itemKey, depth: depth, belong: { hashKey: parentKey} }
    : { index: jj, hashKey: itemKey, depth: depth}
    
    const className = getItemClass(item)
    const _part = { part: part||'root' }
    const id_key = item['id'] ? {id: item['id']} : undefined

    keyItem = Object.assign({}, keyItem, className, id_key, _part)
    myKeys.push(keyItem)

    if (isString(item) || isNumber(item)) {
      const newItem = {title: item, uniqueKey: itemKey, typeof: 'string'}
      myData.push(newItem)
    } 

    else if (isObject(item)) {
      item = sortItem(item)
      item = predefineImg(item)
      item['uniqueKey'] = item.uniqueKey || itemKey
      item['typeof'] = 'object'
      const [subItemKeys, newItem] = setSubItemKey.call(this, item, jj, itemKey, ++depth)
      myKeys = myKeys.concat(subItemKeys)
      myData.push(newItem)
    }
  }
  
  return [myKeys, myData]
}

function setSubItemKey(item, index, parentHashKey, depth) {
  let _liKeys = [],
    _imgsKeys = [],
    _titlesKeys = [],
    _headerKeys = [],
    _bodyKeys = [],
    _ftKeys = [],
    _dotKeys = [],
    _tagKeys = []
  if (item.li) {
    let li = [].concat(item.li)
    let [liKeys, liData] = setItemKey.call(this, li, depth, index, parentHashKey, 'li')
    _liKeys = liKeys
    item.li = liData
  }

  if (item.img && (isArray(item.img) || isObject(item.img))) {
    let imgs = [].concat(item.img)
    let [imgsKeys, imgsData] = setItemKey.call(this, imgs, depth, index, parentHashKey, 'img')
    _imgsKeys = imgsKeys
    item.img = imgsData
  }

  if (item.title && (isArray(item.title) || isObject(item.title))) {
    let titles = [].concat(item.title)
    let [titlesKeys, titlesData] = setItemKey.call(this, titles, depth, index, parentHashKey, 'title')
    _titlesKeys = titlesKeys
    item.title = titlesData
  }

  if (item.header) {
    let header = [].concat(item.header)
    if (item.title || item.img || item.li) {
      const firstChild = {
        title: item.title,
        img: item.img,
        li: item.li
      }
      header.unshift(firstChild)
      item.title = undefined
      item.img = undefined
      item.li = undefined
      _liKeys = []
      _imgsKeys = []
      _titlesKeys = []
    }
    let [headerKeys, headerData] = setItemKey.call(this, header, depth, index, parentHashKey, 'header')
    _headerKeys = headerKeys
    item.header = headerData
  }

  if (item.body) {
    let body = [].concat(item.body)
    let [bodyKeys, bodyData] = setItemKey.call(this, body, depth, index, parentHashKey, 'body')
    _bodyKeys = bodyKeys
    item.body = bodyData
  }

  if (item.footer) {
    let footer = [].concat(item.footer)
    let [ftKeys, ftData] = setItemKey.call(this, footer, depth, index, parentHashKey, 'footer')
    _ftKeys = ftKeys
    item.footer = ftData
  }

  if (item.dot) {
    let dot = [].concat(item.dot)
    let [dotKeys, dotData] = setItemKey.call(this, dot, depth, index, parentHashKey, 'dot')
    _dotKeys = dotKeys
    item.dot = dotData
  }

  specialTag.forEach(function(tag) {
    let tagKeys=[], tagData=[]
    if (item[tag]) {
      let sTag = item[tag]
      if (isArray(sTag)) {
        [tagKeys, tagData] = setItemKey.call(this, sTag, depth, index, parentHashKey, tag+'.children')
        item[tag] = {children: tagData}
      }
      if (isObject(sTag) && sTag['children']) {
        [tagKeys, tagData] = setItemKey.call(this, sTag['children'], depth, index, parentHashKey, tag+'.children')
        item[tag]['children'] = tagData
      }
    }
    _tagKeys = _tagKeys.concat(tagKeys)
  })

  const itemKeys = [..._liKeys, ..._imgsKeys, ..._titlesKeys,..._headerKeys, ..._bodyKeys, ..._ftKeys, ..._dotKeys, ..._tagKeys]
  return [itemKeys, item]
}

function predefineType(ary, keyPrefix) {
  return ary.map(item=>{

    const uniqueKey = {
      uniqueKey: suid(keyPrefix)
    }

    if (typeof item == 'string' || typeof item == 'number') {
      return Object.assign( {title: item, typeof: 'string'}, uniqueKey )
    }

    if (typeof item == 'object') {
      item.typeof = Array.isArray(item) ? 'array' : 'object'
      if (item.typeof == 'object') {
        item = sortItem(item)
        if (item.img) {
          item = predefineImg(item)
        }
        if (item.li) {
          item.li = predefineType([].concat(item.li), 'hli_')
        }
        if (item.header) {
          item.header = predefineType([].concat(item.header), 'hheader_')
          if (item.title || item.img || item.li) {
            const firstChild = {
              title: item.title,
              img: item.img,
              li: item.li
            }
            item.header.unshift(firstChild)
          }
        }
        if (item.body) {
          item.body = predefineType([].concat(item.body), 'hbody_')
        }
        if (item.footer) {
          item.footer = predefineType([].concat(item.footer), 'hfooter_')
        }
        if (item.dot) {
          item.dot = predefineType([].concat(item.dot), 'hdot_')
        }

        specialTag.forEach(function(tag) {
          if (item[tag]) {
            let sTag = item[tag]
            let _key = 'h'+tag+'_'
            if (isArray(sTag)) {
              item[tag] = {children: predefineType([].concat(sTag), _key)}
            }
            if (isObject(sTag) && sTag['children']) {
              item[tag]['children'] = predefineType([].concat(sTag['children']), _key)
            }
          }
        })

        // if (item.scroll) {
        //   if (isArray(item.scroll)) {
        //     item.scroll = {children: predefineType([].concat(item.scroll), 'hscroll_')}
        //   }
        //   if (isObject(item.scroll) && item.scroll.children) {
        //     item.scroll.children = predefineType( [].concat(item.scroll.children||[]), 'hscroll_')
        //   }
        // }
        // if (item.swiper) {
        //   if (isArray(item.swiper)) {
        //     item.swiper = {
        //       children: predefineType([].concat(item.swiper), 'hswiper_')
        //     }
        //   }
        //   if (isObject(item.swiper) && item.swiper.children) {
        //     item.swiper.children = predefineType([].concat(item.swiper.children || []), 'hswiper_')
        //   }
        // }
        // if (item.movearea) {
        //   if (isArray(item.movearea)) {
        //     item.movearea = {
        //       children: predefineType([].concat(item.movearea), 'hmovearea_')
        //     }
        //   }
        //   if (isObject(item.movearea) && item.movearea.children) {
        //     item.movearea.children = predefineType([].concat(item.movearea.children || []), 'hmovearea_')
        //   }
        // }
        // if (item.label) {
        //   if (isArray(item.label)) {
        //     item.label = {
        //       children: predefineType([].concat(item.label), 'hlabel_')
        //     }
        //   }
        //   if (isObject(item.label) && item.label.children) {
        //     item.label.children = predefineType([].concat(item.label.children || []), 'hlabel_')
        //   }
        // }
        // if (item.form) {
        //   if (isArray(item.form)) {
        //     item.form = {
        //       children: predefineType([].concat(item.form), 'hform_')
        //     }
        //   }
        //   if (isObject(item.form) && item.form.children) {
        //     item.form.children = predefineType([].concat(item.form.children || []), 'hform_')
        //   }
        // }
        // if (item.picker) {
        //   if (isArray(item.picker)) {
        //     item.picker = {
        //       children: predefineType([].concat(item.picker), 'hpicker_')
        //     }
        //   }
        //   if (isObject(item.picker) && item.picker.children) {
        //     item.picker.children = predefineType([].concat(item.picker.children || []), 'hpicker_')
        //   }
        // }
        // if (item.pickerview) {
        //   if (isArray(item.pickerview)) {
        //     item.pickerview = {
        //       children: predefineType([].concat(item.pickerview), 'hpicker_')
        //     }
        //   }
        //   if (isObject(item.pickerview) && item.pickerview.children) {
        //     item.pickerview.children = predefineType([].concat(item.pickerview.children || []), 'hpicker_')
        //   }
        // }
        
        return Object.assign(item, uniqueKey)
      }
      if (item.typeof == 'array') {
        /** 数组型数据处理 */
      }
    }
  })
}


const defaultProps = {
  data: [],
  itemClass: '',
  listClass: '',
  itemStyle: '',
  listStyle: ''
}

function listClass(params) {
  this['$$type'] = 'aotoo_list'
  this['$$id'] = suid('aotoo_list_')
  this.ctx = undefined
  this.identifiKey = undefined
  this.state = undefined
  this.props = undefined
  this.addressList = undefined

  this.setProps(params, true)
}

// 初始化时运行一次
listClass.prototype = {
  mounted: function(ctx, ikey) {
    this.ctx = ctx
    this.identifiKey = ikey
    this.updateTimmer
    if (ctx) {
      app[this.$$id] = this
      this.state = ctx.ctx.data[ikey]
    }
  },

  // {data: [], itemClass: 'xxx', listClass: 'yyy'}
  setProps: function(option, fromInit) {
    let myProps = Object.assign({}, defaultProps, this.props, option)
    this.props = myProps
    const [addressList, result] = setItemKey.call(this, myProps.data || [])
    this.addressList = addressList
    this.props.data = result
    this.props.$$id = this.$$id
    if (!fromInit) {
      this._refresh(this.props)
    }
  },

  getPropsData: function(option) {
    return this.state || this.props
  },

  _refresh: function (state) {
    clearInterval(this.updateTimmer)
    if (state) {
      this.state = state
    }
    this.updateTimmer = setTimeout(() => {
      if (this.ctx) {
        let ctx = this.ctx.ctx
        let thisState = state || this.state
        if (ctx && this.identifiKey) {
          if (thisState.data && thisState.data.length) {
            ctx.setData({
              [this.identifiKey]: thisState
            })
            this.state = ctx.data[this.identifiKey]
          }
        }
      }
    }, 150);
  },

  // append
  // prepend
  // insert

  // thisState.data.find
  // uniqueKey
  // hashKey
  update: function (param) {
    let $data = this.state
    let $aryData = $data.data
    let thisState = sClone(this.state)

    if (isObject(param) || isArray(param)) {
      if (isObject(param)) {
        if (param['content']) {
          if (param.index || param.index == 0) {
            // let _target = $aryData[param.index]
            // let $target = _target

            // if (_target['uniqueKey']) {
            //   _target['uniqueKey'] = suid(_target['uniqueKey'])
            // }

            // if (_target['typeof'] == 'string') {
            //   $target['title'] = param['content']
            // }

            // if (isObject(param.content)) {
            //   $target = Object.assign(_target, param.content)
            // }

            // $aryData[param.index] = $target
            // thisState.data = $aryData
            // this._refresh(thisState)
          } else {
            const content = param['content']
            const realAddress = content['__realAddress']
            const rootHashKey = realAddress['hashKey']
            const dataPath = realAddress['dataPath']
            const updataData = setPathData(this.addressList, thisState.data, rootHashKey, dataPath, content)
            thisState.data = updataData
            this._refresh(thisState)
          }
        } else {
          if (param['__realAddress']) {
            const content = param
            const realAddress = content['__realAddress']
            const rootHashKey = realAddress['hashKey']
            const dataPath = realAddress['dataPath']
            const updataData = setPathData(this.addressList, thisState.data, rootHashKey, dataPath, content)
            thisState.data = updataData
            this._refresh(thisState)
          }
        }
      } else {
        if (isArray(param)) {
          const [addressList, result] = setItemKey.call(this, param)
          thisState.data = result
          this.addressList = addressList
          this._refresh(thisState)
        }
      }
    }
  },

  find: function(param) {
    let that = this
    let findClass = false, findId = false, findIndex = false, target = [], targetResult = [], rTarget = []
    const thisState = sClone(this.state)
    if (isString(param)) {
      if (param.indexOf('.')==0) {
        findClass = true
      }
      if (param.indexOf('#')==0) {
        findId = true
      }
    }

    if (isNumber(param)) {
      findIndex = true
    }

    // 映射数据
    target = that.addressList.filter(function (item) {
      if (findClass) {
        const findStr = param.replace(/\./g, '')
        return item['className'] == findStr ? true : item['className'] && item['className'].indexOf(findStr) > -1 ? true : false
      } else if (findId) {
        const findStr = param.replace(/#/g, '')
        return item['id'] == findStr
      } else {
        return item['hashKey'] == param
      }
    })

    
    // thisState.data.find
    // uniqueKey
    // hashKey
    // 真正的数据
    const stateData = thisState.data
    if (target.length) {
      target.forEach(function(item) {
        targetResult = targetResult.concat(
          reallyStateTarget({
            sData: stateData,
            addList: that.addressList,
            target: item
          }
        ))
      })
    } else {
      if (findIndex) {
        let rtnData = that.state['data'][param]
        rtnData['__realAddress'] = {
          hashKey: rtnData['uniqueKey'],
          index: param,
          dataPath: undefined
        }
        targetResult = rtnData
      }
    }
    return targetResult
  }
}

function reallyStateTarget(options) {
  let {
    sData, 
    addList, 
    target, 
    partPath
  } = options
  const hashKey = target['hashKey']
  if (target['part'] == 'root') {
    const $data = sData.find(function(o) { return o['uniqueKey'] == hashKey })
    if (partPath&&partPath.indexOf('___')) {
      const paths = partPath.split('___')
      let _data = paths.reduce((p, n) => p[n], $data)
      _data['__realAddress'] = {
        hashKey,
        index: target['index'],
        dataPath: partPath
      }
      return _data
    } else {
      const _data = $data
      _data['__realAddress'] = {
        hashKey,
        index: target['index'],
        dataPath: partPath
      }
      return _data
    }
  } else {
    if (target['belong']) {
      const hKey = target['belong']['hashKey']
      const findIt = addList.find(function (o) { return o['hashKey'] == hKey })
      const targetPart = target['part']
      if (partPath) {
        let curPartPath = targetPart + '___' + target['index']
        if (targetPart.indexOf('.children') > -1) {
          curPartPath = targetPart.replace('.children', '___children') + '___' + target['index']
        }
        partPath = curPartPath + '___' + partPath
      } else {
        if (targetPart.indexOf('.children')>-1) {
          partPath = targetPart.replace('.children', '___children') + '___' + target['index']
        } else {
          partPath = targetPart + '___' + target['index']
        }
      }
      return reallyStateTarget({
        sData, 
        addList, 
        target: findIt, 
        partPath
      })
    }
  }
}


var defaultPageConfig = {
  data: {},
  onLoad: function () {
    this.ctx = this
  }
}

function addReactionFunc(container, keyName, param) {
  if (!container[keyName]) {
    if (isFunction(param)) {
      const fun_idf = suid('hooksfun_')
      param['identity'] = fun_idf
      container[keyName] = {
        [fun_idf]: param
      }
    }
  } else {
    if (isFunction(param)) {
      const fun_idf = suid('hooksfun_')
      param['identity'] = fun_idf
      container[keyName] = Object.assign(container[keyName], {
        [fun_idf]: param
      })
    }
    if (isObject(param)) {
      let _target = {}
      Object.keys(param).forEach(function(funName) {
        const itemFun = param[funName]
        if (isFunction(itemFun)) {
          const fun_idf = suid('hooksfun_')
          itemFun['identity'] = fun_idf
          _target[fun_idf] = itemFun
        }
      })
      container[keyName] = Object.assign(container[keyName], _target)
    }
    if (isArray(param)) {
      let _target = {}
      param.forEach(function (itemFun) {
        if (isFunction(itemFun)) {
          const fun_idf = suid('hooksfun_')
          itemFun['identity'] = fun_idf
          _target[fun_idf] = itemFun
        }
      })
      container[keyName] = Object.assign(container[keyName], _target)
    }
  }
  return container
}

function removeReactionFunc(container, keyName, fun) {
  if (container[keyName]) {
    if (!fun) {
      container[keyName] = undefined
    } else {
      if (fun['identity']) {
        tainer[keyName][fun['identity']] = undefined
      }
    }
  }
}

function abcClass(params) {
  this.ctx = undefined
  this.config = Object.assign({}, defaultPageConfig, params)
  this.lifeActions = {}
  this.componentWillRender()
  this.render()
}

abcClass.prototype = {
  on: function (keyName, callback) {
    if (isString(keyName)) {
      this.lifeActions = addReactionFunc(this.lifeActions, keyName, callback)
    }
  },
  off: function (keyName, fun) {
    removeReactionFunc(this.lifeActions, keyName, fun)
  },
  emit: function (keyName, param) {
    const that = this
    if (this.lifeActions[keyName]) {
      let result = []
      const hooksFuncs = this.lifeActions[keyName] 
      Object.keys(hooksFuncs).forEach(function(funName) {
        const itemFun = hooksFuncs[funName]
        result.push(itemFun['call'](that, param))
      })
      return result
    }
  },

  componentWillRender: function () {
    var params = this.config
    var that = this

    // params = arrangeEvnetMethod(params)

    if (params.onLoad) {
      const old_onLoad = params.onLoad
      params.onLoad = function () {
        that.ctx = this
        that.emit('rendered')
        old_onLoad.apply(this, arguments)
      }
    }

    if (params.data) {
      let that = this
      Object.keys(params.data).forEach(function(key, ii) {
        let item = params.data[key]
        if (isObject(item) && item['$$type']) {
          let $type = item['$$type'].split('_')
          let identifi = $type[0]
          let componentType = $type[1]
          if (componentType == 'list') {
            params.data[key] = item['getPropsData']()
            // params.data[key] = item
          }
          that.on('rendered', function(params) {
            item['mounted'](that, key)
          })
        }
      })
    }

    this.config = params
  },

  render: function () {
    Page(this.config)
  }
}

function abc(params) {
  return new abcClass(params)
}

abc.list = function (props) {
  return new listClass(props)
}

module.exports = abc