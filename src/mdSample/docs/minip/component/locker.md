# 仿微信锁盘

<img src="/images/minip/locker.jpg" class="demo-img"/>

## 配置说明  

默认为9宫格，在app.json注册该组件，locker组件基于list组件构建而成，也可以注册一个别名组件

```js
"usingComponents": {
  "ui-item": "/components/aotoo/item/index",
  "ui-list": "/components/aotoo/list/index",
  "ui-tree": "/components/aotoo/tree/index",
  "ui-locker": "/components/list/index",
}
```

wxml  

```html
<view wx:if="{{lockConfig}}" class="lockerBoxer">
  <canvas type="2d" id="canvasLocker" class="canvasLocker" disable-scroll="true"></canvas>
  <ui-locker list="{{lockConfig}}" />
</view>
```

js  

```js
const Pager = require('../../components/aotoo/core/index')
const mkLocker = require('../../components/modules/locker')
Pager({
  data: {
    lockConfig: mkLocker(function (values) {
      console.log(values); // 手势选择值，按顺序，数组
    }),
  }
})
```

**id**
{String}  
配置实例的Id  

**data**  
{Array}  
手势盘构成子项，根据数组长度生成手势盘  

**pointColor**  
{String}  
激活点的颜色

**lineColor**  
{String}  
线条颜色

**drawPoint**  
{Function}  
每激活一个点的响应方法

**回调方法**  
mkLocker(config, callback) 完成手势时响应  
也可以忽略config配置，直接调用回调方法  

```js
mkLocker(function (values) {
  console.log(values); // 手势选择值，返回选择顺序的值(数组)
})
```

### 如何设置  

**设置value**  
支持设置每一个Point的value值

```js
// 该手势盘只有3个点，其值分别为1,2,3
mkLocker({
  data: [ 1, 2, 3 ]
})
```

**如何获得手势盘的选中值**  

```js
// 该手势盘只有3个点，其值分别为1,2,3
mkLocker({
  data: [1, 2, 3]
}, function(values){
  console.log(values)  // values为数组，选中点的value值集合
})
```

**如何清空手势盘**  
使用clear方法清空手势盘已选项  

```js
mkLocker(function (values) {
  let rightValue = '321'
  let res = values.join('')
  if (res !== rightValue) {
    this.clear()
  }
}) 
```

**警告色手势盘**  
当用户错误输入时，使手势盘显示警告色

```js
mkLocker(function (values) {
  let rightValue = '321'
  let res = values.join('')
  if (res !== rightValue) {
    this.warning()
  }
})
```

### API  

**clear**  
清空手势盘的所有选项  

**warning**  
使已选Point显示警告色  
