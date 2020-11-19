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

Demo: <https://codesandbox.io/s/aotoo6jishuqi-dv1uf>

```js
import createComponent from '@aotoo/aotoo'

class Count extends React.Component {
  render() {
    return (
      <div className="container" onClick={this.env.increase}>
        {this.state.count || 0}
      </div>
    );
  }
}

const countInstance = createComponent(Count, {
  data: {  // 将转化成react组件的state
    count: 0,
  },
  increase(e) {
    let count = this.getData().count;
    count++;
    this.setData({ count });
  }
});

function Container() {
  return (
    <>
      <countInstance.UI />
      <button onClick={countInstance.increase}>计数器</button>
    </>
  );
}

ReactDOM.render(<Container />, document.getElementById('root'))
```

> `countInstance.increase`通过组件api方法修改组件内部状态

计数器DEMO2
-----------------------

仿小程序配置化组件，基于配置构建

仿造小程序的生命周期封装的JS实例，参考微信小程序组件的设计，使用配置化生成react组件，并对外曝露相关api方法  

Demo: <https://codesandbox.io/s/aotoo6jishuqi-forked-vh8n2>

```js
import createComponent from '@aotoo/aotoo'

const countTemplate = function (state, props) {
  return <div className={"container"}>{state.count}</div>;
};

const countConfig = {
  data: {
    count: 0
  },
  increase() {
    let count = this.getData().count;
    count++;
    this.setData({ count });
  },
  ready(){
    console.log('已生成真实DOM')
  }
};

let count = createComponent(countConfig, countTemplate);

function Container() {
  return (
    <>
      <count.UI />
      <button onClick={count.increase}>计数器</button>
    </>
  );
}

ReactDOM.render(<Container/>, document.getElementById('root'))
```

> `count.increase`通过组件api方法修改组件内部状态

WRAP
------------------

有些交互仅仅通过操作dom就可以完成，通过封装JSX，获得JSX的真实DOM，此时可以使用jquery作用于该dom并生成交互

```js
import createComponent from '@aotoo/aotoo'

let jsx = createComponent((
  <div>
    <span>文本内容</span>
  <div>
), function(dom){
  $(dom).on('click', clickHandle)

  // 返回组件移除时的回调方法
  return function(){
    $dom.off('click', clickHandle)
  }
})

ReactDOM.render(jsx, document.getElementById('root'))
```
