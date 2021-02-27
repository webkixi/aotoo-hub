# aotoo-react-cell

可以把cell当做一款灵活的容器组件(react)，cell提供标准化的结构，api方法，支持组件注册(注册组件产出标准结构)，支持组件分拆，重组等

cell最初是作为表单来开发的，在开发的过程中我们发现cell可以更加抽象，并使用其开发非表单组件，这些在其他的文档中会详细介绍。

[GITHUB源码](https://www.github.com/webkixi/aotoo-hub)

INSTALL
------------------

```bash
# cell 依赖 react react-dom和 aotoo库，请先安装
yarn add react react-dom
yarn add @aotoo/aotoo
yarn add @aotoo/react-cell
```

使用说明
------------------

1. 单表单
2. 复合表单
3. 组表单
4. 完整表单
5. 注册新表单

### 单表单

cell默认只支持文本表单，如type=text, number, telphone等，更多的表单需要通过注册的方式自定义，我们也提供了一些经典的表单组件，需要额外加载进来

```js
import cell from '@aotoo/react-cell'
const data = {title: '哈哈', id: 'haha', value: 'ddddd', type: 'text'}

function App(){
  let [$data, setData] = React.useState(data)
  return <cell.Text data={$data}/>
}

ReactDOM.render(<App />, document.getElementById('root'))
```

### 复合表单  

有多种类型的元表单构成

```js
import cell, {CellBlock} from '@aotoo/react-cell'
const data = {
  title: '标题',
  input: [
    {title: '哈哈', id: 'haha', value: 'ddddd', type: 'text'},
    {title: '呵呵', id: 'hehe', value: 'eeeee', type: 'number'},
  ]
}

function App(){
  let [$data, setData] = React.useState(data)
  return <CellBlock data={$data} />
}

ReactDOM.render(<App />, document.getElementById('root'))
```

### 组表单

由多个复合表单构成

```js
import cell, {CellBlock, CellGroup} from '@aotoo/react-cell'
const data = [
  {
    title: '标题1',
    input: [
      {title: '哈哈', id: 'haha', value: 'ddddd', type: 'text'},
      {title: '呵呵', id: 'hehe', value: 'eeeee', type: 'number'},
    ]
  },
  {
    title: '标题2',
    input: [
      {title: '哈哈', id: 'uid-1', value: 'ddddd', type: 'text'},
      {title: '呵呵', id: 'uid-2', value: 'eeeee', type: 'number'},
    ]
  },
]

function App(){
  let [$data, setData] = React.useState(data)
  return <CellGroup data={$data} />
}

ReactDOM.render(<App />, document.getElementById('root'))
```

### 完整表单

由多个组表单构成

```js
import cell from '@aotoo/react-cell'
const config = {
  formClass: 'new-class-name',
  data: [
    {
      title: '标题1',
      input: [
        {title: '哈哈', id: 'haha', value: 'ddddd', type: 'text'},
        {title: '呵呵', id: 'hehe', value: 'eeeee', type: 'number'},
      ]
    },
    {
      title: '标题2',
      input: [
        {title: '哈哈', id: 'uid-1', value: 'ddddd', type: 'text'},
        {title: '呵呵', id: 'uid-2', value: 'eeeee', type: 'number'},
      ]
    },
  ]
}

function App(){
  let form = cell(config)
  return <form.UI />
}

ReactDOM.render(<App />, document.getElementById('root'))
```

### 新增自定义表单

用户自定义表单

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

#### 新注册表单的单表单用法  

```js
// 使用新注册的单表单  

function App(){
  let value = '测试表单数据'
  let component = <cell.Test value={value} />
  return component
}

ReactDOM.render(<App />, document.getElementById('root'))
```

#### 新注册表单的复合表单用法  

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

#### 新注册表单的组表单用法  

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

#### 新注册表单的完整表单用法  

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
