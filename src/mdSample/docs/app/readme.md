# APP开发

APP 项目是最近在搞的新项目。在的相关文档后续会慢慢更新，现在这个版本是一个基础项目以供研究

基于REACT+NATIVE+EXPO技术基础。2021.5.27 号完成第一版工作，后面应该会有一个较长的不定期更新时间，目前正在做一套简单的博客APP。感兴趣的朋友可以先了解我们的开源项目 [hub-rn](https://gitee.com/webkixi/hub-rn) 第一版我们做了以下工作

1. 仿小程序
2. 引入AOTOO

## 仿小程序  

初衷是降低 WEB/APP/MINIP 项目开发的学习成本，开发成本，维护成本。我们已经在WEB项目上实现了小程序的路由逻辑，组件开发逻辑(基于最新版AOTOO库)，在RN上也遵循这一套开发思路  

### 路由方法

使用RN的stack类型路由我们实现了以下方法, [小程序路由API](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.redirectTo.html)

```js
nav.reLaunch
nav.redirectTo
nav.navigateTo
nav.navigateBack
```

### 路由页面生命周期

```js
Pager({
  data: {},
  onLoad(){},
  onShow(){},
  onReady(){},
  onUnload(){},
})
```

使用 setData 更改数据使页面更新

## 引入AOTOO

AOTOO是一套REACT的封装库，将REACT组件打包成JS对象，通过执行JS对象的API方法进而实现渲染，状态更新。 [AOTOO基础库说明](http://www.agzgz.com/aotoo)  

AOTOO库可以在WEB/APP(RN)/NODE环境中使用，以及AOTOO库在小程序中的变种(QUERYUI)，我们力求统一各端的基础库，使各端开发切换更加平滑。
