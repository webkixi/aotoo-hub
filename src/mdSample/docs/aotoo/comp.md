# 自定义组件

通过aotoo封装的REACT组件，不是REACT对象，而是一个JS对象，比较类似jquery对象，有其自身特有的api方法。比如`addClass、removeClass`等api方法。

那要如何作为正常的REACT组件来使用呢，在aotoo的内部，我们将REACT对象绑定到`UI`属性上，如下例解释了如何使用API方法，同时又能够作为REACT对象使用

```js
import createElement from '@aotoo/aotoo'

const template = (state, props) => { ... }
const config = {
  data: {...}
  methods: {
    funA(){ console.log(this.getData()) } // api方法
    funB(){ console.log(this.getData()) } // api方法
  }
}
const Component = createElement(config, template)

// 调用API方法
setTimeout(Component.funA 1000) // Component此时为JS对象

// UI属性指向REACT对象
ReactDOM.render(<Component.UI />, root)
```

经过aotoo封装的组件能够对外提供API方法，使得外部环境能够很方便的操作组件状态，并触发REACT的更新机制  

计数器DEMO1
-----------------------

基于REACT原生组件构建

为react原生计数组件添加了属性和api方法，在业务中，通过调用实例方法来修改组件状态和数据，如下例中的button按钮通过increase方法控制组件计数

Demo: <https://codepen.io/webkixi/pen/vYXgKYM>

<iframe src="https://codesandbox.io/embed/aotoo6jishuqi-dv1uf?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="aotoo@6_计数器"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

> `countInstance.increase`通过组件api方法修改组件内部状态

计数器DEMO2
-----------------------

仿小程序配置化组件，基于配置构建

仿造小程序的生命周期封装的JS实例，参考微信小程序组件的设计，使用配置化生成react组件，并对外曝露相关api方法  

Demo: <https://codepen.io/webkixi/pen/OJRWNEY>

<iframe src="https://codesandbox.io/embed/aotoo6jishuqi1-vh8n2?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="aotoo@6_计数器1"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

WRAP
------------------

有些交互仅仅通过操作dom就可以完成，通过封装JSX，获得JSX的真实DOM，此时可以使用jquery作用于该dom并生成交互

<iframe height="399" style="width: 100%;" scrolling="no" title="wrap react JSX" src="https://codepen.io/webkixi/embed/BaLpJBR?height=399&theme-id=dark&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/webkixi/pen/BaLpJBR'>wrap react JSX</a> by 天天修改
  (<a href='https://codepen.io/webkixi'>@webkixi</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
