# 全局变量

aotoo库适用于前端和NODE端，引入aotoo库后，会自动生成下列全局变量，前端将变量挂在window对象，node端则将变量挂在global对象上  

`全局方法`  

- ui_item
- ui_list
- ui_tree

`全局组件`  

- View
- Text
- UI_item
- UI_list  

`全局方法`是正常的JS方法，`全局组件`作为正常的React组件使用  

## ui_item

全局方法，item组件  

```js
const Item = ui_item({...})
render(<Item.UI />, 'root')
```

## ui_list

全局方法，list组件  

```js
const List = ui_list({...})
render(<List.UI />, 'root')
```

## ui_tree

全局方法，tree组件  

```js
const Tree = ui_tree({...})
render(<Tree.UI />, 'root')
```

## UI_item

全局组件，tree组件  

```js
render(<UI_item {...props} />)
```

## UI_list

全局组件，tree组件  

```js
render(<UI_list {...props} />)
```

## View

全局组件，只是DIV的别名，考虑到兼容小程序语法及后续的RN开发  

```js
render(<View {...props} />)
```

## Text

全局组件，只是SPAN的别名，考虑到兼容小程序语法及后续的RN开发  

```js
render(<Text {...props} />)
```
