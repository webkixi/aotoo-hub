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
      let $file = this.getData().file
      let file = options.file
      if (file && file !== $file) {
        this.setData({ file })
      }
    },

    onUnload(){

    },
    debounce(method,delay) {
      let timer = null;
      return function () {
          let self = this, args = arguments;
          clearTimeout(timer);
          timer = setTimeout(function () {
              method.apply(self,args);
          },delay);
      }
    },
    throttle(fun, delay, time) {
      var timeout,
          startTime = new Date();
      return function () {
          var context = this,
              args = arguments,
              curTime = new Date();
          clearTimeout(timeout);
          // 如果达到了规定的触发时间间隔，触发 handler
          if (curTime - startTime >= time) {
              fun.apply(context, args);
              startTime = curTime;
              // 没达到触发间隔，重新设定定时器
          } else {
              timeout = setTimeout(function () {
                  fun.apply(context, args);
              }, delay);
          }
        }
    },
    beforeScrollTop: 0,
    scrollTop: 0,
    headerScrollView(type) {
      let parent = document.querySelector('.router-header')
      type === 'add' ? parent.classList.value.indexOf('active') < 0 ? parent.classList.add('active') : '' : parent.classList.value.indexOf('active') > 0 ? parent.classList.remove('active') : ''
    },
    bindScroll(e) {
      this.scrollTop = e.target.scrollTop
      const offsetHeight = e.target.offsetHeight
      const scrollHeight = e.target.scrollHeight
      if (this.beforeScrollTop < this.scrollTop) {
        if (this.scrollTop > 10) {
          this.headerScrollView('add')
        }
      }
      else {
        if (scrollHeight - offsetHeight - this.scrollTop >= 50) {
          this.headerScrollView('remove')
        }
      }
      this.beforeScrollTop = this.scrollTop
    },

    onReady(){
      let parent = document.querySelector('.router-page')
      parent.scrollTop = 0
      const that = this
      let timmer = null
      parent.onscroll = function(e) {
        that.bindScroll(e)
        // clearTimeout(timmer)
        // timmer = setTimeout(() => {
        // }, 50);
      }
    }
  })
}