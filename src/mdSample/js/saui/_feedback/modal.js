import Button from "components/items/button";
import _message from "components/items/message";
import Table from "components/list/table";
import { modalDoc } from "../document";

const doc = Table({
  tableClass: 'wid-p100',
  ...modalDoc
})
const message = _message()

const data = [
  {title: '提示性弹出层', child: [ {title: '点击打开', tap: 'onModal', type: 'normal'} ]},
  {title: '预览性弹出框', child: [ {title: '点击打开', tap: 'onModal', type: 'options'} ]},
  {title: '对话框', child: [ {title: '点击打开', tap: 'onModal2', type: 'options'} ]},
  {title: '完全自定义弹出层内容', child: [ {title: '点击打开', tap: 'onModal3'} ]}
]

function template(state, props) {
  //方式二
  return (
    <>
      <View className="pages-title-lg">弹出层</View>
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
      <View className="pages-title-sm">Attributes</View>
      {doc.render()}
      <View className=''>注：modal 除了可以通过参数配制，也可以直接写结构</View>
    </>
  )
}

export default function(Pager) {
  return Pager({
    template,

    data: {
      tipsList: data
    },
    onModal(e, params, inst) {
      const type = inst.attr('data-type')
      message.modal({
        type: type,
        title: '这是一条消息标题',
        body: '这是最常用的弹出框样式，主要包括标题，文字内容以及按钮，文字大小14px，#666666 行高20px。',
        showFooter: type === 'options' ? true : '',
        showConfirm: true,
        showCancel: type === 'options' ? true : '',
        showClose: type === 'options' ? true : '',
        // cbConfirm: function(params) {
        //   message.tip({title: "执行成功"})
        // },
        bgClose: type === 'normal' ? true : ''
      })
    },
    onModal2(e, params, inst) {
      const type = inst.attr('data-type')
      message.modal({
        type: type,
        title: '标题',
        body: '这是一条信息，请点击确认按钮',
        showFooter: true,
        showConfirm: true,
        showCancel: true,
        showClose: true,
        cbConfirm: function() {
           message.modal({
            type: 'normal',
            title: '确定关闭弹出层么？',
            showFooter: true,
            showCancel: true,
            showConfirm: true,
            bgClose: true,
            mask: false,
            itemClass: 'modal-2',
            cbConfirm: function(idx2) {
              message.close('modal')
            },
            onClose: function(idx2) {
              message.close('modal', idx2)
            }
          })
        },
        cbCancel(type, idx) {
          message.close(type, idx)
          message.tip({title: 'action: cancal'})
        }
      })
    },
    onModal3(e, params, inst) {
      const kk = ui_item({
        body: [{img: {src: '/images/ui/saui2.jpg'}}],
        dot: [{title: ' ', itemClass: 'item-close close-circle-l', aim: 'onClosex'}],
        bodyClass: 'item-body',
        itemClass: 'ss-modal options',
        methods: {
          onClosex() {
            message.close('modal')
          }
        }
      })
      message.modal(<kk.UI/>)
    }
  })
}