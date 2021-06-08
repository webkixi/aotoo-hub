const {lib} = ao2

function template(state, props) {
  // let md = requireMarkdown(state.file)
  // let mdContent = ui_item({
  //   "@html": md,
  //   itemClass: 'markdown-body'
  // })
  // return <mdContent.UI />

  return requireMarkdown(state.file)
}

export default function(Pager) {
  return Pager({
    template,

    data: {
      file: 'readme.md'
    },
    
    onLoad(options){
      console.log(options, '======= onLoad options');
      let $file = this.getData().file
      let file = options.file
      if (file && file !== $file) {
        this.setData({ file })
      }
    },

    onUnload(){
      console.log('====== unload a');
    },
    
    onReady(){
      let parent = document.querySelector('.router-page')
      parent.scrollTop = 0
    }
  })
}