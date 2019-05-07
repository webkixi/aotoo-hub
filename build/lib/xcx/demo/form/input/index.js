//index.js
//获取应用实例
const app = getApp()
const Pager = require('components/aotoo/core')
const lib = Pager.lib

const formData = {
  $$id: 'formInst',
  data: [
    {
      title: '文本类表单元素',
      itemClass: 'card-bg',
      input: [
        {type: 'text', id: 'username', title: '用户名', placeholder: '请输入用户名' },
        {type: 'text', id: 'email', title: '邮  箱', error: '错误提示信息', placeholder: '接收信息的安全邮箱'},
        {type: 'text', id: 'mobile', title: '手机号', error: '手机错误提示信息', desc: '一段描述性的代码', placeholder: '请输入手机号码'},
      ]
    },
    {
      title: '动态表单',
      itemClass: 'card-bg',
      input: [
        {
          id: 'fillit', type: 'text', title: '标题', placeholder: '选择下列列表项内容',
          desc: {
            title: '附加描述信息',
            '@list': {
              data: [
                {title: 'java', tap: 'oktapme?content=java'},
                {title: 'php', tap: 'oktapme?content=php'},
                {title: '前端', tap: 'oktapme?content=前端'},
                {title: '后端', tap: 'oktapme?content=后端'}
              ],
              listClass: 'streamAims',
              itemClass: 'streamAims-item'
            }
          }
        },
        {
          id: 'test_text',
          type: 'text',
          title: '标题',
          placeholder: '单选框选择以动态设置该文本框内容',
          itemClass: 'mt-8-r'
        },
        {
          name: 'test_radio1',
          type: 'radio',
          title: '请选择',
          value: '1',
          values: ['1', '2', '3', '4'],
          titles: ['A', 'B', 'C', 'D'],
          itemClass: 'mt-8-r',
          desc: '点击选择触发修改标题内容',
          bindchange: 'response'
        },
        {
          id: 'btn_error',
          type: 'button',
          value: '显示出错',
          tap: 'setError'
        },
        {
          id: 'btn_rmv_error',
          type: 'button',
          value: '清除信息',
          tap: 'rmvError'
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
    motto: formData,
    listClass: 'xxxx'
  },
  oktapme: function (e, param={}, ctx) {
    const formInst = this.getElementsById('formInst')
    const oldValue = formInst.value('fillit').value
    formInst.value('fillit', {value: oldValue ? oldValue + ' ' + param.content : param.content})
  },
  response: function (e, param, ctx) {
    if (param){
      const inputData = param.inputData
      switch (inputData.value) {
        case '1':
          ctx.value('test_text', {value: '您选中了A'})
          break;
        case '2':
          ctx.value('test_text', {value: '您选中了B'})
          break;
        case '3':
          ctx.value('test_text', {value: '您选中了C'})
          break;
        case '4':
          ctx.value('test_text', {value: '您选中了D'})
          break;
      }
    }
  },
  setError: function (e, param, ctx) {
    ctx.addWarn('test_text', '请填写类容')
  },
  rmvError: function (e, param, ctx) {
    ctx.removeWarn('test_text')
  },
  prtValue: function (e, param, ctx) {
    console.log(ctx.value('test_text').value);
  }
})
