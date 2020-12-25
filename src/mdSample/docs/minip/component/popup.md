# 弹窗组件  

<img src="/images/minip/popup.png" class="demo-img"/>

## 基本用法

在app.json注册该组件

```js
"usingComponents": {
  "ui-item": "/components/aotoo/item/index",
  "ui-list": "/components/aotoo/list/index",
  "ui-tree": "/components/aotoo/tree/index",
  "ui-pop": "/components/actionSide/index",
}
```

wxml模板  

```html
<ui-pop item="{{popConfig}}" />
```

js  

```js
const Pager = require('../../components/aotoo/core/index')
const Pager = require('components/aotoo/core/index')
Pager({
  data: {
    popConfig: {
      $$id: 'modal',
      ...
      ...
    }
  }

  onReady() {
    // 获取弹窗实例
    let $pop = this.getElementsById('modal')
  }
})
```

## 配置  

弹层组件基于item组件构建而成，继承了所有item组件的属性，支持使用所有内嵌组件，如@md, @html, @list等  

```js
popConfig: {
  /**
    * 弹窗实例名
  */
  $$id: 'modal',

  /**
    * 弹窗文字内容  
    * {String|Object|Array}
    * 可通过title定制复杂弹层内容
  */
  title: '',

  /**
    * 自定义弹层容器类名  
    * {String}
    */
  itemClass: '',

  /**
    * 自定义弹层容器内联样式  
    * {String}
    */
  itemStyle: '',

  /**
    * body内容  
    * {Array}
    */
  body: [],

  /**
    * footer内容  
    * {Array}
    */
  footer: [],

  /**
    * 图片内容内容  
    * {Object|Array}
    */
  img {},

  /**
    * dot内容  
    * {Array}
    */
  dot: []

  /**
    * 是否展开遮罩
    * {Boolean}
  */
  enableMask: false,

  /**
    * 是否显示关闭按钮
    * {Boolean}
  */
  closeBtn: true,  

  /**
    * 开启倒计时关闭弹层  
    * {Number}
  */
  countdown: false
}
```

### 如何配置各种弹窗  

以下弹窗都由一个弹窗实例完成，页面中如果有多个弹窗实例，实例之间可互相调用完成复杂的交互逻辑

__如何设置弹层内容(文本)__
以中间弹层为示例，下面文档中如无特殊说明，所用示例均为中间弹层  
通过getElementsById获取弹层实例'$pop'

```js
$pop.pop({title: '新标题'})  
```

__如何设置弹层内容(图片)__

```js
$pop.pop({img: {src: '/images/demopic.jpg'}})  
```

__如何设置弹层内容(markdown)__

```js
$pop.pop({"@md": \`markdown文本内容\`})   
```

__如何设置弹层内容(html)__

```js
$pop.pop({"@html": \`html文本内容\`})   
```

__如何设置弹层内容(列表)__

```js
$pop.pop({"@list": {data: []})    
```

## API

|API|说明|
|:-:|:-|
| hidden | 隐藏弹层 |
| pop | 默认中间弹出弹层 |
| pop_bot | 从底部弹出中间弹层 |
| pop_top | 从顶部弹出中间弹层 |
| toast | 默认toast消息 |
| toast_mid | 中间toast消息 |
| right | 默认右侧弹层 |
| right_full | 右侧全屏弹层 |
| right_bar | 右侧半屏弹层 |
| left | 默认左侧弹层 |
| left_full | 左侧全屏弹层 |
| left_bar | 左侧半屏弹层 |
| bot | 默认底部弹层 |
| bot_full | 底部全屏弹层 |
| bot_bar | 底部半屏弹层 |
| top | 默认顶部弹层 |
| top_full | 顶部全屏弹层 |
| top_bar | 顶部半屏弹层 |
| top_bar | 顶部半屏弹层 |
| message | 默认消息 |

## 使用示例

**底部 toast**  

```js
const Pager = require('../../components/aotoo/core/index')
const Pager = require('components/aotoo/core/index')
Pager({
  data: {
    popConfig: {
      $$id: 'modal',
      ''
    }
  }

  onReady() {
    // 获取弹窗实例
    let $pop = this.getElementsById('modal')
    $pop.toast({
      title: 'toast弹窗，5秒后消失',
      countdown: 5000
    })
  }
})
```

>>> 下面的示例中，代码以onReady展开说明  

**底部 toast**  

```js
onReady() {
  // 获取弹窗实例
  let $pop = this.getElementsById('modal')
  $pop.toast({
    title: 'toast弹窗，5秒后消失',
    countdown: 5000
  })
}
```

**中间 toast**  

