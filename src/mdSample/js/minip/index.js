const nav = Pager.nav
const lib = ao2.lib
const mkheader = require('../_common/header')
const mkmenus = require('../_common/mkmenus')

export default Pager.pages([
  {url: '/index/a', content: import('./_subpages/a')},
], {
  header: function(){
    return mkheader('minip')
  },
  select: '/index/a?file=minip/startm.md',
  menus: function () {
    return mkmenus([
      {title: '演示项目', itemClass: 'menu-caption', idf: 'a1' },
      {title: '上手项目', attr: {file: 'minip/startm.md'}, parent: 'a1'},  // webpack支持
  
        
      {title: 'queryUI', itemClass: 'menu-caption', idf: 'a2' },
      {title: '简介', attr: {file: 'minip/readme.md'}, select: true, parent: 'a2'},  // webpack支持
      {title: '安装', attr: {file: 'assetmini.md'} ,parent: 'a2'},  // 编译模式易扩展
      {title: '钩子系统', attr: {file: 'hooks.md'} ,parent: 'a2'},  // 编译模式易扩展
      {title: '内嵌组件', attr: {file: 'minip/inner.md'} ,parent: 'a2'},  // 编译模式易扩展
        
        
      {title: 'item组件', itemClass: 'menu-caption', idf: 'a3'},
      {title: '属性', attr: {file: 'minip/item.md'} ,parent: 'a3'}, // node端跨域 node端插件化 ssr
      {title: 'api', attr: {file: 'minip/itemapi.md'} ,parent: 'a3'}, // node端跨域 node端插件化 ssr
      {title: '事件', attr: {file: 'minip/itemevent.md'} ,parent: 'a3'}, // node端跨域 node端插件化 ssr
      {title: '使用说明', attr: {file: 'minip/usage.md'} ,parent: 'a3'}, // node端跨域 node端插件化 ssr
  
        
      {title: 'list组件', itemClass: 'menu-caption', idf: 'a4'},
      {title: '属性', attr: {file: 'minip/list.md'} ,parent: 'a4'}, // node端跨域 node端插件化 ssr
      {title: 'api', attr: {file: 'minip/listapi.md'} ,parent: 'a4'}, // node端跨域 node端插件化 ssr
      {title: '事件', attr: {file: 'minip/listevent.md'} ,parent: 'a4'}, // node端跨域 node端插件化 ssr
      {title: '树', attr: {file: 'minip/tree.md'} ,parent: 'a4'}, // node端跨域 node端插件化 ssr
      {title: '使用说明', attr: {file: 'minip/listusage.md'} ,parent: 'a4'}, // node端跨域 node端插件化 ssr

      {title: 'ui组件', itemClass: 'menu-caption', idf: 'a5'},
      {title: '日历组件', attr: {file: 'minip/component/calendar.md'} ,parent: 'a5'}, // node端跨域 node端插件化 ssr
      {title: '筛选组件', attr: {file: 'minip/component/filter.md'} ,parent: 'a5'}, // node端跨域 node端插件化 ssr
      {title: '折叠组件', attr: {file: 'minip/component/collapse.md'} ,parent: 'a5'}, // node端跨域 node端插件化 ssr
      {title: '仿微信锁盘', attr: {file: 'minip/component/locker.md'} ,parent: 'a5'}, // node端跨域 node端插件化 ssr
      {title: '弹窗组件', attr: {file: 'minip/component/popup.md'} ,parent: 'a5'}, // node端跨域 node端插件化 ssr
      {title: '下拉菜单组件', attr: {file: 'minip/component/dropdown.md'} ,parent: 'a5'}, // node端跨域 node端插件化 ssr
      {title: 'slider组件', attr: {file: 'minip/component/slider.md'} ,parent: 'a5'}, // node端跨域 node端插件化 ssr
    ])
  },
})