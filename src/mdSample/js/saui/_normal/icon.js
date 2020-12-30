import _inject from 'aotoo-inject'
let inject = _inject()
inject.css([
  'https://at.alicdn.com/t/font_2218644_muc2ysz5h68.css'
])
// function pages() {
  const iconList = [
    { title: '&#e609;', itemClass: 'icon-jiazai' },
    { title: '&#e7b0;', itemClass: 'icon-sousuo' },
    { title: '&#e7b3;', itemClass: 'icon-yiwenjieda' },
    { title: '&#e7b6;', itemClass: 'icon-tishishuoming' },
    { title: '&#e7b7;', itemClass: 'icon-chenggongtishi' },
    { title: '&#e7b8;', itemClass: 'icon-cuowutishi' },
    { title: '&#e7b9;', itemClass: 'icon-shuomingtishi' },
    { title: '&#e63e;', itemClass: 'icon-xiaochengxu1' },
    { title: '&#e608;', itemClass: 'icon-saoma' },
    { title: '&#e614;', itemClass: 'icon-qq1' },
    { title: '&#e677;', itemClass: 'icon-github' },
    { title: '&#e63e;', itemClass: 'icon-xiaochengxu1' },
    { title: '&#e617;', itemClass: 'icon-arrow_up' },
    { title: '&#e605;', itemClass: 'icon-saui' },
    { title: '&#e66b;', itemClass: 'icon-nav' },
    { title: '&#e644;', itemClass: 'icon-riqi' },
    { title: '&#e602;', itemClass: 'icon-jianhao' },
    { title: '&#e607;', itemClass: 'icon-guanbi' },
    { title: '&#e7ab;', itemClass: 'icon-cha-xiaohao' },
    { title: '&#e74e;', itemClass: 'icon-xiala' },
    { title: '&#e611;', itemClass: 'icon-jiahao' },
  ]

//   const tree = Aotoo.list({
//     data: data,
//     listClass: 'demo-icon-list',
//     itemClass: "ss-col"
//   })

//   const Pages = Aotoo.wrap(
//     <div className='adminDiv' id='color'>
//       <h2 className='item-title-lg'>图标</h2>
//       {tree}
//     </div>
//   )
//   return <Pages/>
// }
// export default pages()


const {lib} = ao2

function template(state, props) {
  // let md = requireMarkdown(state.file)
  let mdContent = ui_item({
    title: {
      title: '图标',
      itemClass: 'pages-title-lg'
    },
    dot: [
      {
        title: '此处的iconfont的类名，仅供展示，如需调用，请写before',
        itemClass: 'pages-title mb-default color-info'
      }
    ],
    '@list': {
      data: iconList,
      itemClass: 'icon-xx',
      listClass: 'flex-row-wrap'
    }
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