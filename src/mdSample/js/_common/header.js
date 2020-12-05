const $$ = ao2.$$

module.exports = function(type, menusInst){
  let header = ui_item({
    $$id: 'pageshead',
    title: [
      {img: {src: 'images/logo.png'}, itemClass: 'item-pic'},
      {title: '格子前端', itemClass: 'item-title'}
    ],
    '@list': {
      $$id: 'menusnav',
      data: [
        {title: '脚手架', url: '/', select: type === 'index'},
        {title: '小程序', url: '/minip', select: type === 'minip'},
        {title: 'AOTOO', url: '/aotoo', select: type === 'aotoo'},
        {title: '文档系统', url: '/doc', select: type === 'doc'},
        {title: '日志', url: '/logs', select: type === 'log'},
        {title: 'SAUI', url: '/saui', select: type === 'saui'},
      ],
      listClass: 'item-nav',
      itemClass: 'ml-default'
    },
    dot: [{
      title: ' ',
      itemClass: 'icon-nav color-primary ml-auto',
      aim: 'onNav'
    }],
    titleClass: 'admin-logo item-logo color-primary',
    itemClass: 'admin-header router-header',
    onNav(e, param, inst) {
      header.toggleClass('activeSwitch')
      // const menusInst = $$('#abc')
      // const menusnav = $$('#menusnav')
      
      // menusnav.toggleClass('active')
      // if (menusInst) {
      //   menusInst.toggleClass('active')
      // }
    }
  })
  return <header.UI />
}