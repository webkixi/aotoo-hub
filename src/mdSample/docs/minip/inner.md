# 内嵌组件

`aotoo`或者是`queryUI`的组件是基于配置化生成，需要在配置中递归使用其他组件，或者组件自身  

内嵌组件是为了方便灵活的在配置中插入组件

常用内嵌组件  
------------

### @item

`@item`配置将使用item组件来构建  

```js
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

/**
 * 模板
 * <ui-item item="{{itemData}}" />
*/


/**
 * 小程序渲染结构
 * <view class='level-0'>
 *   标题
 *   <view class='level-1'>
 *     标题
 *     <view class='level-2'>
 *       标题
 *       <view class='level-3'>
 *         标题
 *       </view>
 *     </view>
 *   </view>
 * </view>
*/
```

### @list

`@list`配置将使用item组件来构建  

```js
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

/**
 * 模板
 * <ui-item item="{{itemData}}" />
*/


/**
 * 小程序渲染结构
 * <view class='level-0'>
 *   标题
 *   <view class='level-1'>
 *     标题
 *     <view class='list-item'>标题-1</view>
 *     <view class='list-item'>标题-2</view>
 *     <view class='list-item'>标题-3</view>  
 *   </view>
 * </view>
*/
```

### @tree

`@tree`使用tree组件构建，tree组件是list组件演变而来，配置项与list一致

其他内嵌组件
-------------

### @md

`@md`使用markdown组件来解析markdown字符串并生成小程序结构

```js
data: {
  itemData: {
    'title': '标题',
    '@md':
` # markdown标题  
- 对于文档的描述  
- 更多的描述  
`,
  }
}

/**
 * 模板  
 * <ui-item item="{{itemData}}" />
*/
```

### @html

`@html`使用markdown组件来解析html字符串并生成小程序结构，一般用作富文本解析，从后台接收数据并用于渲染成小程序原生结构

```js
data: {
  itemData: {
    'title': '标题',
    '@html': '<div><span>...</span></div>'
  }
}

/**
 * 模板  
 * <ui-item item="{{itemData}}" />
*/
```

### @button

小程序原生button组件

```js
const itemData = {
  '@button': {
    type: '',
    size: '',
    ...
  }
}
```

### @input

小程序原生form/input组件

```js
const itemData = {
  '@input': {
    value: '',
    type: '',
    ...
  }
}
```

### @editor

小程序原生editor组件

```js
const itemData = {
  '@editor': {
    'placeholder': '',
    'show-img-size': '',
    ...
  }
}
```

### @video

小程序原生video组件

```js
const itemData = {
  '@video': {
    'src': '',
    'duration': '',
    ...
  }
}
```

## 自定义内嵌组件  

打开`components/aotoo/templates.wxml`  

__自定义广告组件__  

```html
<template name="@ad">
  <block wx:if="{{util.isObject(props)}}">
    <ad
      unit-id="{{props['unit-id']||''}}"
      ad-intervals="{{props['ad-intervals']||''}}"
      ad-type="{{props['ad-type']||''}}"
      ad-theme="{{props['ad-theme']||''}}"
      ...
      ...
    />
  </block>
</template>
```

__调用自定义内嵌组件__  

```js
const itemData = {
  '@ext': {
    'is': '@ad',
    'unit-id': '....'
    ...
  }
}
```
