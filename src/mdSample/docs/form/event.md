# 设置事件  

<iframe src="https://codesandbox.io/embed/cell-input-event-42sq6?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="cell-input-event"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

## 设置事件响应方法1

指定事件响应方法

```js
import cell, {createStore, CellBlock} from '@aotoo/react-cell'
let store = createStore()

let config = {
  title: '标题',
  input: [
    {
      id: 'mytext', 
      value: '你好', 
      onChange(e){
        const value = e.target.value;
        console.log(value)  // 你好
      }
    }
  ]
}

let component = (
  <CellBlock data={config} store={store}/>
)

ReactDOM.render(component, document.getElementById('root'))
```

## 设置事件响应方法2

指定事件为响应方法名(字符串)，并在store上设置该响应方法

```js
import cell, {createStore, CellBlock} from '@aotoo/react-cell'
let store = createStore()

let config = {
  title: '标题',
  input: [
    {
      id: 'mytext', 
      value: '你好', 
      onChange: 'responseChange'
    }
  ]
}

store.responseChange = function(e){
  const value = e.target.value;
  console.log(value)  // 你好
}

let component = (
  <CellBlock data={config} store={store}/>
)

ReactDOM.render(component, document.getElementById('root'))
```

## 设置事件响应方法3

指定事件为响应方法名(字符串)，并带参数，响应方法设置在store上

```js
import cell, {createStore, CellBlock} from '@aotoo/react-cell'
let store = createStore()

let config = {
  title: '标题',
  input: [
    {
      id: 'mytext', 
      value: '你好', 
      onChange: 'responseChange?name=张三'
    }
  ]
}

store.responseChange = function(e, param){
  const value = e.target.value;
  console.log(value, param)  // 你好  {name: '张三'}
}

let component = (
  <CellBlock data={config} store={store}/>
)

ReactDOM.render(component, document.getElementById('root'))
```

## 保存值

手动设置新值，通过this.attr设置新值，如果你有JQ的使用经验，在JQ中我们使用attr这个api获取和设置value值

```js
import cell, {createStore, CellBlock} from '@aotoo/react-cell'
let store = createStore()

let config = {
  title: '标题',
  input: [
    {
      id: 'mytext', 
      value: '你好', 
      onChange(e){
        const value = e.target.value;
        const oldValue = this.attr('value')
        const newValue = oldValue +'-'+ value
        this.attr('value', newValue)  // 更新值
      }
    }
  ]
}

let component = (
  <CellBlock data={config} store={store}/>
)

ReactDOM.render(component, document.getElementById('root'))
```

## 保存值1

可以通过手动设置新的value，默认任何自定义事件不会改变表单值(系统自动绑定的事件会保存值，当没有指定onChange事件时，由系统默认绑定)，如果需要使修改的值有效，需要返回true

```js
import cell, {createStore, CellBlock} from '@aotoo/react-cell'
let store = createStore()

let config = {
  title: '标题',
  input: [
    {
      id: 'mytext', 
      value: '你好', 
      onChange(e){
        const value = e.target.value;
        return true  // 返回true后，由客户修改的值将生效
      }
    }
  ]
}

let component = (
  <CellBlock data={config} store={store}/>
)

ReactDOM.render(component, document.getElementById('root'))
```
