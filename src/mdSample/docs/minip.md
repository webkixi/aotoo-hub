# hub的小程序  

hub的小程序DEMO(xcxSample)基于小程序原生开发，使用webpack4进行编译，输出文件可直接使用小程序IDE编辑器直接打开  

> 在github中搜索 aotoo-xquery  

## queryUI  

使用`aotoo create`新建的小程序项目默认包含自带的小程序库`queryUI`，可以替换使用自己的库文件，保持目录结构即可正常编译使用(目录结构与小程序官方一致)

`queryUI`是一套我们内部项目孵化而出的小程序核心库(基于原生小程序)，其使用体验与aotoo-web项目一致(自带文档系统)，我们糅合了一些jQuery特性及一些方便好用的特性，用于简化小程序开发成本及帮助后期能更好的维护项目  

__自带基础组件__  

* markdown
* html
* from
* item
* list
* tree

__更多组件__  

* 多形态日历组件
* 通用型筛选列表
* 弹窗组件
* 评分组件
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

`queryUI`支持外挂组件， 能够方便扩展自定义组件

### 如何引入queryUI  

`queryUI`基于微信小程序的原生库，不影响小程序原生开发使用，引入核心库文件后就能方便的引入queryUI的组件  

### 引入核心目录/文件  

```bash
components
  ├─ aotoo 核心代码必须有 ✔︎
  ├─ form  表单组件 ✔︎
  ├─ markit  文档组件 ✔︎
  ├─ modules ✔︎  # 该目录下的文件为组件合集，视需求选择
  ├─ templates 模板 ✔︎  
```

### 在app.json中定义全局组件  

```json
"usingComponents": {
  "ui-item": "/components/aotoo/item/index",
  "ui-list": "/components/aotoo/list/index",
  "ui-tree": "/components/aotoo/tree/index",
  "ui-form": "/components/form/index",
  "ui-markit": "/components/markit/index"
}
```

## 使用体验

### Pager

Pager是对于小程序原生Page的封装, Demo代码中有大量Pager的相关使用，需要注意正确的使用方式  

该方法与Page的使用逻辑，用法均保持一致，因此可以使用Pager代替Page使用，
queryUI的组件需要在Pager的环境中才能生效

```js
const Pager = require('../../components/aotoo/core/index')
Pager({
  data: {},
  onLoad(){},
  onReady(){}
})
```

### 超级组件  

基于模板less的原则，开发中尽量减少模板的开发，将逻辑，交互，渲染，配置等交给JS来实现  

#### 超级组件item

item是核心元组件，支持输出非常丰富的结构  

wxml

```html
<ui-item item="{{itemConfig}}" />
```

js  

```js
Pager({
  data: {  
    // item组件的基础配置
    itemConfig: {
      $$id: {String} // item组件实例化后查找id
      title: {String|Array|{Object}},  // 标题，标题组
      img: {String|Array|Object},  // 图片，图组
      itemClass: {String} // item样式  
      body: {Array}  // body子容器，item集合
      footer: {Array} // footer子容器，item集合
      dot: {Array} // dot子容器，item集合
      tap: {String|Function}  // bind:tap方法
      aim: {String|Function} // catch:tap方法
      longpress: {String|Function} // bind:longpress方法
      catchlongpress: {String|Function} // catch:longpress方法
    }
  }
})
```

#### 超级组件list

list是核心元组件，该组件基于item元组件构建而成  

wxml  

```html
<ui-list list="{{listConfig}}" />
```

js  

```js
Pager({
  data: {  
    // list组件的基础配置
    listConfig: {
      $$id: {String} // list组件实例化后查找id
      listClass: {String} // 列表样式  
      itemClass: {String} // 列表项样式  
      header: {Object} // item配置
      footer: {Object} // item配置
      data: {Array} // 列表项数据配置，item集合
      itemMethod: {Object} // 自动为列表项绑定方法，支持(tap, aim, longpress...)
      methods: {Object} // 设置list实例对象的内部方法
    }
  }
})
```

#### 超级组件tree

该组件基于list组件构建而成，在扁平化的数据结构的基础上，能够输出层次化的结构
tree元组件配置如同list元组件

wxml  

```html
    <ui-tree list="{{treeConfig}}" />
```

js  

```js
Pager({
  data: {  
    // list组件的基础配置
    treeConfig: {
      $$id: {String} // list组件实例化后查找id
      listClass: {String} // 列表样式  
      itemClass: {String} // 列表项样式  
      header: {Object} // item配置
      footer: {Object} // item配置
      data: {Array} // 列表项数据配置，item集合
      itemMethod: {Object} // 自动为列表项绑定方法，支持(tap, aim, longpress...)
      methods: {Object} // 设置list实例对象的内部方法
    }
  }
})
```

#### 内嵌组件  

内嵌组件不需要额外引入模板，直接嵌入在其他组件中使用的组件，内嵌组件基于寻址算法，会自动处理父子级的组件关系，比如子级使用父级定义的方法，或者`Page`中定义的方法
下列是常用的内嵌组件  

1. @item
2. @list
3. @tree
4. @url
5. @md
6. @html
7. @form

比如我们在`item组件`中需要引入一个`列表组件`  

wxml

```html
<ui-item item="{{itemConfig}}" />
```

js

```js
Pager({
  data: {
    itemConfig: {
      title: '列表标题',
      "@list": {
        listClass: 'list-class-name'
        data: [...]
      }
    }
  }
})
```

### 如何在Pager中查找组件实例并使用其API方法  

```js
Pager({
  data: {
    item: {/* item配置*/},  // $$id = 'abc'
    list: {/* list配置*/}  // $$id = 'xyz'
  }
  onReady(){
    let abc = this.getElementsById('#abc')
    abc.update({title: '新标题'})

    let xyz = this.getEelementsById('#xyz')
    xyz.forEach(item=>{
      // item.addclass/removeClass/hasClass/css/update... 等类jquery的API方法
    })

    this.find('.class-name').addClass('other-class-name') // 批量追加类名
  }
})
```

#### 更多demo请关注小程序

![xquery](http://www.agzgz.com/imgs/xquery.png#mode=aspectFit)
