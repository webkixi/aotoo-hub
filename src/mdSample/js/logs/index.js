const nav = Pager.nav
const lib = ao2.lib
const mkheader = require('../_common/header')
const mkmenus = require('../_common/mkmenus')

export default Pager.pages([
  {url: '/index/a', content: import('./_subpages/a')},
], {
  header: function(){
    return mkheader('log')
  },
  select: '/index/a?file=logs/hub.md',
  menus: function() {
    return mkmenus([
      {title: '日志', itemClass: 'menu-caption', idf: 'a1'},
      {title: 'hub', attr: {file: 'logs/hub.md'}, select: true, parent: 'a1'},  // webpack支持
    ])
  },
  containerClass: 'screen'
})