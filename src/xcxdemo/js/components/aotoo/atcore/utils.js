let suidCount = -1
function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function guid() {
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

function suid(prefix) {
  suidCount++
  if (typeof prefix == 'string') {
    return prefix + suidCount
  } else {
    return S4() + '_' + suidCount
  }
}

function objTypeof(object) {
  return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1].toLowerCase();
}

function isNumber(obj) {
  return objTypeof(obj) == 'number'
}

function isString(title) {
  return typeof title == 'string'
}

function isObject(obj) {
  return objTypeof(obj) == 'object'
}

function isArray(obj) {
  return objTypeof(obj) == 'array'
}

function isFunction(obj) {
  return objTypeof(obj) == 'function'
}

function delItem(ary, target) {
  const willAry = []
  ary.forEach(item=>{
    if (item !== target) {
      willAry.push(item)
    }
  })
  return willAry
}

// simple clone
function sClone(obj) {
  if (obj) {
    return JSON.parse(JSON.stringify(obj))
  }
}

module.exports = {
  guid,
  suid,
  objTypeof,
  isString,
  isObject,
  isArray,
  isFunction,
  isNumber,
  sClone,
  delItem
}