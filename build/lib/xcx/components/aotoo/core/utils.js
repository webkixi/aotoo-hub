import path from 'path'
const lib = require('../lib')

export function post(url, data, param={}) {
  return new Promise((resolve, reject)=>{
    let postParam = {
      url: url, // 仅为示例，并非真实的接口地址
      method: 'POST',
      data: data||{},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        resolve(res)
      },
      error: function (e) {
        reject('网络出错');
      }
    }
    postParam = Object.assign(postParam, param)
    postParam.fail = postParam.error
    if (postParam.url) wx.request(postParam)
  })
}

function getImgRealPath(obj) {
  if (lib.isString(obj)) return obj
  if (lib.isObject(obj)) {
    return obj.img&&obj.img.src ? obj.img.src : obj.src ? obj.src : obj.img
  }
}

function _up(params) {
  return new Promise((resolve, reject) => {
    const oldSuccess = params.success
    const oldError = params.error
    params.success = function(res) {
      if (typeof oldSuccess == 'function') { oldSuccess(res) }
      resolve(res)
    }

    params.error = function(err) {
      if (typeof oldError == 'function') { oldError(err) }
      reject(err)
    }

    params.fail = params.error

    if (Array.isArray(params.filePath)){
      const every = params.filePath.map(one=>{
        one = getImgRealPath(one)
        return new Promise((rs, rj) => {
          let nParams = {}
          Object.keys(params).forEach(key => {
            if (key == 'filePath') {
              nParams[key] = one
            } else {
              if (key == 'formData') {
                const basename = path.basename(one)
                const extname = path.extname(basename)
                if (basename.length > 10) {
                  nParams[key] = Object.assign(params[key], {name: (lib.uuid('upimg_', 12)+extname)}) // 重命名上传文件名
                } else {
                  nParams[key] = params[key]
                }
              } else {
                nParams[key] = params[key]
              }
            }
          })
          nParams.success = function(res) { rs(res) }
          nParams.error = function(err) { rj(err) }
          wx.uploadFile(nParams)
        })
      })
      Promise.all(every).then( res=> resolve(res) )
    } else {
      params.filePath = getImgRealPath(params.filePath)
      wx.uploadFile(params)
    }
  })
}

export function upload(url, data, param={}) {
  if (lib.isObject(url)) param = url
  let postParam = {
    url: url, // 仅为示例，并非真实的接口地址
    type: 'img',
    name: 'file',
    filePath: '',
    header: {
      'content-type': 'application/json' // 默认值
    },
    data: data || {},
    // success(res) {},
    // error: function (e) {}
  }
  postParam = Object.assign(postParam, param)
  postParam.formData = postParam.data
  delete postParam.data
  if (postParam.url && postParam.filePath) {
    return _up(postParam)
  } else {
    return Promise.reject(`url和filePath参数为必填项，url请填写服务器地址, filePath请填写上传图片地址`)
  }
}