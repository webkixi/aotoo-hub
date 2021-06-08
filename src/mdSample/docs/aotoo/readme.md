# AOTOO

AOTOO是一套基于REACT的前端基础库，将REACT组件封装为JS对象，通过操作该对象的API渲染组件及控制组件状态。  
适用于WEB项目，RN项目。  

QUERYUI 基础库是AOTOO基础库的小程序实现  

[AOTOO源码](https://www.github.com/webkixi/aotoo)

INSTALL
------------------

```bash
yarn add react react-dom
yarn add @aotoo/aotoo

# 或者
npm install react react-dom
npm install @aotoo/aotoo
```

## 基础组件  

基础组件(ITEM, LIST, TREE)是AOTOO的核心组件，基于这些核心组件可以很方便实现、扩展其他组件。基于小程序的`QUERYUI`基础库具有同样的核心组件

**一个ITEM的例子**  

```js
const itemData = {
  title: '标题'
}
const itemInstance = ui_item(itemData)
ReactDOM.render(<itemInstance.UI />, document.getElementsById('root'))

/*
生成结构大致如下
<div id='root'>
  <div class='item'>
    <span>标题</span>
  </div>
</div>
*/
```

**一个LIST的例子**  

```js
const listData = {
  data: [
    {title: '数据项-1'},
    {title: '数据项-2'},
    {title: '数据项-3'},
  ]
}
const listInstance = ui_list(listData)
ReactDOM.render(<listInstance.UI />, document.getElementsById('root'))

/*
生成结构大致如下
<div id='root'>
  <div class='list-box'>
    <div class='list-item'>...</div>
    <div class='list-item'>...</div>
    <div class='list-item'>...</div>
  </div>
</div>
*/
```

**一个TREE的例子**  

```js
const treeData = {
  data: [
    {title: '数据项-1', idf: 'aaa'},
    {title: '数据项-2', parent: 'aaa'},
    {title: '数据项-3', parent: 'aaa'},
  ]
}
const treeInstance = ui_tree(treeData)
ReactDOM.render(<treeInstance.UI />, document.getElementsById('root'))

/*
生成结构大致如下
<div id='root'>
  <div class='tree-box'>
    <div class='tree-item' data-idf="aaa">
        <div class='sub-item'>...</div>
        <div class='sub-item'>...</div>
    </div>
  </div>
</div>
*/
```

## 组件开发  

### 自定义组件

```js
import aotoo from '@aotoo/aotoo'

const template = (state, props) => {
  return (
    <div className='counter' onClick={this.inc}>{state.count}</div>
  )
}

const config = {
  data: { count: 0 },
  inc(){
    let count = this.getData().count
    this.setData({(count++)})
  }
}

const Count = createComponent(config, template)

ReactDOM.render(<Count.UI />, document.getElementById('root'))
```

### 自定义组件(仿小程序)

```js
import createComponent from '@aotoo/aotoo'

const countTemplate = function (state, props) {
  return <div className={"container"}>{state.count}</div>;
};

const countConfig = {
  data: {
    count: 0
  },
  increase() {
    let count = this.getData().count;
    count++;
    this.setData({ count });
  }
};

let count = createComponent(countConfig, countTemplate);

ReactDOM.render(<count.UI />, document.getElementById('root'))
```

### 内嵌化组件

```js
import {extTemplate} from '@aotoo/aotoo'
extTemplate({
  "@md": function(string){
    let markdownContent = marked(value);
    return (
      <View className="markdown-section" dangerouslySetInnerHTML={{ __html: markdownContent }}></View>
    )
  }
})

const itemData = {
  "@md": `# 内嵌组件可以在ITEM组件配置中直接使用`
}

const itemInsance = ui_item(itemData)
ReactDOM.render(<itemInsance.UI />, document.getElementsById('root'))

/*
生成结构大致如下
<div id='root'>
  <div class='item'>
    <div className="markdown-section">
      <H1>内嵌组件可以在ITEM组件配置中直接使用</H1>
    </div>
  </div>
</div>
*/
```

通用属性
------------------

| 属性      |    类型 | 说明  |
| :-------- | :--------: | :-- |
| $$id  | String |  类似于$('#id')的id  |
| created      |   Function | 生命周期，同小程序组件 |
| attached      |   Function | 生命周期，同小程序组件 |
| ready      |   Function | 生命周期，同小程序组件 |
| didUpdate      |   Function | 每次更新后触发 |
| methods      |   Object | 定义API方法 |

通用API
------------------

| 方法      |    类型 | 说明  |
| :-------- | :--------: | :-- |
| parent      |   (p) | 查找父级 |
| getData      |   () | 获取元素数据 |
| show      |   () | 显示该组件 |
| hide      |   () | 隐藏该组件 |
| destory      |   () | 销毁该组件 |
| render      |   (p) | 渲染组件，与直接写jsx一致 |
| attr |  (p1, p2) |  设置/获取data-*属性 |
