
# item元组件

> item是页面的基础构成

## 特点

1. 数据结构即wxml结构  
2. 结构完整，item可以实现非常复杂的数据  
3. 丰富的实例方法(仿jquery)，便捷增修改wxml结构

## wxml模板

```html
<ui-item item="{{config}}" />
```

## 配置

```js
Pager({
  data: {
    config: {
      title: 'some text',
      url: ''
    }
  }
})
```

### 配置属性  

| 属性 | 类型 | 默认值 | 说明|
| :-: |:-:| :-:| :-: |
| $$id  | String | 空 | 实例id |
| title  | String/Array/Object | 空 | 标题 |
| url  | String | 空 | 链接 |
| img  | String/Array/Object | 空 | 图片 |
| attr  | String/Array/Object | 空 |data-*属性 |
| body  | Array | 空 | body结构 |
| footer  | Array | 空 | footer结构 |
| dot  | Array | 空 | dot结构 |
| itemClass  | String | 空 | 自定义item样式 |
| itemStyle  | String | 空 | 自定义item内联样式 |
| methods  | Object | 空 | 自定义item内部方法 |

### 属性说明

#### $$id

item组件的实例id，用于获取item组件的实例

#### title

展示标题  

```js
// String
{title: '标题'}

// Array
{title: ['标题', '标题']}

// Object
{title: {title: '标题'} }
```

### url

使用原生组件navigator解析url属性，需要与title搭配使用

```js
// 一般使用  
{title: '标题',  url: 'page/demo/index' }

// 带query
{
  title: '标题',
  url: 'page/demo/index?aaa=1'
}

// 使用hash设置navigator属性
// 只能设置字符串类型的配置
{
  title: '标题',
  url: 'page/demo/index?aaa=1#open-type=switchTab'
}
```

### img

使用小程序img组件解析此属性  

```js
// String
{img: '/images/abc.png'}

// Object
// 允许指定特殊属性，如itemClass，或者mode
{
  img: {src: '/images/abc.png', itemClass: 'imgclass', mode: '...'}
}

// Array
// 设置多图结构
{
  img: [
    {src: '/images/abc.png', itemClass: 'imgclass', mode: ''},
    {src: '/images/abc.png', itemClass: 'imgclass', mode: ''},
    ...
  ]
}
```

### itemClass && itemStyle

设置item容器的样式类

```js
{
  title: '标题',
  itemClass: 'abc',
  itemStyle: 'width: 100%; height:100vh;'
}
```

### attr

{Object} 设置data-*属性
只有`attr.id`会映射到输出结构上，其他属性需要在事件中获取

```js
{
  title: '标题',
  attr: {id: 'uniqId', key1: 'aaa', key2: 'bbb'},
  tap: 'onTap?querykey=1',
  methods: {
    onTap(e, param, inst){
      console.log(e.currentTarget.dataset) // 所有attr属性
    }
  }
}

// <view data-id='uniqId' />
```

### body

body结构，item的下属结构，有自己的容器view，容器中存放item组件

```js
{
  title: '标题',
  body: [
    {title: '标题-1'},  // 由item组件构成
    {title: '标题-2'}
  ]
}

/*
// 输出大致结构如下
<view class='item' >
  <text>标题</text>
  <view class='body'>
    <view class='item body-item'>标题-1</view>
    <view class='item body-item'>标题-2</view>
  </view>
</view>
*/
```

### footer

footer结构，item的下属结构，有自己的容器view，容器中存放item组件

```js
{
  title: '标题',
  body: [...],
  footer: [
    {title: '标题-1'},  // 由item组件构成
    {title: '标题-2'}
  ]
}

/*
// 输出大致结构如下
<view class='item' >
  <text>标题</text>
  <view class='body'>...</view>
  <view class='footer'>
    <view class='item footer-item'>标题-1</view>
    <view class='item footer-item'>标题-2</view>
  </view>
</view>
*/
```

### dot

dot结构，item的下属结构，比较特殊的是，dot结构没有自己的容器，其容器为item组件本身，dot也是一组item组件的集合

```js
{
  title: '标题',
  dot: [
    {title: '标题-1'},  // 由item组件构成
    {title: '标题-2'}
  ]
}

/*
// 输出大致结构如下
<view class='item' >
  <text>标题</text>
  
  <view class='item dot-item'>标题-1</view>
  <view class='item dot-item'>标题-2</view>
  
</view>
*/
```

### methods

为该item组件指定私有方法

```js
{
  title: '标题',
  tap: 'funA'
  methods: {
    funA(e, param, inst){
      this.funB()
    },
 funB(){
      this.update({title: '新标题'})
    }
  }
}
```

#### __ready

__ready方法比较特殊，将会在组件加载到dom之后执行，按照小程序组件生命周期定义，将在组件的`ready`方法之后
