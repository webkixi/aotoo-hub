export default function(Pager) {
  let template = function (state, props) {
    return <div>{state.a}</div>
  }

  return Pager({
    template,
    data: {a: '这里是窗口路由2'},
    onUnload() {
      console.log('======= unload 这里是窗口路由2');
    }
  })
}