export default function(Pager) {
  let children = function (state, props) {
    return <div onClick={()=>{Pager.nav.navigateTo({url: '/index/c'})}}>{state.a}</div>
  }

  return Pager({
    children,
    data: {a: '这里是B'},
    onUnload() {
      console.log('======= unload b');
    }
  })
}