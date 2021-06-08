### CODE

**$$id**  
指定 ITEM 组件的唯一 ID，可以通过该ID获取 ITEM 组件的实例，这个在 API 相关文档中介绍

**itemClass**  
设置 ITEM 容器的样式类

```js
const ItemClass1 = ui_item({
  title: <h3>itemClass: item-entity</h3>,
  itemClass: 'item-entity',
})

const ItemClass2 = ui_item({
  title: <h3>itemClass: item-entity black</h3>,
  itemClass: 'item-entity black',
})

const JSX = (
  <>
    <ItemClass1.UI />
    <ItemClass2.UI />
  </>
)

ReactDOM.render(JSX, document.getElementById('root'))
```

**titleClass/bodyClass/footerClass**  
自定义 ITEM 容器的 TITLE/BODY/FOOTER 结构的样式类

```js
const ItemClass1 = ui_item({
  title: <h3>itemClass: item-entity</h3>,
  itemClass: 'item-entity',
  bodyClass: 'item-entity-body', 
  footerClass: 'item-entity-footer',
  titleClass: 'item-entity-titles'
})

const JSX = (
  <>
    <ItemClass1.UI />
  </>
)

ReactDOM.render(JSX, document.getElementById('root'))
```

**itemStyle**  
设置 ITEM 容器的内联样式

```js
const ItemStyle = ui_item({
  title: <h3>itemStyle</h3>,
  itemClass: 'item-entity',
  itemStyle: {backgroundColor: 'red', color: '#fff'}
})

const JSX = (
  <ItemStyle.UI />
)

ReactDOM.render(JSX, document.getElementById('root'))
```

**titleStyle/bodyStyle/footerStyle**  
自定义 ITEM 容器的 TITLE/BODY/FOOTER 结构的内联样式

```js
const ItemStyle = ui_item({
  title: <h3>itemStyle</h3>,
  itemClass: 'item-entity',
  itemStyle: {backgroundColor: 'red', color: '#fff'},
  bodyStyle: {backgroundColor: 'blue', color: '#fff'},
  footerStyle: {backgroundColor: 'grey', color: '#fff'},
  titleStyle: {backgroundColor: 'yellow', color: '#fff'},
})

const JSX = (
  <ItemStyle.UI />
)

ReactDOM.render(JSX, document.getElementById('root'))
```

**attr**  
设置 ITEM 容器的 data-* 属性

```js
const AttrItem = ui_item({
  title: 'attr 属性接收一个 Object 对象，会生成 ITEM 容器的 data-* 属性',
  itemClass: 'item-entity',
  itemStyle: {display: 'flex', alignItems: 'center'},
  attr: {id: 'uniqId'}
})

const JSX = (
  <AttrItem.UI />
)

ReactDOM.render(JSX, document.getElementById('root'))
```

**url**  
与 title 属性组合生成 \<A\> 标签

```js
const UrlItem = ui_item({
  title: [
    {title: '鸿蒙开发工具，点击本地打开', url: 'https://developer.harmonyos.com/cn/home'},
    {title: '鸿蒙开发工具，点击新开窗口', url: '__ https://developer.harmonyos.com/cn/home'},
  ],
  titleClass: 'url-items',
  itemClass: 'item-entity',
})

const JSX = (
  <UrlItem.UI />
)

ReactDOM.render(JSX, document.getElementById('root'))
```

**created**  
ITEM 组件初始化时的回调方法，此时 DOM 未生成  

**attached**  
指定 ITEM 组件的唯一 ID，可以通过该ID获取 ITEM 组件的实例，这个在 API 相关文档中介绍

**detached**  
ITEM 组件移除时的回调方法

**ready**  
ITEM 组件完成页面渲染时的回调方法，对应 REACT 的 componentDidMount

**__ready**  
ITEM 组件完成页面渲染时的回调方法，在 REACT 的 componentDidMount/componentDidUpdate 生命周期中都会执行

```js
const ReadyItem = ui_item({
  title: <h3>3秒后执行 ready 回调</h3>,
  itemClass: 'item-entity',
  ready(){
    setTimeout(() => {
      alert('组件已加载, ready回调被执行')
    }, 3000);
  }
})

const JSX = (
  <ReadyItem.UI />
)

ReactDOM.render(JSX, document.getElementById('root'))
```

**parentInst**  

获取父级组件的实例  

**rootInstance**  

获取祖级组件的实例

**children**  

获取所有子集实例

**hasMounted**  

当前组件是否已经加载完成  
