# 最简项目说明  

安装完成项目后，这一节我们要来说明JS目录下简单项目，

安装完成项目后，这一节我们要来说明JS目录下简单项目，除开JS目录之外的目录是 EXPO5.0 框架预安装的目录，我们不予理会。  

**目录结构**  

```bash
项目
  ├── common
        └── header.js        # 存放全局变量，最先被引入
  ├── components
        └── index.js         # 组件库首页
  ├── pages
        ├── business
                ├── home.js       # 路由子页面
                └── detail.js     # 路由子页面
                
        ├── index.js  # 首页
```

## 说明  

### common  

公共文件，全局变量存放目录  

* header.js  
使AOTOO库能够顺利运行在RN的环境中，我们需要将VIEW/TEXT/BUTTON等方法组件设置为全局。 在 header.js 文件中设置所有的全局变量，header.js 文件需要最先被引入项目。

### components

组件存放目录  

### pages

存放业务文件的目录。我们仿造小程序的模式基于 RN 的路由模块重新封装了一套新的路由，如下例所示

**首页**  

```js
import HomeScreen from './business/home'
import DetailsScreen from './business/detail'
import {Pager} from './pager'

// 定义路由表
export default function(){
  return Pager.pages({
    data: [
      {url: 'Home', content: HomeScreen},  
      {url: 'Details', content: DetailsScreen},
    ]
  })
}
```

**路由子页**

```js
export default function HomeScreen({Pager, nav}){
  return Pager({
    data: {
      title: '标题'
    },
    onLoad(){
      // 页面装载时
    },
    onShow(){
      // navigateBack时执行
    },
    onReady(){
      // 页面加载完成
      setTimeout(() => {
        this.setData({title: '新标题'})
      }, 2000);
    },
    onUnload(){
      // 页面移除时
    },
    render(state, props){
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>{state.title}</Text>
          <Button
            title="Go to Details"
            onPress={() => 
              nav.navigateTo({  // navigateTo  redirectTo  relunch
                url: 'Details',
                params: {
                  abc: '12345',
                  options: {title: 'what'}
                }
              })
            }   
          />
        </View>
      )
    }
  })
}
```

DetailsScreen 页面类似，当需要新增路由页面时，配置好路由表及相应的页面即可。就像小程序那样

> nav 是基于 navigate 对象封装的对象，该对象中包含小程序路由API方法。 navigate 仍然是一个独立的可调用的模块(引入之后)
