import Button from "components/items/button";
import _message from "components/items/message";

const Message = _message()

function template(state, props) {
  return (
    <>
      <View className="pages-title-lg">警告提示</View>
      <View className='flex-row-wrap demo-grid num2'>
        {
          state.list.map((item, ii) => {
            ii = ii + 1
            return (
              <View className='ss-col' key={'bl-'+ii}>
                <View className='demo-item-content'>
                  <View className='item-head'>
                    {
                      item.child.map((itemx, jj) => {
                        return <Message.alert key={'xx-'+jj} icon={itemx.icon} itemClass='mb-default' type={itemx.name} title={itemx.title} content='啦啦啦 我是警告提示内容' showClose={itemx.close} cbCancel={itemx.cb ? this.close : ''} />
                      })
                    }
                  </View>
                  <View className="item-hr" data-content={item.title}></View>
                  <View className="pages-title">{item.content}</View>
                </View>
              </View>
            )
          })
        }
      </View>
    </>
  )
}

export default function(Pager) {
  return Pager({
    template,
    data: {
      list: [
        {title: '基础用法', content: '四种基础样式', child: [
          {title: 'Success Text', name: 'success'},
          {title: 'Info Text', name: 'info'},
          {title: 'Warning Text', name: 'warning'},
          {title: 'Error Text', name: 'error'},
        ]},
        {title: '可关闭', content: '显示关闭按钮，点击可关闭警告提示。', child: [{title: 'Success Text', name: 'success', close: true, icon: false}]},
        {title: '自定义关闭事件', content: '自定义点击关闭按钮触发的事件', child: [{title: 'Success Text', name: 'success', close: true, cb: true, icon: false}]},
      ]
    },
    close(inst) {
      alert('请问你需要我做什么')
    }
  })
}