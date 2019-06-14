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
  return objTypeof(obj) == 'object' && !isArray(obj)
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

export function formatToUrl(url, param={}) {
  if (isString(url) && isObject(param)) {
    let queryStr = ''
    Object.keys(param).forEach(key=>{
      queryStr+=`&${key}=${param[key]}`
    })
    if (queryStr) {
      url += '?'+queryStr
      url = url.replace('?&', '?').replace('&&', '&')
    }
  }
  return url
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

// 节流方法
export function throttle(fn, gapTime) {
  if (gapTime == null || gapTime == undefined) {
    gapTime = 1500
  }

  let _lastTime = null
  return function () {
    var context = this
    let _nowTime = +new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn.apply(context, arguments)
      _lastTime = _nowTime
    }
  }
}
// throttle(fn,1000),10)  稳定一秒输出，不会被打断，中途打断无效

// 防抖函数
export function debounce(fn, wait) {
  var timer = null;
  return function () {
    var context = this
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(function () {
      fn.apply(context, arguments)
    }, wait)
  }
}
// (debounce(fn, 500), 1000)  // 1000触发一次，中途触发则阻止上一次的

let _nav = {}
const navFuns = ['switchTab', 'reLaunch', 'redirectTo', 'navigateTo', 'navigateBack']
navFuns.forEach(key => {
  _nav[key] = throttle(function () {
    wx[key].apply(null, arguments)
  }, 1200)
})

export const nav = _nav