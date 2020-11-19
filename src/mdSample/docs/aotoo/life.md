生命周期
------------------

组件的生命周期，指的是组件自身的一些函数，这些函数在特殊的时间点或遇到一些特殊的框架事件时被自动触发。其中，最重要的生命周期是 `created` `attached` `detached` ，包含一个组件实例生命流程的最主要时间点。生命周期的设计参考微信小程序  

```js
import createComponent, {$$} from '@aotoo/aotoo';

const template = (state, props) => {
  return (
    <div className={state.clsName}>{state.title}</div>
  )
}

createComponent({
  data: {
    title: 'hello world',
    clsName: 'hello-class'
  },

  created: function(){
    // 在组件实例刚刚被创建时执行
  },
  attached: function() {
    // 在组件实例进入页面节点树时执行
  },
  ready: function(){
    // 在组件在视图层布局完成后执行
  },
  didUpdate: function(){
    // 在组件挂载后，每一次更新后会调用
  },
  detached: function() {
    // 在组件实例被从页面节点树移除时执行
  },
},
template
)
```
