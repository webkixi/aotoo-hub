// function pages() {
//   const data = [
//     {
//       title: 'e66b',
//       itemStyle: {
//         '--icon': "\\e840"
//       }
//     },
//     {
//       title: 'e607',
//       itemStyle: {
//         '--icon': '\\e840'
//       }
//     },
//     {
//       title: 'e81b',
//       itemStyle: {
//         '--icon': '\\e840'
//       }
//     },
//     {
//       title: 'e81c',
//       itemStyle: {
//         '--icon': '\\e840'
//       }
//     },
//     {
//       title: 'e83f',
//       itemStyle: {
//         '--icon': '\\e840'
//       }
//     },
//     {
//       title: 'e840',
//       itemStyle: {
//         '--icon': '\\e840'
//       }
//     },
//     {
//       title: 'e605',
//       itemStyle: {
//         '--icon': '\\e840'
//       }
//     },
//     {
//       title: 'e64e',
//       itemStyle: {
//         '--icon': '\\e840'
//       }
//     },
//   ]

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
    title: '图标'
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