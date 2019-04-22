import {
  isString,
  isObject,
  isArray,
  isNumber,
  isFunction,
  formatQuery,
  suid,
  resetSuidCount,
} from './util'

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

function setItemSortIdf(item, context) {
  if (typeof item == 'string' || typeof item == 'number' || typeof item == 'boolean') return item
  if (typeof item == 'object') {
    if (!Array.isArray(item)) {
      let extAttrs = {}
      let incAttrs = []

      if (context) {
        item.fromComponent = context.uniqId
      }

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
              item[attr] = setSortTemplateName(oData, context)
            } else {
              item[attr] = setItemSortIdf(oData, context)
            }
          }
        })
      }
      return item
    }
  }
}

function setSortTemplateName(data, context) {
  if (Array.isArray(data) && data.length) {
    return data.map(item => setItemSortIdf(item, context))
  }
}

export function resetItem(data, context) {
  let extAttrs = {}
  let incAttrs = []
  if (typeof data == 'string' || typeof data == 'number' || typeof data == 'boolean') {
    return data
  }
  
  Object.keys(data).forEach(function (key) {
    if (accessKey.indexOf(key) > -1 || (key.indexOf('@') == 0 && key.length > 1)) {
      incAttrs.push(key)
    } else {
      if (key == 'aim') {
        data.catchtap = data[key]
      }
      extAttrs[key] = data[key]
    }
  })
  
  data['__sort'] = incAttrs
  for (var attr in data) {
    const sonItem = data[attr]
    if (attr == 'itemMethod') {
      if (context && isObject(sonItem)) {
        Object.keys(sonItem).forEach(fn=>{
          context[fn] = sonItem[fn]
        })
        delete data.itemMethod
      }
    } else {
      if (Array.isArray(sonItem)) {
        data[attr] = setSortTemplateName(sonItem, context)
      } else {
        data[attr] = setItemSortIdf(sonItem, context)
      }
    }
  }
  if (!data.parent) data.itemDataRoot = true // 标识该item是最顶层item，class style用作容器描述

  // context.props = extAttrs
  return data
}