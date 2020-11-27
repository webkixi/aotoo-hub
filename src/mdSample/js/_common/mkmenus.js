const nav = Pager.nav
const lib = ao2.lib

function onItemClick(e, param, inst){
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

module.exports = function(params){
  let Menus = ui_list({
    data: params,
    listClass: 'router-menu-list',
    itemMethod: {
      onClick: onItemClick
    },
  })

  return <Menus.UI />
}
