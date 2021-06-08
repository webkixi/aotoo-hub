# 输出变量

## 全局变量

引入AOTOO库后，会自动生成下列全局变量，WEB环境下挂载在WINDOW下，NODE/RN环境挂载在global下

**全局方法**  

- ui_item
- ui_list
- ui_tree

**全局组件**  
WEB环境该组件等效于DIV，RN环境中等效于RN的View和Text  

- View
- Text

## 使用方法

### ui_item

全局方法，item组件  

```js
const Item = ui_item({...})
render(<Item.UI />, 'root')
```

### ui_list

全局方法，list组件  

```js
const List = ui_list({...})
render(<List.UI />, 'root')
```

### ui_tree

全局方法，tree组件  

```js
const Tree = ui_tree({...})
render(<Tree.UI />, 'root')
```

### View

全局组件，只是DIV的别名，考虑到兼容小程序语法及后续的RN开发  

```js
render(<View {...props} />)
```

### Text

全局组件，只是SPAN的别名，考虑到兼容小程序语法及后续的RN开发  

```js
render(<Text {...props} />)
```

## 其他变量  

### lib

AOTOO的助手方法  

```js
import aotoo from '@aotoo/aotoo'
const lib = aotoo.lib
...
```

### $$

查找注册的组件

```js
import aotoo from '@aotoo/aotoo'
const $$ = aotoo.$$

const itemData = {
  $$id: 'uniqId',
  title: '标题'
}

const itemInstance = ui_item(itemData)

const targetInstance = $$('uniqId')
console.log(targetInstance === itemInstance)  // true
```

### LoadingComponent

异步 loading 组件，渲染异步结构  

```js
import aotoo from '@aotoo/aotoo'
const LoadingComponent = aotoo.LoadingComponent

function AsyncComponent(){
  return new Promise((res, rej)=>{
    setTimeout(()=>{
      res(
        <div>
          <span>异步加载的结构</span>
        </div>
      )
    }, 1000)
  })
}
const JSX = AsyncComponent()
const loadingClass = 'loading-class'


ReactDOM.render(<LoadingComponent content={JSX} loadingClass={loadingClass} />, ...('root'))
```

### extTemplate

扩展内嵌组件，内嵌组件可以在item/list组件的配置属性

```js
import aotoo from '@aotoo/aotoo'
const extTemplate = aotoo.extTemplate

extTemplate({
  '@sub': function(props, key){
    return (
      <div className="sub-item">{props.title}</div>
    )
  }
})

const itemData = {
  title: '标题',
  '@sub': {
    title: '子标题'
  }
}

/*
输出结构大致如下  
<div class='item'>
  <span>标题</span>
  <div class='sub-item'>子标题</div>
</div>
*/
```
