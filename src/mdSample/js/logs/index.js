const nav = Pager.nav
const lib = ao2.lib
const mkheader = require('../_common/header')
const mkmenus = require('../_common/mkmenus')

export default Pager.pages([
  {url: '/index/a', content: import('./_subpages/a')},
], {
  header: mkheader('log'),
  select: '/index/a?file=logs/hub.md',
  menus: mkmenus([
    {title: '日志', itemClass: 'menu-caption' },
      {title: 'hub', attr: {file: 'logs/hub.md'}, select: true},  // webpack支持
  ]),
})