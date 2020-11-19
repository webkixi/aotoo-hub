
# item元组件api方法

__获取item实例__  

```js
Pager({
  data: {
    itemData: {title: '标题', $$id: 'xxx', itemClass: 'item-class'}
  },
  onReady(){
    let itemInst = this.getElementsById('xxx')
  }
})
```

## reset(param, cb)

恢复初始数据

```js
// 恢复初始数据
itemInst.reset()

// 按指定数据恢复
itemInst.reset({title: '特殊标题'})

// 恢复初始数据并回调
itemInst.reset({title: '特殊标题'}, function(){ console.log('重置完成') })
```

## update(param, cb)

更新数据

```js
itemInst.update({title: '新标题'})
```

## getData()

获取最新的data数据

```js
itemInst.getData()
```

## show()

显示当前组件结构

```js
itemInst.show()
```

## hide()

隐藏当前组件结构

```js
itemInst.hide()
```

## css(styleString))

为组件增加内联样式

```js
itemInst.css('font-size:16px')
```

## addClass(newClass)

增加类名

```js
itemInst.addClass('active')
```

## removeClass(newClass)

移除类名

```js
itemInst.removeClass('active')
```

## hasClass(newClass)

是否包含类名

```js
let bool = itemInst.hasClass('active')
```

## toggleClass(newClass)

切换类名

```js
itemInst.toggleClass('active')
```

## siblings(param)

查找兄弟结合

```js
itemInst.siblings()
```

## parent(param)

查找父级

```js
itemInst.parent()
```

## find(param)

查找子元素，根据类名或者id名查找子元素
