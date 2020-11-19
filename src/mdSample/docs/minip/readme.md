# QUERYUI

在微信中搜索`queryUI`可以查看更多的DEMO  
[github](https://www.github.com/webkixi/aotoo-xquery)  

`queryUI`是一套我们内部项目孵化而出的小程序核心库(基于原生小程序)，糅合了一些jQuery特性及一些方便好用的特性，用于简化小程序开发成本及帮助后期能更好的维护项目

* 原生微信小程序  
* 动态模板构建
* template less
* 支持钩子方法
* 内置支持MARKDOWN富文本
* 内置支持HTML富文本  

<div style="margin-top: 15px;" />  

__更多的组件__  

* 多形态日历组件
* 通用型筛选列表
* form表单
* markdown/html组件
* 弹窗组件
* 支持震动的评分组件
* 下拉菜单
* 双向slider
* 索引列表
* 腾讯地址定位  
* 水果老虎机
* 折叠面板
* 双栏分类导航(左右)
* 双栏分类导航(上下)
* 刮刮卡  
* 导航球
* 导航面板
* 俄罗斯大转盘
* 手势锁

## 无侵入的Pager

使用Pager方法替换小程序Page，Pager作为page的封装，提供了更多方便特性

```js
const Pager = require('components/aotoo/core/index')
Pager({
  data: {},
  onLoad(){},
  onReady(){}
})
```

## 实例抓取  

使用`getElementsById`抓取小程序元素对象

```js
const Pager = require('components/aotoo/core/index')
Pager({
  data: {
    itemData: {$$id: 'xxx', title: '...'}
  },
  onReady(){
    // 抓取组件实例
    let xxx = this.getElementsById('xxx')  // 获取item组件实例
    let yyy = this.getElementsById('yyy') // 获取自定义组件实例
  }
})

// 模板
// <ui-item item="{{itemData}}"/> xquery组件
// <custom-mp-component id='yyy' /> 原生小程序自定义组件
```

## 事件封装  

事件封装是必须是基于queryUI封装的组件有效，原生写法不支持。queryUI可以融合原生写法，并不破坏小程序开发环境

```js
Pager({
  data: {
    itemData: {
      $$id: 'xxx',
      title: '张三',
      itemClass: 'button-default'
      aim: 'onTap?username=张三'  // 允许query参数
    }
  },
  onTap(e, param, inst){
    if (param.username === '张三') {
      inst.update({title: '选中的张三'})
    }
  }
})

// item模板
// 可通过getElementsById获得该组件的实例对象
// <ui-item item="{{itemData}}" />

/*
item模板生成结构
<view class="button-default" catch:tap="onTap">  
  <text>张三</text>
</view>
*/
```

## 数据缓存

利用queryUI自带的钩子方法提供的数据缓存方法，方法与localStorage一致，钩子实例可以全局通用，该方法甚至支持lru的缓存处理，后面会有详述

```js
// pagea.js
const Pager = require('components/aotoo/core/index')
const lib = Pager.lib
const dataEntity = lib.hooks('DATA-ENTITY')
dataEntity.setItem('names', {name: '张三', sex: '男'})


// pageb.js
const dataEntity = lib.hooks('DATA-ENTITY')  // 与pagea同一个实例
Pager({
  onLoad(){
    let namesData = dataEntity.getItem('names')
    console.log(namesData)
  }
})
```

### 缓存过期

```js
// pagea.js
const dataEntity = lib.hooks('DATA-ENTITY')
dataEntity.setItem('names', {name: '张三', sex: '男'}, 3600 * 1000)
```

## 内置组件与内嵌组件

__内置组件__  
内置组件就是正常的小程序的组件，查看app.json可知

```html
<ui-item item="{{itemData}}" />
<ui-list list="{{listData}}" />
<ui-tree list="{{treeData}}" />
```  

__内嵌组件__  
为了方便灵活的在配置中插入组件，内嵌组件一般是在配置中使用，内嵌组件`@item/@list/@tree`，扩展内置组件`ui-markit`，扩展内嵌组件`@md/@html`

```js
data: {
  itemData: {
    title: '标题',
    @item: {
      "title": '嵌套的item组件',
      "@md": '# markdown也是可以的',
      "@html": '<div style="color:red;">html模板</div>'
    }
  }
}

/*
模板  
<ui-item item="{{itemData}}" />
*/

/*
小程序解析后
<view class="item">
  <text>标题</text>
  <view class="item">
    <text>嵌套的item组件</text>
  </view>
  <view class="markdown">
    ...
  </view>
  <view class="html">
    ...
  </view>
</view>
*/
```

#### 更多demo请关注小程序

![xquery](http://www.agzgz.com/imgs/xquery.png)
