
const path = require('path')
const asset = {"name":"mdSample","ROOT":"/Users/yc/git/project/aotoohub-react","version":"1.1.0","onlynode":false,"server":true,"TYPE":"web","startup":true,"isDev":false,"SRC":"/Users/yc/git/project/aotoohub-react/src/mdSample","DIST":"/Users/yc/git/project/aotoohub-react/src/mdSample/dist/1.1.0/pro","HOST":"localhost","PORT":8400,"PROXYPORT":8417,"options":{"scenes":"default"},"argv":{"_":["build-clean"],"onlybuild":true},"host":"localhost","port":8400,"proxyPort":8417,"contentBase":"/Users/yc/git/project/aotoohub-react/src/mdSample/dist/1.1.0/pro"} 
const scene = 'default'
module.exports = function (opts) {
  let targetConfig = require('../configs/default')(asset)
  if (scene && scene != 'default') {
    const sceneConfig = require('../configs/default')(asset)
    targetConfig = Object.assign({}, targetConfig, sceneConfig)
  }
  targetConfig.env = asset
  if (typeof wx == 'undefined') {
    global.Configs = global.CONFIG = targetConfig
  } else {
    wx.CONFIG = targetConfig
  }
  let oldRoot = asset.ROOT
  let oldSrc = asset.SRC
  let oldSSrc = path.join(oldSrc, 'server')
  let oldDist = asset.DIST
  let oldContentPath = asset.contentBase
  let nRoot = ''
  let nSrc = ''
  let nDist = ''
  let nContentPath = '';

  const runself = (() => {
    let tmpsrc = oldSrc.replace(oldRoot, '')
    let tmpssrc = oldSSrc.replace(oldRoot, '')
    let tmpdist = oldDist.replace(oldRoot, '')
    tmpsrc = path.join('/', tmpsrc)
    tmpssrc = path.join('/', tmpssrc)
    tmpdist = path.join('/', tmpdist)
    let tmpAry = tmpssrc.split('/')
    tmpAry.forEach((item, ii) => {
      if (ii > 0) {
        if (!nRoot) {
          nRoot = __dirname
        }
        nRoot = path.join(nRoot, '../')
      }
    })
    nSrc = path.join(nRoot, tmpsrc)
    nDist = path.join(nRoot, tmpdist)
    nContentPath = nDist
  })()
  asset.ROOT = nRoot
  asset.SRC = nSrc
  asset.DIST = nDist
  asset.options.scenes = targetConfig
  asset.options.scenes.isXcx = undefined
  const mapper = require("/Users/yc/git/project/aotoohub-react/src/mdSample/dist/1.1.0/pro/mapfile.json")
  asset.options.scenes.mapper = mapper
  if (typeof wx == 'undefined') {
    global.CONFIG.ROOT = nRoot
    global.Configs.mapper = global.CONFIG.mapper = mapper
  } else {
    wx.CONFIG.ROOT = nRoot
  }

  process.env.APPENV_DIST = asset.DIST
  process.env.APPENV_SRC = asset.SRC
  return asset
}
