### CODE

支持全部 REACT 事件， 此处仅例举两例

#### onClick  

```js
const itemInstance = ui_item({
  itemClass: 'item-entity',
  title: <h3>点击事件，点我试试</h3>,
  onClick(){
    alert('响应点击事件')
  }
})
ReactDOM.render(<itemInstance.UI />, document.getElementById('root'))
```

#### onMouseDown  

```js
const itemInstance = ui_item({
  itemClass: 'item-entity',
  title: <h3>点击事件，点我试试</h3>,
  onMouseDown(){
    alert('响应点击事件')
  }
})
ReactDOM.render(<itemInstance.UI />, document.getElementById('root'))
```

#### 字符串事件

```js
const itemInstance = ui_item({
  itemClass: 'item-entity',
  title: <h3>点击事件，点我试试</h3>,
  onClick: 'doneClick',
  doneClick(){
    alert('定义字符串事件')
  }
})
ReactDOM.render(<itemInstance.UI />, document.getElementById('root'))
```

#### 带参字符串事件

```js
const itemInstance = ui_item({
  itemClass: 'item-entity',
  title: <h3>点击事件，点我试试</h3>,
  onClick: 'doneClick?name=张三',
  doneClick(e, param){
    alert('name:' + param.name)
  }
})
ReactDOM.render(<itemInstance.UI />, document.getElementById('root'))
```
