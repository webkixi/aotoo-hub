import md5 from 'md5'
export function isString(title) {
  return typeof title == 'string'
}

export function objTypeof(obj, type) {
  // if (obj) return obj.nv_constructor ? obj.nv_constructor.toLowerCase() : (obj.constructor.toLowerCase && obj.constructor.toLowerCase())
  if (obj) {
    if (obj.nv_constructor) {
      return obj.nv_constructor.toLowerCase()
    } else {
      if (obj.constructor.toLowerCase) {
        return obj.constructor.toLowerCase()
      }
    }
    const typeofobj = typeof obj
    if (type && type == 'array') {
      return Array.isArray(obj) ? 'array' : typeofobj
    }
    return typeofobj
  }
}

export function isObject(obj) {
  return objTypeof(obj) == 'object'
}

export function isArray(obj) {
  return objTypeof(obj, 'array') == 'array'
}

export function isNumber(obj) {
  return objTypeof(obj) == 'number'
}

export function isFunction(obj) {
  return objTypeof(obj) == 'function'
}

export function clone(params) {
  return JSON.parse(JSON.stringify(params))
}

export function isEmpty(params) {
  if (isObject(params)) {
    const len = Object.keys(params).length
    return len ? false : true
  }
  if (isArray(params)) {
    return params.length ? false : true
  }
  return true
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

export function uuid(prefix, len) {
  const mydate = new Date()
  const randomNum = mydate.getDay() + mydate.getHours() + mydate.getMinutes() + mydate.getSeconds() + mydate.getMilliseconds() + Math.round(Math.random() * 10000);
  const uuid = (prefix || 'uuid') + md5(randomNum)
  if (len && typeof len == 'number' && len > 6) {
    const remainder = len - 5
    const pre = uuid.substr(0, 5)
    const aft = uuid.substr(uuid.length - remainder)
    return pre + aft
  } else {
    return uuid
  }
}