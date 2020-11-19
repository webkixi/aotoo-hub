# 内嵌组件  

`aotoo(web)`或者是`queryUI(小程序)`的组件是配置化组件，在项目需求中，有时候组件结构足够复杂，比如需要嵌套一个列表，因此内嵌组件正是为了解决这个问题。使我们可以在item组件配置中嵌套使用一个item组件后者列表组件  

> `注意：`我们以`@`开头的命名方式表明磁组件为内嵌组件  

自带内嵌组件  
------------

### @item

`@item`配置将使用item组件来构建  

```js
import {render} from '@aotoo/aotoo'

itemData = {
  // 容器ITEM的标题
  'title': '标题',
  'itemClass': 'level-0',

  // 内嵌item的标题
  '@item': {
    'title': '标题',
    'itemClass': 'level-1',

    // 二层内嵌item的标题
    '@item': {
      'title': '标题',
      'itemClass': 'level-2',

      // 三层内嵌item的标题
      '@item': {
        'title': '标题',
        'itemClass': 'level-3'
      }
    }
  }
}

const itemInst = ui_item(itemData)
render(<itemInst.UI />, 'root')


/**
 * 渲染结构
 * <div class='level-0'>
 *   标题
 *   <div class='level-1'>
 *     标题
 *     <div class='level-2'>
 *       标题
 *       <div class='level-3'>
 *         标题
 *       </div>
 *     </div>
 *   </div>
 * </div>
*/
```

### @list

`@list`配置将使用item组件来构建  

```js
import {render} from '@aotoo/aotoo'

itemData = {
  // 容器ITEM的标题
  'title': '标题',
  'itemClass': 'level-0',

  // 内嵌item的标题
  '@list': {
    'data': [
      {title: '标题-1', itemClass: 'list-item'}，
      {title: '标题-2', itemClass: 'list-item'}，
      {title: '标题-3', itemClass: 'list-item'}，
    ]
    'listClass': 'level-1',
  }
}

const itemInst = ui_item(itemData)
render(<itemInst.UI />, 'root')


/**
 * 渲染结构
 * <div class='level-0'>
 *   标题
 *   <div class='level-1'>
 *     标题
 *     <div class='list-item'>标题-1</div>
 *     <div class='list-item'>标题-2</div>
 *     <div class='list-item'>标题-3</div>  
 *   </div>
 * </div>
*/
```

### @tree

`@tree`使用tree组件构建，tree组件是list组件演变而来，配置项与list一致
