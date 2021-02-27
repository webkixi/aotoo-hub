const nav = Pager.nav
const lib = ao2.lib
const mkheader = require('../_common/header')
const mkmenus = require('../_common/mkmenus')

export default Pager.pages([
  {url: '/index/a', content: import('./_subpages/a')},
], {
  header: function(){
    return mkheader('form')
  },
  select: '/index/a?file=form/readme.md',
  menus: function() {
    return mkmenus([
      {title: {title: 'cell简介', itemClass: 'item-title'}, itemClass: 'menu-caption active', idf: 'a1' },
      {title: '说明', attr: {file: 'form/readme.md'}, select: true, parent: 'a1'},  // webpack支持
      {title: '事件绑定', attr: {file: 'form/event.md'}, parent: 'a1'},  // webpack支持
      {title: '联动设置', attr: {file: 'form/union.md'}, parent: 'a1'},  // webpack支持
      {title: '单表单', attr: {file: 'form/single.md'}, parent: 'a1'},  // webpack支持
      {title: '复合表单', attr: {file: 'form/mix.md'}, parent: 'a1'},  // webpack支持
      {title: '组表单', attr: {file: 'form/group.md'}, parent: 'a1'},  // webpack支持
      {title: '完整表单', attr: {file: 'form/form.md'}, parent: 'a1'},  // webpack支持
      {title: '自定义表单', attr: {file: 'form/custom.md'}, parent: 'a1'},  // webpack支持

      // {title: {title: 'cell演示', itemClass: 'item-title'}, itemClass: 'menu-caption active', idf: 'demo' },
      // {title: '单表单', attr: {file: 'form/demos/single.md'}, parent: 'demo'},  // webpack支持
      // {title: '自定义表单', attr: {file: 'form/demos/mix.md'}, parent: 'demo'},  // webpack支持
      // {title: '复合表单', attr: {file: 'form/demos/mix.md'}, parent: 'demo'},  // webpack支持
      // {title: '组表单', attr: {file: 'form/demos/group.md'}, parent: 'demo'},  // webpack支持
      // {title: '事件绑定', attr: {file: 'form/demos/event.md'}, parent: 'demo'},  // webpack支持
      // {title: '联动设置', attr: {file: 'form/demos/union.md'}, parent: 'demo'},  // webpack支持

      {title: {title: 'cell-api演示', itemClass: 'item-title'}, itemClass: 'menu-caption active', idf: 'api' },
      {title: '单表单', attr: {file: 'form/demos/input-api.md'}, parent: 'api'},  // webpack支持
      {title: '复合表单', attr: {file: 'form/demos/mix-api.md'}, parent: 'api'},  // webpack支持
      {title: '组表单', attr: {file: 'form/demos/group-api.md'}, parent: 'api'},  // webpack支持

      {title: {title: 'cell插件演示', itemClass: 'item-title'}, itemClass: 'menu-caption active', idf: 'plugin' },
      {title: 'checkbox', attr: {file: 'form/demos/checkbox.md'}, parent: 'plugin'},  // webpack支持
      {title: 'radio', attr: {file: 'form/demos/radiobox.md'}, parent: 'plugin'},  // webpack支持
      {title: '下拉菜单', attr: {file: 'form/demos/dropdown.md'}, parent: 'plugin'},  // webpack支持

    ])
  }
})