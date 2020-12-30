const lib = ao2.lib
import _inject from 'aotoo-inject'
let inject = _inject()
import Button from "components/items/button";
import btTable from "components/bt_table";
import Table from "components/list/table";
import { btTableDoc } from "../document";

const btTableDc = Table({
  tableClass: 'wid-p100',
  ...btTableDoc
})

/**
 * 以下是表格里的数据，参数、及方法
 *
 */
function actionFormatter(value, row, index) {
  return [
    '<a class="ss-link-primary ss-block edit" href="javascript:void(0)" title="Edit">修改</a>',
    '<a class="ss-link-primary ss-block remove" href="javascript:void(0)" title="Remove">删除</a>'
  ].join('');
}
let actionEvents = {
  'click .edit': function (e, value, row, index) {
    var randomId = 100 + ~~(Math.random() * 100)
    inst.btTable.bootstrapTable('updateRow', {
      index: index,
      row: {
        id: randomId,
        name: 'Item ' + randomId,
        price: '$' + randomId
      }
    })
  },
  'click .remove': function (e, value, row, index) {
    const ids = row.id        //需要字符串
    inst.btTable.bootstrapTable('remove', {
      field: 'id',
      values: ids
    })
  }
};


const inst = btTable({
  options: {
    toolbar: '#toolbar',//工具栏
    columns: [
      {
          checkbox: true,
          field: 'state',
          align: 'center',
          width: 50,
          valign: 'middle'
      },
      {
          field: 'id',
          title: 'id',
          visible: false,
          valign: 'middle'
      },
      {
          field: 'name',
          title: '名称',
          valign: 'middle',
          sortable: true,
          editable: true
      },
      {
          field: 'price',
          title: '价钱',
          valign: 'middle'
      },
      {
          field: 'Desc',
          title: '操作',
          align: 'right',
          valign: 'middle',
          width: 140,
          events: actionEvents,
          formatter: actionFormatter,
      }
    ],
    data: [
      {
        id: '1',
        name: 'ss',
        price: '999+',
      },
      {
        id: '2',
        name: 'ss',
        price: '999+',
      }
    ],
    loadingTemplate: function () {
      return '<i class="icon-loading"></i>'
    },
  }
})

function template(state, props) {
  //方式二
  return (
    <>
      <View className="pages-title-lg">boostrap Table</View>
      <View className='demo-grid'>
        <View id='toolbar' className='row-flex'>
          <Button  title='新增' itemClass='btn-default' tap={this['onAdd']} />
          <Button  title='ShowLoad' itemClass='btn-default ml-default' tap={this['showload']} />
          <Button  title='HideLoad' itemClass='btn-default ml-default' tap={this['hideload']} />
        </View>
        <inst.UI />
        {/* <View className="pages-title-sm">垂直切换</View> */}
      </View>
      <View className="pages-title-sm">Attributes</View>
      {btTableDc.render()}
    </>
  )
}

export default function(Pager) {
  return Pager({
    template,
    data: {
      tipsList: []
    },
    onAdd() {
      const x = lib.uniqueId('id')
      inst.btTable.bootstrapTable('append', {
        id: x,
        name: 'SAUI ' +x,
        price: '$99999'
      })

    },
    showload() {
      inst.btTable.bootstrapTable('showLoading')
    },
    hideload() {
      inst.btTable.bootstrapTable('hideLoading')
    }
  })
}