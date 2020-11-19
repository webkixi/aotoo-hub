
# list元组件

list组件是内置组件，用于生成各类列表，list组件的子元素均由item组件构成

```js
import {render} from '@aotoo/aotoo'
const listConfig = { title: 'item标题' }
const List = ui_item(listConfig)
render(<List.UI />, 'root')
```

### 配置属性  

| 属性 | 类型 | 默认值 | 说明|
| :-: |:-:| :-:| :-: |
| $$id  | String | 空 | 实例id |
| type  | Object | null | 列表类型 |
| data  | Array | 空 | 列表数据 |
| header  | Object | 空 | 列表头部 |
| footer  | Object | 空 | 列表尾部 |
| listClass  | String | 空 | 列表容器样式 |
| listStyle  | String | 空 | 列表容器内联样式 |
| itemClass  | String | 空 | 列表子项样式 |
| itemMethod  | Object | 空 | 批量定义item的事件方法 |
| methods  | Object | 空 | 设置list实例方法 |
| mode  | String | 空 | 设置list模式 |

### 属性说明

#### $$id

list组件的实例id，用于获取item组件的实例

#### type

设置列表的类型

* list  
普通列表  
* expose
普通列表的变形，没有list容器的列表  

```js
// 设置为普通列表
listConfig = {
  data: [...]
}

// 设置为expose
listConfig = {
  type: {
    "is": 'expose'
  },
  data: [...]
}
```

#### data

存放list子项数据，子项均由item组件构成  

```js
{
  data: [
    {title: '标题0'},  // 由item组件构建结构
    {title: '标题1'},
    {title: '标题2'},
  ]
}
```

#### header && footer

列表组件的头部和底部  

```js
{
  data: [ ... ],
  header: {},  // 由item组件构架结构
  footer: {},  // 由item组件构建结构
}
```

### 样式控制

listClass、listStyle、itemClass、itemStyle

设置list列表样式及子项样式  

```js
{
  data: [],
  listClass: 'list-class',
  itemClass: 'item-class',
  listStyle: '...',
  itemStyle: '...'
}

/*
输出结构大致如下
<div class="list-class" style="... from listStyle">
  <div class="item-class" style="... from itemStyle">标题</div>
  <div class="item-class" style="... from itemStyle">标题</div>
</div>
*/
```

### itemMethod

批量设置子项的事件方法

```js
{
  data: [
    '标题-1‘,
    '标题-2‘,
    '标题-3‘,
  ],
  itemMethod: {
    // 为每一个子项设置tap事件
    tap(e, param, inst){
      console.log(e)
    }
  }
}

/*
输出结构大致如下
<div class="list-class" style="... from listStyle">
  <div class="item-class" tap='_on_uniqid_tap'>标题</div>
  <div class="item-class" tap='_on_uniqid_tap'>标题</div>
</div>
*/
```

### methods

为该list组件指定私有方法

```js
{
  data: [
    {title: '标题', tap: 'onTap?user=mike'},
    {title: '标题', tap: 'onTap?user=tony'},
  ],
  methods: {
    onTap(e, param, inst){
      console.log(param) // mike || tony
    }
  }
}
```

#### __ready

__ready方法比较特殊，将会在组件加载到dom之后执行，按照小程序组件生命周期定义，将在组件的`ready`方法之后
