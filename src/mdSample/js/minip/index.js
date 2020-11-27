const nav = Pager.nav
const lib = ao2.lib
const mkheader = require('../_common/header')
const mkmenus = require('../_common/mkmenus')

export default Pager.pages([
  {url: '/index/a', content: import('./_subpages/a')},
], {
  header: mkheader('minip'),
  select: '/index/a?file=startm.md',
  menus: mkmenus([
    {title: '演示项目', itemClass: 'menu-caption' },
      {title: '上手项目', attr: {file: 'startm.md'}},  // webpack支持

      
    {title: 'queryUI', itemClass: 'menu-caption' },
      {title: '简介', attr: {file: 'minip/readme.md'}, select: true},  // webpack支持
      {title: '安装', attr: {file: 'assetmini.md'} },  // 编译模式易扩展
      {title: '钩子系统', attr: {file: 'hooks.md'} },  // 编译模式易扩展
      {title: '内嵌组件', attr: {file: 'minip/inner.md'} },  // 编译模式易扩展
      
      
    {title: 'item组件', itemClass: 'menu-caption'},
      {title: '属性', attr: {file: 'minip/item.md'} }, // node端跨域 node端插件化 ssr
      {title: 'api', attr: {file: 'minip/itemapi.md'} }, // node端跨域 node端插件化 ssr
      {title: '事件', attr: {file: 'minip/itemevent.md'} }, // node端跨域 node端插件化 ssr
      {title: '使用说明', attr: {file: 'minip/usage.md'} }, // node端跨域 node端插件化 ssr

      
    {title: 'list组件', itemClass: 'menu-caption'},
      {title: '属性', attr: {file: 'minip/list.md'} }, // node端跨域 node端插件化 ssr
      {title: 'api', attr: {file: 'minip/listapi.md'} }, // node端跨域 node端插件化 ssr
      {title: '事件', attr: {file: 'minip/listevent.md'} }, // node端跨域 node端插件化 ssr
      {title: '树', attr: {file: 'minip/tree.md'} }, // node端跨域 node端插件化 ssr
      {title: '使用说明', attr: {file: 'minip/listusage.md'} }, // node端跨域 node端插件化 ssr
  ]),
})