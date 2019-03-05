const attrKey = [
  'aim', 'attr', 'class', 'itemClass', 'style', 'itemStyle', 'template',
  'tap', 'catchtap', 'longtap', 'catchlongtap', 'longpress', 'catchlongpress',
  'touchstart', 'touchmove', 'touchend', 'touchcancel',
  'data-treeid', 'id', 'treeid', 'src', '$$id', '__sort', 'tempName', 'idf', 'parent', 'show',
  'type', 'typeOptions',
  'hoverclass', '__actionMask',
  'data', 'mode'
]

const accessKey = [
  'title', 'img', 'icon', 'list', 'tree', 'item', 
  'header', 'body', 'footer', 'dot', 'li', 'k', 'v'
]

function setItemSortIdf(item) {
  if (typeof item == 'string' || typeof item == 'number' || typeof item == 'boolean') return item
  if (typeof item == 'object') {
    if (!Array.isArray(item)) {
      let extAttrs = {}
      let incAttrs = []

      Object.keys(item).forEach(function (key) {
        if (accessKey.indexOf(key) > -1 || (key.indexOf('@')==0 && key.length>1)) {
          incAttrs.push(key)
        } else {
          extAttrs[key] = item[key]
        }
      })

      if (incAttrs.length) {
        item['__sort'] = incAttrs
        incAttrs.map(attr => {
          const oData = item[attr]
          if (typeof oData == 'object') {
            if (Array.isArray(oData)) {
              item[attr] = setSortTemplateName(oData)
            } else {
              item[attr] = setItemSortIdf(oData)
            }
          }
        })
      }
      return item
    }
  }
}

export function setSortTemplateName(data) {
  if (Array.isArray(data) && data.length) {
    return data.map(item => setItemSortIdf(item))
  }
}

export function resetItem(data, context = {}) {
  let extAttrs = {}
  let incAttrs = []
  if (typeof data == 'string' || typeof data == 'number' || typeof data == 'boolean') {
    return data
  }
  
  Object.keys(data).forEach(function (key) {
    if (accessKey.indexOf(key) > -1 || (key.indexOf('@') == 0 && key.length > 1)) {
      incAttrs.push(key)
    } else {
      extAttrs[key] = data[key]
    }
  })
  
  data['__sort'] = incAttrs
  for (var attr in data) {
    const sonItem = data[attr]
    if (Array.isArray(sonItem)) {
      data[attr] = setSortTemplateName(sonItem)
    } else {
      data[attr] = setItemSortIdf(sonItem)
    }
  }
  if (!data.parent) data.itemDataRoot = true // 标识该item是最顶层item，class style用作容器描述

  // context.props = extAttrs
  return data
}


const filter = function(data, callback) { 
  if (isArray(data)) {
    return data.filter(callback)
  }
} 
let idrecode = []
let treeProps = {}
function valideClassName(clsname, level) {
	const reCls = / *level([\d]* *)?/ig
	const myLevelCls = `level${level}`
	if (clsname) {
		if (reCls.test(clsname)) {
			clsname = clsname.replace(reCls, '')
		}
    clsname += ` ${myLevelCls}`
		return clsname
	}
}
function subTree(item, dataAry, deep){
  deep = deep||1
  let fromTree
  if (this && this.fromTree) {
    fromTree = this.fromTree
  }
	let nsons = []
	let sons = filter(dataAry, o => o.parent == item.idf)
	sons.forEach( (son, ii) => {
		let _clsName = son.itemClass || son.class
    _clsName = valideClassName(_clsName, deep)
    son.itemClass = _clsName
		if (son.idf && idrecode.indexOf(son.idf) == -1) {
			idrecode.push(son.idf)
			nsons = nsons.concat([subTree.call({fromTree}, son, dataAry, ++deep)])
			--deep
		} else {
			nsons = nsons.concat(son)
		}
	})
	if (nsons.length) {
    // item.li = nsons
    // item['__sort'] = (item['__sort']||[]).concat('li')

		item['@list'] = {
      $$id: `level${deep}`,
      data: nsons,
      listClass: item.liClass || 'ul',
      itemClass: treeProps.itemClass||'',
      itemStyle: treeProps.itemStyle||'',
      fromTree : fromTree
    }
    item['__sort'] = (item['__sort'] || []).concat('@list')
	}
	return item
}

function owerTree(item) {
	const ary = []
	item.forEach( o => {
		if (Array.isArray(o)) return owerTree(item)
		ary.push(o)
	})
	if (ary.length) {
		return {li: ary}
	}
}

