# 约定

## 命名约定

* `_`  
`_`下划线开始的文件和目录，如`_a.js` 或者 `/_a/`在编译时会自动忽略不会生成对应的文件，但你可以引入该文件，或者该目录下的文件

* `-`  
不要以`-`中划线命名文件，如`a-b.js`  

## vendors

vendors目录的文件会输出成`dist/vendors.js`，该文件会被前端和`node`端分别调用，因此需要注意对于两端的兼容性写法

### 正确的写法

/js/vendors/index.js  

```js
  function isClient(){
    return typeof window === 'undefined'
  }

  function getGlobalContext(){
    if (isClient()) {
      return window
    }
    return global
  }

  let context = getGlobalContext()

  context.a = '123'

  context.axios = function(){}

  if (isClient()) {
    /* 前端代码 */
  } else {
    /* node端代码实现 */
  }

```
