export default function(Pager) {
  let children = function (state, props) {
    return <div>{state.a}</div>
  }

  return Pager({
    children,
    data: {a: '这里是C'},
    onUnload(){
      console.log('======= unload c');
    }
  })
}