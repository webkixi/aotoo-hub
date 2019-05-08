//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')

const formData = {
  data: [
    {
      title: '类目6',
      itemClass: 'card-bg',
      input: [
        {
          id: 'ddmenu',
          type: 'dropdown',
          title: '省份',
          placeholder: '请选择省份',
          titles: {
            data: [
              {title: '广东', value: '1001'},
              {title: '湖南', value: '1002'},
              {title: '山东', value: '1003'},
              {title: '广西', value: '1004'},
              {title: '山西', value: '1005'},
            ]
          },
          bindchange: 'ddAction'
        }
      ]
    }
  ]
}

Pager({
  data: {
    motto: formData
  },
  ddAction: function (e, param, inst) {
    const {inputData} = param
    const val = inst.value('ddmenu')
    console.log(val.value);
  }
})
