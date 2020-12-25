import Button from "components/items/button";
import _message from "components/items/message";
import Table from "components/list/table";
import { tipDoc } from "../document";

const tips = Table({
  tableClass: 'wid-p100',
  ...tipDoc
})
const message = _message()

const data = [
  {title: '普通提示', child: [
    {title: '选择', clues: '选择提示', status: 'warning', tap: 'onSysTips'},
    {title: '成功', clues: '成功提示', status: 'success', tap: 'onSysTips'},
    {title: '错误', clues: '错误提示', status: 'error', tap: 'onSysTips'}
  ]},
  {title: '表单提示', child: [
    {title: '选择', clues: '选择提示', status: 'warning'},
    {title: '错误', clues: '错误提示', status: 'error'}
  ]},
  {title: '文字提示框', type: 'text', child: [
    {title: '样式提示'},
    {title: '组件提示'}
  ]},
]

function template(state, props) {
  //方式二
  return (
    <>
      <View className="pages-title-lg">提示语</View>
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
                    return <Button key={'b-'+jj} title={itemx.title || item.title} itemClass={!item.type ? 'ss-button btn-default ml-default' : 'ml-default ss-i-block ss-link'} data-clues={itemx.clues} data-status={itemx.status} tap={this[itemx.tap]} />
                  })
                }
              </View>
            </View>
          )
        })
      }
      <View className="pages-title-sm">Attributes</View>
      {tips.render()}
    </>
  )
}

export default function(Pager) {
  return Pager({
    template,

    data: {
      tipsList: data
    },
    onSysTips(e, params, inst) {
      const type = inst.attr('data-status')
      const title = inst.attr('data-clues')
      message.tip({ title: '这是一条'+title, type: type})
    }
  })
}