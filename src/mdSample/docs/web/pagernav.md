## Pager.nav

`Pager.nav`是一个对象，该对象包含下面路由方法，路由方法的设计参考自小程序

- navigateTo
- navigateBack
- redirectTo
- redirectBack
- reLaunch

```js
const nav = Pager.nav

nav.navigateTo(...)
nav.relaunch(...)
...
```

### reLaunch

关闭所有页面，打开到应用内的某个页面  

参数
Object object  

| 属性 | 类型 |  默认值 |  必填 |  说明 |
| :----: | :----: |  :----: |  :----:  |  :----  |
| url | string |  |  是  | 跳转的应用内页面路径  |
| beforeNav | function |  |  否  | 跳转前动作  |
| success | function |  | 否 | 未实现，暂无使用场景 |
| fail | function | | 否 | 未实现，暂无使用场景 |
| complete | function |  | 否 | 未实现，暂无使用场景 |
| events | object |  | 否 | 未实现，暂无使用场景 |

#### url

需要跳转的应用内页面的路径 (代码包路径), 路径后可以带参数。参数与路径之间使用 ? 分隔，参数键与参数值用 = 相连，不同参数用 & 分隔；如 'path?key=value&key2=value2'

#### beforeNav(to, from, next)

跳转前方法，该方法可阻止跳转
`to`  
{Object}  
将要跳转的目的页面的配置  

`from`  
{Object}  
当前页面的配置  

`next`  
{Function}  
`next(param)`: param将被合并到to的参数中，允许修改将要跳转页面页面参数
允许跳转  

```js
onClick(e, param, inst){
  nav.redirectTo({
    url: '/index/a?file=' + file,
    beforeNav(to, from, next) {
      if (满足条件) {
        next()
      }
    }
  })
}
```

### navigateTo  

保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。使用 wx.navigateBack 可以返回到原页面。小程序中页面栈最多十层

配置参考 reLaunch

### navigateBack

关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages 获取当前的页面栈，决定需要返回几层。  

配置参考 reLaunch

### redirectTo

关闭当前页面，跳转到应用内的某个页面。  

配置参考 reLaunch

### redirectBack

关闭当前页面，返回上一页面  

配置参考 reLaunch
