# slider组件  

<img src="/images/minip/sslider.jpg" class="demo-img"/>

## 基本用法

在app.json注册该组件

```js
"usingComponents": {
  "ui-item": "/components/aotoo/item/index",
  "ui-list": "/components/aotoo/list/index",
  "ui-tree": "/components/aotoo/tree/index",
  "ui-slider": "/components/aotoo/item/index",
}
```

wxml模板  

```html
<ui-slider item="{{sliderConfig}}" />
```

js  

```js
const Pager = require('../../components/aotoo/core/index')
const mkSslider = require('../../components/modules/sslider/index')
Pager({
  data: {
    rangeValue: '00',
    sliderConfig: mkSslider({
      ...
      ...
    }),
  },
})  
```

## 配置  

```js
sliderConfig: mkSslider({
  /**
   * 实例名
   * {String}
   * Pager中通过getElementsById获取实例
  */
  id: '',

  /**
   * 设置最大值
   * {Number}
  */
  max: 10,

  /**
   * 设置步进值
   * {Number}
  */
  step: 1,

  /**
   * 设置默认值
   * {Array}
  */
  value: [0, 10],

  /**
   * 选择器大小
   * {Number}
  */
  blockSize: 30,

  /**
   * 设置选择器内容
   * 设置单头，双头选择器
   * button.length = 1 设置单头选择器
  */
  button: [{}, {}],

  /**
   * 设置进度条内容 
   * {Object}
  */
  content: null, 

  /**
   * 数值改变时的响应方法
   * {String|Function}
   * String时，需要在Pager中定义相关方法
  */
  bindchange: null,

  /**
   * 数值变化中的响应方法
   * {String|Function}
   * String时，需要在Pager中定义相关方法
  */
  bindchanging: null,  

  /**
   * 是否支持平滑拖动
   * {Boolean}
   * smooth=false，根据步进节点拖动
  */
  smooth: true,

  /**
   * 是否显示提示器
   * {Boolean}
  */
  tip: true,

  /**
   * 无效状态
   * {Boolean}
  */
  disable: false,  

  /**
   * 进度条前景色  
   * {String}
  */
  frontColor: '#ccc',

  /**
   * 进度条背景色
   * {String} 
  */
  backColor: '#2b832b'
}),
```

### 如何配置各种弹窗  

**设置最大值与步进值**  

```js
slideConfig: mkSslider({
  max: 1000,
  step: 50,
  value: [0, 1000]
})
```

__设置默认值__

```js
slideConfig: mkSslider({
  value: [3, 8]
})
```

__显示提示器__

```js
slideConfig: mkSslider({
  tip: true
})
```

__设置控制柄大小__

```js
slideConfig: mkSslider({
  blockSize: 40 // 默认30
}) 
```

__设置控制柄内容__

```js
slideConfig: mkSslider({
  button: ['爽', {img: {src: '/images/chat.png', itemStyle: 'width: 30px; border-raduis: 50%;'}}]
})
```

__设置控制柄字体颜色__

```js
slideConfig: mkSslider({
  frontColor: 'red',
  backColor: 'blue'
})
```

__设置响应方法__

```js
slideConfig: mkSslider({
  bindchange() {}, // touchend响应，拖动结束后响应
  bindchanging(value) { //touchmove响应，拖动时响应
    console.log(value);
  }
})
```

__设置单头控制柄__

```js
slideConfig: mkSslider({
  button: [{}]
})
```

__获取实例__

```js
Pager({
  data: {
    slideConfig: mkSslider({ id: 'abc' })
  },
  onReady() {
    console.log(this.abc)
  }
})
```
