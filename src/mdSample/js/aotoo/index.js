const nav = Pager.nav
const lib = ao2.lib
const mkheader = require('../_common/header')
const mkmenus = require('../_common/mkmenus')

export default Pager.pages([
  {url: '/index/a', content: import('./_subpages/a')},
], {
  header: mkheader('aotoo'),
  select: '/index/a?file=aotoo/readme.md',
  menus: mkmenus([
    {title: 'aotoo', itemClass: 'menu-caption' },
    {title: '简介', attr: {file: 'aotoo/readme.md'}, select: true},  // webpack支持
    {title: '全局变量', attr: {file: 'aotoo/global.md'}},  // webpack支持
    {title: '生命周期', attr: {file: 'aotoo/life.md'}},  // webpack支持
    {title: '助手方法', attr: {file: 'aotoo/lib.md'}},  // webpack支持
    {title: '钩子方法', attr: {file: 'hooks.md'}},  // webpack支持
    {title: '自定义组件', attr: {file: 'aotoo/comp.md'}},  // webpack支持

    {title: '内置组件', itemClass: 'menu-caption' },
    {title: 'item', attr: {file: 'aotoo/item.md'}},
    {title: 'item的API', attr: {file: 'aotoo/itemapi.md'}},
    {title: 'item事件绑定', attr: {file: 'aotoo/itemevent.md'}},
    {title: 'list', attr: {file: 'aotoo/list.md'}},
    {title: 'list的API', attr: {file: 'aotoo/listapi.md'}},
    {title: 'list事件绑定', attr: {file: 'aotoo/listevent.md'}},
    {title: 'tree', attr: {file: 'aotoo/tree.md'}},

    {title: '内嵌组件', itemClass: 'menu-caption'},
    {title: '介绍', attr: {file: 'aotoo/inner.md'}},
    {title: '自定义内嵌组件', attr: {file: 'aotoo/innercustom.md'}},
  ]),
})