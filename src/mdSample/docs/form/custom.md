# 新增自定义表单

cell内置text表单，`<cell.Text .../>`。内置Text表单只封装了text等常用类型，可以通过自定义
的方式扩展属于自己的Text表单

<iframe src="https://codesandbox.io/embed/cell-mix-input-qcbpc?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="cell-mix-input"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

## 自定义表单的使用流程

**1、新建用户自定义表单**  

```js
import cell, {regiter, CellBlock, CellGroup} from '@aotoo/react-cell'

const Test = function(props){
  return (
    <div className="test-component">
      {props.value}
    </div>
  )
}

register('Test', ['test'], Test)  // 注册一个新表单
```

**2、单表单用法**  

```js
// 使用新注册的单表单  

function App(){
  let value = '测试表单数据'
  let component = <cell.Test value={value} />
  return component
}

ReactDOM.render(<App />, document.getElementById('root'))
```

**2.1、复合表单里使用**  

```js
function App(){
  // 在复合表单中使用  
  let config = { 
    title: '复合表单的标题',
    input: [
      {type: 'test', value: '测试数据'}
    ]
  }

  let component = (
    <CellBlock data={config} />
  )

  return component
}

ReactDOM.render(<App />, document.getElementById('root'))
```

**2.2、组表单里使用**  

```js
function App(){
  // 在复合表单中使用  
  let config = [
    { 
      title: '复合表单的标题',
      input: [
        {type: 'test', value: '自定义表单'}
      ]
    },
    { 
      title: '复合表单的标题',
      input: [
        {type: 'text', value: 'text表单'}
      ]
    }
  ]

  let component = (
    <CellGroup data={config} />
  )

  return component
}

ReactDOM.render(<App />, document.getElementById('root'))
```

**2.3、完整表单里使用**  

```js
function App(){
  // 在复合表单中使用  
  let config = {
    formClass: 'new-form-class',
    data: [
      { 
        title: '复合表单的标题',
        input: [
          {type: 'test', value: '测试数据'}
        ]
      }
    ]
  }

  let component = cell(config)

  return <component.UI />
}

ReactDOM.render(<App />, document.getElementById('root'))
```
