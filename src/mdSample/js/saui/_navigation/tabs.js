const {lib} = ao2

import Button from "components/items/button";
import Tabs from "components/list/tabs";

import Table from "components/list/table";
import { tabsDoc } from "../document";

const tabs = Table({
  tableClass: 'wid-p100',
  ...tabsDoc
})


const dataInit = {
  menus: [
    {title: '选项一', itemClass: 'item-link'},
    {title: '选项二', itemClass: 'item-link'},
    {title: '选项三', itemClass: 'item-link'},
  ],
  content: [
    {title: '我是选项一内容啦啦啦~~~~~~~~~'},
    {title: '我是选项二内容啦啦啦！！！！！！'},
    {title: '我是选项三内容啦啦啦！！！！！！发的范德萨范德萨'},
  ],
}

const tabsLine = Tabs({
  ...dataInit,
  containerClass: 'line'
})

const tabsCard = Tabs({
  ...dataInit,
  menusClass: 'flex1',
  containerClass: 'card'
})

const tabsCardAdd = Tabs({
  ...dataInit,
  menusHeader: {
    title: 'scroll定位（前置）'
  },
  menusFooter: {
    itemClass: 'icon-add ss-button btn-grey plain',
    tap: 'onAddTab'
  },
  footer: {
    title: '我是自定义组件底部部分'
  },
  contentClass: 'boxer-scroll',
  containerClass: 'card-tag demo-tabs-fixed-height',
  allShow: true,
  assignJump: true,
  menusMethods: {
    onAddTab(e, p , inst) {
      const idx = tabsCardAdd.getDataLength() + 1
      tabsCardAdd.appendItem({menus: {title: '选项'+idx}, content: {title: '我是选项'+idx+'内容啦啦啦~~~~~~~~~'}})
    }
  }
})

const tabsLineCustomBtn = Tabs({
  menus: [
    {title: [{title: '选项一'}, {itemClass: 'icon-del-small', aim: 'onDelItem?idx=0'}], titleClass: 'flex-row', itemClass: 'item-link'},
    {title: [{title: '选项二'}, {itemClass: 'icon-del-small', aim: 'onDelItem?idx=1'}], titleClass: 'flex-row', itemClass: 'item-link', disabled: true},
    {title: [{title: '选项三'}, {itemClass: 'icon-del-small', aim: 'onDelItem?idx=2'}], titleClass: 'flex-row', itemClass: 'item-link'},
  ],
  content: [
    {title: <>我是选项一内容啦啦啦~~~~~~~~~<input type='text' key='ss' /></>},
    {title: '我是选项二内容啦啦啦！！！！！！'},
    {title: '我是选项三内容啦啦啦！！！！！！发的范德萨范德萨'},
  ],
  menusClass: 'row',
  containerClass: 'line',
  menusMethods: {
    onDelItem(e, p, i) {
      const _idx = parseInt(p.idx)
      tabsLineCustomBtn.deleteItem(_idx)
    }
  }
})

const listLikeTabs = ui_list({
  data: [
    {title: '选项一', itemClass: 'item-link active'},
    {title: '选项二', itemClass: 'item-link'},
    {title: '选项三', itemClass: 'item-link'},
  ],
  listClass: 'tabsMenus'
})

function template(state, props) {
  return (
    <>
      <View className="pages-title-lg">Tabs</View>
      <View className='flex-row-wrap demo-grid'>
        <View className='demo-item-content wid-p100 mb-default'>
          <View className='item-head flex-row'>
            <View className='flex-1'>
              <tabsLine.UI/>
            </View>
          </View>
          <View className="item-hr" data-content='tabs'></View>
          <View className="pages-title">默认tabs</View>
        </View>

        <View className='demo-item-content wid-p100 mb-default'>
          <View className='item-head flex-row'>
            <View className='flex-1'>
              <tabsCard.UI/>
            </View>
          </View>
          <View className="item-hr" data-content='tabs'></View>
          <View className="pages-title">卡片式tabs</View>
        </View>

        <View className='demo-item-content wid-p100 mb-default'>
          <View className='item-head flex-row'>
            <View className='flex-1'>
              <tabsCardAdd.UI/>
            </View>
          </View>
          <View className="item-hr" data-content='tabs'></View>
          <View className="pages-title">菜单里带有添加标签项的按钮。除此之类菜单的前后都可以自定义内容，此组件还带有footer的自定义内容</View>
        </View>

        <View className='demo-item-content wid-p100 mb-default'>
          <View className='item-head flex-row'>
            <View className='flex-1'>
              <tabsLineCustomBtn.UI/>
            </View>
          </View>
          <View className="item-hr" data-content='tabs'></View>
          <View className="pages-title">自定义外部添加tab项</View>
        </View>

        <View className='demo-item-content wid-p100 mb-default'>
          <View className='item-head flex-row'>
            <View className='flex-1 tabs-container line'>
              <listLikeTabs.UI/>
            </View>
          </View>
          <View className="item-hr" data-content='list'></View>
          <View className="pages-title">额外扩展 list列表 tabs</View>
        </View>
      </View>
      <View className="pages-title-sm">Attributes</View>
      {tabs.render()}
    </>
  )
}

export default function(Pager) {
  return Pager({
    template,
    data: {},
    addTab() {
      const idx = tabsLineCustomBtn.getDataLength() + 1
      tabsLineCustomBtn.appendItem({menus: {title: '选项'+idx}, content: {title: '我是选项'+idx+'内容啦啦啦~~~~~~~~~'}})
    },
    changeSort() {
      let _po = tabsLineCustomBtn.getData().position
      if (_po === 'top') {
        _po = 'left'
      }
      else {
        _po = 'top'
      }
      tabsLineCustomBtn.changeSort(_po)
    },
    onRemoveDisabled(e, parmas, inst) {
      const idx = parseInt(inst.attr('data-idx'))
      tabsLineCustomBtn.removeDisabled(idx)
    }
  })
}