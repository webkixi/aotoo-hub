
# list元组件api方法

__获取list实例__  

```js
import {render} from '@aotoo/aotoo'
const config = {
  data: [
    { title: '格子前端', onClick: 'respClick?user=jack' }
  ],
  methods: {
    respClick(e, param, inst) {
      console.log(param)
    }
  }
}
const listInst = ui_list(config)
render(<listInst.UI />, 'root')
```

设置事件  
-----------------

`支持字符串绑定事件`  
类似于小程序的事件绑定  

```js
const config = {
  data: [
    { title: '格子前端', onClick: 'respClick' }
  ],
  methods: {
    respClick(e, param, inst) {
      console.log(param)
    }
  }
}

// 带参事件
const config = {
  data: [
    { title: '格子前端', onClick: 'respClick?user=jack' }
  ],
  methods: {
    respClick(e, param, inst) {
      console.log(param)  // {user: 'jack'}
    }
  }
}
```  

`支持绑定方法`  

```js
const config = {
  data: [
    {
      title: '格子前端',
      onClick(e, param, inst){
        console.log(e)
      }
    }
  ],
}
```

`支持批量绑定方法`  
下列配置将批量为所有子元素设置事件

```js
const config = {
  data: [
    { title: '格子前端' },
    { title: '格子前端1' },
    { title: '格子前端2' },
  ],
  itemMethod: {
    onClick(e, param, inst){
      console.log(e)
    }
  }
}
```

## 事件对应表  

__支持REACT所有事件__  

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

### 响应方法

上例中`onTap`为响应方法  

__e__  
原生event

__param__  
事件方法传递的query参数  

__inst__  
事件触发的主体，此处为item组件的实例  
