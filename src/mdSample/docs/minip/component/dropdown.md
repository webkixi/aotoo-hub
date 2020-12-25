# 下拉菜单组件  

<img src="/images/minip/dd.gif" class="demo-img"/>

## 基本用法

在app.json注册该组件

```js
"usingComponents": {
  "ui-item": "/components/aotoo/item/index",
  "ui-list": "/components/aotoo/list/index",
  "ui-tree": "/components/aotoo/tree/index",
  "ui-markit": "/components/markit/index",  // markdown，富文本组件
  "ui-dd": "/components/aotoo/list/index",
}
```

wxml模板  

```html
<ui-dd list="{{ddConfig}}" />
```

js  

```js
const Pager = require('../../components/aotoo/core/index')
const mkDropdown = require('../../components/modules/dropdown')
Pager({
  data: {
    ddConfig: mkDropdown({
      ...
    }),
  }
} 
```

## 配置  

```js
ddConfig: mkDropdown({
  /*
    * 实例ID名
    * {String}
    * 可通过 Pager.getElementsById(id) 获取下拉菜单实例
    */
  id: '',

  /*
    * 遮罩层的内联样式
    * {String}
    * 可以通过此参数直接传递样式给遮罩层
    */
  maskStyle: '',

  /*
    * 菜单按钮点击响应方法
    * {Function}
    * 每个菜单项点击时触发的相应方法，可通过其参数判断当前操作为哪一个菜单项
    */
  tap: null,

  /*
    * 下拉菜单渲染完成后响应方法
    * {Function}
    * 可以通过此方法将this传递给全局变量  
    */
  __ready: null,

  /*
    * 下拉菜单配置
    * {Array}
    * 配置下拉菜单
    */
  data: []
})
```

### 如何配置  

**如何获取实例**

```js
Pager({
  onReady(){
    let dropdown = this.getElementsById('id')
  }
})
```

**配置菜单项**  

```js
ddConfig: mkDropdown({
  data: [
    {title: '菜单项-1'},
    {title: '菜单项-2'},
    {title: '菜单项-3'},
  ]
}),

```

**默认菜单项内容**  
菜单项展开弹层的默认内容  

```js
ddConfig: mkDropdown({
  data: [
    {title: '菜单项-1', content: {}},  // 使用item组件渲染内容
    {title: '菜单项-2', content: []},  // 使用list组件渲染内容
    {title: '菜单项-3', content: ''},  // 字符串
    {title: '菜单项-3', content: function(){}}, // 自定义内容，异步内容
  ]
})
```  

>>> content支持`String|Object|Array|Function`类型，组件内会相对应的使用item/list等内置组件将其渲染输出  

**异步数据填充弹层内容**  

```js
const listConfig = {
  "@list": {
    listClass: 'any-class-name',
    listStyle: 'width: 200px; height: 200px; overflow: auto; display: flex; flex-direction: column; justify-content: space-evenly;',
    data: [
      '1', '2', '3'
    ],
    itemMethod: {
      aim() {
        console.log('触发类点击');
      }
    }
  }
}

ddConfig: mkDropdown({
  id: 'xxx',
  data: [
    {title: '选项-1'}, 
    {title: '选项-2'}, 
  ],
  // 此处tap为下拉菜单属性，不能与aim混淆
  tap(item, index){
    if (index === 0) {  // 第一项菜单点击事件，异步填充内容
      this.updateContent(listConfig)
    }
  }
})
```

**设置复杂的菜单项**  
下例为每一个下拉菜单设置各自内容，一个item项，一个列表，一个以markdown文本作为内容

```js
const advItem = {
  "@item": {
    itemStyle: 'width: 200px; height: 100px; overflow: hidden;',
    img: {src: '/images/huawei.jpg', itemStyle: 'width: 200px;'},
    tap(){
      console.log('触发了点击方法');
    }
  }
}

const advList = {
  "@list": {
    listClass: 'any-class-name',
    listStyle: 'width: 200px; height: 200px; overflow: auto; display: flex; flex-direction: column; justify-content: space-evenly;',
    data: [
      '1', '2', '3'
    ],
    itemMethod: {
      tap(){
        console.log('触发类点击');
      }
    }
  }
}

const advMd = {
  "@md": `这是一段markdown的文本内容`
}

ddConfig: mkDropdown({
  data: [
    {title: '选项-1', content: advItem}, 
    {title: '选项-2', content: advList}, 
    {title: '选项-3', content: advMd}, 
  ]
})
```

**下拉菜单与筛选列表**  

```js
const Pager = require('../../components/aotoo/core/index')
const mkDropdown = require('../../components/modules/dropdown')
const mkChecklist = require('../../components/modules/checklist')

// 生成筛选列表
const checkListConfig = {
  "@list": mkChecklist({  // @list为内嵌列表组件，queryUI会自动适配列表模板，无需额外引入
    containerClass: 'checklist-container',
    value: ['1'],
    data: [
      {title: 'aaa', value: '1', idf: 'aaa', checkListOption: {value: ['1-1']}},
      {title: '你好', value: '1-1', parent: 'aaa'},
      {title: '你妹', value: '1-2', parent: 'aaa'},

      {title: 'bbb', value: '2', idf: 'bbb', checkListOption: {value: ['2-2']}},
      {title: '你好', value: '2-1', parent: 'bbb'},
      {title: '你妹', value: '2-2', parent: 'bbb'},

      {title: 'ccc', value: '3', idf: 'ccc', checkListOption: {value: ['3-1']}},
      {title: '你好', value: '3-1', parent: 'ccc'},
      {title: '你妹', value: '3-2', parent: 'ccc'},

      {title: 'ddd', value: '4', idf: 'ddd'},
      {title: '你好', value: '4-1', parent: 'ddd', idf: 'fff', checkListOption: {checkedType: 2}},
      {title: '你好', value: '4-2', parent: 'fff'},
      {title: '你好', value: '4-3', parent: 'fff'},
      {title: '你好', value: '4-4', parent: 'fff'},
      {title: '你好', value: '4-5', parent: 'fff'},
      {title: 'eee', value: '4-2', parent: 'ddd', idf: 'eee', checkListOption: {checkedType: 2}},
      {title: '微信', value: '5-1', parent: 'eee'},
      {title: '抖音', value: '5-2', parent: 'eee'},
      {title: '淘宝', value: '5-3', parent: 'eee'},
    ],

    tap(param) {
      if (param.value === '3') {
        this.clear('1')
      }
      if (param.tapItem && param.tapItem.checkedType !== 2) {
        this.activePage['xxx'].closePop()
      }
      console.log(param);
    },
  })
}

Pager({
  data: {
    ddConfig: mkDropdown({
      id: 'xxx',
      data: [
        {title: '选项-1'}, 
        {title: '选项-2'}, 
        {title: '选项-3'},
      ],
      tap(item, index){
        if (index === 0) {  // 第一项菜单点击时触发，填充弹出窗口内容为筛选列表
          this.updateContent({ ...checkListConfig })
          let title = this.getTitle()
          this.updateTitle('xxx')
          // console.log(title);
        }
      }
    })
  }
})
```  

## API  

### 下拉菜单实例API

|API|说明|
|:-:|:-:|
|closePop|关闭弹层|  

### tap方法上下文  

在异步填充内容的例子中，tap方法有独立的上下文环境  

`tap方法参数`  

**item**： 当前菜单项所有数据  
**index**： 当前菜单项数组下标  

`tap方法的上下文API`  

|api|说明|
|-|-|
| updateContent | 更新弹层内容 |
| updateTitle | 更新当前菜单项标题 |
| getTitle | 获取当前菜单标题 |
