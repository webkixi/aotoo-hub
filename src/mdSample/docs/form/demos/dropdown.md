# 下拉菜单

<iframe src="https://codesandbox.io/embed/cell-plugin-multity-select-mkiyw?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="cell-plugin-multity-select"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

## 参数说明  

|  key   |  说明  |
|  ----  | ----  |
| id  | 表单id |
| type  | 表单类型, `dd`单选, `mdd`多选 |
| value  | 值 |
| values  | 取值范围 |
| readOnly  | 只读 |
| disabled  | 无效 |
| className  | 样式类名 |
| style  | 样式 |
| title  | 标题 |
| desc  | 描述 |
| itemClass  | 容器样式类 |
| itemStyle  | 容器样式 |
| header  | 头部 |
| footer  | 底部 |

### 下拉列表类型  

默认单选类型  

**单选类型**  

```js
const ddconfig = {
  id: "yyy",
  type: 'dd',
  value: "2",
  values: ["1", "2", "3"]  // “1”同时作为option项的value和title
}
```

**多选类型**  

```js
const ddconfig = {
  id: "yyy",
  type: 'mdd',
  value: "2",
  values: ["1", "2", "3"]  // “1”同时作为option项的value和title
}
```

### 默认值  

`value`设置组件默认值，默认值必须存在在`values`  

**单值**  

```js
const ddconfig = {
  id: "yyy",
  value: "2",
  values: ["1", "2", "3"]  // “1”同时作为option项的value和title
}
```

**多值**  
checkbox支持选中多值

```js
const ddconfig = {
  id: "yyy",
  value: ['1', '2'],
  values: ["1", "2", "3"]  // “1”同时作为option项的value和title
}
```

### 取值范围

`values`将作为下拉菜单的option项(使用checkbox/radiobox插件实现)  

**字符串下拉菜单**  

```js
const ddconfig = {
  id: "yyy",
  value: "2",
  values: ["1", "2", "3"]  // “1”同时作为option项的value和title
}
```

**配置化下拉菜单**  

```js
const config = {
  id: "yyy",
  value: "2",
  values: [
    "-1",  //  "1"为value，{...}作为option项的其他配置
    ['0'],  //  "1"为value，{...}作为option项的其他配置
    ['1', {title: '标题1'}],  //  "1"为value，{...}作为option项的其他配置
    ['2', {title: '标题2'}],
    ['3', {title: '标题3', disabled: true}],
    ['4', {title: '标题4', readOnly: true}]
    ['5', {title: (<div>标题5</div>), readOnly: true}]
  ]
}
```
