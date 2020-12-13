export default function(Pager) {
  let template = function (state, props) {
    return <div>{state.a}</div>
  }

  return Pager({
    template,
    data: {a: '这里是B'},
    onUnload() {
      console.log('======= unload b');
    }
  })
}