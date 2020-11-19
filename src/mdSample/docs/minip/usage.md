# 使用说明

## 一个ITEM就是一个View

item组件会自动生成view包裹里面的内容  

### 示例一  

空item

```js
config = {
  itemClass: 'boxer'
}
```

生成如下  

```html
<view class="boxer"></view>
```

### 示例二

带标题item

```js
config = {
  title: '123'
  itemClass: 'boxer'
}
```

生成如下  

```html
<view class="boxer">
  <text>123</text>
</view>
```

### 示例三

带点击事件

```js
config = {
  title: '123'
  itemClass: 'boxer',
  aim: 'onAim?id=xxx' // aim为catch:tap的别名, tap为bind:tap的别名
}
```

生成如下  

```html
<view class="boxer" catch:tap="onAim?id=xxx">
  <text>123</text>
</view>
```

### 示例四

body结构

```js
config = {
  title: '123'
  itemClass: 'boxer',
  aim: 'onAim?id=xxx', // aim为catch:tap的别名, tap为bind:tap的别名
  body: [
    {
      title: 'sub-title-123',
      itemClass: 'sub-boxer',
      tap: 'onSubTap'
    }
  ]
}
```

上例生成如下  

```html
<view class="boxer" catch:tap="onAim?id=xxx">
  <text>123</text>
  <view class='hbody'>
    <ui-item>
      <view class='sub-boxer' bind:tap="onSubTap">
        <text>sub-title-123</text>
      </view>
    </ui-item>
  </view>
</view>
```

<hr class="hr-mt40" />

设置item样式  
---------------

item由view组件构建而成，样式被应用在view上

```js
config = {
  title: '标题',
  itemClass: 'class-name',  // view容器的样式类
  itemStyle: 'color: red; font-size: 18px;' // view容器的内联样式
}
```

设置title
---------------

设置标题，段落

### 设置标题  

```js
config = {
  itemClass: 'class-name',  // view容器样式类  
  title: '标题',
}
```

### 定制标题样式

```js
config = {
  itemClass: 'class-name' // view容器样式类，作用于item容器view上  
  title: {
    title: '标题',
    itemClass: 'class-name-sub'  // class-name-sub直接作用于标题的容器view上
  },
}
```

### 标题组

```js
config = {
  itemClass: 'class-name' // view容器样式类，作用于item容器view上  
  title: [
    '标题-1',
    '标题-2'
  ]
}
```

### 定制标题组

```js
config = {
  itemClass: 'class-name' // view容器样式类，作用于item容器view上  
  title: [
    {title: '标题', itemClass: 'title-caption'},
    {title: '描述', itemClass: 'title-descript'},
  ]
}
```

### 嵌套item使用

```js
config = {
  itemClass: 'class-name',
  title: {   // title为object时，由item组件重新构建
    title: '标题',
    itemClass: 'class-name-sub'
  },
}

// title由数组构建时
config = {
  itemClass: 'class-name' // view容器样式类，作用于item容器view上  
  title: [
    '标题',  // text构建
    {title: '标题', itemClass: 'title-caption'},  // 由item组件构建
    {title: '描述', itemClass: 'title-descript'}, // 由item组件构建
  ]
}
```

设置超链
---------------  

当设置`url`属性后，使用navigate来构建item组件  
> 注意query和hash的区别，这里将hash转换为navigate的配置参数
> url需要配合title一起使用  
> 不支持extra-data参数

url与title组合，queryui内核会自动将其转化为navigator标签，可以用来做跳转链接

### 小程序内跳转链接  

```js
config = {
  title: '跳转到B页'
  url: '../demos/b'
}
```

### 带参数跳转

```js
config = {
  title: '跳转到B页'
  url: '../demos/b?id=xxx&usr=yyy'
}
```

### 小程序间跳转

```js
config = {
  title: '标题',
  url: '#target=miniProgram&app-id=xxx&path=???'
}
```

### 通过hash设置navigator的参数

```js
config = {
  title: '跳转到B页'
  url: '../demos/b?id=xxx&usr=yyy#app-id=xxxx&hover-class=???'
}
```  

> 注意：不能设置extra-data参数，只能够设置字符串/数字/布尔类型的参数

设置图片
---------------

通过img属性，我们可以为item添加图片、图片组

### 一般设置

```js
config = {
  img: '/images/xxx.jpg'
}
```

### 定制图片

```js
config = {
  itemClass: 'item-class',  // 定制item的view容器样式类
  img: {
    src: '/images/xxx.jpg',
    itemClass: 'img-class',  // 为image指定独立的样式类名
    mode: 'widthFix',
    ...  // 更多原生images组件的参数配置
  }
}
```

### 图片组  

```js
config = {
  img: [
    {src: '/images/xxx.jpg'},
    {src: '/images/yyy.jpg'},
    {src: '/images/zzz.jpg'},
  ]
}
```

配置data-*属性  
---------------  

设置`attr`属性

```js
config = {
  title: '标题',
  attr: {
    id: 'attr-id', // 作为data-id
    more: '...' // 不会在wxml结构上显示  
  }
}
```

注意: 只有`attr.id`属性作为参数显示在wxml的结构上，其他属性可以通过实例方法`instance.attr()`获取

定义item事件
---------------  

```js
config = {
  title: '标题',
  tap(e, param, inst){  // tap=bind:tap, aim=catch:tap, 其他事件方法与官方一致  
    // param 在这里没有用到
    console.log(inst)  // inst为item组件本身实例
  }
}
```

定义组件内方法  
---------------  

设置`methods`属性，可以定义组件内的方法

```js
config = {
  title: '标题',
  tap: 'onTap?id=xxx&name=yyy',
  methods: {
    onTap(e, param, inst){
      console.log(param)  // {id: 'xxx', name: 'yyy'}
      console.log(inst)  // 为item实例本身
    },
    funName(){}, //实例api方法
    funName1(){}, //实例api方法
  }
}
```

获取实例
---------------

设置`?id`值，可以在Pager环境中取到ITEM实例

```js
config = {
  ?id: 'item-uniq-id'
}

Pager({
  onReady(){
    let instance = this.getElementsById('item-uniq-id')
    console.log(instance)
  }
})
```
