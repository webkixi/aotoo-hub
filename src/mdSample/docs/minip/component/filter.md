# 筛选组件  

筛选组件基于`queryUI`库开发而成，`queryUI`是一套基于微信原生小程序的小程序开发库，`queryUI`的设计思想与我们web端项目aotoo一致。所以PC，小程序开发切换so easy。

<img src="/images/minip/filter.gif" class="demo-img"/>

* 自定义筛选条件  
* 自定义筛选层级  
* 支持单选/复选/switch
* 独立组件，方便与其他组件融合  
* 简单的api调用  
* 无模板维护成本  
* 支持内嵌使用

[GITHUB源码](https://github.com/weibixi/aotoo-xquery)  

## 基础使用

**wxml**  

```html
<ui-list wx:if="{{checkListConfig}}" class="{{containerClass}}" list="{{checkListConfig}}" />
```

**js**  

```js
const config = mkCheckList({
  id: 'xxx', // 实例名称，在page中可以通过this.xxx获取该实例
  mode: 1,  // 指定筛选类型，默认1:单层筛选, 2:多层筛选
  checkedType: 1, // 1: 单选， 2: 多选
  onlyValid: false, // valid互斥关系 true为互斥， false不互斥
  isSwitch: false,  // 启用switch，checkedType=2时有效
  value: [],  // 配置默认值
  data: [],  // 数据配置
  separator: '--',  // allValue的分隔符，获取层级value之间的分隔符
  maxCount: 9,  // 块状筛选时，mode=3的时候有效，块状选择子元素超过9个隐藏多的选项同时显示展开按钮
  selectAll: false,  // 是否启用全选选项
  tap: null,  // 取值响应方法，叶子节点(无下级列表)响应方法，也可通过实例来指定  
})

Pager({
  data: {
    checkListConfig: config
  },
  onReady(){
    let instance = this.xxx  //获取了筛选列表的实例
    instance.tap = function(result){
      console.log(result)
    }
  }
})
```

**配置数据**  
下例代码片段是对配置中的data数据的描述  

```js
data: [
  {title: '标题', value: '001', idf: 'x-1': checkListOption:{...}},  // 父级数据
  {title: '标题', value: '0011', parent: 'x-1'}, // 子级数据
  {title: '标题', value: '0012', parent: 'x-1'},
  
  {title: '标题', value: '002', idf: 'x-2', checkListOption:{...}},  // 父级数据
  {title: '标题', value: '0021', parent: 'x-2'}, // 子级数据
  {title: '标题', value: '0022', parent: 'x-2' idf: 'y-1', checkListOption:{...}}, // 既是父级，也是子级
  {title: '标题', value: '00y1', parent: 'y-1'}, // 子级数据
  {title: '标题', value: '00y2', parent: 'y-1'},
]
```

**idf**  
指定父级名的key  

**parent**  
设置谁是父级的key  

**checkListOption**  
子层筛选列表的参数配置，参考上述的组件配置

<span style="color: red">value, title, idf, parent</span>必须为字符串数据

## DEMO示例

### 单行筛选列表(单选)  

<img src="/images/minip/filter-1.jpg" class="demo-img"/>

```html
<!--index.wxml-->
<ui-list wx:if="{{checkListConfig}}" list="{{checkListConfig}}" />
```

```js
const Pager = require('../../components/aotoo/core/index')
const mkCheckList = require('../../components/modules/checklist')

const config = {
  id: 'xxx',
  checkedType: 1, // 1 单选
  value: ['2'],
  data: [
    {title: '111', value: '1'},
    {title: '222', value: '2'},
    {title: '333', value: '3'},
    {title: '444', value: '4'},
  ]
}

Pager({
  data: {
    checkListConfig: mkCheckList(config)
  }
}
```

### 单行筛选列表(多选)  

<img src="/images/minip/filter-2.jpg" class="demo-img"/>

```html
<!--index.wxml-->
<ui-list wx:if="{{checkListConfig}}" list="{{checkListConfig}}" />
```

```js
/* index.js */
const Pager = require('../../components/aotoo/core/index')
const mkCheckList = require('../../components/modules/checklist')

const config = {
  id: 'xxx',
  checkedType: 2,  // 2 多选
  value: ['2', '3', '4'],
  data: [
    {title: '111', value: '1'},
    {title: '222', value: '2'},
    {title: '333', value: '3'},
    {title: '444', value: '4'},
  ]
}

Pager({
  data: {
    checkListConfig: mkCheckList(config)
  }
}
```

### 单行筛选列表(switch)  

<img src="/images/minip/filter-3.jpg" class="demo-img"/>

```html
<!--index.wxml-->
<ui-list wx:if="{{checkListConfig}}" list="{{checkListConfig}}" />
```

```js
/* index.js */
const Pager = require('../../components/aotoo/core/index')
const mkCheckList = require('../../components/modules/checklist')

const config = {
  id: 'xxx',
  checkedType: 2,  // 2 多选
  isSwitch: true,  // 指定为switch
  value: ['2', '3', '4'],
  data: [
    {title: '111', value: '1'},
    {title: '222', value: '2'},
    {title: '333', value: '3'},
    {title: '444', value: '4'},
  ]
}

Pager({
  data: {
    checkListConfig: mkCheckList(config)
  }
}
```

### 四、全选及分割符  

<img src="/images/minip/filter-4.jpg" class="demo-img"/>

```html
<!--index.wxml-->
<ui-list wx:if="{{checkListConfig}}" list="{{checkListConfig}}" />
```

```js
/* index.js */
const Pager = require('../../components/aotoo/core/index')
const mkCheckList = require('../../components/modules/checklist')

const config = {
  id: 'xxx',
  checkedType: 2,  // 2 多选
  selectAll: true,  // 是否包含全选选项
  value: ['999',],
  data: [
    {title: '111', value: '111'},
    {title: '222', value: '222'},
    '=====',
    {title: '333', value: '333'},
    {title: '444', value: '444'},
    ['=====', '分类分隔符'],
    {title: '555', value: '555'},
  ]
}

Pager({
  data: {
    checkListConfig: mkCheckList(config)
  }
}
```

### 二层筛选  

<img src="/images/minip/filter-5.jpg" class="demo-img"/>

```html
<!--index.wxml-->
<ui-list wx:if="{{checkListConfig}}" list="{{checkListConfig}}" />
```

```js
/* index.js */
const Pager = require('../../components/aotoo/core/index')
const mkCheckList = require('../../components/modules/checklist')

const config = {
  id: 'xxx',
  checkedType: 2,  // 2 多选
  value: ['111'],
  data: [
    title: '111', value: '111', idf: 'aaa', checkListOption: {checkedType: 2, value: ['222']}},
    {title: '222', value: '222', parent: 'aaa'},
    {title: '333', value: '333', parent: 'aaa'},
    {title: '444', value: '444', parent: 'aaa'},

    {title: '555', value: '555', idf: 'bbb', checkListOption: {checkedType: 2, value: ['666', '777']}},
    {title: '666', value: '666', parent: 'bbb'},
    {title: '777', value: '777', parent: 'bbb'},
    {title: '888', value: '888', parent: 'bbb'},
  ]
}

Pager({
  data: {
    checkListConfig: mkCheckList(config)
  }
}
```

### 三层筛选  

<img src="/images/minip/filter-7.jpg" class="demo-img"/>

```html
<!--index.wxml-->
<ui-list wx:if="{{checkListConfig}}" list="{{checkListConfig}}" />
```

```js
/* index.js */
const Pager = require('../../components/aotoo/core/index')
const mkCheckList = require('../../components/modules/checklist')

const config = {
  id: 'xxx',
  value: ['111'],
  data: [
    {title: '111', value: '111', idf: 'aaa', checkListOption: {checkedType: 2, value: ['222']}},
    {title: '222', value: '222', parent: 'aaa'},
    {title: '333', value: '333', parent: 'aaa'},
    {title: '444', value: '444', parent: 'aaa'},

    {title: '555', value: '555', idf: 'bbb', checkListOption: {checkedType: 2, value: ['666']}},
    {title: '666', value: '666', parent: 'bbb', idf: 'ccc', checkListOption: {checkedType: 2, value: ['888']}},
    {title: '777', value: '777', parent: 'bbb', idf: 'ddd', checkListOption: {checkedType: 2}},

    {title: '888', value: '888', parent: 'ccc'},
    {title: '888-1', value: '888-1', parent: 'ccc'},
    {title: '888-2', value: '888-2', parent: 'ccc'},

    {title: '999', value: '999', parent: 'ddd'},
    {title: '999-1', value: '999-1', parent: 'ddd'},
    {title: '999-2', value: '999-2', parent: 'ddd'},
  ]
}

Pager({
  data: {
    checkListConfig: mkCheckList(config)
  }
}
```

### 块状筛选  

<img src="/images/minip/filter-8.jpg" class="demo-img"/>

```html
<!--index.wxml-->
<ui-list wx:if="{{checkListConfig}}" list="{{checkListConfig}}" />
```

```js
/* index.js */
const Pager = require('../../components/aotoo/core/index')
const mkCheckList = require('../../components/modules/checklist')

const config = {
  id: 'xxx',
  mode: 3,
  checkedType: 1,
  maxCount: 6,
  data: [
    {title: '111', value: '111', idf: 'aaa', checkListOption: {checkedType: 1, value: ['222']}},
    {title: '222', value: '222', parent: 'aaa'},
    {title: '333', value: '333', parent: 'aaa'},
    {title: '444', value: '444', parent: 'aaa'},
    {title: 'xxx', value: 'xxx', parent: 'aaa'},
    {title: 'yyy', value: 'yyy', parent: 'aaa'},
    {title: 'zzz', value: 'zzz', parent: 'aaa'},
    {title: 'xxx', value: 'xxx1', parent: 'aaa'},

    {title: '555', value: '555', idf: 'bbb', checkListOption: {checkedType: 2, value: ['666', '777']}},
    {title: '666', value: '666', parent: 'bbb'},
    {title: '777', value: '777', parent: 'bbb'},
    {title: '888', value: '888', parent: 'bbb'},
  ]
}

Pager({
  data: {
    checkListConfig: mkCheckList(config)
  }
}
```

### 异步筛选  

```html
<!--index.wxml-->
<ui-list wx:if="{{checkListConfig}}" list="{{checkListConfig}}" />
```

```js
/* index.js */
const Pager = require('../../components/aotoo/core/index')
const mkCheckList = require('../../components/modules/checklist')

const config = {
  id: 'xxx',
  value: ['111'],
  data: [
    {title: '111', value: '111', content(){
      this.fillContent([
        {title: '222', value: '222'},
        {title: '333', value: '333'},
        {title: '444', value: '444'},
      ])
    }},


    {title: '555', value: '555', content(){
      this.fillContent({
        checkedType: 2,
        data: [
          {title: '666', value: '666'},
          {title: '777', value: '777'},
          {title: '888', value: '888'},
        ]
      })
    }},
  ]
}

Pager({
  data: {
    checkListConfig: mkCheckList(config)
  }
}
```

### 设置全选  

```html
<!--index.wxml-->
<ui-list wx:if="{{checkListConfig}}" list="{{checkListConfig}}" />
```

```js
/* index.js */
const Pager = require('../../components/aotoo/core/index')
const mkCheckList = require('../../components/modules/checklist')

const config = {
  id: 'xxx',
  checkedType: 2,
  isSwitch: true,
  value: ['3'],
  data: [
    {title: '111', value: '1'},
    {title: '222', value: '2'},
    {title: '333', value: '3'},
    {title: '444', value: '4'},
  ],
  footer: {
    title: '全选',
    itemStyle: 'background-color: red;color: #fff; box-shadow: 2px 2px 6px 2px #999;margin: 10px;width: 100px; height: 40px; display: flex; justify-content: center; align-items:center;border-radius: 5px;',
    tap(e, param, inst){
      this.checkedAll(!this.checkedStat)
      this.checkedStat = !this.checkedStat
      const stat = this.checkedStat
      inst.update({title: (stat ? '取消全选':'全选')})
    },
    methods: {
      __ready(){
        this.checkedStat = false
      }
    }
  }
}

Pager({
  data: {
    checkListConfig: mkCheckList(config)
  }
}
```

### 如何取值  

```js
/* index.js */
const Pager = require('../../components/aotoo/core/index')
const mkCheckList = require('../../components/modules/checklist')

config = {
  id: 'xxx',
  checkedType: 2,
  value: ['111'],
  data:[...],  
  tap(allValue){ // 通过配置指定事件
    console.log(allValue)  
  }
}

Pager({
  data: {
    checkListConfig: mkCheckList(config)
  },
  onReady(){
    // 也可以通过设置实例的tap事件来指定
    let instance = this.xxx
    instance.tap = function(result){
      console.log(result)
    }
  }
}
```

结果如下图  
<img src="/images/minip/filter-getvalue.jpg"/>

### 赋值、清除  

**setValue**  
通过筛选实例`setValue`方法赋值  
需要注意：因为筛选条件分为二级或者多级筛选，为了避免value值冲突，赋值时需要带上父级value并以`--`来区隔  
如需要选中value='333'和value='888'，应写成`setValue(['111--333', '555--888'])`  

**clear**  
通过筛选实例`clear`方法清空所有选项  

**清除所有选项**  
写成`clear()`，不带参数，则清除所有选项

**清除指定选项**  
有些条件是互斥选项，需要指定清空某一个大类及其所有子选项值
如下列中，我们要清除`value='111'`大类的所有选项，写成`clear('111')`  

wxml  

```html
<ui-list class="{{containerClass}}" list="{{checkListConfig}}" />  <!-- 筛选组件 -->
<ui-item item="{{buttonsConfig}}"/>  <!-- 按钮集合 -->
```

js  

```js
/* index.js */
const Pager = require('../../components/aotoo/core/index')
const mkCheckList = require('../../components/modules/checklist')

config = {
  id: 'xxx',
  data: [
    {title: '111', value: '111', idf: 'aaa', checkListOption: {checkedType: 2, value: ['222']}},
    {title: '222', value: '222', parent: 'aaa'},
    {title: '333', value: '333', parent: 'aaa'},
    {title: '444', value: '444', parent: 'aaa'},

    {title: '555', value: '555', idf: 'bbb', checkListOption: {checkedType: 2, value: ['666', '777']}},
    {title: '666', value: '666', parent: 'bbb'},
    {title: '777', value: '777', parent: 'bbb'},
    {title: '888', value: '888', parent: 'bbb'},
  ]
}

const buttonsConfig = {
  bodyStyle: 'display: flex; justify-content: space-between; box-sizing: border-box; padding: 10px;',
  body: [
    {
      title: 'setValue',
      itemStyle: 'background-color: red;color: #fff; box-shadow: 2px 2px 6px 2px #999;margin: 10px;width: 100px; height: 40px; display: flex; justify-content: center; align-items:center;border-radius: 5px;',
      aim: 'onSetValue'
    },
    {
      title: '指定清除',
      itemStyle: 'background-color: red;color: #fff; box-shadow: 2px 2px 6px 2px #999;margin: 10px;width: 100px; height: 40px; display: flex; justify-content: center; align-items:center;border-radius: 5px;',
      aim: 'onClear111'
    },
    {
      title: '清除全部',
      itemStyle: 'background-color: red;color: #fff; box-shadow: 2px 2px 6px 2px #999;margin: 10px;width: 100px; height: 40px; display: flex; justify-content: center; align-items:center;border-radius: 5px;',
      aim: 'onClear'
    },
  ],
  methods: {
    onSetValue(e, param, inst){
      let xxx = this.activePage.xxx
      xxx.setValue(['111--333'])
      let res = xxx.getValue()
      console.log(res);
    },
    onClear(){
      let xxx = this.activePage.xxx
      xxx.clear()
      let res = xxx.getValue()
      console.log(res);
    },
    onClear111(){
      let xxx = this.activePage.xxx
      xxx.clear('111')
      let res = xxx.getValue()
      console.log(res);
    }
  }
}

Pager({
  data: {
    checkListConfig: mkCheckList(config),
    buttonsConfig: buttonsConfig
  },
  onReady(){
    // 也可以通过设置实例的tap事件来指定
    let instance = this.xxx
    instance.tap = function(result){
      console.log(result)
    }
  }
}
```
