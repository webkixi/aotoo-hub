//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')
const lib = Pager.lib

const formData = {
  data: [
    {
      title: '多选择器-确定后设置值',
      itemClass: 'card-bg',
      input: [
        {
          id: 'test_pickers',
          type: 'picker',
          title: '双选选择器',
          values: [
            [
              {title: '猫科', id: '100', select: true},
              {title: '狗科', id: '101'},
            ],
            [
              {title: '老虎', id: '102'},
              {title: '狮子', id: '103'},
              {title: '豹子', id: '104', select: true},
              {title: '野狗', id: '105'},
            ],
          ],
          itemClass: 'icon-arrows-r-absolute',
        },
        {
          id: 'test_pickers',
          type: 'picker',
          title: '三选选择器',
          values: [
            [
              {title: '猫科', id: '100', select: true},
              {title: '狗科', id: '101'},
            ],
            [
              {title: '老虎', id: '102'},
              {title: '狮子', id: '103'},
              {title: '豹子', id: '104', select: true},
              {title: '野狗', id: '105'},
            ],
            [
              {title: '猎豹', id: '106'},
              {title: '猞猁', id: '107'},
              {title: '英短', id: '108'}
            ]
          ],
          itemClass: 'icon-arrows-r-absolute',
        },
        {
          id: 'test_pickers',
          type: 'picker',
          title: '四选选择器',
          values: [
            [
              {title: '猫科', id: '100', select: true},
              {title: '狗科', id: '101'},
            ],
            [
              {title: '老虎', id: '102'},
              {title: '狮子', id: '103'},
              {title: '豹子', id: '104', select: true},
              {title: '野狗', id: '105'},
            ],
            [
              {title: '猎豹', id: '106'},
              {title: '猞猁', id: '107'},
              {title: '英短', id: '108'}
            ],
            [
              {title: '猎豹', id: '106'},
              {title: '猞猁', id: '107'},
              {title: '英短', id: '108'}
            ]
          ],
          itemClass: 'icon-arrows-r-absolute',
        },
      ]
    },
    
    {
      title: '多选择器-即时设置值',
      itemClass: 'card-bg',
      input: [
        {
          id: 'test_pickers',
          type: 'picker',
          title: '三选选择器',
          bindcolumnchange: true,
          values: [
            [
              {title: '猫科', id: '100', select: true},
              {title: '狗科', id: '101'},
            ],
            [
              {title: '老虎', id: '102'},
              {title: '狮子', id: '103'},
              {title: '豹子', id: '104', select: true},
              {title: '野狗', id: '105'},
            ],
            [
              {title: '猎豹', id: '106'},
              {title: '猞猁', id: '107'},
              {title: '英短', id: '108'}
            ]
          ],
          itemClass: 'icon-arrows-r-absolute',
        },
      ]
    },

    {
      title: '动态表单',
      itemClass: 'card-bg',
      input: [
        {
          id: 'test_text',
          type: 'text',
          title: '标题',
          placeholder: 'picker的选项将被插入这里',
          itemClass: 'icon-arrows-r-absolute',
        },
        {
          id: 'test_pickers8',
          type: 'picker',
          title: '多选选择器',
          values: [
            [
              {title: '猫科', id: '100', select: true},
              {title: '狗科', id: '101'},
            ],
            [
              {title: '老虎', id: '102'},
              {title: '狮子', id: '103'},
              {title: '豹子', id: '104', select: true},
              {title: '野狗', id: '105'},
            ],
            [
              {title: '猎豹', id: '106'},
              {title: '猞猁', id: '107'},
              {title: '英短', id: '108'}
            ]
          ],
          itemClass: 'icon-arrows-r-absolute',
          bindchange: 'pickerAction'
        },
        {
          id: 'btn_prt_value',
          type: 'button',
          value: '打印值',
          tap: 'prtValue'
        },
      ]
    },
    {
      title: '联动选择器',
      itemClass: 'card-bg',
      input: [
        {
          id: 'test_pickers9',
          type: 'picker',
          title: '多选选择器',
          values: [
            [
              {title: '猫科', id: '100', select: true},
              {title: '狗科', id: '101'},
            ],
            [
              {title: '老虎', id: '102'},
              {title: '狮子', id: '103'},
              {title: '豹子', id: '104', select: true},
              {title: '野狗', id: '105'},
            ],
            [
              {title: '猎豹', id: '106'},
              {title: '猞猁', id: '107'},
              {title: '英短', id: '108'}
            ]
          ],
          itemClass: 'icon-arrows-r-absolute',
          bindcolumnchange: 'pickerColumnAction'
        },
        {
          id: 'btn_prt_value',
          type: 'button',
          value: '打印值',
          tap: 'prtValue'
        },
      ]
    },
  ]
}

Pager({
  data: {
    motto: formData
  },
  pickerAction: function (e, param, inst) {
    const {inputData, profile} = param
    const _values = inputData.values
    const values = []
    inputData.value.forEach((idx, ii)=>{
      values.push({
        title: _values[ii][idx].title,
        id: _values[ii][idx].id
      })
    })
    if (values.length) {
      const content = values.map(item=>item.title)
      const ids = values.map(item=>item.id)
      inst.value('test_text', {
        value: '您选了' + content.join(',') + ', id分别为' + ids.join(',')
      })
    }
  },
  pickerColumnAction: function (e, param, inst) {
    const detail = e.detail
    const {column, value} = detail
    let {inputData, profile} = param
    if (column || column === 0) {
      if (column === 0) {
        if (value == 1) {
          inputData.values[1] = [
            {title: '猫猫', id: '201'},
            {title: '臭猫猫', id: '202'},
            {title: '丑猫猫', id: '203'},
            {title: '五毛猫猫', id: '204'},
          ]
        }
      }
      if (column === 1) {
        if (value == 1) {
          inputData.values[2] = [
            {title: 'A猫猫', id: '301'},
            {title: 'B臭猫猫', id: '302'},
            {title: 'C丑猫猫', id: '303'},
            {title: 'D五毛猫猫', id: '304'},
          ]
        }
      }
      return inputData
    }
  },
  prtValue: function (e, param, inst) {
    const val = inst.value('test_pickers9')
    console.log('picker选项值为：', val.value)
  }
})
