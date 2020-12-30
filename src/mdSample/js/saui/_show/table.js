const $$ = ao2.$$
import Table from "components/list/table";

const inst = Table({
  columns: [
    {title: '姓名', field: 'title'},
    {title: '联系方式', field: 'phone'},
    {title: '爱好', field: 'hobby'},
    {title: '地址', field: 'address'}
  ],
  data: [
    {
      title: 'sss',
      phone: '13752525252',
      hobby: '睡觉',
      address: '流花路东方宾馆'
    },
    {
      title: 'sss',
      phone: '13752525252',
      hobby: '睡觉',
      address: '流花路东方宾馆'
    },
    {
      title: 'sss',
      phone: '13752525252',
      hobby: '睡觉',
      address: '流花路东方宾馆'
    },
  ],
  tableClass: 'wid-p100'
})
function template(state, props) {
  //方式二
  return (
    <>
      <View className="pages-title-lg">表格</View>
      <View className='demo-grid'>
        {inst.render()}
      </View>
    </>
  )
}

export default function(Pager) {
  return Pager({
    template,
    data: {
      tipsList: []
    }
  })
}