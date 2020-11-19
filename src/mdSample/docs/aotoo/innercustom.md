# 自定义内嵌组件  

aotoo支持自定义内嵌组件，方便扩展组件结构  

```js
import marked from 'marked'
import {extTemplate} from '@aotoo/aotoo'

extTemplate({
  "@md": function(value, key){
    if (lib.isString(value)) {
      value = value.trim()
    } else {
      return null
    }
    let markdownContent = marked(value);
    return (
      <View
        key={key}
        className="markdown-section"
        dangerouslySetInnerHTML={{ __html: markdownContent }}>
      </View>
    )
  },

  "@html": function(value, key){
    if (lib.isString(value)) {
      value = value.trim()
    } else {
      return null
    }
    return (
      <View
        key={key}
        className="html-section"
        dangerouslySetInnerHTML={{ __html: value }}>
      </View>
    )
  }
})
```

上例中我们扩展了两个内嵌组件，`@md，@html`，通过这两个组件使我们可以解析markdown和html字串，适用于从后端接收数据并渲染承结构的需求  

@md
----------------

```js
import {render} from '@aotoo/aotoo'

itemData: {
  'title': '标题',
  '@md':
` # markdown标题  
- 对于文档的描述  
- 更多的描述  
`,
}

const itemInst = ui_item(itemData)
render(<iteminst.UI />, 'root')
```

### @html

```js
import {render} from '@aotoo/aotoo'

itemData: {
  'title': '标题',
  '@html': `
<div class="boxer">
  <span class="desc">格子前端</span>
</div>
`,
}

const itemInst = ui_item(itemData)
render(<iteminst.UI />, 'root')
```

通过上面的方式，我们可以定义丰富的内嵌组件
