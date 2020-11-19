// import "../vendors/index";
// import Pager from "../vendors/page";
const nav = Pager.nav
const lib = ao2.lib
const header = require('../_common/header')('minip')

let menuInstance = ui_list({
  data: [
    {title: 'queryUI', itemClass: 'menu-caption' },
      {title: '简介', attr: {file: 'minip/readme.md'}, select: true},  // webpack支持
      {title: '安装', attr: {file: 'assetmini.md'} },  // 编译模式易扩展
      {title: '钩子系统', attr: {file: 'hooks.md'} },  // 编译模式易扩展
      {title: '内嵌组件', attr: {file: 'minip/inner.md'} },  // 编译模式易扩展
      
      
    {title: 'item组件', itemClass: 'menu-caption'},
      {title: '属性', attr: {file: 'minip/item.md'} }, // node端跨域 node端插件化 ssr
      {title: 'api', attr: {file: 'minip/itemapi.md'} }, // node端跨域 node端插件化 ssr
      {title: '事件', attr: {file: 'minip/itemevent.md'} }, // node端跨域 node端插件化 ssr
      {title: '使用说明', attr: {file: 'minip/usage.md'} }, // node端跨域 node端插件化 ssr

      
    {title: 'list组件', itemClass: 'menu-caption'},
      {title: '属性', attr: {file: 'minip/list.md'} }, // node端跨域 node端插件化 ssr
      {title: 'api', attr: {file: 'minip/listapi.md'} }, // node端跨域 node端插件化 ssr
      {title: '事件', attr: {file: 'minip/listevent.md'} }, // node端跨域 node端插件化 ssr
      {title: '树', attr: {file: 'minip/tree.md'} }, // node端跨域 node端插件化 ssr
      {title: '使用说明', attr: {file: 'minip/listusage.md'} }, // node端跨域 node端插件化 ssr
  ],
  itemMethod: {
    onClick(e, param, inst){
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
  select: '/index/a?file=minip/readme.md'
})