import md5 from 'md5'
import deepmerge from 'deepmerge'

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

export function clone(params={}) {
  return deepmerge({}, params)
  // return JSON.parse(JSON.stringify(params))
}

export function merge() {
  return deepmerge.apply(null, arguments)
}

export function isEmpty(params) {
  const $obj = typeof params == 'object' ? true : false
  if ($obj) {
    if (Array.isArray(params)) {
      return params.length ? false : true
    } else {
      for (var key in params) {
        return false
      };
    }
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
export function throttle(fn, gapTime=1500) {
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
export function debounce(fn, wait=1000) {
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
_nav.gapTime = 1200
const navFuns = ['switchTab', 'reLaunch', 'redirectTo', 'navigateTo', 'navigateBack']
navFuns.forEach(key => {
  _nav[key] = throttle(function () {
    wx[key].apply(null, arguments)
  }, _nav.gapTime)
})

export const nav = _nav

class cdd {
  constructor(opts, callback, finaFun){
    let dftConfig = { time: 60000, step: 1000, start: 0, end: 0 }
    if (isNumber(opts)) {
      opts = {time: opts}
    }
    if (isFunction(opts)) {
      if (isFunction(callback)) {
        finaFun = callback
        callback = opts
      } else {
        callback = opts
      }
    }
    this.props = Object.assign(dftConfig, opts)
    this.timeCounter = null
    this.callback = callback
    this.final = finaFun
    this.stat = false
    this.currentStat = null
  }
  isPause(){
    return this.control === 'pause'
  }
  isCancel(){
    return this.control === 'cancel'
  }
  pause(cb){
    this.control = 'pause'
    if (isFunction(cb)) cb(this.control)
  }
  cancel(cb){
    this.control = 'cancel'
    if (isFunction(cb)) cb(this.control)
  }
  toggle(cb){
    if (this.control == 'pause') {
      this.continue()
    } else {
      this.pause()
    }
    if (isFunction(cb)) cb(this.control)
  }
  continue(cb){
    if (this.control == 'pause') {
      this.control = 'continue'
      if (this.currentStat) {
        this.currentStat.startTime = (new Date()).getTime()
        this.run(this.currentStat)
      }
      this.currentStat = null
    }
    if (isFunction(cb)) cb(this.control)
  }

  start(){
    this.run()
  }

  restart(){
    this.control = ''
    this.run()
  }

  countEnd() {
    let final = this.final
    this.stat = false
    this.control = ''
    clearTimeout(this.timeCounter);
    if (isFunction(final)) {
      final()
    }
  }

  run(param){
    let that = this
    let {time, step, start, end} = this.props
    let timeCounter = this.timeCounter
    let callback = this.callback
    if (start && end) {
      time = end-start
    }
    this.stat = true
    let interval = step
    let ms = time //从服务器和活动开始时间计算出的时间差，这里测试用50000ms
    let count = 0
    let startTime = new Date().getTime()

    if (param) {
      interval = param.interval
      ms = param.ms
      count = param.count
      startTime = param.startTime
    } 

    if (ms >= 0) {
      timeCounter = setTimeout(countDownStart, interval);
    }
    
    function countDownStart(){
      // 取消倒计时
      if (that.control === 'cancel') {
        clearTimeout(timeCounter)
        that.control = ''
        return
      }

      count++;
      let offset = new Date().getTime() - (startTime + count * interval);
      let nextTime = interval - offset;
      let daytohour = 0; 
      let _count = null
      if (nextTime < 0) { 
        _count = count
        if (offset >= 2000) {
          _count = parseInt(offset / interval)
        }
        count = _count
        nextTime = 0 
        ms -= (count * interval)
      } else {
        ms -= interval;
      }


      // 暂停倒计时
      if (that.control === 'pause') {
        clearTimeout(timeCounter)
        that.currentStat = {
          interval,
          ms: _count ? ms+=(count*interval) : ms+=interval,
          count: 0,
          startTime,
        }
        return
      }

      if (typeof callback == 'function') {
        let res = callback(count, ms)
        if (typeof res == 'object' && typeof res.then === 'function') {
          res.then(()=>{
            if(ms <= 0){
              that.countEnd()
            }else{
              timeCounter = setTimeout(countDownStart, nextTime);
            }
          })
        } else {
          // console.log("误差：" + offset + "ms，下一次执行：" + nextTime + "ms后，离活动开始还有：" + ms + "ms");
          if(ms <= 0){
            that.countEnd()
          }else{
            timeCounter = setTimeout(countDownStart, nextTime);
          }
        }
      } else {
        console.log("误差：" + offset + "ms，下一次执行：" + nextTime + "ms后，离活动开始还有：" + ms + "ms");
        if (ms <= 0) {
          that.countEnd()
        } else {
          timeCounter = setTimeout(countDownStart, nextTime);
        }
      }
    }
  }
}

export function countdown(opts={}, callback, finaFun) {
  return new cdd(opts, callback, finaFun)
}

// 百度 ”JS实现活动精确倒计时“
export function countdown_bak(opts={}, callback, finaFun) {
  let timeCounter = null
  let dftConfig = { time: 60000, step: 1000, start: 0, end: 0 }
  
  if (isNumber(opts)) {
    opts = {time: opts}
  }

  if (isFunction(opts)) {
    if (isFunction(callback)) {
      finaFun = callback
      callback = opts
    } else {
      callback = opts
    }
  }

  let props = Object.assign(dftConfig, opts)
  let {time, step, start, end} = props
  if (start && end) {
    time = end-start
  }

  let interval = step,
      ms = time, //从服务器和活动开始时间计算出的时间差，这里测试用50000ms
      count = 0,
      startTime = new Date().getTime();
  if (ms >= 0) {
    // ms = ms+1000
    timeCounter = setTimeout(countDownStart, interval);
  }

  function countEnd() {
    clearTimeout(timeCounter);
    if (isFunction(finaFun)) {
      finaFun()
    }
  }

  function countDownStart(){
    count++;
    let offset = new Date().getTime() - (startTime + count * interval);
    let nextTime = interval - offset;
    let daytohour = 0; 
    if (nextTime < 0) { 
      let _count = count
      if (offset >= 2000) {
        _count = parseInt(offset / interval)
      }
      count = _count
      nextTime = 0 
      ms -= (count * interval)
    } else {
      ms -= interval;
    }

    if (typeof callback == 'function') {
      let res = callback(count, ms)
      if (typeof res == 'object' && typeof res.then === 'function') {
        res.then(()=>{
          if(ms <= 0){
            countEnd()
          }else{
            timeCounter = setTimeout(countDownStart, nextTime);
          }
        })
      } else {
        // console.log("误差：" + offset + "ms，下一次执行：" + nextTime + "ms后，离活动开始还有：" + ms + "ms");
        if(ms <= 0){
          countEnd()
        }else{
          timeCounter = setTimeout(countDownStart, nextTime);
        }
      }
    } else {
      console.log("误差：" + offset + "ms，下一次执行：" + nextTime + "ms后，离活动开始还有：" + ms + "ms");
      if (ms <= 0) {
        countEnd()
      } else {
        timeCounter = setTimeout(countDownStart, nextTime);
      }
    }
  }
}