// import "../vendors/index";
// import Pager from "../vendors/page";
const nav = Pager.nav
const lib = ao2.lib
const header = require('../_common/header')('aotoo')

let menuInstance = ui_list({
  data: [
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

    // {title: '内嵌组件', itemClass: 'menu-caption' },
    //   {title: '@item', attr: {file: 'aotoo/inneritem.md'}},  // webpack支持
    //   {title: '@list', attr: {file: 'aotoo/innerlist.md'}},  // webpack支持
    //   {title: '@tree', attr: {file: 'aotoo/innertree.md'}},  // webpack支持
    //   {title: '自定义内嵌组件', attr: {file: 'aotoo/custominner.md'}},  // webpack支持

  ],
  itemMethod: {
    aim(e, param, inst){
      let file = inst.attr('file')
      if (file) {
        inst.addClass('active')
        inst.siblings().removeClass('active')
        nav.redirectTo({
          url: '/index/a?file=' + file,
          beforeNav(to, from, next) {
            setTimeout(()=>{
              document.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightBlock(block);
              });
            }, 100);
            next()
          }
        })
      }
    }
  },
  listClass: 'router-menu-list'
})


export default Pager.pages([
  {url: '/index/a', content: import('./_subpages/a')},
], {
  header,
  menus: <menuInstance.UI />,
  select: '/index/a?file=aotoo/readme.md'
})