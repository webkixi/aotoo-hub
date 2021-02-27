import Tree from "components/tree";
import Table from "components/list/table";
import { treeDoc } from "../document";

const treeDc = Table({
  tableClass: 'wid-p100',
  ...treeDoc
})
import _message from "components/items/message";
const message = _message()

//checked: true 不代表全选，仅表示有值
const treeData = [
  {
    title: '菜单一',
    id: 'aaa',
    children: [
      {
        title: '标题2',
        parentId: 'aaa',
        id: 'level21',
        children: [
          {
            title: '标题8',
            parentId: 'level21',
            id: 'aaa1-1-1',
            checked: true,
          }
        ]
      },
      {
        title: '标题3',
        parentId: 'aaa',
        id: 'level2',
        children: [
          {
            title: '标题3-1',
            parentId: 'level2',
            id: 'level2-a',
            checked: true,
            disabled: true,
          },
          {
            title: '标题4',
            parentId: 'level2',
            id: 'level2-b'
          },
          {
            title: '标题5',
            parentId: 'level2',
            id: 'level2-1',
            children: [
              {
                title: '标题6a',
                parentId: 'level2-1',
                id: 'level2-4-2',
              },
              {
                title: '标题6b',
                parentId: 'level2-1',
                id: 'level2-4',
                children: [
                  {
                    title: '标题6-1',
                    parentId: 'level2-4',
                    id: 'level2-4-1-1',
                  },
                  {
                    title: '标题6-2',
                    parentId: 'level2-4',
                    id: 'level2-4-1-2',
                  },
                ]
              },
            ]
          },
        ]
      }
    ]
  },
  {
    title: '菜单二',
    id: 'ss',
    children: [
      {
        title: '标题2',
        parentId: 'ss',
        id: 'ss-1',
      }
    ]
  }
]

const treeInst = Tree({
  data: treeData,
  header: {
    title: [
      {
        title: '获取选中数据',
        itemClass: 'ss-button btn-default',
        aim: 'getTreeData'
      },
      {
        title: '清空',
        itemClass: 'ss-button btn-grey mlr-default',
        aim: 'clearTreeData'
      },
      {
        title: '重置',
        itemClass: 'ss-button btn-default',
        aim: 'resetData'
      },
      {
        title: '展开/收起',
        itemClass: 'ss-button btn-default mlr-default',
        aim: 'onChangeShowAll'
      },
      {
        title: '显示/隐藏 Check',
        itemClass: 'ss-button btn-default',
        aim: 'onChangeCheck'
      },
      {
        title: '更换点击图标',
        itemClass: 'ss-button btn-default mlr-default',
        aim: 'onChangeToggle'
      },
    ],
    tilteClass: 'flex-row',
    itemClass: 'mb-default'
  },
  methods: {
    getTreeData() {
      const getData = treeInst.getChecked()
      message.notice({
        title: '选中的值为：',
        body: getData,
        showClose: true,
        timer: 3000,
      })
    },
    clearTreeData() {
      treeInst.clearChecked()
    },
    resetData() {
      treeInst.resetControl()
    },
    onChangeShowAll() {
      const aa = treeInst.getData().allShow
      aa ? treeInst.updateStyle({allShow: false}) : treeInst.updateStyle({allShow: true})
    },
    onChangeCheck() {
      const aa = treeInst.getData().showCheck
      aa ? treeInst.updateStyle({showCheck: false}, true) : treeInst.updateStyle({showCheck: true}, true)
    },
    onChangeToggle(e, p  ,i) {
      const aa = treeInst.getData().icon
      if (aa.indexOf('icon-select') > -1) {
        treeInst.updateStyle({icon: 'icon-add', showCheck: false, allShow: false, listClass: 'ss-tree add'}, true)
      }
      else {
        treeInst.updateStyle({icon: 'icon-select', showCheck: false, allShow: false, listClass: 'ss-tree show'}, true)
      }
    }
  }
})

function template(state, props) {
  //方式二
  return (
    <>
      <View className="pages-title-lg">Tree 树形控件</View>
      <treeInst.UI/>
      <View className="pages-title-sm">Attributes</View>
      {treeDc.render()}
    </>
  )
}

export default function(Pager) {
  return Pager({
    template,
    data: {
      tipsList: []
    },
    
  })
}