```js
onReady() {
  // 获取弹窗实例
  let $pop = this.getElementsById('modal')
  $pop.toast_mid({
    title: 'toast弹窗，5秒后消失',
    countdown: 5000
  })
}
```

**顶部 message消息**  

```js
onReady() {
  // 获取弹窗实例
  let $pop = this.getElementsById('modal')
  $pop.message({
    title: 'message消息, 4秒后消失',
    itemStyle: 'background-color: #fcf8e3; color: fff;border-radius: 0',
    countdown: 4000
  })
}
```

**中间弹层**  

```js
onReady() {
  // 获取弹窗实例
  let $pop = this.getElementsById('modal')
  $pop.pop({
    title: '中间弹层',
  })
}
```

**顶部弹层**  

```js
onReady() {
  // 获取弹窗实例
  let $pop = this.getElementsById('modal')
  $pop.pop_top({
    title: '顶部弹层',
  })
}
```

**底部弹层**  

```js
onReady() {
  // 获取弹窗实例
  let $pop = this.getElementsById('modal')
  $pop.pop_bot({
    title: '底部弹层',
  })
}
```

**开启遮板**  

```js
onReady() {
  // 获取弹窗实例
  let $pop = this.getElementsById('modal')
  $pop.pop_bot({
    enableMask: true,
    title: '开启遮板',
  })
}
```

**开启关闭按钮和遮罩**  

```js
onReady() {
  // 获取弹窗实例
  let $pop = this.getElementsById('modal')
  $pop.pop_bot({
    enableMask: true,
    closeBtn: true,
    title: '开启关闭按钮和遮罩',
  })
}
```

**自定义宽高弹层**  

```js
onReady() {
  // 获取弹窗实例
  let $pop = this.getElementsById('modal')
  $pop.pop_top({
    title: '自定义宽高弹层',
    itemStyle: "width: 80%; height:10%;"
  })
}
```

**自定义位置**  

```js
onReady() {
  // 获取弹窗实例
  let $pop = this.getElementsById('modal')
  $pop.pop_top({
    title: '自定义位置',
    itemStyle: "top: -200px; left: -100px"
  })
}
```

**自顶部弹层，内容高度**  

```js
onReady() {
  // 获取弹窗实例
  let $pop = this.getElementsById('modal')
  $pop.top({
    title: '自顶部弹层，内容高度',
    body: [
      '1',
      '2',
      '3',
      '4',
    ],
  })
}
```

**顶部弹层，半屏**  

```js
onReady() {
  // 获取弹窗实例
  let $pop = this.getElementsById('modal')
  $pop.top_bar({
    title: '顶部弹层，半屏',
  })
}
```

**顶部弹层，全屏**  

```js
onReady() {
  // 获取弹窗实例
  let $pop = this.getElementsById('modal')
  $pop.top_full({
    title: '顶部弹层，全屏',
  })
}
```

**顶部弹层，自定义高度**  

```js
onReady() {
  // 获取弹窗实例
  let $pop = this.getElementsById('modal')
  $pop.top_full({
    title: '顶部弹层，自定义高度',
    enableMask: true,
    itemStyle: 'height: 85vh;'
  })
}
```

**底部弹层，内容高度**  

```js
onReady() {
  // 获取弹窗实例
  let $pop = this.getElementsById('modal')
  $pop.bot({
    title: '底部弹层，内容高度',
    body: [
      '1',
      '2',
      '3',
      '4',
    ],
  })
}
```

**底部弹层，半屏**  

```js
onReady() {
  // 获取弹窗实例
  let $pop = this.getElementsById('modal')
  $pop.bot_bar({
    title: '底部弹层，半屏',
  })
}
```

**底部弹层，全屏**  

```js
onReady() {
  // 获取弹窗实例
  let $pop = this.getElementsById('modal')
  $pop.bot_full({
    title: '底部弹层，全屏',
  })
}
```

**底部弹层，自定义高度**  

```js
onReady() {
  // 获取弹窗实例
  let $pop = this.getElementsById('modal')
  $pop.bot_full({
    title: '底部弹层，自定义高度',
    itemStyle: 'height: 80vh'
  })
}
```

**从左侧弹层**  

```js
onReady() {
  // 获取弹窗实例
  let $pop = this.getElementsById('modal')
  $pop.left({
    title: '从左侧弹层',
  })
}
```

**从右侧弹层**  

```js
onReady() {
  // 获取弹窗实例
  let $pop = this.getElementsById('modal')
  $pop.right({
    title: '从右侧弹层',
  })
}
```

还有`左侧半屏，左侧全屏，右侧半屏，右侧全屏`等等请参考上面的示例
