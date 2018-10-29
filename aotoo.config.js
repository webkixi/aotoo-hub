const path = require('path')
const pakg = require('./package.json')

const ROOT = __dirname
const version = pakg.version
module.exports = {
  version: version,
  mode: process.env.NODE_ENV,
  src : path.join(__dirname, 'src'),
  // dist: path.join(__dirname, 'dist'),
  apps: [
    {
      name: 'aotooSample',
      startup: true,    // false 该项目不会启动
      src: path.join(ROOT, 'src/aotooSample'),  // 指定项目源码目录
      port: 8400  // 指定项目端口，可不指定
    }
    // 小程序
    // {
    //   name: 'xcxdemo',
    //   type: 'mp',
    //   startup: true,
    //   src: path.join(ROOT, 'src/xcxdemo')
    // }
  ]
}