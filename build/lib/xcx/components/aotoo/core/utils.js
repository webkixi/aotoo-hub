export function post(url, data, param={}) {
  return new Promise((resolve, reject)=>{
    let postParam = {
      url: url, // 仅为示例，并非真实的接口地址
      method: 'POST',
      data: data,
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
    wx.request(postParam)
  })
}