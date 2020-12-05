const {lib} = ao2

const data = [
  {title: '默认色值', child: [{title: '品牌色', name: 'primary'}]},
  {title: '辅助色', type: 'aux', child: [
    {title: 'PRIMARY', name: 'primary'},
    {title: 'SUCCESS', name: 'success'},
    {title: 'WARNING', name: 'warning'},
    {title: 'FAIL', name: 'fail'},
  ]},
  {title: '文字色', child: [
    {title: 'REGULAR 主色', name: 'text-title'},
    {title: 'PRIMARY 副色', name: 'text'},
    {title: 'PRIMARY 提示', name: 'text-info'},
  ]},
  {title: '线条', type: 'border', child: [
    {title: '边框色', name: 'secondary'},
    {title: 'input边线', name: 'input'},
  ]},
  {title: '背景色', type: 'bg', child: [
    {title: '默认', name: 'color'},
    {title: '特殊', name: 'color-special'},
  ]},
]

const adapter = (data) => {
  return data.map(item => {
    return {
      title: {
        title: item.title,
        itemClass: 'pages-title'
      },
      body: item.child.map(itemx => {
        return {
          title: [
            {title: itemx.title},
            {title: item.type ? 'color-'+item.type + '-' + itemx.name : 'color-'+itemx.name, itemClass: 'item-dot-i'}
          ],
          titleClass: 'item-box',
          itemClass: item.type ? 'ss-col demo-bg-'+item.type + '-' + itemx.name : 'ss-col demo-bg-'+itemx.name
        }
      }),
      bodyClass: 'demo-grid'
    }
  })
}



function template(state, props) {
  // let md = requireMarkdown(state.file)
  let mdContent = ui_item({
    title: {title: '色块', itemClass: 'pages-title-lg'},
    body: adapter(data)
  })
  return <mdContent.UI />
}

export default function(Pager) {
  return Pager({
    template,

    data: {
      file: 'readme.md'
    },
    
    // onLoad(options){
    //   console.log(options, '======= onLoad options');
    //   let $file = this.getData().file
    //   let file = options.file
    //   if (file && file !== $file) {
    //     this.setData({ file })
    //   }
    // },

    // onUnload(){
    //   console.log('====== unload a');
    // },
    
    onReady(){

    }
  })
}