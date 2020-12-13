const nav = Pager.nav
const lib = ao2.lib
const mkheader = require('../_common/header')
const mkmenus = require('../_common/mkmenus')

export default Pager.pages([
  {url: '/index/a', content: import('./_subpages/a')},
], {
  header: function(){
    return mkheader('doc')
  },
  select: '/index/a?file=web/readme.md',
  menus: function() {
    return mkmenus([
      {title: 'mdSample', itemClass: 'menu-caption', idf: 'a1' },
      {title: '简介', attr: {file: 'web/readme.md'}, select: true, parent: 'a1'},  // webpack支持
      {title: 'aotoo', attr: {file: 'web/aotoo.md'}, parent: 'a1'},  // webpack支持
      {title: '如何使用文档系统', attr: {file: 'web/usage.md'}, parent: 'a1'},  // webpack支持
      {title: '启动文档系统', attr: {file: 'web/start.md'}, parent: 'a1'},  // webpack支持
        
        
      {title: '路由', itemClass: 'menu-caption', idf: 'a2'},
      {title: '仿小程序路由', attr: {file: 'web/minip.md'}, parent: 'a2'},  // 编译模式易扩展
      {title: 'pager与路由表', attr: {file: 'web/pager.md'}, parent: 'a2'},  // 编译模式易扩展
      {title: 'pager的路由方法', attr: {file: 'web/pagernav.md'}, parent: 'a2'},  // 编译模式易扩展
      {title: 'pager页面', attr: {file: 'web/pagerpage.md'}, parent: 'a2'},  // 编译模式易扩展
      {title: '路由实例', attr: {file: 'web/router.md'}, parent: 'a2'},  // 编译模式易扩展


      {title: '项目源码', itemClass: 'menu-caption', idf: 'a3'},
      {title: '输出', attr: {file: 'web/dist.md'}, parent: 'a3'},  // 编译模式易扩展
      {title: 'js', attr: {file: 'web/js.md'}, parent: 'a3'},  // 编译模式易扩展
      {title: 'css', attr: {file: 'web/css.md'}, parent: 'a3'},  // 编译模式易扩展
      {title: 'server', attr: {file: 'web/server.md'}, parent: 'a3'},  // 编译模式易扩展
    ])
  }
})