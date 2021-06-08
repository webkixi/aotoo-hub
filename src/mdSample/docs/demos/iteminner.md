### CODE

定义内联组件可以使该组件内联到 ITEM 组件的配置项中使用

#### 内联组件  

```js
import {extTemplate} from '@aotoo/aotoo'

extTemplate({  // 内联组件必须先定义
  '@hello'(param, key){ 
    return (
      <h1>
        {param.title}
      </h1>
    )
  }
})

const InnerInstance = ui_item({
  itemClass: 'item-entity',
  "@hello": {
    title: '自定义内联组件'
  }
})

ReactDOM.render(<InnerInstance.UI />, document.getElementById('root'))
```
