const nav = Pager.nav
const lib = ao2.lib
const mkheader = require('../_common/header')
const mkmenus = require('../_common/mkmenus')

export default Pager.pages([
  {url: '/index/a', content: import('./_subpages/a')},
], {
  header: mkheader('doc'),
  select: '/index/a?file=web/readme.md',
  menus: mkmenus([
    {title: 'mdSample', itemClass: 'menu-caption' },
    {title: '简介', attr: {file: 'web/readme.md'}, select: true},  // webpack支持
    {title: 'aotoo', attr: {file: 'web/aotoo.md'}},  // webpack支持
    {title: '启动文档系统', attr: {file: 'web/start.md'}},  // webpack支持
      
      
    {title: '路由', itemClass: 'menu-caption'},
    {title: '仿小程序路由', attr: {file: 'web/minip.md'} },  // 编译模式易扩展
    {title: 'pager与路由表', attr: {file: 'web/pager.md'} },  // 编译模式易扩展
    {title: 'pager的路由方法', attr: {file: 'web/pagernav.md'} },  // 编译模式易扩展
    {title: 'pager页面', attr: {file: 'web/pagerpage.md'} },  // 编译模式易扩展
    {title: '路由实例', attr: {file: 'web/router.md'} },  // 编译模式易扩展


    {title: '项目源码', itemClass: 'menu-caption'},
    {title: '输出', attr: {file: 'web/dist.md'} },  // 编译模式易扩展
    {title: 'js', attr: {file: 'web/js.md'} },  // 编译模式易扩展
    {title: 'css', attr: {file: 'web/css.md'} },  // 编译模式易扩展
    {title: 'server', attr: {file: 'web/server.md'} },  // 编译模式易扩展
  ]),
})