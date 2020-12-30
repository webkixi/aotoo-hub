/**
 * boostrap table 
 */
import _inject from 'aotoo-inject'
const inject = _inject()
const createComponent = ao2
const $$ = ao2.$$
const lib = ao2.lib
const btTableHooks = lib.hooks('btTable-hook')

function injectlib(context) {
  //1.15.1 bug: cannot convert object to primitive value 
  inject.js('https://unpkg.com/bootstrap-table@1.18.1/dist/bootstrap-table.min.js', function() {    
    context.bt3ds = true
    btTableHooks.emit('bt3ds')
  })
}

function done(ele, options){
  if (typeof BootstrapTable != 'undefined') {
    const dom = $('#'+ele)
    this.btTable = dom.bootstrapTable(options)
  }
}

const cpTemplate = function (state, props) {
  return <table className="" id={state.$$id}></table>
};

const cpConfig = {
  // data: { },   //放在export defalut function 里，与传入的参数进行合并
  created() {
    this.bt3ds = false
    injectlib(this)
  },
  attached() {

  },
  ready() {
    let that = this
    if (this.bt3ds || typeof btTable !== 'undefined' ) {
      done.call(this, this.data.$$id, this.data.options)
    } else {
      btTableHooks.on('bt3ds', function() {
        done.call(that, that.data.$$id, that.data.options)
      })
    }
    
  },
  detached() {
  }
};

export default function (params ={}) {
  let dft = {
    $$id: 'btTablex',
    options: {
      sortable: false,    //设置 true为允许列可以排序
      pagination: true,
      paginationLoop: false,
      onlyInfoPagination: true,
      paginationParts: ['pageList'],
      formatLoadingMessage: function () {
        return "请稍等，正在加载中...";
      },
      formatNoMatches: function () {  //没有匹配的结果
        return '无符合条件的记录';
      },
    },        //bootstrapTable 配置部分 可参与bootstrapTable官网
  }
  params.options = params ? Object.assign({}, dft.options, params.options) : params.options       //先合并bt配置，以免被覆盖
  cpConfig.data = Object.assign({}, dft, params)
  const cp = createComponent(cpConfig, cpTemplate);
  return cp
}