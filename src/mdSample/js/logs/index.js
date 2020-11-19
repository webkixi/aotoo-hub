// import "../vendors/index";
// import Pager from "../vendors/page";
const nav = Pager.nav
const lib = ao2.lib
const header = require('../_common/header')('log')

let menuInstance = ui_list({
  data: [
    {title: '日志', itemClass: 'menu-caption' },
      {title: 'hub', attr: {file: 'logs/hub.md'}, select: true},  // webpack支持
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
  select: '/index/a?file=logs/hub.md'
})