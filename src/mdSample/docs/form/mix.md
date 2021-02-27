# 混合表单使用

混合表单由若干的元表单构成，混合表单是组表单的一条数据，所以可以通过group的方式抓取混合表单的实例

<iframe src="https://codesandbox.io/embed/cell-mix-input-qcbpc?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="cell-mix-input"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

```js
import cell, {createStore, CellBlock, CellGroup} from '@aotoo/react-cell'
function App(props){
  const store = createStore()
  const config = {
    title: '标题',
    gid: 'xxx',
    input: [
      {title: '哈哈', id: 'haha', value: 'ddddd'},
      {title: '哈哈', id: 'xxx', value: '你好'},
    ]
  }
  
  React.useEffect(()=>{
    let instance = store.ctx.group['xxx']
    // do something
  })
  
  return (
    <CellBlock data={config} store={store}/>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

## 属性

**title**  
表单外围属性，表单名称  

**desc**  
表单外围属性，表单描述

**error**  
表单外围属性，表单错误描述

**itemClass**  
表单外围属性，单表单容器样式类

**itemStyle**  
表单外围属性，单表单容器样式

**input**  
表单集合描述  

## API

**show()**  
显示整个表单  

```js
instance.show()
```

**hide()**  
隐藏整个表单

```js
instance.hide()
```

**attr(param1, param2, callback)**  
param1: string  
param2: any  
callback: function  
设置表单属性

```js
// 获取title值
instance.attr('title')

// 设置title值
instance.attr('title', 'new title')

// 获取描述值
instance.attr('desc')

// 设置描述值
instance.attr('desc', 'new descript')

// 获取外围样式
instance.attr('itemClass')

// 设置描述值
instance.attr('itemClass', 'new-item-class')
```

**info(param1, callback)**  
param1: string  
callback: function  
设置表单提示信息

```js
// 显示信息
instance.info('some message')

// 隐藏信息
instance.info()
```

**warn(param1, callback)**  
param1: string  
callback: function  
这是表单的警告信息  

```js
// 显示信息
instance.warn('some message')

// 隐藏信息
instance.warn()
```

**error(param1, callback)**  
param1: string  
callback: function  
设置表单的错误信息  

```js
// 显示信息
instance.error('some message')

// 隐藏信息
instance.error()
```

**reset([param1], [callback])**  
param1: []|object|null  
callback: function  
重置初始表单  

```js
instance.reset()
```

重置自定义表单  

```js
const newConfig = [
  {title: '新表单标题', id: 'new-form-id', type: 'text'}
]
instance.reset(newConfig)
```

**push(param1, [callback])**  
param1: object  
callback: function  
追加一条数据，新增一项表单  

```js
instance.push({title: '新表单标题', id: 'new-form-id', type: 'text'})
```

**pop([callback])**  
callback: function  
弹出最后一条表单

```js
instance.pop()
```

**shift([callback])**  
callback: function  
弹出第一条表单

```js
instance.shift()
```

**unshift(param, [callback])**  
param: object  
callback: function  
插入第一条表单

```js
instance.unshift({title: '新表单标题', id: 'new-form-id', type: 'text'})
```

**delete(param, [callback])**  
param: number|object|function
callback: function  
删除一条表单

```js
instance.delete(1)
// or
instance.delete({id: 'input-id'})
// or
instance.delete(function(input){
  if (input.id === 'username') return true
})
```

**append(param, [callback])**  
param: []
callback: function  
追加一组表单  

```js
instance.append([
  {id: 'input-id-1', type: 'text'...},
  {id: 'input-id-2', type: 'number'...},
  {id: 'input-id-3', type: 'number'...},
])
```

**prepend(param, [callback])**  
param: []
callback: function  
前置插入一组表单  

```js
instance.prepend([
  {id: 'input-id-1', type: 'text'...},
  {id: 'input-id-2', type: 'number'...},
  {id: 'input-id-3', type: 'number'...},
])
```

**splice(param, pay, [callback])**  
param: number|object|function  
pay: object  
callback: function  
插入一条表单

```js
instance.splice(1, {id: '...',  type: 'text'...})
```
