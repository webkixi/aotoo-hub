const fs = require('fs-extra')
const path = require('path')
const globby = require('globby')
const execa = require('execa');
const generateServerConfigsFile = require('./generateServerConfigsFile')


module.exports = function* (asset) {
  const {TYPE, isDev, SRC, DIST, options, PORT, PROXYPORT } = asset
  const cloud = options.cloud
  
  const jsSrcPath = path.join(SRC, 'js')
  const appSrcPath = path.join(jsSrcPath, 'app.js')
  const cloudAppSrcPath = path.join(jsSrcPath, 'miniprogram/app.js')
  
  // 小程序默认模板
  // copy xcxTemplateFiles ===> jsSrcPath | cloudSrcPath
  const xcxTemplateFiles = path.join(__dirname, '../lib/xcx')  // 小程序源码模板
  const cloudSrcPath = path.join(jsSrcPath, 'miniprogram') // 源码目标目录 或者 jsSrcPath
  
  // 小程序云项目，云函数默认模板
  // copy xcxCloudFunsTemplateFiles ===> cloudFunsPath
  const xcxCloudFunsTemplateFiles = path.join(__dirname, '../lib/xcx_template/cloudfuns')  // 云函数模板
  const cloudFunsPath = path.join(jsSrcPath, 'cloudfunctions')  // 云函数目标目录
  
  // 小程序云项目配置模板文件
  // copy xcxCloudProjectConfigFile ===> projectConfigSrcPath
  const xcxCloudProjectConfigFile = path.join(__dirname, '../lib/xcx_template/project.config.json')
  const projectConfigSrcPath = path.join(jsSrcPath, 'project.config.json')

  // 小程序环境配置
  // generate envconfigs ===> jsSrcPath | cloudSrcPath
  const envConfigPath = cloud ? cloudSrcPath : jsSrcPath
  const configSrcPath = path.join(envConfigPath, 'envconfigs.js')



  // 该目录为初始化的小程序目录
  // 清空目录并拉取模板文件
  if (!fs.existsSync(appSrcPath)) {
    fs.copySync(xcxTemplateFiles, jsSrcPath)
  }
  if (cloud) {
    if (!fs.existsSync(cloudFunsPath)) {
      fs.copySync(xcxCloudFunsTemplateFiles, cloudFunsPath)
    }
  }
  yield generateServerConfigsFile('', 'nomapfile', path.join(jsSrcPath, 'envconfigs.js'), asset)
  return asset
}