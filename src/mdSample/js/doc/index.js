// import "../vendors/index";
// import Pager from "../vendors/page";
const nav = Pager.nav
const lib = ao2.lib
const header = require('../_common/header')('doc')

let menuInstance = ui_list({
  data: [
    {title: 'mdSample', itemClass: 'menu-caption' },
      {title: '简介', attr: {file: 'web/readme.md'}, select: true},  // webpack支持
      {title: 'aotoo', attr: {file: 'web/aotoo.md'}},  // webpack支持
      {title: '启动文档', attr: {file: 'web/start.md'}},  // webpack支持
      
      
    {title: '路由', itemClass: 'menu-caption'},
      {title: '仿小程序', attr: {file: 'web/minip.md'} },  // 编译模式易扩展
      {title: 'page', attr: {file: 'web/pager.md'} },  // 编译模式易扩展
      {title: 'router', attr: {file: 'web/router.md'} },  // 编译模式易扩展


    {title: '项目源码', itemClass: 'menu-caption'},
      {title: '输出', attr: {file: 'web/dist.md'} },  // 编译模式易扩展
      {title: 'js', attr: {file: 'web/js.md'} },  // 编译模式易扩展
      {title: 'css', attr: {file: 'web/css.md'} },  // 编译模式易扩展
      {title: 'server', attr: {file: 'web/server.md'} },  // 编译模式易扩展

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
  select: '/index/a?file=web/readme.md'
})