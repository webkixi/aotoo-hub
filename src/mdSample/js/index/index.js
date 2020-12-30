// import "../vendors/index";
// import Pager from "../vendors/page";
const nav = Pager.nav
const lib = ao2.lib
const header = require('../_common/header')('index')
const mkmenus = require('../_common/mkmenus')


export default Pager.pages([
  {url: '/index/a', content: import('./_subpages/a')},
  {url: '/index/b', content: import('./_subpages/b')},
  {url: '/index/c', content: import('./_subpages/c')},
], {
  header: function(){
    return header
  },
  select: '/index/a?file=readme.md',
  menus: function() {
    return mkmenus([
      {title: {title: 'AOTOO-HUB', itemClass: 'item-title'}, itemClass: 'menu-caption active', idf: 'a1' },
      {title: '简介', attr: {file: 'readme.md'}, select: true, parent: 'a1'},  // webpack支持
      {title: '安装', attr: {file: 'install.md'}, parent: 'a1' },  // 编译模式易扩展
      {title: 'CLI', attr: {file: 'cli.md'}, parent: 'a1' },
      {title: '目录结构', attr: {file: 'structor.md'}, parent: 'a1' },
      {title: '项目配置', attr: {file: 'asset.md'}, parent: 'a1' },  // 开发、测试、生产、部署
      {title: '拥抱小程序', attr: {file: 'assetmini.md'}, parent: 'a1' }, // 小程序
      {title: '4个DEMO', attr: {file: 'demos.md'}, parent: 'a1' }, // 小程序
      {title: '套件', attr: {file: 'kit.md'}, parent: 'a1' }, 
      {title: '约定', attr: {file: 'agreement.md'}, parent: 'a1' },
        
        
      {title: {title: '上手指南', itemClass: 'item-title'}, itemClass: 'menu-caption', idf: 'a2'},
      {title: '快速开始web项目', attr: {file: 'start.md'}, parent: 'a2' }, // node端跨域 node端插件化 ssr
      {title: '快速开始小程序项目', attr: {file: 'startm.md'}, parent: 'a2' }, // node端跨域 node端插件化 ssr
      {title: '安装远程项目', attr: {file: 'startr.md'}, parent: 'a2' }, // node端跨域 node端插件化 ssr
      {title: '多项目配置', attr: {file: 'service.md'}, parent: 'a2' },  // 多服务模式 微服务模式
      {title: '文档项目上手', attr: {file: 'web/readme.md'}, parent: 'a2' },  // 多服务模式 微服务模式
      {title: 'react项目上手', attr: {file: 'reactdemo.md'}, parent: 'a2' },  // 多服务模式 微服务模式
      {title: 'vue项目上手', attr: {file: 'vuedemo.md'}, parent: 'a2' },  // 多服务模式 微服务模式
    ])
  }
})