export default function(Pager) {
  let children = function (state, props) {
    return <div>{state.a}</div>
  }

  return Pager({
    children,
    data: {a: '这里是D'},
    onUnload(){
      console.log('======= unload d');
    }
  })
}