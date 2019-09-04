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

export function resetItem(data, context, loop) {
  if (typeof data == 'string' || typeof data == 'number' || typeof data == 'boolean') return data
  if (isObject(data)) {
    let extAttrs = {}
    let incAttrs = []
    data['__sort'] = []
  
    if (context) {
      data.fromComponent = context.data.fromComponent || data.fromComponent || context.data.uniqId
      if (data.methods || data.itemMethod) {
        const methods = data.methods || data.itemMethod
        Object.keys(methods).forEach(key=>{
          let fun = methods[key]
          if (isFunction(fun)) {
            fun = fun.bind(context)
            context[key] = fun
          }
        })
        delete data.methods
        delete data.itemMethod
      }
    }
    
    Object.keys(data).forEach(function (key) {
      if (data.hasOwnProperty(key)) {
      // if (data[key] || data[key]===0) {
        if (accessKey.indexOf(key) > -1 || (key.indexOf('@') == 0 && key.length > 1)) {
          incAttrs.push(key)
        } else {
          if (key == 'aim') {
            data.catchtap = data[key]
            extAttrs['catchtap'] = data[key]
            delete data.aim
          } else {
            extAttrs[key] = data[key]
          }
        }
      } else {
        delete data[key]
      }
    })
    
    data['__sort'] = incAttrs
    for (var attr of incAttrs) {
      const sonItem = data[attr]
      if (isArray(sonItem)) {
        data[attr] = sonItem.filter(item => resetItem(item, context, true))
      } else {
        if (/^[^@]/.test(attr) && sonItem) {
          data[attr] = resetItem(sonItem, context, true)
        } 
      }
    }
    if (!data.parent && !loop) data.itemDataRoot = true // 标识该item是最顶层item，class style用作容器描述
  }
  return data
}