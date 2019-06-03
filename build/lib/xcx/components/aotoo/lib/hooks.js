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

class _hooks {
  constructor(props={}) {
    this.actions = {}
    this.storeData = {}
    this.storage = props.storage
  }
  destory() {
    this.actions = null
    this.storeData = null
    // wx.clearStorageSync()
  }
  getInfo(){
    return this.storage ? getStorageInfoSync() : this.storeData
  }
  setItem(key, val){
    try {
      if (this.storage) {
        wx.setStorageSync(key, val)
      }
      this.storeData[key] = val
    } catch (error) {
      console.warn(error);
    }
  }
  getItem(key){
    try {
      let res
      if (this.storage) {
        res = wx.getStorageSync(key)
      }
      if (res) {
        this.storeData[key] = res
      }
      return res
    } catch (error) {
      console.warn(error);
    }
  }
  append(key, val){
    if (this.storeData[key]) {
      let sData = this.getItem(key)
      if (isArray(sData)) {
        sData = sData.concat(val)
      } else if(isObject(sData)) {
        if (isObject(val)) {
          sData = Object.assign(sData, val)
        } else {
          sData[suid('random_')] = val
        }
      } else {
        sData = val
      }
      this.setItem(key, sData)
    } else {
      this.setItem(key, val)
    }
  }
  delete(key){
    if (this.storage) {
      wx.removeStorageSync(key)
    }
    this.storeData[key] = null
  }
  clear(){
    this.destory()
    wx.clearStorageSync()
  }

  // ========= 下面为钩子方法 ===========
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
            theFuns.forEach(($f, ii) => {
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
  emit(key, param, ctx=null) {
    if (isString(key)) {
      if (this.actions[key]) {
        const vals = []
        const funs = this.actions[key]
        funs.forEach(fun => {
          if (isFunction(fun)) {
            const res = fun.call(ctx, param)
            if (res) vals.push(res) 
            else {
              vals.push(undefined)
            }
            if (fun.onlyonetime) {
              this.off(key, fun)
            }
            // vals.push(fun.call(ctx, param))
          }
        })
        if (vals.length) {
          return vals
        }
      }
    }
  }
  one(key, cb) {
    if (key && typeof cb == 'function') {
      cb.onlyonetime = true
    }
    this.on(key, cb)
  }
}

let myhooks = {}
export function hooks(idf, storage) {
  if (isString(idf)) {
    if (!myhooks[idf]) {
      myhooks[idf] = new _hooks({storage})
    }
    return myhooks[idf]
  }
}