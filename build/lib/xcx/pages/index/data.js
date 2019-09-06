const data = [
  {
    title: 'Basic 基础组件',
    id: 'basic',
    list: [
      { title: 'Button', attrx: 'button', littleTitle: '按钮 ' },
      { title: 'Utility', attrx: 'utility', littleTitle: '工具类 ' },
      { title: 'Tag', attrx: 'tag', littleTitle: '标签 ' },
      { title: 'Article', attrx: 'article', littleTitle: '文章 ' },
    ]
  },
  {
    title: 'List 列表',
    id: 'list',
    list: [
      { title: 'Image-text', attrx: 'list', littleTitle: '图文列表 ' },
      { title: 'slip', attrx: 'slip', littleTitle: '左滑删除 ', isNews: true},
    ]
  },
  {
    title: 'Feedback 操作反馈',
    id: 'feedback',
    list: [
      { title: 'Modal', attrx: 'modal', littleTitle: '弹出层 ' },
      // { title: 'Toast', attrx: 'toast', littleTitle: '提示 ' },
      { title: 'Score', attrx: 'score', littleTitle: '评分 ', isNews: true },
    ]
  },
  {
    title: 'Form 表单',
    id: 'form',
    list: [
      { title: 'Input', attrx: 'input', littleTitle: '文本类 ' },
      { title: 'Number', attrx: 'number', littleTitle: '数字类 ' },
      { title: 'Icon', attrx: 'icon', littleTitle: 'icon替代标题文字 ' },
      { title: 'Switch', attrx: 'switch', littleTitle: '开关 ' },
      { title: 'Union', attrx: 'union', littleTitle: '联动 ' },
      { title: 'Checkbox', attrx: 'checkbox', littleTitle: '多选择框 ' },
      { title: 'Radio', attrx: 'radio', littleTitle: '单选择框 ' },
      { title: 'Slider', attrx: 'slider', littleTitle: '滑动选取器 ' },
      { title: 'Single-picker', attrx: 'singlepicker', littleTitle: '单层弹层选择器 ' },
      { title: 'Multipy-picker', attrx: 'multipypicker', littleTitle: '多层弹层选择器 ' },
      { title: 'Dropdown', attrx: 'dropdown', littleTitle: '下拉菜单 ' },
    ]
  },
  {
    title: 'Navigation 导航组件',
    id: 'navigation',
    list: [
      { title: 'Tabs', attrx: 'tabs', littleTitle: '标签页', isNews: true},
      { title: 'Screen', attrx: 'screen', littleTitle: '仿携程，同程筛选', isNews: true},
    ]
  },
  {
    title: 'char 雷达图',
    id: 'spider',
    list: [
      { title: 'Spider', attrx: 'spiderchar', littleTitle: '蜘蛛网图 ' },
    ]
  },
  // {
  //   title: 'Yc',
  //   id: 'yc',
  //   list: [
  //     { title: 'Swiper', attrx: 'swiper', littleTitle: '轮播 ' },
  //     { title: 'Sidescroll', attrx: 'sidescroll', littleTitle: '滚动 ' },
  //     { title: 'Stickybar', attrx: 'stickybar', littleTitle: '轮播 ' },
  //   ]
  // }
]

const actionSideData = [
  {
    title: 'DEMO 更新', 
    id: 'demo',
    list: [
      {title: '导航组件', desc: '仿携程，同程筛选', type: 'demo'},
      {title: '操作反馈', desc: '评分', type: 'demo'},
      {title: '列表', desc: '左滑删除', type: 'demo'}
    ]
  },
  {
    title: '框架 更新', 
    id: 'xm',
    list: [
      {title: '1 ', desc: '支持小程序云开发,通过配置项简单设置',  type: 'xm'},
      {title: '2 ', desc: '内核优化，解决组件数据污染的问题',  type: 'xm'},
      {title: '3 ', desc: '优化wxs中的通用touch响应事件',  type: 'xm'},
    ]
  },
]


export default {
  data,
  actionSideData
}