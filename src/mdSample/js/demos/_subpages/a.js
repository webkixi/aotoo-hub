const {lib, LoadingComponent, $$, extTemplate} = ao2

const itemDemos = {
  'demos/item.md'(){
    const Instance = ui_item({title: '这句话是使用 ITEM 组件展示的'})
    return <Instance.UI />
  },

  'demos/itemcomp.md'(){
    const ButtonItem = ui_item({
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


    const SelectItem = ui_item({
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


    return (
      <>
        <ButtonItem.UI />
        <SelectItem.UI />
      </>
    )
  },

  'demos/itemapi.md'(){
    const ItemClass1 = ui_item({
      title: <h3>addClass/removeClass/toggleClass/css</h3>,
      itemClass: 'item-entity',
    })

    setTimeout(()=>{
      ItemClass1.addClass('black')
      setTimeout(() => {
        ItemClass1.removeClass('black')
        setTimeout(() => {
          ItemClass1.toggleClass('black')
          setTimeout(() => {
            ItemClass1.css({ backgroundColor: 'blue' })
          }, 2000);
        }, 2000);
      }, 2000);
    }, 2000)


    const updateItem = ui_item({
      title: <h3>点我更新标题</h3>,
      itemClass: 'item-entity',
      onClick(){
        this.update({title: '赋值新标题, 2秒后重置'})
        setTimeout(() => {
          this.reset()
        }, 2000);
      }
    })


    const upBodyItem = ui_item({
      title: <h3>点我更新body子元素</h3>,
      itemClass: 'item-entity',
      body: [
        {title: 'body标题-1'},
        {title: 'body标题-2'},
        {title: 'body标题-3'},
      ],
      onClick(){
        this.update({
          "body[1]": {title: '新的body item标题'}
        })

        setTimeout(() => {
          this.reset()
        }, 2000);
      }
    })

    const hideItem = ui_item({
      title: <h3>点我隐藏 ITEM </h3>,
      itemClass: 'item-entity',
      
      onClick(){
        this.hide()

        setTimeout(() => {
          this.show()
        }, 2000);
      }
    })

    return (
      <>
        <ItemClass1.UI />
        <updateItem.UI />
        <upBodyItem.UI />
        <hideItem.UI />
      </>
    )
  },

  'demos/itemevent.md'(){
    const ClickItem = ui_item({
      itemClass: 'item-entity',
      title: <h3>点击事件，点我试试</h3>,
      onClick(){
        alert('响应点击事件')
      }
    })

    const MdItem = ui_item({
      itemClass: 'item-entity',
      title: <h3>MouseDown事件，点我试试</h3>,
      onMouseDown(){
        alert('响应点击事件')
      }
    })

    const StrItem = ui_item({
      itemClass: 'item-entity',
      title: <h3>定义字符串事件</h3>,
      onClick: 'doneClick',
      doneClick(){
        alert('定义字符串事件')
      }
    })

    const ParamItem = ui_item({
      itemClass: 'item-entity',
      title: <h3>字符串事件，带参</h3>,
      onClick: 'doneClick?name=张三',
      doneClick(e, param){
        alert('name:' + param.name)
      }
    })

    return (
      <>
        <ClickItem.UI />
        <MdItem.UI />
        <StrItem.UI />
        <ParamItem.UI />
      </>
    )
  },


  'demos/itempic.md'(){
    const Pic = ui_item({
      itemClass: 'item-entity',
      title: <h3>一张图片</h3>,
      img: '/images/others/fruit.png'
    })

    const ClassPic = ui_item({
      itemClass: 'item-entity',
      title: <h3>自定义样式类</h3>,
      img: {
        src: '/images/others/fruit.png', 
        itemClass: 'item-entity-pic',
      }
    })

    const StylePic = ui_item({
      itemClass: 'item-entity',
      title: <h3>自定义内联样式</h3>,
      img: {
        src: '/images/others/fruit.png', 
        itemClass: 'item-entity-pic',
        itemStyle: {filter: 'blur(3px)'}
      }
    })

    const ManyPic = ui_item({
      itemClass: 'item-entity',
      title: <h3>图片集</h3>,
      img: [
        { src: '/images/others/fruit.png'},
        { src: '/images/others/fruit.png'},
        { src: '/images/others/fruit.png', itemStyle: {filter: 'blur(3px)'}},
        { src: '/images/others/fruit.png'},
      ]
    })

    const LinkPic = ui_item({
      itemClass: 'item-entity',
      title: <h3>图片链接，点击跳转</h3>,
      img: {
        src: '/images/others/fruit.png', 
        itemClass: 'item-entity-pic',
        url: '__ https://www.163.com' 
      }
    })

    const EventPic = ui_item({
      itemClass: 'item-entity',
      title: <h3>图片点击事件，点击图片试试</h3>,
      img: {
        src: '/images/others/fruit.png', 
        itemClass: 'item-entity-pic',
        onClick(){
          alert(1)
        }
      }
    })


    return (
      <>
        <Pic.UI />
        <ClassPic.UI />
        <StylePic.UI />
        <ManyPic.UI />
        <LinkPic.UI />
        <EventPic.UI />
      </>
    )
  },


  'demos/itemembed.md'(){
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
  },


  'demos/itemattr.md'(){
    const ItemClass1 = ui_item({
      title: <h3>itemClass: item-entity</h3>,
      itemClass: 'item-entity',
    })
    const ItemClass2 = ui_item({
      title: <h3>itemClass: item-entity black</h3>,
      itemClass: 'item-entity black',
    })

    const ItemStyle = ui_item({
      title: <h3>itemStyle</h3>,
      itemClass: 'item-entity',
      itemStyle: {backgroundColor: 'red', color: '#fff'}
    })

    const AttrItem = ui_item({
      title: 'attr 属性接收一个 Object 对象，会生成 ITEM 容器的 data-* 属性',
      itemClass: 'item-entity',
      itemStyle: {display: 'flex', alignItems: 'center', height: '50px'},
      attr: {id: 'uniqId'}
    })

    const UrlItem = ui_item({
      title: [
        {title: '鸿蒙开发工具，点击本地打开', url: 'https://developer.harmonyos.com/cn/home'},
        {title: '鸿蒙开发工具，点击新开窗口', url: '__ https://developer.harmonyos.com/cn/home'},
      ],
      titleClass: 'url-items',
      itemClass: 'item-entity',
    })

    const ReadyItem = ui_item({
      title: <h3>3秒后执行 ready 回调</h3>,
      itemClass: 'item-entity',
      ready(){
        setTimeout(() => {
          alert('组件已加载, ready回调被执行')
        }, 3000);
      }
    })


    return (
      <>
        <ItemClass1.UI />
        <ItemClass2.UI />
        <ItemStyle.UI />
        <AttrItem.UI />
        <UrlItem.UI />
        <ReadyItem.UI />
      </>
    )
  },

  
  'demos/itemcomplex.md'(){

    const BodyInstance = ui_item({
      itemClass: 'item-entity',
      title: <h3>BODY结构</h3>,
      body: [
        {title: 'body 结构-1'},
        {title: 'body 结构-2'},
      ]
    })

    const FooterInstance = ui_item({
      itemClass: 'item-entity',
      title: <h3>FOOTER 结构</h3>,
      body: [
        {title: 'body 结构-1'},
        {title: 'body 结构-2'},
      ],
      footer: [
        {title: 'footer 结构-1'},
        {title: 'footer 结构-2'},
      ]
    })

    const DotInstance = ui_item({
      itemClass: 'item-entity',
      title: <h3>DOT 结构</h3>,
      body: [
        {title: 'body 结构-1'},
        {title: 'body 结构-2'},
      ],
      footer: [
        {title: 'footer 结构-1'},
        {title: 'footer 结构-2'},
      ],
      dot: [
        {title: ' ', itemClass: 'demo-dot'},
        {title: ' ', itemClass: 'demo-dot left'},
      ]
    })

    return (
      <>
        <BodyInstance.UI />
        <FooterInstance.UI />
        <DotInstance.UI />
      </>
    )
  },

  'demos/iteminner.md'(){
    extTemplate({
      '@hello'(param, key){
        return (
          <h1>
            {param.title}
          </h1>
        )
      }
    })

    const InnerInstance = ui_item({
      itemClass: 'item-entity',
      "@hello": {
        title: '定义内联组件'
      }
    })

    return (
      <>
        <InnerInstance.UI />
      </>
    )
  },
}



const demos = {
  ...itemDemos,



  'demos/list.md'(){
    const Instance = ui_list({
      data: [
        {title: '列表子项-1'},
        {title: '列表子项-2'},
        {title: '列表子项-3'},
      ],
      listClass: 'demo-list'
    })
    return <Instance.UI />
  }
}

function template(state, props) {
  const mdPromise = requireMarkdown(state.file)
  const markdownJsx = <LoadingComponent content={mdPromise} />
  let   TargetDom = demos[state.file]
  if (!TargetDom) {
    TargetDom = <View>没有找到示例代码</View>
  }

  return (
    <>
      <View className="codebox">
        <h2>演示</h2>
        <TargetDom />
      </View>
      {markdownJsx}
    </>
  )
}

export default function(Pager) {
  return Pager({
    template,

    data: {
      file: 'readme.md'
    },
    
    onLoad(options){
      let $file = this.getData().file
      let file = options.file
      if (file && file !== $file) {
        this.setData({ file })
      }
    },

    onUnload(){

    },
    
    onReady(){
      
    }
  })
}