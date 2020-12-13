export default function(Pager) {
  const {lib} = ao2
  const {nav} = Pager
  
  // let part = Pager.pages([
  //   {url: '/sub/b', content: import('./b')},
  //   {url: '/sub/c', content: import('./c')},
  //   {url: '/sub/d', content: import('./d')},
  // ], {
  //   select: '/sub/b',
  //   menus: function(){
  //     let menuList = ui_list({
  //       data: [
  //         {title: '页面B', tap(){
  //           console.log('====== kkk');
  //           nav.redirectTo({url: '/sub/b'})
  //         }},
  //         {title: '页面C', tap(){nav.redirectTo({url: '/sub/c'})}},
  //         {title: '页面D', tap(){nav.redirectTo({url: '/sub/d'})}},
  //       ],
  //     })
  //     return <menuList.UI />
  //   }
  // })
  
  function template(state, props) {
    let xxx = ao2(<div>123</div>, function(dom){console.log(dom);})
    return ( xxx )
  }
  
  return Pager({
    template,

    data: {},
    
    onLoad(options){
    },

    onUnload(){

    },

    onReady(){
    }
  })
}