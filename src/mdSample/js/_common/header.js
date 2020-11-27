module.exports = function(type){
  let header = ui_item({
    title: {title: '格子前端', itemClass: 'logo'},
    '@list': {
      data: [
        {title: '脚手架', url: '/', select: type === 'index'},
        {title: '小程序', url: '/minip', select: type === 'minip'},
        {title: 'AOTOO', url: '/aotoo', select: type === 'aotoo'},
        {title: '文档系统', url: '/doc', select: type === 'doc'},
        {title: '日志', url: '/logs', select: type === 'log'},
        {title: 'SAUI', url: '/saui', select: type === 'saui'},
      ],
      listClass: 'hbody',
      itemClass: 'hb-item'
    },
    itemClass: 'nav-header'
  })
  return <header.UI />
}