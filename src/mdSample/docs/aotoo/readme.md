# aotoo

aotoo希望将REACT组件封装成类似JQ组件，即通过曝露的API方法能够在组件外很容易更新组件状态，而不需要引入redux，mobx等状态库。

文档系统的路由与菜单都是基于aotoo完成的组件  

[GITHUB源码](https://www.github.com/webkixi/aotoo)

INSTALL
------------------

```bash
yarn add @aotoo/aotoo
# 或者
npm install @aotoo/aotoo
```

作用
------------------

封装react组件，并将其实例化，aotoo有3种封装方式  

1. 封装原生react组件  
2. 封装配置生成组件(仿小程序)
3. 封装JSX，获取其真实dom，使用jquery等第三方库作用(非实例)

### 引入

```js
import createComponent, {
  lib,
  $$,
  extTemplate,
  render
} from '@aotoo/aotoo'

const hooks = lib.hooks
```

`lib`  
包含loadash等助手方法  

`$$`  
查找aotoo的组件，使用aotoo封装的REACT组件，可通过此方法查找组价实例  

`render`  
该方法可使用与前端与node端，在前端替代`ReactDOM.render`方法，在Node端替代`ReactDomServer.renderToString`

`extTemplate`  
扩展内置组件方法  

`hooks`  
钩子方法类  

### 简单组件

```js
import createComponent, {render} from '@aotoo/aotoo'

const template = (state, props) => {
  return (
    <div className='container'>
      <div className='counter'>{state.count}</div>
      <div className='button' onClick={this.env.inc}>+1</button>
    </div>
  )
}

const config = {
  data: {
    count: 0
  },
  inc(){
    let count = this.getData().count
    count ++
    this.setData({count})
  }
}

const Count = createComponent(config, template)

render(<Count.UI />, 'root')
```

通用属性
------------------

| 属性      |    类型 | 说明  |
| :-------- | :--------: | :-- |
| $$id  | String |  类似于$('#id')的id  |
| created      |   Function | 生命周期，同小程序组件 |
| attached      |   Function | 生命周期，同小程序组件 |
| ready      |   Function | 生命周期，同小程序组件 |
| didUpdate      |   Function | 每次更新后触发 |
| methods      |   Object | 定义API方法 |

通用API
------------------

| 方法      |    类型 | 说明  |
| :-------- | :--------: | :-- |
| parent      |   (p) | 查找父级 |
| getData      |   () | 获取元素数据 |
| show      |   () | 显示该组件 |
| hide      |   () | 隐藏该组件 |
| destory      |   () | 销毁该组件 |
| render      |   (p) | 渲染组件，与直接写jsx一致 |
| attr |  (p1, p2) |  设置/获取data-*属性 |
