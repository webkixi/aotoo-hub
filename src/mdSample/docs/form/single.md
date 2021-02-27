# 单表单使用

cell默认自带text类型的表单，其他类型的表单可通过注册机制自定义

<iframe src="https://codesandbox.io/embed/cell-single-input-rp08i?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="cell-single-input"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   >
   </iframe>

```js
import cell, {createStore, CellBlock, CellGroup} from '@aotoo/react-cell'
const App = (props)=>{
  const store = createStore()
  const data = {title: '哈哈', itemClass: 'good',  id: 'haha', value: 'ddddd', desc: '你好', error: '什么'}

  React.useEffect(()=>{
    let instance = store.getById('haha')
    console.log(instance);
  })

  return <cell.Text data={data} store={store} />
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

**id**  
表单id

**value**  
表单值

**className**  
表单样式类

**style**  
表单内联样式

## API

**show**  
显示整个表单

```js
instance.show()
```

**hide**  
隐藏整个表单

```js
instance.hide()
```

**attr**  
设置表单属性

```js
// 获取value值
instance.attr('value')

// 设置value值
instance.attr('value', 'new value')

// 获取title值
instance.attr('title')

// 设置title值
instance.attr('title', 'new title')

// 获取描述值
instance.attr('desc')

// 设置描述值
instance.attr('desc', 'new descript')
```

**info**  
设置表单提示信息

```js
// 显示信息
instance.info('some message')

// 隐藏信息
instance.info()
```

**warn**  
这是表单的警告信息  

```js
// 显示信息
instance.warn('some message')

// 隐藏信息
instance.warn()
```

**error**  
设置表单的错误信息  

```js
// 显示信息
instance.error('some message')

// 隐藏信息
instance.error()
```
