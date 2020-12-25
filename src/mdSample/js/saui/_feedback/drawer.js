import Button from "components/items/button";
import _message from "components/items/message";
import Table from "components/list/table";
import { drawerDoc } from "../document";

const drawer = Table({
  tableClass: 'wid-p100',
  ...drawerDoc
})
const message = _message()


const data = [
  {title: '基础抽屉', content: '基础抽屉 left', child: [ {title: '示例', tap: 'onDrawer', type: 'left'} ]},
  {title: '基础抽屉', content: '基础抽屉 right', child: [ {title: '示例', tap: 'onDrawer', type: 'right'} ]},
  {title: '基础抽屉', content: '基础抽屉 top', child: [ {title: '示例', tap: 'onDrawer', type: 'top'} ]},
  {title: '基础抽屉', content: '基础抽屉 bottom', child: [ {title: '示例', tap: 'onDrawer', type: 'bottom'} ]},
  {title: '多层抽屉', content: '多层抽屉', child: [ {title: '示例', tap: 'onDrawer', level: 'more', type: 'right'} ]},
]


function template(state, props) {
  //方式二
  return (
    <>
      <View className="pages-title-lg">抽屉</View>
      <View className='flex-row-wrap demo-grid num2'>
        {
          state.tipsList.map((item, ii) => {
            ii = ii + 1
            return (
              <View className='ss-col' key={'bl-'+ii}>
                <View className='demo-item-content'>
                  <View className='item-head'>
                    {
                      item.child.map((itemx, jj) => {
                        return <Button key={'b-'+jj} title={itemx.title || item.title} itemClass='ss-button btn-default' data-type={itemx.type} data-level={itemx.level} tap={this[itemx.tap]} />
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
      <View className="pages-title-sm">Attributes</View>
      {drawer.render()}
    </>
  )
}

export default function(Pager) {
  return Pager({
    template,
    data: {
      tipsList: data
    },
    onDrawer(e, param, inst) {
      const type = inst.attr('data-type')
      const more = inst.attr('data-level')
      message.drawer({
        '@item' : {
          title: {
            title: 'Search',
            itemClass: 'like-search item-head',
            aim: 'onSearchPop'
          },
          body: more ? [{title: 'SEARCH'}, {title: 'Add', itemClass: 'btn-default', aim: 'onAdd'}] : [{title: 'SEARCH'}],
          bodyClass: 'item-body flex-row justify-center al-item-center',
          itemClass: 'pages-drawer',
          onAdd(e, param, inst) {
            message.drawer({
              '@item' : {
                title: {
                  title: 'Search',
                  itemClass: 'like-search item-head',
                  aim: 'onSearchPop'
                },
                body: [{title: '啦啦啦'}],
                bodyClass: 'item-body flex-row justify-center al-item-center',
                itemClass: 'pages-drawer'
              },
              showClose: false,
              timer: 0,
              direction: type,
              animation: true,
              type: 'more',
              containersClass: 'abc',
              bgCloseSmall: true,
              bgClose: true
            })
          }
        },
        showClose: false,
        timer: 0,
        direction: type,
        animation: true,
      })
    },
    
  })
}