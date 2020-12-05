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
  select: '/index/a?file=aotoo/readme.md',
  menus: function() {
    return mkmenus([
      {title: {title: 'aotoo', itemClass: 'item-title'}, itemClass: 'menu-caption active', idf: 'a1' },
      {title: '简介', attr: {file: 'aotoo/readme.md'}, select: true, parent: 'a1'},  // webpack支持
      {title: '全局变量', attr: {file: 'aotoo/global.md'}, parent: 'a1'},  // webpack支持
      {title: '生命周期', attr: {file: 'aotoo/life.md'}, parent: 'a1'},  // webpack支持
      {title: '助手方法', attr: {file: 'aotoo/lib.md'}, parent: 'a1'},  // webpack支持
      {title: '钩子方法', attr: {file: 'hooks.md'}, parent: 'a1'},  // webpack支持
      {title: '自定义组件', attr: {file: 'aotoo/comp.md'}, parent: 'a1'},  // webpack支持

      {title: {title: '内置组件', itemClass: 'item-title'}, itemClass: 'menu-caption', idf: 'a2' },
      {title: 'item', attr: {file: 'aotoo/item.md'}, parent: 'a2'},
      {title: 'item的API', attr: {file: 'aotoo/itemapi.md'}, parent: 'a2'},
      {title: 'item事件绑定', attr: {file: 'aotoo/itemevent.md'}, parent: 'a2'},
      {title: 'list', attr: {file: 'aotoo/list.md'}, parent: 'a2'},
      {title: 'list的API', attr: {file: 'aotoo/listapi.md'}, parent: 'a2'},
      {title: 'list事件绑定', attr: {file: 'aotoo/listevent.md'}, parent: 'a2'},
      {title: 'tree', attr: {file: 'aotoo/tree.md'}, parent: 'a2'},

      {title: {title: '内嵌组件', itemClass: 'item-title'}, itemClass: 'menu-caption', idf: 'a3'},
      {title: '介绍', attr: {file: 'aotoo/inner.md'}, parent: 'a3'},
      {title: '自定义内嵌组件', attr: {file: 'aotoo/innercustom.md'}, parent: 'a3'},
    ])
    }
})