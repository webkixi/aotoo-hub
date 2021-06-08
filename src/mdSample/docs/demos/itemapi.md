### CODE

**addClass/removeClass/toggleClass/css**  
增删改 ITEM 组件样式类及内联样式

```js
const ItemClass1 = ui_item({
  title: <h3>addClass/removeClass/toggleClass/css</h3>,
  itemClass: 'item-entity',
})

setTimeout(()=>{
  ItemClass1.addClass('black')
  setTimeout(() => {
    ItemClass1.removeClass('black')
    setTimeout(() => {
      ItemClass1.toggleClass('black')
      setTimeout(() => {
        ItemClass1.css({ backgroundColor: 'blue' })
      }, 2000);
    }, 2000);
  }, 2000);
}, 2000)

const JSX = (
  <>
    <ItemClass1.UI />
  </>
)

ReactDOM.render(JSX, document.getElementById('root'))
```

**hasClass**  
判断 ITEM 容器是否包含某一个样式类名

**update/reset**  
更新与重置 ITEM 组件

```js
const ItemClass1 = ui_item({
  title: <h3>update/reset</h3>,
  itemClass: 'item-entity',
})

setTimeout(()=>{
  ItemClass1.update({title: '新的标题'})
}, 2000)

const JSX = (
  <>
    <ItemClass1.UI />
  </>
)

ReactDOM.render(JSX, document.getElementById('root'))
```

**show/hide**  
显示/隐藏 ITEM 组件

```js
const hideItem = ui_item({
  title: <h3>点我隐藏 ITEM </h3>,
  itemClass: 'item-entity',
  
  onClick(){
    this.hide()

    setTimeout(() => {
      this.show()
    }, 2000);
  }
})

const JSX = (
  <>
    <hideItem.UI />
  </>
)

ReactDOM.render(JSX, document.getElementById('root'))
```

**parent**  

获取父级实例，或者获取指定父级  

```js
import {$$} from '@aotoo/aotoo'

const Item = ui_item({
  $$id: 'parent-item',
  title: {
    $$id: 'sub-item', 
    title: '嵌套子组件', 
    body: [
      {title: '深层子组件', $$id: 'deep-item'}
    ]
  },
  itemClass: 'item-entity',
})

const JSX = (
  <>
    <Item.UI />
  </>
)

setTimeout(()=>{
  const instance = $$('deep-item')
  instance.parent()  // id = sub-item 的组件实例
  instance.parent('.item-entity')  // id = parent-item 的组件实例， 递归查找并返回祖级组件
}, 2000)

ReactDOM.render(JSX, document.getElementById('root'))
```

**getData**  

获取当前组件的配置数据

**attr**  

获取所有/指定 data-* 的数据
