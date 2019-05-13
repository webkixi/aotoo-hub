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
    return obj.path ? obj.path : obj.src ? obj.src : obj.img ? obj.img.src ? obj.img.src : obj.img : ''
  }
}

function formDataName(param) {
  const basename = path.basename(param)
  const extname = path.extname(basename)
  return basename.length > 10 ? lib.uuid('upimg_', 12) + extname : basename
}

function doUpload(param) {
  if (param.url == 'cloud') {
    param.cloudPath = param.formData.name
    wx.cloud.uploadFile(param)
  } else {
    wx.uploadFile(param)
  }
}

function _up(params) {
  if (Array.isArray(params.filePath)){
    const every = []
    params.filePath.forEach(one=>{
      one = getImgRealPath(one)
      if (one) {
        const p = new Promise((rs, rj) => {
          let nParams = {}
          Object.keys(params).forEach(key => {
            if (key == 'filePath') {
              nParams[key] = one
            } else {
              if (key == 'formData') {
                params[key].name = formDataName(one)
                nParams[key] = params[key]
              } else {
                nParams[key] = params[key]
              }
            }
          })
          nParams.success = function(res) { rs(res) }
          nParams.error = function(err) { rj(err) }
          nParams.fail = function(err) { rj(err) }
          // wx.uploadFile(nParams)
          doUpload(nParams)
        })
        every.push(p)
      }
    })
    return Promise.all(every).then(res=>{
      wx.hideLoading()
      return res
    })
  } else {
    return new Promise((resolve, reject) => {
      const oldSuccess = params.success
      const oldError = params.error
      params.success = function(res) {
        wx.hideLoading()
        if (typeof oldSuccess == 'function') { oldSuccess(res) }
        resolve(res)
      }
  
      params.error = function(err) {
        if (typeof oldError == 'function') { oldError(err) }
        reject(err)
      }
  
      params.fail = params.error
      params.filePath = getImgRealPath(params.filePath)
      params.formData.name = formDataName(params.filePath)
      // wx.uploadFile(params)
      doUpload(params)
  
    })
  }
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
    wx.showLoading({
      title: '上传中...'
    })
    return _up(postParam)
  } else {
    return Promise.reject(`url和filePath参数为必填项，url请填写服务器地址, filePath请填写上传图片地址`)
  }
}