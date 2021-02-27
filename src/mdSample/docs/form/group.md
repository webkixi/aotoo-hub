# 组表单使用

组表单由若干混合表单构成，组表单支持动态增删改查  

<iframe src="https://codesandbox.io/embed/cell-group-input-s8c7k?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="cell-group-input"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

```js
import cell, {createStore, CellBlock, CellGroup} from '@aotoo/react-cell'
function App(props){
  const store = createStore()
  const config = [
    {
      title: '组1-标题',
      gid: 'group-1',
      input: [
        {title: '哈哈', id: 'aaa', value: 'ddddd'},
        {title: '哈哈', id: 'bbb', value: '你好'},
      ]
    },
    {
      title: '组2-标题',
      gid: 'group-2',
      input: [
        {title: '哈哈', id: 'ccc', value: 'ddddd'},
        {title: '哈哈', id: 'ddd', value: '你好'},
      ]
    }
  ]
  
  React.useEffect(()=>{
    let instance = store.ctx
    // do something
  })
  
  return (
    <CellGroup data={config} store={store}/>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

## API

**reset([param1], [callback])**  
param1: []|object|null  
callback: function  
重置初始表单  

```js
instance.reset()
```

重置自定义组表单  

```js
const newConfig = [
  {
    title: '新组-1', gid: 'new-group-id-1', input: [
      ...
    ]
  },
  {
    title: '新组-2', gid: 'new-group-id-2', input: [
      ...
    ]
  },
]
instance.reset(newConfig)
```

**push(param1, [callback])**  
param1: object  
callback: function  
追加一条数据，新增一项表单  

```js
instance.push({
  title: '新表单标题', gid: 'new-group-id', input: [...]
})
```

**unshift(param1, [callback])**  
param1: object  
callback: function  
前置插入一条表单

```js
instance.unshift({
  title: '新表单标题', gid: 'new-group-id', input: [...]
})
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
instance.unshift({
  title: '新表单标题', gid: 'new-group-id', input: [...]
})
```

**delete(param, [callback])**  
param: number|object|function  
callback: function  
删除一条表单

```js
instance.delete(1)
// or
instance.delete({gid: 'group-id'})
// or
instance.delete(function(group){
  if (group.gid === '...') return true
})
```

**append(param, [callback])**  
param: []  
callback: function  
追加一组表单  

```js
instance.append([
  {id: 'group-id-1', input: [...]},
  {id: 'group-id-2', input: [...]},
  {id: 'group-id-3', input: [...]},
])
```

**prepend(param, [callback])**  
param: []  
callback: function  
前置插入一组表单  

```js
instance.prepend([
  {id: 'group-id-1', input: [...]},
  {id: 'group-id-2', input: [...]},
  {id: 'group-id-3', input: [...]},
])
```

**splice(param, pay, [callback])**  
param: number|object|function  
pay: object  
callback: function  
插入一条表单

```js
instance.splice(1, {gid: '...',  input: [...]})
```
