
# tree元组件

tree组件是内置组件，tree组件基于list组件而来，除了数据结构不同之外，其他与list组件一致

## wxml模板

```html
<ui-tree list="{{config}}" />
```

## 配置

```js
Pager({
  data: {
    config: {
      data: [],
      listClass: 'list-class'
    }
  }
})
```

## 数据结构  

### list标准数据结构  

```js
listConfig = {
  data: [
    {title: '标题'},
    {title: '标题'},
    {title: '标题'},
  ]
}
```

### tree数据结构  

```js
listConfig = {
  data: [
    {title: '标题', idf: 'aaa'},
    {title: '标题', parent: 'aaa'},
    {title: '标题', parent: 'aaa', idf: 'level2'},
      {title: '标题', parent: 'level2'},
      {title: '标题', parent: 'level2'},
      {title: '标题', parent: 'level2'},

    {title: '标题', idf: 'bbb'},
    {title: '标题', parent: 'bbb'},
  ]
}
```

**idf**  
父级标识，{String}类型  

**parent**  
指定父级, {String}类型
