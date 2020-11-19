import Button from "components/items/button";
import _message from "components/items/message";

const message = _message()

const data = [
  {title: '自动关闭', child: [ {title: '点击打开', tap: 'onNotice', type: 'auto'} ]},
  {title: '手动关闭', child: [ {title: '点击打开', tap: 'onNotice', type: 'options'} ]},
]

function template(state, props) {
  //方式二
  return (
    <>
      <View className="pages-title-lg">警告</View>
      {
        state.tipsList.map((item, ii) => {
          ii = ii + 1
          return (
            <View className='m-default' key={'bl-'+ii}>
              <View className="pages-title">{ii + '、 ' +item.title}</View>
              <View className='mt-default'>
                {
                  item.child.map((itemx, jj) => {
                    //这里tap需要用this, 参数无法传，所以通过data-xx来解决，实际项目可以用tap='onabc?status=true,...'
                    return <Button key={'b-'+jj} title={itemx.title || item.title} itemClass={!item.type ? 'ss-button btn-default ml-default' : 'ml-default ss-i-block ss-link'} data-type={itemx.type} tap={this[itemx.tap]} />
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
    onNotice(e, params, inst) {
      const type = inst.attr('data-type')
      message.notice({
        title: '这是一条消息标题',
        body: '这是最常用的弹出框样式，主要包括标题，文字内容以及按钮，文字大小14px，#666666 行高20px。',
        showClose: true,
        timer: type === 'auto' ? 3000 : 0,
      })
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