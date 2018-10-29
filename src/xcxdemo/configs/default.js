/*
 * Aotoo-hub
 * 多项目大前端脚手架
 * 作者：天天修改
 * home-url: http://www.agzgz.com
 * github: https: //github.com/webkixi
 */

const path = require('path');
module.exports = function (asset) {
  const { name, startup, isDev, SRC, DIST, HOST, PORT, PROXYPORT, options } = asset
  return {
    imgcodeurl: 'http://api.test.7atour.com/tp-web-api/captcha.svl',
  }
}