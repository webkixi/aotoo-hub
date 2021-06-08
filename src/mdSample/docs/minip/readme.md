# QUERYUI

为了保障与WEB/APP的一致开发体验，在不能引入AOTOO基础库的情况下，我们开发了适用于小程序的`QUERYUI`基础库，使得开发人员可以在不同平台平滑切换

在微信中搜索`QUERYUI`可以查看更多的DEMO  
[GITHUB](https://www.github.com/webkixi/aotoo-xquery)  

## 特点

```bash
1. 原生小程序
2. 配置化，模板less化
3. 易于扩展
4. 内置支持MARKDOWN解析, HTML解析
```

<div style="margin-top: 15px;" />  

__基于QUERYUI的组件__  

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
...

## Pager

我们封装了小程序的 Page 方法，提供了更多便利性，并保持与 Page 一致的使用逻辑

```js
const Pager = require('components/aotoo/core/index')
Pager({
  data: {},
  onLoad(){},
  onShow(){},
  onReady(){}
})
```

### getElementsById  

在 Pager 的生命周期中，使用该方法可以快速找到对应的DOM实例，像JQUERY那样去使用它

```js
const Pager = require('components/aotoo/core/index')
Pager({
  data: {
    itemData: {  // item组件的配置数据
      $$id: 'uniq-id',  ## 通过$$id指定DOM的ID
      title: '标题'
    }
  },
  onReady(){
    let componentInstance = this.getElementsById('uniq-id')  // 获取item组件实例
    componentInstance.update({  // 更新该DOM的标题
      title: '新的标题'
    })
  }
})

// 模板
// <ui-item item="{{itemData}}"/> xquery组件

// 大致生成结构  
// <view><text>标题</text></view>
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

利用 QUERYUI 自带的钩子方法提供的数据缓存方法，与localStorage的使用方法保持一致，钩子实例可以全局通用，该方法甚至支持lru的缓存处理，后面会有详述

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

### 本地缓存

```js
// pagea.js
const dataEntity = lib.hooks('DATA-ENTITY', true) // 设置第二参数为true，数据会保存到小程序的localStorage中
dataEntity.setItem('names', {name: '张三', sex: '男'}, 3600 * 1000)
```

## 内置组件与内嵌组件

__内置组件__  
AOTOO基础库与QUERYUI基础库的标配内置组件为，打开 app.json 可以看到内置的全局组件

* ITEM
* LIST
* TREE

```html
<ui-item item="{{itemData}}" />
<ui-list list="{{listData}}" />
<ui-tree list="{{treeData}}" />
```  

__内嵌组件__  
QUERYUI与AOTOO都是基于配置化的方法来开发、使用组件，我们需要灵活的在配置中插入除了内置组件外的其他自定义组件，如下例在ITEM组件中混合插入了多个内嵌组件，并且内嵌组件中同样支持内嵌其他组件(并支持slot)

```js
data: {
  itemData: {
    title: '标题',
    @item: { // 内嵌一级ITEM组件
      "title": '嵌套的item组件',
      "@md": '# markdown也是可以的',  // 内嵌二级MARKDOWN组件
      "@html": '<div style="color:red;">html模板</div>' // 内嵌二级HTML组件
    }
  }
}

/*
模板  
<ui-item item="{{itemData}}" />

或者slot用法  

<ui-item item="{{itemData}}">
  <custom-mp-component /> 
</ui-item>
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
