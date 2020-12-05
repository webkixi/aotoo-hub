## 路由页面  

一个SPA的路由系统由路由表及各个路由页面构成，上述我们了解了路由表是如何定义的，下面讲一下路由页面的构成，它参考了小程序的页面构成

每个页面都需要在页面对应的 js 文件中进行注册，指定页面的初始数据、生命周期回调、事件处理函数等。

使用 Pager 构造器注册页面

代码示例：

```js
function template(state, props) {
  return <div>{state.xxx}</div>
}

export default function(Pager) {
  return Pager({
    // page的模板方法
    template,

    // 可以通过setData方法修改此处参数
    data: {
      file: 'readme.md',
      obj: {
        title: '哈哈'
      },
      ary: [
        {title: '嘿嘿'}
      ]
    },

    // 页面开始的方法
    // 接收上一个页面传递的数据
    onLoad(options){
      console.log(options, '======= onLoad options');
      let file = options.file
      if (file && file !== $file) {
        this.setData({ file })
      }
    },

    // 页面显示时调用
    // 每个页面都会调用onLoad和onShow方法，
    // 当使用navigateTo方法跳转页面时, back回来此页面时会调用onShow的方法
    onShow(){},

    // 页面卸载时
    onUnload(){},

    // 页面dom元素全部加载完成时
    onReady(){}
  })
}
```

### setData

该方法参考小程序，可以使用此方法修改`data`里面的数据，同时会触发模板的渲染  

```js
onLoad(){
  this.setData({file: '...'})

  // 支持深层更新数据  
  this.setData({'obj.title': '...'})

  // 数组也是支持的
  this.setData({
    'ary[0].title': '...'
  })
}
```