// TreeStructor
// 此处tree的算法与aotoo的tree算法有差异
export function tree(dataAry, props, fromTree){
	let menus = []
  idrecode = []
  treeProps = {
    itemClass: props.itemClass || props.class,
    itemStyle: props.itemStyle || props.style,
  }
  dataAry.forEach( (item, ii) => {
    if (typeof item == 'object' && !Array.isArray(item)) {
      if (item.idf && !item.parent && idrecode.indexOf(item.idf) == -1) {
        var clsName = item.itemClass || item.class
        clsName = clsName ? clsName.indexOf('level0') == -1 ? clsName + ' level0' : clsName : 'level0'
        item.itemClass = clsName
        menus.push(subTree.call({fromTree}, item, dataAry))
      }
      if (!item.idf && !item.parent) {
        menus.push(item)
      }
    }
    if (Array.isArray(item)) {
      var _tmp = owerTree(item)
			if (_tmp) {
        menus.push(_tmp)
			}
		}
  })
  return menus

	// dataAry.forEach( (item, ii)=>{
  //   const $ii = ii.toString()
	// 	// if (typeof item == 'string' || typeof item == 'number') menus.push(item)
	// 	if (typeof item == 'string' || typeof item == 'number') {
  //     item = {title: item}
  //   }
	// 	if (typeof item == 'object' && !Array.isArray(item)) {
	// 		if (item['attr']) {
	// 			if (!item['attr']['data-treeid']) item['attr']['data-treeid'] = $ii
	// 		} else {
	// 			if (item['$$typeof']) {
	// 				item = {title: item, attr: {'data-treeid': $ii}}
	// 			} else {
	// 				item['attr'] = {'data-treeid': $ii}
	// 			}
  //     }
	// 		if (item.idf && !item.parent && idrecode.indexOf(item.idf) == -1) {
  //       var clsName = item.itemClass || item.class
  //       clsName = clsName ? clsName.indexOf('level0') == -1 ? clsName + ' level-0' : clsName : 'level-0'
  //       item.itemClass = clsName
	// 			menus.push(subTree(item, dataAry))
	// 		}
	// 		if (!item.idf && !item.parent) {
	// 			menus.push(item)
	// 		}
  //   }
	// 	if (Array.isArray(item)) {
  //     var _tmp = owerTree(item)
	// 		if (_tmp) {
  //       menus.push(_tmp)
	// 		}
	// 	}
	// })
	// return menus
}

export function listToTree(_list, fromTree) {
  let list = clone(_list)
  if (isObject(list) && list.data) {
    list.data = tree(list.data, list, fromTree)
  }
  return list
}


export function isString(title) {
  return typeof title == 'string'
}

export function objTypeof(obj) {
  if (obj) return obj.nv_constructor ? obj.nv_constructor.toLowerCase() : obj.constructor.toLowerCase()
}

export function isObject(obj) {
  return objTypeof(obj) == 'object'
}

export function isArray(obj) {
  return objTypeof(obj) == 'array'
}

export function isNumber(obj) {
  return objTypeof(obj) == 'number'
}

export function isFunction(obj) {
  return objTypeof(obj) == 'function'
}

export function formatQuery(url) {
  let aim = url
  let query={};
  if (url) {
    let urls = url.split('?')
    aim = urls[0]
    if (urls[1]) {
      let params = urls[1].split('&')
      params.forEach(param => {
        let attrs = param.split('=')
        query[attrs[0]] = attrs[1] ? attrs[1] : true
      })
    }
  }
  return {url: aim, query}
}

let suidCount = -1
export function suid(prefix) {
  suidCount++
  prefix = prefix || 'normal_'
  if (typeof prefix == 'string') {
    return prefix + suidCount
  }
}

export function resetSuidCount(){
  if (suidCount > 9999) suidCount = -1
}

class _hooks {
  constructor(key){
    this.actions = {}
  }
  destory(){
    this.actions = null
  }
  on(key, cb) {
    let myActions = this.actions
    const hooksActionUniqId = suid('hooks_action_')
    if (cb) {
      cb['hooksActionUniqId'] = hooksActionUniqId
    }
    if (isString(key)) {
      if (myActions[key]) {
        myActions[key] = [].concat(myActions[key]).concat(cb)
      } else {
        myActions[key] = [cb]
      }
    }
  }
  off(key, fun) {
    if (isString(key)) {
      if (fun) {
        let hooksActionUniqId = fun.hooksActionUniqId
        if (hooksActionUniqId) {
          let theFuns = this.actions[key] 
          let selectFunIndex
          if (theFuns) {
            theFuns.forEach(($f, ii)=>{
              if ($f['hooksActionUniqId'] == hooksActionUniqId) {
                selectFunIndex = ii
              }
            })
            if (selectFunIndex) {
              theFuns.splice(selectFunIndex, 1)
            }
          }
        } 
      } else {
        delete this.actions[key]
      }
    }
  }
  emit(key, param, ctx) {
    if (isString(key)) {
      if (this.actions[key]) {
        const vals = []
        const funs = this.actions[key]
        funs.forEach(fun=>{
          if (isFunction(fun)) {
            vals.push(fun.call(ctx, param))
          }
        })
        if (vals.length) {
          return vals
        }
      }
    }
  }
  one(key, cb) {}
}

let myhooks = {}
export function hooks(idf) {
  if (isString(idf)) {
    if (!myhooks[idf]) {
      myhooks[idf] = new _hooks()
    }
    return myhooks[idf]
  }
}

export function clone(params) {
  return JSON.parse(JSON.stringify(params))
}