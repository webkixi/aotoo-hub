const nav = Pager.nav
const lib = ao2.lib
const mkheader = require('../_common/header')
const mkmenus = require('../_common/mkmenus')

export default Pager.pages([
  {url: '/index/a', content: import('./_subpages/a')},
], {
  header: function(){
    return mkheader('demos')
  },
  select: '/index/a?file=demos/item.md',
  menus: function () {
    return mkmenus([
      {title: 'DEMOS', itemClass: 'menu-caption', idf: 'a1' },
      {title: 'ITEM', itemClass: 'menu-caption', idf: 'b1' },
      {title: '简单ITEM示例', attr: {file: 'demos/item.md'}, select: true, parent: 'b1'},
      {title: 'ITEM复杂结构', attr: {file: 'demos/itemcomplex.md'}, parent: 'b1'},
      {title: 'ITEM嵌套结构', attr: {file: 'demos/itemembed.md'}, parent: 'b1'},
      {title: 'ITEM的属性', attr: {file: 'demos/itemattr.md'}, parent: 'b1'},
      {title: '设置ITEM的图片', attr: {file: 'demos/itempic.md'}, parent: 'b1'},
      {title: 'ITEM事件', attr: {file: 'demos/itemevent.md'}, parent: 'b1'},
      {title: 'ITEM API', attr: {file: 'demos/itemapi.md'}, parent: 'b1'},
      {title: 'ITEM组件', attr: {file: 'demos/itemcomp.md'}, parent: 'b1'},
      {title: 'ITEM内联组件', attr: {file: 'demos/iteminner.md'}, parent: 'b1'},

      {title: 'LIST', itemClass: 'menu-caption', idf: 'b2' },
      {title: '简单LIST示例', attr: {file: 'demos/list.md'}, parent: 'b2'},
    ])
  },
})