/**
 * swiper 
 */
import _inject from 'aotoo-inject'
const inject = _inject()
const createComponent = ao2
const lib = ao2.lib
const swiperHooks = lib.hooks('swiper-hook')



function injectlib(context) {
  inject.js('https://unpkg.com/swiper/swiper-bundle.min.js', function() {
    context.loaded3ds = true
    swiperHooks.emit('loaded3ds')
  })
}

function done(ele, options){
  if(typeof Swiper != 'undefined'){
    ele = '#'+ele
    this.swiper = new Swiper(ele, options)
  }
}

const cpTemplate = function (state, props) {
  const res = state.type === 'img' ? state.data : {listClass: 'swiper-wrapper', data: state.data, itemClass: 'swiper-slide'}
  return (
    <div className={"swiper-container " + state.swiperClass} id={state.$$id}>
      {
        state.type === 'img' ? 
          <div className="swiper-wrapper">
          {
            res.map((item, ii) => {
              return <div key={'sp-'+ii} className="swiper-slide"><img src={item} /></div>
            })
          }
        </div>
        : <UI_list {...res} />
      }
      {state.options.pagination ? <div className="swiper-pagination"></div> : ''}
      {state.options.btn ? 
        <>
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </>
      : ''}
      {state.options.scrollbar ? <div className="swiper-scrollbar"></div> : ''}
    </div>
  )
};

const cpConfig = {
  // data: { },   //放在export defalut function 里，与传入的参数进行合并
  created() {
    this.loaded3ds = false
    injectlib(this)
  },
  attached() {

  },
  ready() {
    let that = this
    if (this.loaded3ds || typeof Swiper !== 'undefined' ) {
      done.call(this, this.$$id, this.data.options)
    } else {
      swiperHooks.on('loaded3ds', function() {
        done.call(that, that.$$id, that.data.options)
      })
    }
    
  },
  detached() {
  }
};

export default function (params) {
  let dft = {
    $$id: 'swiperx',
    swiperClass: '',
    data: [],
    options: {},        //swiper 配置部分 可参与swiper官网
    type: 'list',        //类型来区分data数据是纯图片 还是结构 目前支持img list
  }
  cpConfig.data = Object.assign({}, dft, params)
  const cp = createComponent(cpConfig, cpTemplate);
  return cp
}