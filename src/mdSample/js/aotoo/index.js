const nav = Pager.nav
const lib = ao2.lib
const mkheader = require('../_common/header')
const mkmenus = require('../_common/mkmenus')

export default Pager.pages([
  {url: '/index/a', content: import('./_subpages/a')},
], {
  header: function(){
    return mkheader('aotoo')
  },
  select: '/index/a?file=aotoo/start.md',
  menus: function() {
    return mkmenus([
      {title: {title: 'WEB项目', itemClass: 'item-title'}, itemClass: 'menu-caption active', idf: 'a0' },
      {title: '新建项目', attr: {file: 'aotoo/start.md'}, select: true, parent: 'a0'},  // webpack支持
      {title: '产出结构', attr: {file: 'aotoo/html.md'}, parent: 'a0'},  // webpack支持
      {title: '启动项目', attr: {file: 'aotoo/run.md'}, parent: 'a0'},  // webpack支持

      {title: {title: '文档系统', itemClass: 'item-title'}, itemClass: 'menu-caption active', idf: 'ax' },
      {title: '简介', attr: {file: 'web/readme.md'}, parent: 'ax'},  // webpack支持
      {title: '配置', attr: {file: 'asset.md'}, parent: 'ax'},  // 编译模式易扩展
      {title: '前端路由', attr: {file: 'web/minip_npm.md'}, parent: 'ax'},  // 编译模式易扩展
      {title: 'NODE端路由', attr: {file: 'web/noderoute.md'}, parent: 'ax'},  // 编译模式易扩展
      {title: '如何使用文档系统', attr: {file: 'web/usage.md'}, parent: 'ax'},  // webpack支持

      {title: {title: 'aotoo', itemClass: 'item-title'}, itemClass: 'menu-caption active', idf: 'a1' },
      {title: '什么是AOTOO', attr: {file: 'aotoo/readme.md'}, parent: 'a1'},  // webpack支持
      {title: '输出变量', attr: {file: 'aotoo/global.md'}, parent: 'a1'},  // webpack支持
      {title: '生命周期', attr: {file: 'aotoo/life.md'}, parent: 'a1'},  // webpack支持
      {title: '助手方法', attr: {file: 'aotoo/lib.md'}, parent: 'a1'},  // webpack支持
      {title: '钩子方法', attr: {file: 'hooks.md'}, parent: 'a1'},  // webpack支持
      {title: '自定义组件', attr: {file: 'aotoo/comp.md'}, parent: 'a1'},  // webpack支持

      {title: {title: 'aotoo内置组件', itemClass: 'item-title'}, itemClass: 'menu-caption', idf: 'a2' },
      {title: 'item', attr: {file: 'aotoo/item.md'}, parent: 'a2'},
      {title: 'item的API', attr: {file: 'aotoo/itemapi.md'}, parent: 'a2'},
      {title: 'item事件绑定', attr: {file: 'aotoo/itemevent.md'}, parent: 'a2'},
      {title: 'list', attr: {file: 'aotoo/list.md'}, parent: 'a2'},
      {title: 'list的API', attr: {file: 'aotoo/listapi.md'}, parent: 'a2'},
      {title: 'list事件绑定', attr: {file: 'aotoo/listevent.md'}, parent: 'a2'},
      {title: 'tree', attr: {file: 'aotoo/tree.md'}, parent: 'a2'},

      {title: {title: 'aotoo内嵌组件', itemClass: 'item-title'}, itemClass: 'menu-caption', idf: 'a3'},
      {title: '介绍', attr: {file: 'aotoo/inner.md'}, parent: 'a3'},
      {title: '自定义内嵌组件', attr: {file: 'aotoo/innercustom.md'}, parent: 'a3'},
    ])
    }
})