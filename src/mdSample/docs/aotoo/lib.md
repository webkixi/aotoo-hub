# 助手方法  

助手方法摘取了lodash的一部分，同时又包含一些自定义的方法，如果要使用loadsh的完整方法，可以在项目中自行引入lodash  

引入
------------------

```js
import {lib} from '@aotoo/aotoo'
```

`uniqueId`  
请参考loadash  

`isString`  
请参考loadash  

`isBoolean`  
请参考loadash  

`isEmpty`  
请参考loadash  

`isRegExp`  
请参考loadash  

`isSymbol`  
请参考loadash  

`isNumber`  
请参考loadash  

`isArray`  
请参考loadash  

`isObject`  
请参考loadash  

`isPlainObject`  
请参考loadash

`isFunction`  
请参考loadash  

`merge`  
请参考loadash  

`find`  
请参考loadash  

`findIndex`  
请参考loadash  

`clone`  
请参考loadash  

`cloneDeep`  
请参考loadash  

自定义部分  
------------------

`isPromise`  
是否Promise对象  

`isClass`  
方法是否为一个class  

`isDomElement`  
是否原生dom  

`isReactNative`  
当前环境是否为react native，(未测试)  

`isClient`  
是否为前端环境  

`isNode`  
是否为node端环境  

`curContext`  
返回当前环境的全局对象，前端返回window，node端返回global

`sizeof`  
对象大小，可以判断object和array  

```js
let obj = {
  a: 1, b: 2
}

sizeof(obj)  // 2

let obj1 = [1,2]
sizeof(obj1)  // 2

```

`forEach`  
自定义forEach方法，有点类似于JQ的foreach

```js
const obj = [
  {title: '11'},
  {title: '22'},
]

forEach(obj, function(item, ii){
  console.log(item, ii)  // {title: '11'}  0
})

const obj1 = {
  a: 1, b: 2
}

forEach(obj, function(item, ii, key){
  console.log(item, ii, key)  // 1  0  a
})

```

`toArray`  
arguments转为array  

`noop`  
空方法  

`urlTOquery`  
url字符串转成Object  

```js
let urlString = 'http://www.abc.com/index?name=mike&age=18'
let obj = urlTOquery(urlString)
console.log(obj)  // {url: http://www.abc.com/index, query: {name: 'mike', age: 18}}
```

`queryTOurl`  
Object转为url  

```js
let urlString = 'http://www.abc.com/index'
let body = {name: 'mike', age: 18}
let url = queryTOurl(urlString)
console.log(url)  // http://www.abc.com/index?name=mike&age=18
```

`strlen`  
计算字符串长度，可以同时统计中文，英文，默认中文字符为2个英文字符长度  

```js
let len = strlen('你好hello')
console.log(len)  // 9

// unicode编码中中文占3个字符位
let len = strlen('你好hello', true)
console.log(len)  // 11
```

`subcontent`  
截取字符串，支持中文截取  

```js
let content = '你好,hello。。。。。'
subcontent(content, 10)

// 截取字符串并加上省略号 ...
subcontent(content, 10, true)
```
