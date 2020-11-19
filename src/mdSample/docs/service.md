# 启动多个项目

创建多个项目，并同时启动它们

## 创建项目

```bash
aotoo create aaa
aotoo create bbb
aotoo create ccc
```

## 配置文件

打开`aotoo.config.js`，编辑`apps`字段

```javascript
apps: [
 // 默认项目，hub自带项目
 {
      name: 'aotooSample',
      startup: false,    // 改为false，使该项目默认不启动
      ...
    },

 // 项目aaa
    {
      name: 'aaa',
      startup: true,
      src: path.join(ROOT, 'src/aaa'),
      port: 8500  // 指定项目端口
    }
  ],
  
 // 项目bbb
    {
      name: 'bbb',
      startup: true,
      src: path.join(ROOT, 'src/bbb'),
      port: 8600  // 指定项目端口
    }
  ],
  
 // 项目ccc
    {
      name: 'ccc',
      startup: true,
      src: path.join(ROOT, 'src/ccc'),
      port: 8700  // 指定项目端口
    }
  ],
}
```

## 启动项目

```bash
aotoo dev # 启动所有startup字段为true的项目，开发环境

aotoo start # 启动所有startup字段为true的项目，生产环境
```

## 目录结构  

```bash
hub环境
  └── src
       ├─ aaa
       ├─ bbb
       └─ ccc
```
