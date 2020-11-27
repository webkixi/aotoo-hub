# hub 的小程序

hub 的小程序 DEMO(xcxSample)基于小程序原生开发，使用 webpack4 进行编译，输出文件可直接使用小程序 IDE 编辑器直接打开。  

hub自带的小程序支持解析HTML字串, markdown字串为小程序原生模板(相比wxParse更好用)

> 在 github 中搜索 aotoo-xquery

## 创建工作空间

```bash
aotoo init workspace
```

## 创建小程序项目

```bash
cd workspace
aotoo create minip_name
```

>>>> 当命令行提示时，请输入`n`，否则将会创建 web 项目

## 小程序配置

打开`aotoo.config.js`，编辑`apps`字段

```javascript
apps: [
    {
      name: 'minip_name',  // 小程序项目名称
      version: '1.0.1',  // 小程序版本
      startup: true,  // 是否默认启动
      type: 'mp', // 项目类型为小程序
      src: path.join(ROOT, 'src/minip_name'),  // 项目实际地址
      options: {
        cloud: false // 是否云开发
      },
      port: 8500  // 指定项目端口
    }
  ],
}
```

## 小程序启动

```bash
aotoo dev

# 或者
aotoo dev minip_name # 指定启动项目
```

> 开发模式支持 webpack 的热更新

## 查看小程序示例

使用微信开发者工具打开命令行`黄色字体`标注的地址，一般该地址指向项目`minip_name/dist/[version]/dev`目录

## 部署/上传小程序

如果你觉得小程序的开发已经完成

```bash
aotoo build minip_name # 使用微信开发者工具打开`minip_name/dist/[version]/pro`目录

# 后者
aotoo dev minip_name  # 然后 ctrl + c 停止编译，这样webpack的热更新文件将被删除，使用微信开发工具重新打开
```

## 项目结构  

启动项目后，新项目目录结构如下  

```bash
hub工作空间
  └── src
       └─ project
             ├── configs # 配置文件目录，默认包含default.js配置文件
             ├── dist      # 静态资源输出目录
             └── js        # 前端业务js目录
                  │── components
                  │── css
                  │── pages
                  │── app.js  
                  │── app.wxss  
                  │── project.config.json  
                  └── app.json
```
