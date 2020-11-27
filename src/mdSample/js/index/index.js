// import "../vendors/index";
// import Pager from "../vendors/page";
const nav = Pager.nav
const lib = ao2.lib
const mkheader = require('../_common/header')
const mkmenus = require('../_common/mkmenus')

export default Pager.pages([
  {url: '/index/a', content: import('./_subpages/a')},
  {url: '/index/b', content: import('./_subpages/b')},
  {url: '/index/c', content: import('./_subpages/c')},
], {
  header: mkheader('index'),
  select: '/index/a?file=readme.md',
  menus: mkmenus([
    {title: 'AOTOO-HUB', itemClass: 'menu-caption' },
    {title: '简介', attr: {file: 'readme.md'}, select: true},  // webpack支持
    {title: '安装', attr: {file: 'install.md'} },  // 编译模式易扩展
    {title: 'CLI', attr: {file: 'cli.md'} },
    {title: '目录结构', attr: {file: 'structor.md'} },
    {title: '项目配置', attr: {file: 'asset.md'} },  // 开发、测试、生产、部署
    {title: '拥抱小程序', attr: {file: 'assetmini.md'} }, // 小程序
    {title: '4个DEMO', attr: {file: 'demos.md'} }, // 小程序
    {title: '套件', attr: {file: 'kit.md'} }, 
    {title: '约定', attr: {file: 'agreement.md'} },
      
    {title: '上手指南', itemClass: 'menu-caption'},
    {title: '快速开始web项目', attr: {file: 'start.md'} }, // node端跨域 node端插件化 ssr
    {title: '快速开始小程序项目', attr: {file: 'startm.md'} }, // node端跨域 node端插件化 ssr
    {title: '多项目配置', attr: {file: 'service.md'} },  // 多服务模式 微服务模式
    {title: '文档项目上手', attr: {file: 'web/readme.md'} },  // 多服务模式 微服务模式
    {title: 'react项目上手', attr: {file: 'reactdemo.md'} },  // 多服务模式 微服务模式
    {title: 'vue项目上手', attr: {file: 'vuedemo.md'} },  // 多服务模式 微服务模式
  ]),
})