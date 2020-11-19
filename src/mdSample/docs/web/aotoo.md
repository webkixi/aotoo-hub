# aotoo

aotoo希望将REACT组件封装成类似JQ组件，即通过曝露的API方法能够在组件外很容易更新组件状态，而不需要引入redux，mobx等状态库。

文档系统的路由与菜单都是基于aotoo完成的组件  

[GITHUB源码](https://www.github.com/webkixi/aotoo)

INSTALL
------------------

```bash
yarn add @aotoo/aotoo
# 或者
npm install @aotoo/aotoo
```

作用
------------------

封装react组件，并将其实例化，aotoo有3种封装方式  

1. 封装原生react组件  
2. 封装配置生成组件(仿小程序)
3. 封装JSX，获取其真实dom，使用jquery等第三方库作用(非实例)

### 融合API与JSX

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

该例将REACT原生组件

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

仿小程序配置化组件

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

生命周期
------------------

组件的生命周期，指的是组件自身的一些函数，这些函数在特殊的时间点或遇到一些特殊的框架事件时被自动触发。其中，最重要的生命周期是 `created` `attached` `detached` ，包含一个组件实例生命流程的最主要时间点。生命周期的设计参考微信小程序  

```js
import createComponent, {$$} from '@aotoo/aotoo';
createComponent({
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

通用属性
------------------

| 属性      |    类型 | 说明  |
| :-------- | :--------: | :-- |
| $$id  | String |  类似于$('#id')的id  |
| created      |   Function | 生命周期，同小程序组件 |
| attached      |   Function | 生命周期，同小程序组件 |
| ready      |   Function | 生命周期，同小程序组件 |
| didUpdate      |   Function | 每次更新后触发 |
| methods      |   Object | 定义API方法 |

通用API
------------------

| 方法      |    类型 | 说明  |
| :-------- | :--------: | :-- |
| parent      |   (p) | 查找父级 |
| getData      |   () | 获取元素数据 |
| show      |   () | 显示该组件 |
| hide      |   () | 隐藏该组件 |
| destory      |   () | 销毁该组件 |
| render      |   (p) | 渲染组件，与直接写jsx一致 |
| attr |  (p1, p2) |  设置/获取data-*属性 |

内置组件
------------------

### item  

引入`@aotoo/aotoo`后，会生成全局变量`ui_item`和全局方法组件`UI_item`, item组件将会生成一个`div`的html结构  

#### ui_item

全局方法，配置化生成item组件

```js
import '@aotoo/aotoo'

const itemConfig = {
  title: '标题',
  onClick: 'changeTitle?title=新的标题',
  changeTitle(e, param, inst){
    inst.update({
   title: param.title
 })
  }
}

const item = ui_item(itemConfig)

ReactDOM.render(<item.UI />, document.getElementById('root'))
```

#### UI_item  

全局React组件，通过React方法组件  

```js
import '@aotoo/aotoo'

function changeTitle(e){
  this.update({
    title: '新的标题'
  })
}

const JSX = <UI_item title='标题' onClick={changeTitle}/>
```  

#### item属性

| 属性      |    类型 | 说明  |
| :-------- | :--------: | :-- |
| $$id  | String |  类似于$('#id')的id  |
| title     |   String/Object/Array |  item结构  |
| img     |   String/Object/Array |  item结构  |
| attr |  Object |  data-*属性  |
| body     |   Array |  item结构，子集均为item  |
| footer      |    Array | item结构  |
| dot      |    Array | item结构  |
| itemClass      |   String | 自定义样式 |
| itemStyle      |   String | 自定义样式 |
| methods      |   Object | 自定义方法 |
| onXXXX      |   String/Function | all events |
| created      |   Function | 生命周期，同小程序组件 |
| attached      |   Function | 生命周期，同小程序组件 |
| ready      |   Function | 生命周期，同小程序组件 |

#### item API 方法

| 方法      |    参数 | 说明  |
| :-------- | :--------: | :-- |
| reset  | (p) |  恢复初始数据  |
| update     | (p, callback) |  更新数据  |
| setData     | (p, callback)  |  与update相同  |
| attr |  (p1, p2) |  设置/获取data-*属性 |
| addClass     | (p, callback)|  新增样式类  |
| removeClass      | (p, callback) | 移除样式类名  |
| hasClass      |  (p) | 检测样式类名 |
| css      | (p) | 自定义样式 |
| toggleClass      | (p, callback) | 切换样式类名 |
| siblings      | (p) | 查找兄弟元素 |
| parent      |   (p) | 查找父级 |
| getData      |   () | 获取元素数据 |
| show      |   () | 显示该组件 |
| hide      |   () | 隐藏该组件 |
| destory      |   () | 销毁该组件 |
| render      |   (p) | 渲染组件，与直接写jsx一致 |

### list  

引入`@aotoo/aotoo`后，会生成全局变量`ui_list`和全局方法组件`UI_list`, list组件将会生成一组`div`的html结构(基于`item`组件)

#### ui_list

全局list方法，配置生成list组件

```js
const listConfig = {
  data: [
    {title: 'JACK', onClick: 'onItemClick?user=jack'},
    {title: 'ROSE', onClick: 'onItemClick?user=rose'}
  ],
  listClass: 'list-class',
  onItemClick(e, param, inst){
    if (param.user === 'jack') {
      this.update({
        'data[0].title': 'JACK LOVE ROSE'
      })
    }
  }
}

const list = ui_list(listConfig)  

ReactDOM.render(<list.UI />, document.getElementById('root'))
  
```

#### UI_list  

全局React组件，通过React方法组件

```js
import {$$} '@aotoo/aotoo'

function itemClick(e, param, inst){
  if (param.user === 'jack') {
    this.update({
      'data[0].title': 'JAKE LOVE ROSE'
    })
  }
}

const listData = [
  {title: 'JACK', onClick: 'onItemClick?user=jack'},
  {title: 'ROSE'}
]

const JSX = <UI_list
  $$id='mylist'
  data={listData}
  onItemClick={itemClick}
/>

setTimeout(() => {
  $$('#mylist').update({
    'data[1].title': 'ROSE LOVE JACK TOO'
  })
}, 4000);

ReactDOM.render(JSX, document.getElementById('root'))
```

#### list配置参数

| 属性      |    类型 | 说明  |
| :-------- | :--------: | :-- |
| $$id  | String |  类似于$('#id')的id  |
| data     |   Array |  list子集合  |
| header     |   JSX |  列表头部  |
| footer     |   JSX |  列表底部  |
| listClass     |   String |  列表样式类  |
| listStyle     |   String |  列表内联样式  |
| itemClass     |   String |  批量设置子项样式类  |
| itemMethod     |   Object |  批量设置子项事件方法  |
| methods     |   Object |  设置实例方法  |
| mode     |   String |  列表类型  |

#### list API 方法

| 方法      |    参数 | 说明  |
| :-------- | :--------: | :-- |
| reset  | (p) |  恢复初始数据  |
| update     | (p, callback) |  更新数据  |
| setData     | (p, callback)  |  与update相同  |
| insert   | (query, pay)  |  插入数据  |
| append   | (pay)  |  追加数据  |
| prepend   | (pay)  |  前置数据  |
| remove   | (query)  |  删除数据  |
| attr |  (p1, p2) |  设置/获取data-*属性 |
| addClass     | (p, callback)|  新增样式类  |
| removeClass      | (p, callback) | 移除样式类名  |
| hasClass      |  (p) | 检测样式类名 |
| css      | (p) | 自定义样式 |
| toggleClass      | (p, callback) | 切换样式类名 |
| parent      |   (p) | 查找父级 |
| getData      |   () | 获取元素数据 |
| show      |   () | 显示该组件 |
| hide      |   () | 隐藏该组件 |
| destory      |   () | 销毁该组件 |
| render      |   (p) | 渲染组件，与直接写jsx一致 |

### tree

tree组件是list组件的超集，通过扁平数据输出层次性的HTML结构，可支持多层次数据

```js
const listConfig = {
  data: [
    {title: '广东省', idf: 'gd'},
    {title: '广州市', parent: 'gd', idf: 'gz'},
      {title: '天河区', parent: 'gd', parent: 'gz'},
      {title: '白云区', parent: 'gd', parent: 'gz'},
      {title: '越秀区', parent: 'gd', parent: 'gz'},
    {title: '深圳市', parent: 'gd'},
    {title: '东莞市', parent: 'gd'},

 {title: '湖南省', idf: 'hn'},
 {title: '长沙市', parent: 'hn'},
 {title: '衡阳市', parent: 'hn'},
  ],
  mode: 'tree'
}

const tree = ui_list(listConfig)  

ReactDOM.render(<tree.UI />, document.getElementById('root'))
```

> 空格不是必须的，为展现数据层次  

关注我们，后续完善文档
