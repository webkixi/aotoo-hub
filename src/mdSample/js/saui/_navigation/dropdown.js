const {lib} = ao2

import Button from "components/items/button";
import tooltip from "components/items/tooltip";
import dropPop from "components/items/droppop";

const dpListData = [
  {title: '选中1', attr:{icon: 'right', id: 'a1', title: '选中1'}},
  {title: '选中2', attr:{icon: 'right', id: 'a2', title: '选中2'}},
  {title: 'SAUI', attr:{icon: 'right', id: '1', title: 'SAUI'}},
  {title: 'Aotoo',attr:{icon: 'right', id: '2', title: 'Aotoo'}},
  {title: 'Xquery',attr:{icon: 'right', id: '3', title: 'Xquery'}},
  {title: 'Hub', attr:{icon: 'right', id: '4', title: 'Hub'}},
  {title: 'Ss',  attr:{icon: 'right', id: '5', title: 'Ss'}},
]

const dpList = ui_list({
  data: dpListData,
  listClass: 'ss-list',
  methods: {
    onItem(e, params, inst) {
      const title = params.title
      const id = params.id
      dropPopInst4.addValue({title: title, id: id})
    }
  }
})
const Tooltip = tooltip({title: <dpList.UI />, itemClass: 'nopadding', minWid: '200'})


const dropPopInst = dropPop({popData: dpListData, itemClass: 'wid-p50'})

const dropPopInst2 = dropPop({
  popData: dpListData,
  readOnly: false,
  placeholder: '请输入',
  itemClass: 'wid-p70',
  keyupSeverValue(val) {
    const data = dpListData
    let _val = []
    let _nP = null
    data.forEach(item => {
      if (item.title.indexOf(val) > -1) {
        _val.push(item)
      }
    });
    if (val) {
      const _data =  _val.length > 0 ? _val : [{title: '暂无数据，请输入正确的关键字'}]
      dropPopInst2.popListInst.reset({data: _data, listClass:_val.length > 0 ? 'ss-list' : 'no-data'})
    }
    else {
      // dropPopInst2.popListInst.reset() //这里有个bug 先用以下的写法
      dropPopInst2.popListInst.reset({data: [{title: '请输入关键字搜索'}], listClass: 'init-data',})
    }
  },
  // onResetPopItemName: 'abc'
})

const dropPopInst3 = dropPop({
  placeholder: '请选择',
  type: 'tag',
  popData: dpListData,
  valued: [{title: '选中1', id: 'a1'},{title: '选中2', id: 'a2'}],
  readOnly: true,
  itemClass: 'wid-p70',
  keyupSeverValue(val) {
    const data = dpListData
    let _val = []
    let _nP = null
    data.forEach(item => {
      console.log('item', item, val);
      if (item.title.indexOf(val) > -1) {
        _val.push(item)
      }
    });
    const _data =  _val.length > 0 ? _val : [{title: '暂无数据，请输入正确的关键字'}]
    dropPopInst3.popListInst.reset({data: _data, listClass:_val.length > 0 ? 'ss-list' : 'no-data'})
  }
})

const dropPopInst4 = dropPop({
  placeholder: '请选择',
  type: 'tag',
  tag: 'sibling',
  autoCreateTag: true,
  popData: dpListData,
  readOnly: true,
  itemClass: 'wid-p70',
  keyupSeverValue(val) {
    const data = dpListData
    let _val = []
    let _nP = null
    data.forEach(item => {
      if (item.title.indexOf(val) > -1) {
        _val.push(item)
      }
    });
    _val = _val.length > 0 ? _val : [{title: '暂无数据，请输入正确的关键字'}]
    dropPopInst4.popListInst.reset({data: _val, listClass:'ss-list'})
  }
})

const dropPopInst5 = dropPop({
  placeholder: '请输入关键字',
  type: 'tag',
  tag: 'sibling',
  autoCreateTag: false,
  popData: dpListData,
  readOnly: false,
  itemClass: 'wid-p70',
  keyupSeverValue(val) {
    const data = dpListData
    let _val = []
    let _nP = null
    data.forEach(item => {
      if (item.title.indexOf(val) > -1) {
        _val.push(item)
      }
    });
    _val = _val.length > 0 ? _val : [{title: '暂无数据，请输入正确的关键字'}]
    dropPopInst5.popListInst.reset({data: _val, listClass:'ss-list'})
  }
})

function template(state, props) {
  return (
    <>
      <View className="pages-title-lg">下拉控件</View>
      <View className='flex-row-wrap demo-grid'>
        <View className='demo-item-content wid-p100 mb-default'>
          <View className='item-head flex-row'>
            <View className='flex-1'>
              <UI_item title='' itemClass='ss-i-block icon-question' data-event='hover' onMouseEnter={this.onClick} onMouseLeave={this.onHide} />
            </View>
            <View className='flex-1'>
              <UI_item title='菜单下拉' itemClass='ss-i-block' data-event='click' tap={this.onClick} />
            </View>
          </View>
          <View className="item-hr" data-content='基础用法'></View>
          <View className="pages-title">基础样式</View>
        </View>

        <View className='demo-item-content wid-p100 mb-default'>
          <View className='item-head flex-row'>
            <View className='flex-1'>
              <dropPopInst.UI/>
            </View>
            <View className='flex-1'>
              <dropPopInst2.UI/>
            </View>
          </View>
          <View className="item-hr" data-content='input'></View>
          <View className="pages-title">基础样式</View>
        </View>

        <View className='demo-item-content wid-p100 mb-default'>
          <View className='item-head flex-row'>
            <View className='flex-1'>
              <dropPopInst3.UI/>
            </View>
            <View className='flex-1'>
              <dropPopInst4.UI/>
            </View>
          </View>
          <View className="item-hr" data-content='input'></View>
          <View className="pages-title">纯下拉</View>
        </View>

        <View className='demo-item-content wid-p100 mb-default'>
          <View className='item-head flex-row'>
            <View className='flex-1'>
              <dropPopInst5.UI/>
            </View>
          </View>
          <View className="item-hr" data-content='input'></View>
          <View className="pages-title">带搜索</View>
        </View>
      </View>
    </>
  )
}

export default function(Pager) {
  return Pager({
    template,
    data: {},
    onItem(e, params, inst) {
      const title = params.title
      Tooltip.hidePop(e, true)
    },
    onClick(e, params, inst) {
      e.stopPropagation()
      const event = inst && inst.attr('data-event') || 'click'
      Tooltip.showPop({event: event, dom: e.target})
    },
    onHide(e) {
      Tooltip.hidePop(e)
    }
  })
}