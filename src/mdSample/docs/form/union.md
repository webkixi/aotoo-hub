# 联动设置  

form表单间经常需要联动，以实现业务逻辑，满足产品需求

<iframe src="https://codesandbox.io/embed/cell-input-union-2v9u6?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="cell-input-union"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

## union关键字  

cell使用JSON描述一个表单，正常的表单属性有id, value等属性，union是cell定义的一个特殊属性，union属性为表单增加联动功能，union类似于观察者模式，即包含union属性的表单会观察其锁定的表单值的变换，并触发回调方法响应该事件

union使用一个数组描述关系  

```js
{
  union: [
    targetId: 'form-id',  // 观察对象
    'onChange',  // 观察对象的事件方法，且只响应该方法
    function(param){
      // console.log(param.value);  // 观察对象的value
    }
  ]
}
```

### 联动方法  

联动关键字union包含三个参数

* id 联动对象的id
* eventName 关注联动对象的事件
* 响应方法(联动方法) 联动对象事件将触发该方法

响应方法包含一个参数，包含上下文(this)环境

* this.asset 获取本身的所有配置参数
* this.attr() 获取本身的value或者设置本身的value  

```js
{
  union: [
    'target-id',
    'onChange',
    function(param){
      let asset = this.asset  // 该表单本身的参数配置
      let value = this.attr('value')  // 获取该表单的value内容  
      this.attr('value', param.value)  // 设置该表单的value
    }
  ]
}

```

## 示例代码

### 联动一个目标

`ib=aaa`的文本表单值blur事件触发时，`id=bbb`的值将随之变化

```js
import {createStore, CellBlock} from '@aotoo/react-cell'
const config = {
  title: '组标题',
  input: [
    {title: '姓名', id: 'aaa', value: '张三'},
    {title: '职位', id: 'bbb', union: [
      'aaa', 
      'onBlur',
      function(param){
        this.attr('value', param.value)
      }
    ]},
  ]
}

let store = createStore()

function App(){
  return <CellBlock data={config} store={store} />
}

ReactDOM.render(<App />, document.getElementById('root'))

```

### 联动多个目标

```js
let config = {
  title: '标题',
  input: [
    {title: '哈哈', id: 'id-1', value: 'ddddd'},
    {title: '哈哈', id: 'id-2', value: '你好'},
    {title: '呵呵', id: 'hehe', union: [ 
      [
        // 联动id-1目标，响应blur事件方法
        'id-1', 
        'onBlur',
        function(param){
          this.attr('value', param.value)
        }
      ],
      [
        // 联动id-2目标，响应onchange事件
        'id-2', 
        'onChange',
        function(param){
          this.attr('value', param.value)
        }
      ]
    ]},
  ]
}

let store = createStore()

let xxx = (
  <CellBlock data={config} store={store}/>
)

ReactDOM.render(xxx, document.getElementById('root'))
```
