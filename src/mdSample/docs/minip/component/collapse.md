# collapse折叠面板  

<img src="/images/minip/collapse.jpg" class="demo-img"/>

* 支持默认展开  
* 动态设置标签栏
* 动态设置内容  
* 支持无效状态  
* 支持切换响应方法  

## 使用方法  

```js
const Pager = require('../../components/aotoo/core/index')
const mkCollapse = require('../../components/modules/collapse')
Pager({
  data: {
    collapsConfig: mkCollapse({
      data: [
        // 设置字符串内容
        {
          title: '默认选中',
          content: '希望疫情快点过去',
          selected: true,  // 设置默认展开
        },
        ...
        ...
      ],
      tap(e, param){}
    })
  }
})
```

### 参数说明  

折叠组件基于list组件构建而成

**tap**  
{Function}  
点击切换不同标签时的响应方法

**data**  
{Array}  
设置折叠子项的标题和内容  

### 静态设置  

设置子项默认的标题，展开后的内容  

**简单的展开项设置**  

```js
{
  title: '标题文字',
  content: '对应标题的展开内容', // 展开内容
}  
```

**设置默认展开**  

```js
{
  title: '标题文字',
  content: '希望疫情快点过去',
  selected: true, // 设置默认展开
}
```

**设置内容区为图片**  

```js
{
  title: '标签标题  ',
  content: { img: {
    src: '图片url地址',
    mode: 'widthFix',
    itemStyle: '设置图片专有样式',
    itemClass: '设置图片的样式类'
  }}
}  
```

**设置内容区为图片组**  

```js
{
  title: '标签标题  ',
  content: { img: [
    { src: '图片url地址-1'},
    { src: '图片url地址-2'},
    { src: '图片url地址-3'},
  ]}
}
```

**设置内容区为复合类型**  

```js
{
  title: '标签标题  ',
  content: [
    {title: '子项一'},
    {img: {src: 'url'}},  // 图片为子项二
    {title: '子项三', img: {src ...}},  // 混合图文信息为子项
    ...
    ...
  ]
}
```

**设置该子项无效**  

```js
{
  title: '无效状态，不能点击',
  disabled: true
}
```

### 动态设置  

在一些场景中，我们需要异步更新折叠板中的内容，我们可以在配置中指定特征数据，通过tap方法来区分处理(更新，修改)  

设置特征值  

```js
mkCollapse({
  data: [
    { title: '点我我就无效', attr: {id: 'disabled'}},  // data-id === disable
    { title: '点我我就无效', attr: {id: 'change'}}, // data-id === change
  ],
  tap(e){
    let ct = e.currentTarget
    let ds = ct.dataset
    let id = ds.id
    if (id === 'disabled') {
      this.disabled(true)
    }
    if (id === 'change') {
      this.content('更新的内容') // 字符串

      // 更新对象
      // this.content({title: '', img: ''})

      // 更新数组
      // this.content([
      //   '内容子项一',
      //   {title: '内容子项二'}
      // ])  
    }
  }
})
```

**context方法**  
tap方法包含上下文(this)属性方法，方便设置点击对象的状态  

`context.disable`  
使点击对象无效  

`context.title`  
设置点击对象的标题，title由item元组价渲染生成  

`context.content`  
设置点击对象的内容，content由item元组价渲染生成，支持设置内容为字符串，数组，img等等复杂元素  
