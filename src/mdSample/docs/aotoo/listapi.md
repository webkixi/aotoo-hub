
# list元组件api方法

__获取list实例__  

```js
import {render} from '@aotoo/aotoo'
const config = {...}
const listInst = ui_list(config)
render(<listInst.UI />, 'root')
```

## reset(param, cb)

恢复初始数据

```js
// 恢复初始数据
listInst.reset()

// 替换data的所有数据
listInst.reset([...])

// 替换基础配置
listInst.reset({listClass: '', data: [...]})
```

## update(param, cb)

更新数据

```js
listInst.update({
  'data[0]': {title: '新标题'}
})
```

## addClass(newClass)

增加类名

```js
listInst.addClass('active')
```

## removeClass(newClass)

移除类名

```js
listInst.removeClass('active')
```

## hasClass(newClass)

是否包含类名

```js
let bool = listInst.hasClass('active')
```

## toggleClass(newClass)

切换list容器的类名

```js
listInst.toggleClass('active')
```

## append(pay)

为列表追加数据

```js
listInst.append({title: '新的子项'})
```

## prepend(pay)

为列表shift数据

```js
listInst.prepend({title: '新的子项'})
```

## delete(query)

删除列表指定数据，query => {Number|Object}，query可以为数组下标或者指定特征key

```js
listInst.delete(3)

/*
 data: [{xid: 'a'}, {xid: 'b'}, {xid: 'c'}]
*/
listInst.delete({xid: 'b'})
```

## insert(query, pay)

删除列表指定数据，query => {Number|Object}，query可以为数组下标或者指定特征key

```js
listInst.insert(2)

/*
 data: [{xid: 'a'}, {xid: 'b'}, {xid: 'c'}]
*/
listInst.insert({xid: 'b'}, {title: '新标题'})
```

## css(styleString)

设置list容器的内联样式

```js
// 获取list的data-*的数据
listInst.css('font-size:16px;')
```

## getData()

获取最新的data数据

```js
listInst.getData()
```

## show()

显示当前组件结构

```js
listInst.show()
```

## hide()

隐藏当前组件结构

```js
listInst.hide()
```
