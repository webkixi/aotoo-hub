# 使用说明

## list组件生成结构  

list有三种模式，可以通过`type`将列表设置为view、scroll-view和swiper-view三种类型

### 基础配置

```js
config = {
  listClass: 'boxer',
  itemClass: 'itemer',
  data: [
    // 子项会调用item组件生成
    {
      id: '1',
      title: '子项数据一',
      img: {src: '/images/demo.jpg', itemClass: 'img-class'},
      aim:'onAim'  // aim为catch:tap的别名，tap为bind:tap的别名
    }
  ]
}
```

生成如下结构  

```html
<view class="boxer" >
  <view class="itemer" catch:tap="onAim">
    <text>子项数据一</text>
    <image src="/images/demo.jpg" class="img-class"></image>
  </view>
</view>
```

### 配置为scroll-view

```js
config = {
  type: {
    'is': 'scroll',
    'scroll-y': true
    ... // 其他scroll-view的属性
  },
  data: [...]
}
```

生成如下结构  

```html
<scroll-view class="boxer" >
  <view class="itemer" catch:tap="onAim">
    <text>子项数据一</text>
  </view>
  <view class="itemer" catch:tap="onAim">
    <text>子项数据二</text>
  </view>
</scroll-view>
```

### 配置为swiper

```js
config = {
  type: {
    'is': 'swiper',
    'current'： 1，
    ... // 其他swiper-view的属性
  },
  data: [...]
}
```

生成如下结构  

```html
<swiper class="boxer" >
  <swiper-item>
    <view class="itemer" catch:tap="onAim">
      <text>子项数据一</text>
    </view>
  </swiper-item>
  <swiper-item>
    <view class="itemer" catch:tap="onAim">
      <text>子项数据二</text>
    </view>
  </swiper-item>
</swiper>
```

设置list组件的样式  
------------------

list会使用view/scroll-view/swiper作为包裹容器，配置将样式作用于这些容器之上

### 设置容器样式类

```js
config = {
  title: '标题',
  listClass: 'list-class-name',  // 设置样式类
}
```

### 设置内联样式  

```js
config = {
  title: '标题',
  listStyle: 'width: 100vw; height: 100vh;', // 设置内联样式
}
```

### 批量设置子项样式类

```js
config = {
  title: '标题',
  itemClass: 'item-class-name',  // 批量设置所有子项的样式  
}
```

为list配置子元素
------------------

### 设置子项数据(data)

使用data为list配置子项数据，通常情况下子项由item组件构建

```js
config = {
  data: [
    {title: '子项标题-1'},
    {title: '子项标题-2'},
    ...
  ]
}
```

### 设置头部(header)

头部(header)使用item组件生成，与data构建的列表同级  

```js
config = {
  header: {title: '头部'},
  data: [
    {title: '子项标题-1'},
    {title: '子项标题-2'},
    ...
  ]
}
```

### 设置底部(footer)

头部(footer)使用item组件生成，与data构建的列表同级  

```js
config = {
  header: {title: '头部'},
  data: [
    {title: '子项标题-1'},
    {title: '子项标题-2'},
    ...
  ],
  footer: {title: '底部'}
}
```

事件设置
------------------

### methods

```js
config = {
  listClass: 'list-class',
  data: [...],
  methods: {
    apiFun(){},
    apiFun1(){}
  }
}
```

### itemMethod批量设置子项事件  

将为每一个子项自动匹配对应的事件方法  

```js
config = {
  data: [
    {title: '子项-1'},
    {title: '子项-2'},
    ...
  ],
  itemMethod: {
    tap(e, param, inst){},  // bind:tap
    aim(){},  // catch:tap
    longpress(){},
    catchlongpress(){},
    touchstart(){},
    catchtouchstart(){}
    ...
  }
}
```

### 直接指定子项方法

```js
config = {
  data: [
    {
      title: '子项',
      tap(e){},  // 直接指定方法
      touchstart(e){}
    }
  ]
}
```

### 子项绑定tap事件方法一  

```js
config = {
  data: [
    {title: '子项-1', tap: 'onTap?id=1'}, // aim = catch:tap
    {title: '子项-2', tap: 'onTap?id=2'},
    ...
  ],
  methods: {
    onTap(e, param, inst) {
      let id = param.id
      console.log('====== id', id)
    }
  }
}
```

### 子项绑定tap事件方法二  

```js
config = {
  data: [
    {title: '子项-1', id: '1', tap(e, param, inst){
      let data = inst.getData()
      let id = data.id
      console.log('======= id', id)
    }},
    ...
  ]
}
```

### 子项绑定tap事件方法三  

```js
config = {
  data: [
    {title: '子项-1', id: '1'},
    {title: '子项-1', id: '2'},
    ...
  ],
  itemMethod: {
    tap(e, param, inst){  // aim = catch:tap
      let data = inst.getData()
      let id = data.id
      console.log('======= id', id)
    }
  }
}
```

## list组件数据处理  

### 追加(append)数据

