
# item元组件api方法

__获取item实例__  

```js
Pager({
  data: {
    itemData: {title: '标题', $$id: 'xxx', itemClass: 'item-class', tap: 'onTap?user=lili'}
  },
  onTap(e, param, inst){
    console.log(param) // user=lili
  },
  onReady(){
    let itemInst = this.getElementsById('xxx')
  }
})
```

## 事件对应表

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
事件触发的主体，此处为item组件的实例  
