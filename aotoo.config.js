const path = require('path')
const pakg = require('./package.json')

const ROOT = __dirname
const version = pakg.version
module.exports = {
  version: version,
  mode: process.env.NODE_ENV,
  ROOT: ROOT,
  src : path.join(__dirname, 'src'),
  // dist: path.join(__dirname, 'dist'),
  apps: [
    {
      // 项目名称
      name: 'mdSample', 

      // 指定项目版本
      version,  

      // 是否启动项目，默认false不启动
      startup: true,    

      // 是否启动node server，默认false，由webpack-dev-server提供服务
      server: false, 

      // 省略前端编译，默认false，需要设置server=true
      // 只启动node端，开发模式提升效率，生产模式可直接部署
      onlynode: false, 

      // 项目源码目录
      src: path.join(ROOT, 'src/mdSample'),  

      // 指定项目端口，不指定则分配随机端口
      port: 8400,

      options: {
        
        // 项目环境，如测试，预发布，生产等
        // 建议使用命令行 --config test，选择环境配置
        // scenes: 'default' 
      }
    },

    {
      name: 'vueSample',
      startup: false, 
      server: false,
      src: path.join(ROOT, 'src/vueSample'),  // 指定项目源码目录
    },

    {
      name: 'reactSample',
      startup: false, 
      server: false,
      src: path.join(ROOT, 'src/reactSample'),  // 指定项目源码目录
    },

    // 小程序
    {
      name: 'xcxSample',
      type: 'mp',
      startup: false,
      src: path.join(ROOT, 'src/xcxSample'),
      options: {
        // 是否需要小程序云端，默认false
        // cloud: true 
      }
    }
  ]
}