const nav = Pager.nav
const lib = ao2.lib
const mkheader = require('../_common/header')
const mkmenus = require('../_common/mkmenus')

export default Pager.pages([
  {url: '/index/a', content: import('./_subpages/a')},
], {
  header: function(){
    return mkheader('app')
  },
  select: '/index/a?file=app/readme.md',
  menus: function () {
    return mkmenus([
      {title: '环境', itemClass: 'menu-caption', idf: 'a1' },
      {title: '简介', attr: {file: 'app/readme.md'}, select: true,  parent: 'a1'},  // webpack支持
      {title: '安装', attr: {file: 'app/install.md'}, parent: 'a1'},  // webpack支持
        
      {title: '说明', itemClass: 'menu-caption', idf: 'a2' },
      {title: '最简项目', attr: {file: 'app/demo.md'}, parent: 'a2'},  // webpack支持
    ])
  },
})