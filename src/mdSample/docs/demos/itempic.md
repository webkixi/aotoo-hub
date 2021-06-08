### CODE

#### 一张图片  

```js
const itemInstance = ui_item({
  itemClass: 'item-entity',
  title: <h3>一张图片</h3>,
  img: '/images/others/fruit.png'
})
ReactDOM.render(<itemInstance.UI />, document.getElementById('root'))
```

#### 图片样式  

```js
const itemInstance = ui_item({
  itemClass: 'item-entity',
  title: <h3>自定义样式</h3>,
  img: {
    src: '/images/others/fruit.png', itemClass: 'item-entity-pic',
  }
})
ReactDOM.render(<itemInstance.UI />, document.getElementById('root'))
```

#### 图片内联样式  

```js
const itemInstance = ui_item({
  itemClass: 'item-entity',
  title: <h3>自定义内联样式</h3>,
  img: {
    src: '/images/others/fruit.png', 
    itemClass: 'item-entity-pic',
    itemStyle: {filter: 'blur(3px)'}
  }
})
ReactDOM.render(<itemInstance.UI />, document.getElementById('root'))
```

#### 图片集  

```js
const itemInstance = ui_item({
  itemClass: 'item-entity',
  title: <h3>图片集合</h3>,
  img: [
    { src: '/images/others/fruit.png'},
    { src: '/images/others/fruit.png'},
    { src: '/images/others/fruit.png', itemStyle: {filter: 'blur(3px)'}},
    { src: '/images/others/fruit.png'},
  ]
})
ReactDOM.render(<itemInstance.UI />, document.getElementById('root'))
```

#### 图片链接  

```js
const itemInstance = ui_item({
  itemClass: 'item-entity',
  title: <h3>图片链接，点击跳转</h3>,
  img: {
    src: '/images/others/fruit.png', 
    itemClass: 'item-entity-pic',
    url: '__ https://www.163.com'   // 去掉前缀 __，则链接在本地打开，加上前缀 __，链接在新窗口打开
  }
})
ReactDOM.render(<itemInstance.UI />, document.getElementById('root'))
```

#### 图片事件  

```js
const itemInstance = ui_item({
  itemClass: 'item-entity',
  title: <h3>图片点击事件，点击图片试试</h3>,
  img: {
    src: '/images/others/fruit.png', 
    itemClass: 'item-entity-pic',
    onClick(){
      alert(1)
    }
  }
})
ReactDOM.render(<itemInstance.UI />, document.getElementById('root'))
```
