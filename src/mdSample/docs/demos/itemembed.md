### CODE

```js
const itemInstance = ui_item({
  const Instance = ui_item({
    title: <h3>ITEM</h3>,
    itemClass: 'item-entity',
    body: [
      {
        title: <h3>BODY-ITEM</h3>,
        footer: [
          {
            title: "BODY-ITEM' FOOTER",
          }
        ]
      }
    ],
    footer: [
      {title: "ITEM' FOOTER"}
    ]
  })
  return <Instance.UI />
})
ReactDOM.render(<itemInstance.UI />, document.getElementById('root'))
```
