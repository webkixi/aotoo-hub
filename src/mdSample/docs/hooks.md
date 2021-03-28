# 钩子系统  

在WEB或者小程序的开发中，如果引入了aotoo库，则可以使用aotoo库所带的钩子系统，不同于react hooks系统，aotoo的钩子系统比较贴近传统钩子系统的使用方式，但也是非常强大和好用

aotoo的钩子系统包含`数据处理`、`消息处理`两个部分，`数据处理`部分我们引入了localStorage的理念并融合了LRU的理念，`消息处理`部分则比较接近JQUERY的事件订阅、消费等使用方式

aotoo的组件开发中，我们较深入的使用了钩子系统。下面以小程序的DEMO说明钩子的使用方法，在web项目中，使用方法，api调用方法均与小程序一致

**云钩子**  
关于云钩子系统，是我们针对小程序云数据库开发的钩子系统，用于操作云端数据的增删改查，请关注我们的说明文档

## 创建钩子

```js
import {lib} from '@aotoo/aotoo';
const lib = core.lib  
const hooks = lib.hooks  

// 内存钩子
const hookInst = hooks(‘hooks-name’)

// 内存及storage钩子
// 将数据存在内存，并同时存在localStorage，有持久性
const hookInst = hooks(‘hooks-name’, true)
```

**内存钩子**  
内存钩子的概念主要是针对数据处理部分，当刷新页面，则数据丢失，适用于SPA等项目

**实体钩子**  
实体钩子的概念主要是针对数据处理部分，我们会将setItem后的数据存储在localstorage中(支持超时设置)，刷新页面不影响数据读取

## 数据操作

数据操作的API主要参考localstorage，几乎没有学习成本。主要用于数据的增删改查

```js
// 使用钩子存储数据
// 存储数据
hookInst.setItem(key, val, expire)  // 以毫秒计

// 获取数据
hookInst.getItem(key)

// 获取所有数据
hookInst.getInfo()  // 返回该实例所有存储的数据或所有storage数据

// 追加数据
hookInst.append(key, val) // 追加数据，仅限JSON/ARRAY类型数据可以被追加

// 删除指定数据
hookInst.delete(key) // 删除某条数据

// 清除数据
hookInst.clear() // 强力删除数据，并等待内存回收

// 销毁钩子
hookInst.destory()  // 只是清除内存数据，并等待内存回收

```

### 数据操作的例子  

```js
// JSON类数据
hookInst.setItem('one', {title: '标题'}) // 初始化数据
hookInst.append('one', {name: '张三'})  // => {title, name}
hookInst.append('one', '李四')  // => {title, name: '张三', rndKey: '李四'}
hookInst.getItem('one') => // => {title, name}
hookInst.delete('one') // => null

// 数组型
hookInst.setItem('one', ['a']) // 初始化数据
hookInst.append('one', {name: '张三'})  // => ['a', {name: '张三'}]
hookInst.getItem('one') => // => ['a', {name: '张三'}]
hookInst.delete('one') // => null

// 其他类型数据
// append无效
hookInst.setItem('one', '你好') // 初始化数据
hookInst.getItem('one') => // => 你好
hookInst.delete('one') // => null
```

打开`f12`的application，可以看到数据被存进了storage

## 订阅、发布系统

```js

// 使用钩子实现订阅、消费方法
// 设置订阅方法
hookInst.on(key, func)

// 反向订阅方法
hookInst.reverseOn(key, func)

// 取消钩子方法
hookInst.off(key, fn)

// 设置一次性订阅方法，执行后自动销毁
hookInst.one(key, func)

// 设置一次性方法，该钩子始终只有一种订阅方法
hookInst.once(key, func)

// 批量执行订阅方法，允许多次执行
hookInst.emit(key, param, context)

// 批量执行订阅方法，执行完成后，销毁该钩子上的所有订阅方法
hookInst.fire(key, param, context)
```

### 订阅、消费的例子

```js
// 恒有效的钩子方法
hookInst.on('oneFun', function1) //挂载钩子方法
hookInst.on('oneFun', function2)
hookInst.on('oneFun', function3)

// 用完即删的方法，通过one来挂载
hookInst.one('oneFun', function4)

// 只允许挂一个方法，最后进入的方法会被执行
hookInst.once('twoFun', function5)
hookInst.once('twoFun', function6)
hookInst.once('twoFun', function7) // => 只有我才会被执行

hookInst.emit('oneFun', {...}, context) // 无序遍历执行function1,2,3,4
hookInst.emit('twoFun', {...}) // 只有function7被执行
```

`emit`方法只允许传递一个JSON类数据, context是钩子方法执行的上下文(默认为null)

### fire

```js
// 恒有效的钩子方法
hookInst.on('oneFun', function1) //挂载钩子方法
hookInst.on('oneFun', function2)
hookInst.on('oneFun', function3)
hookInst.one('oneFun', function4)

hookInst.fire('oneFun', {...}, context) // 遍历function1,2,3,4，所有方法用完即删
```

`fire`方法只允许传递一个JSON类数据, context是钩子方法执行的上下文(默认为null)

## 数据缓存及数据过期  

```js
hookInst.setItem('names', {name: '', sex: ''}, 24*60*60*1000)
setTimeout(()=>{
  let namesData = hookInst.getItem('names')
  console.log(namesData)  // {name: '', sex: ''}
},3000)
```

## LRU缓存设置  

小程序本地缓存10M，内存128M，因此数据缓存到本地受到很多限制，比如图片，需要使用LRU缓存机制来对图片/文件进行管理  

```js
const hookInst = lib.hooks('IMG-ENTITY', {
  localstorage: true,  // 开启本地缓存
  expire: 24 * 60 * 60 * 1000,  // 过期时间为1天，所有缓存的数据
  max: 50 // 最大缓存数为50条，即当前hooks实例只会存储最常用的50条数据
})

onReay(){
  // 将用户信息缓存一天
  // img-src => 图片的具体地址或者一个唯一地址
  // 挂载一个方法，当该钩子存储数据时
  hookInst.setItem('image-src', {img: 'cloude://....'})
  saveImgToLocal('cloude://...')
  setTimeout(()=>{
    let imgsData = hookInst.getItem('image-src')
    console.log(imgsData)  // {img} || undefined
    if (!imgsData) {
      hookInst.setItem('image-src', {img: 'cloude://....'})
      saveImgToLocal('cloude://...')
    }
  },3000)
}
```
