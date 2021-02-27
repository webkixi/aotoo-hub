# 完整表单使用

完整表单与组表单类似，仅仅多了一层包裹

```js
import cell from '@aotoo/react-cell'
function App(props){
  const config = {
    formClass: 'form-class',
    data: [
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
  }
  
  const form = cell(config)
  const instance = form.ctx
  
  return (
    <form.UI />
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
