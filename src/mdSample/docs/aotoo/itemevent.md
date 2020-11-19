
# item元组件api方法

获取item实例  
-----------------

```js
import {render} from '@aotoo/aotoo'
const config = {
  title: '格子前端',
  onClick: 'respClick?user=mike',
  methods: {
    respClick(e, param, inst) {
      console.log(param)
    }
  }
}
const itemInst = ui_item(config)
render(<itemInst.UI />, 'root')
```

设置事件  
-----------------

`支持字符串绑定事件`  
类似于小程序的事件绑定  

```js
const config = {
  title: '格子前端',
  onClick: 'responseClick',
  methods: {
    responseClick(){}
  }
}

// 支持带参事件绑定
const config = {
  title: '格子前端',
  onClick: 'responseClick?id=jack',
  methods: {
    responseClick(e, param, inst){console.log(param)} // {id: 'jack'}
  }
}
```  

`支持绑定方法`  

```js
const config = {
  title: '格子前端',
  onClick(e, param, inst){
    console.log(e)
  }
}
```

事件对应表
-----------------

__支持REACT所有事件__  

__小程序对应事件__
兼容小程序事件名，内部转换为react对应事件

| 事件名| 对应原生事件名 |
| :-: | :-: |
| tap | tap |
| aim |  catch:tap |
| longpress |  bind:longpress |
| longtap |  bind:longtap |
| catchlongpress |  catch:longpress |
| catchlongtap |  catch:longtap |
| touchstart |  bind:touchstart |
| touchmove |  bind:touchmove |
| touchend |  bind:touchend |
| touchcancel |  bind:touchcancel |
| catchtouchstart |  catch:touchstart |
| catchtouchmove |  catch:touchmove |
| catchtouchend |  catch:touchend |
| catchtouchcacel |  catch:touchcacel |

## 响应方法

上例中`onTap`为响应方法  

__e__  
原生event

__param__  
事件方法传递的query参数  

__inst__  
事件触发的主体，此处为item组件的实例，可以调用实例方法，修改自身状态  