```js
config = {
  ?id: 'list-uniq-id',
  data: [
    {title: '子项-1', id: '1'},
    {title: '子项-1', id: '2'},
    {title: '子项-3', id: '3'},
    ...
  ]
}

onReady(){
  let $list = this.getElementsByIds('list-uniq-id')
  
  // 追加数据
  $list.append([
    {title: '追加数据-1', img: {src: ''}}, //由item组件构建
    {title: '追加数据-2', img: {src: ''}},
  ])
}
```

### 前置(prepend)数据

```js
config = {
  ?id: 'list-uniq-id',
  data: [
    {title: '子项-1', id: '1'},
    {title: '子项-1', id: '2'},
    {title: '子项-3', id: '3'},
    ...
  ]
}

onReady(){
  let $list = this.getElementsByIds('list-uniq-id')
  
  // 前置追加数据
  $list.prepend([
    {title: '前置追加数据-1', img: {src: ''}}, //由item组件构建
    {title: '前置追加数据-2', img: {src: ''}},
  ])
}
```

### 插入(insert)数据

```js
config = {
  ?id: 'list-uniq-id',
  data: [
    {title: '子项-1', id: '1'},
    {title: '子项-1', id: '2'},
    {title: '子项-3', id: '3'},
    ...
  ]
}

onReady(){
  let $list = this.getElementsByIds('list-uniq-id')
  
  // 插入单个数据
  $list.insert({id: '3'}, {title: '插入数据-1'， img: {src: ''}} ) // 由item组件构建
  
  // 插入数组数据
  $list.insert({id: '3'}, [
    {title: '插入数据-1'， img: {src: ''}},
    {title: '插入数据-2'， img: {src: ''}},
  ]) // 由item组件构建
}
```

### 删除(delete)数据

```js
config = {
  ?id: 'list-uniq-id',
  data: [
    {title: '子项-1', id: '1'},
    {title: '子项-1', id: '2'},
    {title: '子项-3', id: '3'},
    ...
  ]
}

onReady(){
  let $list = this.getElementsByIds('list-uniq-id')
  
  // 插入单个数据
  $list.delete({id: '3'})
}
```

## 更新(update)子项数据  

### 方案一

```js
config = {
  data: [
    {title: '子项-1', id: '1'},
    {title: '子项-1', id: '2'},
    ...
  ],
  
  itemMethod: {
    tap(e, param, inst){  // aim = catch:tap, inst为子项的实例，子项由item组件构建
      let data = inst.getData()
      let id = data.id
      if (id === 2) {
        this.updateTitle(inst)  // 实际上可以直接修改，本例顺带说明methods定义的方法如何使用
      }
    }
  },
  
  methods: {
    updateTitle(inst){
      inst.update({title: '被修改的子项'})
    }
  }
}
```

### 方案二

```js
config = {
  data: [
    {title: '子项-1', id: '1'},
    {title: '子项-1', id: '2', tap(e, param, inst){
      inst.update({title: '被修改的子项'})
    }},
  ],
}
```

### 方案三

```js
config = {
  ?id: 'list-uniq-id',
  data: [
    {title: '子项-1', id: '1'},
    {title: '子项-2', id: '2'},
    ...
  ],
}

onReady(){
  let $list = this.getElementsById('list-uniq-id')
  setTimeout(()=>{
    $list.findAndUpdate({id: '2'}, {title: '新的标题'})  

    // 或者  

    $list.findAndUpdate({id: '2'}, function(res){
      // res为当前查找对象的完整数据，如果无匹配数据则res为空
      res.title = '新子项数据'
      this.update(res)
    })
  }, 2000)
  
  // 或者
  setTimeout(()=>{
    let res = $list.find({id: '2'})
    res.update({title: '新的标题'})
  }, 2000)
}
```

## 遍历list组件的所有子项  

### forEach遍历

forEach方法是同步方法，性能很高  

```js
config = {
  ?id: 'list-uniq-id',
  data: [
    {title: '子项-1', id: '1'},
    {title: '子项-2', id: '2'},
    ...
  ],
}

onReady(){
  let $list = this.getElementsById('list-uniq-id')
  $list.forEach(item=>{
    console.log(item)
    /*
    item === {
       treeid,  // 'String' 当前子项的treeid，自动生成的唯一id，可据此id操作list组件的数据项(增删改查)
       index,  // 'Number' 当前子项的下标
       getData, // 'Function' 获取当前子项的数据
       reset, // 'Function' 重置当前子项
       parent, // 'Function' 查找子项的父级
       css,  // 'Function' 设置当前子项的内联样式
       toggleClass, // 'Function' 切换当前子项的样式
       addClass,  // 'Function' 追加当前子项的样式
       removeClass, // 'Function' 移除当前子项的样式
       hasClass,  // 'Function' 是否有样式类
       update,  // 'Function' 更新当前子项的数据
       show,  // 'Function' 显示当前子项
       hide,  // 'Function' 隐藏当前选项
       remove,  // 'Function' 删除当前子项
       siblings // 'Function' 当前子项的兄弟节点
     }
    */
  })
}
```

## 补充说明

### methods的__ready方法  

methods用于定义list组件的内部方法，__ready方法比较特殊，会在组件mounted后自动执行  

```js
config = {
  title: '标题',
  methods: {
    __ready(){
      console.log('===== 0000')
    }
  }
}
```  
