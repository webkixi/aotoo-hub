const {lib} = ao2

function template(state, props) {
  let mdContent = ui_item({
    title: {title: '字体', itemClass: 'pages-title-lg'},
    '@list': {
      data: [
        {title: '中文字体', dot: [{title: '微软雅黑 Regular / Bold', itemClass: 'ml-default color-000'}]},
        {title: '英文字体', dot: [{title: 'Arail', itemClass: 'ml-default color-000'}]},
        {title: [{title: '最大字号', itemClass: 'size-title-lg'}, {title: '特殊以设计稿为准', itemClass: 'size-sm color-info'}], dot: [{title: '(33px)', itemClass: 'size-sm mlr-default color-info'}, {title: '24px', itemClass: 'color-000'}], titleClass: 'flex-1'},
        {title: [{title: '页面大标题', itemClass: 'size-title'}, {title: '用于特殊栏目标题、特殊页面产品名称', itemClass: 'size-sm color-info'}], dot: [{title: '(28px)', itemClass: 'size-sm mlr-default color-info'}, {title: '20px', itemClass: 'color-000'}], titleClass: 'flex-1'},
        {title: [{title: '小标题', itemClass: 'size-title-sm'}, {title: '用于产品名称，栏目标题，列表标题，提示主语', itemClass: 'size-sm color-info'}], dot: [{title: '(22px)', itemClass: 'size-sm mlr-default color-info'}, {title: '18px', itemClass: 'color-000'}], titleClass: 'flex-1'},
        {title: [{title: '重要文案', itemClass: 'size-title-info'}, {title: '适用于重要文字信息，特殊标签页', itemClass: 'size-sm color-info'}], dot: [{title: '(20px)', itemClass: 'size-sm mlr-default color-info'}, {title: '16px', itemClass: 'color-000'}], titleClass: 'flex-1'},
        {title: [{title: '正文'}, {title: '适用于副导航、普通按钮、文字正文、书写内容等', itemClass: 'size-sm color-info'}], dot: [{title: '(20px)', itemClass: 'size-sm mlr-default color-info'}, {title: '14px', itemClass: 'color-000'}], titleClass: 'flex-1'},
        {title: [{title: '正文', itemClass: 'size-sm'}, {title: '适用于注解文字、类别名称、表头等', itemClass: 'size-sm color-info'}], dot: [{title: '(17px)', itemClass: 'size-sm mlr-default color-info'}, {title: '12px', itemClass: 'color-000'}], titleClass: 'flex-1'}
      ],
      itemClass: 'flex-row al-item-center mb-default'
    }
  })
  return <mdContent.UI />
}

export default function(Pager) {
  return Pager({
    template,

    data: {
      file: 'font'
    },
    
    onReady(){

    }
  })
}