export default function(Pager) {

  const {lib} = ao2
  const {nav} = Pager

  let windows = Pager.pages([
    {url: '/win/1', content: import('./windowroutes/win1')},
    {url: '/win/2', content: import('./windowroutes/win2')},
    {url: '/win/3', content: import('./windowroutes/win3')},
  ], {
    select: '/win/2',
    containerClass: 'like-tabs'
  })

  let mywindows = Pager.pages([
    {url: '/w/1', content: import('./windowroutes/w1')},
    {url: '/w/2', content: import('./windowroutes/w2')},
    {url: '/w/3', content: import('./windowroutes/w3')},
  ], {
    select: '/w/1',
    containerClass: 'like-tabs'
  })

  let btnList = ui_list({
    data: [
      {title: '窗口路由1', tap(){ nav.redirectTo({url: '/win/1'}) }},
      {title: '窗口路由2', tap(){ nav.redirectTo({url: '/win/2'}) }},
      {title: '窗口路由3', tap(){ nav.redirectTo({url: '/win/3'}) }},
      {title: '窗口路由1', itemClass: 'btn-minor', tap(){ nav.redirectTo({url: '/w/1'}) }},
      {title: '窗口路由2', itemClass: 'btn-minor', tap(){ nav.redirectTo({url: '/w/2'}) }},
      {title: '窗口路由3', itemClass: 'btn-minor', tap(){ nav.redirectTo({url: '/w/3'}) }},
    ],
    itemClass: 'ss-button btn-default ml-default',
    listClass: 'item-btn-list'
  })

  function template(state, props) {
    return (
      <div className='demo-more-window'>
        <windows.UI />
        <mywindows.UI />
        <btnList.UI />
      </div>
    )
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