
# list元组件api方法

__获取list实例__  

```js
Pager({
  data: {
    listData: {
      $$id: 'xxx',
      data: [
        {title: '标题', tap: 'onTap?user=mike'}
      ],
      listClass: 'list-class',
    }
  },
  onTap(e, param, inst){
    console.log(param) // user=mike
  },
  onReady(){
    let listInst = this.getElementsById('xxx')
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

### 响应方法

上例中`onTap`为响应方法  

__e__  
原生event

__param__  
事件方法传递的query参数  

__inst__  
事件触发的主体，此处为item组件的实例  

## 批量设置事件

```js
Pager({
  data: {
    listData: {
      $$id: 'xxx',
      data: [
        {title: '标题', attr: {...}},
        {title: '标题', attr: {...}},
        {title: '标题', attr: {...}},
      ],
      listClass: 'list-class',
      itemMethod: {
        // 为每一个子项设置tap方法
        tap(e, param, inst){
          console.log(e)
        }
      }
    }
  },
  onReady(){
    let listInst = this.getElementsById('xxx')
  }
})
```
