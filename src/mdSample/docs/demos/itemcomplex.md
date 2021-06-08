### CODE

**BODY 结构**  
BODY 的子元素被包裹在 BODY 容器中

```js
const itemInstance = ui_item({
  itemClass: 'item-entity',
  title: <h3>BODY结构</h3>,
  body: [
    {title: 'body 结构-1'},
    {title: 'body 结构-2'},
  ]
})
ReactDOM.render(<itemInstance.UI />, document.getElementById('root'))
```

**FOOTER 结构**  
FOOTER 的子元素被包裹在 FOOTER 容器中

```js
const itemInstance = ui_item({
  itemClass: 'item-entity',
  title: <h3>FOOTER 结构</h3>,
  body: [
    {title: 'body 结构-1'},
    {title: 'body 结构-2'},
  ],
  footer: [
    {title: 'footer 结构-1'},
    {title: 'footer 结构-2'},
  ]
})
ReactDOM.render(<itemInstance.UI />, document.getElementById('root'))
```

**DOT 结构**  
DOT 的子元素没有包裹容器，DOT 子元素的父级元素为 ITEM 容器

```js
const itemInstance = ui_item({
  itemClass: 'item-entity',
  title: <h3>FOOTER 结构</h3>,
  body: [
    {title: 'body 结构-1'},
    {title: 'body 结构-2'},
  ],
  footer: [
    {title: 'footer 结构-1'},
    {title: 'footer 结构-2'},
  ],
  dot: [
    {title: ' ', itemClass: 'demo-dot'},
    {title: ' ', itemClass: 'demo-dot left'},
  ]
})
ReactDOM.render(<itemInstance.UI />, document.getElementById('root'))
```
