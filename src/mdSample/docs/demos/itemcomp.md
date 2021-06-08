### CODE

使用 ITEM 组件开发一个新组建  

#### Loading 按钮  

```js
const itemInstance = ui_item({
  itemClass: 'button-item',
  title: 'Click me!',
  loadingStat: false,
  loading(){
    if (this.loadingStat) return
    this.loadingStat = true
    this.addClass('loading')
    setTimeout(() => {
      this.removeClass('loading')
      this.loadingStat = false
    }, 3000);
  },
  onClick(){
    this.loading()
  }
})
ReactDOM.render(<itemInstance.UI />, document.getElementById('root'))
```

#### 简易下拉菜单  

```js
const itemInstance = ui_item({
  itemClass: 'select-item',
  bodyClass: 'select-options',
  title: {$$id: 'select-title', title: 'Select it!', itemClass: 'select-title', onClick: 'toggleMenu'},
  selected: '002',
  body: [
    {title: '张三', onClick: 'optionClick?uid=001'},
    {title: '李四', onClick: 'optionClick?uid=002', itemClass: 'selected'},
    {title: '王五', onClick: 'optionClick?uid=003'},
    {title: '赵六', onClick: 'optionClick?uid=004'},
  ],
  toggleMenu(){
    const bodyDom = document.querySelector('.select-options')
    if (bodyDom) {
      if (bodyDom.style.display === 'block') {
        bodyDom.style.display = 'none'
      } else {
        bodyDom.style.display = 'block'
      }
    }
  },
  optionClick(e, param, inst){
    inst.siblings().removeClass('selected')
    inst.addClass('selected')
    let $data = inst.getData()
    let $title = $data.title
    $$('select-title').update({title: $title})
  },
})
ReactDOM.render(<itemInstance.UI />, document.getElementById('root'))
```
