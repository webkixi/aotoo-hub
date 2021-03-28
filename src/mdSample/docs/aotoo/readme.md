# aotoo

aotoo库是一套基于react的前端开发库，方便快速开发react组件，我们的开发理念比较接近JQUERY，但同时又保留有REACT本身的特性，摒弃了JQUERY工程化难，维护难的问题。同时aotoo又汲取了非常多的小程序开发理念，力求在开发过程中保持与小程序(原生)开发同步。  

[GITHUB源码](https://www.github.com/webkixi/aotoo)

INSTALL
------------------

```bash
yarn add react react-dom
yarn add @aotoo/aotoo

# 或者
npm install @aotoo/aotoo
```

引入
------------------

```js
import aotoo from '@aotoo/aotoo'
```

一个简单的组件  
------------------

```js
import aotoo from '@aotoo/aotoo'

const template = (state, props) => {
  return (
    <div className='counter' onClick={this.env.inc}>{state.count}</div>
  )
}

const config = {
  data: { count: 0 },
  inc(){
    let count = this.getData().count
    this.setData({(count++)})
  }
}

const Count = createComponent(config, template)

ReactDOM.render(<Count.UI />, document.getElementById('root'))
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
