import Button from "components/items/button";
import _message from "components/items/message";

const message = _message()

const xx = [
  {
    title: '这是一条消息标题',
    content: '这是最常用的弹出框样式，主要包括标题，文字内容以及按钮，文字大小14px，#666666 行高20px。'
  },
  {
    title: '这是一条消息标题2',
    content: '这是最常用的弹出框样式，主要包括标题，文字内容以及按钮，文字大小14px，#666666 行高20px。'
  },
  {
    title: '这是一条消息标题3',
    content: '这是最常用的弹出框样式，主要包括标题，文字内容以及按钮，文字大小14px，#666666 行高20px。'
  },
  {
    title: '这是一条消息标题4',
    content: '这是最常用的弹出框样式，主要包括标题，文字内容以及按钮，文字大小14px，#666666 行高20px。'
  },
]

const data = [
  {title: '自动关闭', child: [ {title: '点击打开', tap: 'onNotice', type: 'auto', dire: 'left top'} ]},
  {title: '手动关闭', child: [ {title: '点击打开', tap: 'onNotice', type: 'options', dire: 'right top'} ]},
  {title: '左上', child: [ {title: '点击打开', tap: 'onNotice', type: 'options', dire: 'left top'}]},
  {title: '左下', child: [ {title: '点击打开', tap: 'onNotice', type: 'options', dire: 'left bottom'}]},
  {title: '右下', child: [ {title: '点击打开', tap: 'onNotice', type: 'options', dire: 'bottom right'}]},
]

function template(state, props) {
  //方式二
  return (
    <>
      <View className="pages-title-lg">消息通知框</View>
      {
        state.tipsList.map((item, ii) => {
          ii = ii + 1
          return (
            <View className='m-default' key={'bl-'+ii}>
              <View className="pages-title">{ii + '、 ' +item.title}</View>
              <View className='mt-default'>
                {
                  item.child.map((itemx, jj) => {
                    return <Button key={'b-'+jj} title={itemx.title || item.title} itemClass={!item.type ? 'ss-button btn-default ml-default' : 'ml-default ss-i-block ss-link'} data-dire={itemx.dire}  data-type={itemx.type} tap={this[itemx.tap]} />
                  })
                }
              </View>
            </View>
          )
        })
      }
    </>
  )
}



export default function(Pager) {
  return Pager({
    template,
    data: {
      tipsList: data
    },
    idx: 0, 
    onNotice(e, params, inst) {
      const type = inst.attr('data-type')
      const dire = inst.attr('data-dire')
      message.notice({
        title: xx[this.idx].title,
        body: xx[this.idx].content,
        showClose: true,
        timer: type === 'auto' ? 3000 : 0,
        direction: dire
      })
      this.idx ++
      this.idx >= 4 ? this.idx = 0 : ''
    },
    // onNotice2(e, params, inst) {
    //   const type = inst.attr('data-type')
    //   message.modal({
    //     type: type,
    //     title: '标题',
    //     body: '这是一条信息，请点击确认按钮',
    //     showFooter: true,
    //     showConfirm: true,
    //     showCancel: true,
    //     showClose: true,
    //     cbConfirm: function() {
    //        message.modal({
    //         type: type,
    //         title: '提示',
    //         body: '确定关闭？',
    //         showFooter: true,
    //         showCancel: true,
    //         showConfirm: true,
    //         showClose: true,
    //         bgClose: true,
    //         mask: false,
    //         cbConfirm: function(idx2) {
    //           message.close()
    //         },
    //         onClose: function(idx2) {
    //           message.close(idx2)
    //         }
    //       })
    //     },
    //     cbCancel(idx) {
    //       message.close(idx)
    //       message.tip({title: 'action: cancal'})
    //     }
    //   })
    // },
    // onNotice3(e, params, inst) {
    //   const kk = ui_item({
    //     body: [{img: {src: '/images/ui/saui2.jpg'}}],
    //     dot: [{title: ' ', itemClass: 'item-close icon-del-primary', aim: 'onClose'}],
    //     bodyClass: 'item-body',
    //     itemClass: 'ss-modal options',
    //     methods: {
    //       onClose() {
    //         message.close()
    //       }
    //     }
    //   })
    //   message.modal(<kk.UI/>)
    // }
  })
}