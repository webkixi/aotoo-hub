const $$ = ao2.$$
import Loading from "components/items/load";
import Button from "components/items/button";
import Table from "components/list/table";
import { loadDoc } from "../document";

const doc = Table({
  tableClass: 'wid-p100',
  ...loadDoc
})

const load = Loading({
  title: 'loading',
  html: false,
  innerEle: '.demo-3',
})

const load2 = Loading({
  title: 'loading',
  html: false,
  innerEle: '.demo-4',
  absolute: true,
  timer: 2000
})

const data = [
  {title: '基础用法', content: '一个简单的 loading 状态。', child: [ {title: ''}]},
  {title: '基础用法', content: '定时关闭 3000', child: [ {title: 'loading'}]},
  {title: '事件用法', content: '可任意指定位置下', child: [ {title: 'loading', type: 'xx'}]},
  {title: '事件用法', content: '带有定位,定时关闭,默认3000', child: [ {title: 'loading', type: 'xx', absolute: true}]},
]


function template(state, props) {
  //方式二
  return (
    <>
      <View className="pages-title-lg">加载中</View>
      <View className='flex-row-wrap demo-grid num2'>
        {
          state.tipsList.map((item, ii) => {
            ii = ii + 1
            return (
              <View className='ss-col' key={'bl-'+ii}>
                <View className='demo-item-content'>
                  <View className='item-head'>
                    {
                      item.child.map((itemx, jj) => {
                        if (itemx.type !== 'xx') {
                          return <Loading key={'b-'+jj} title={itemx.title || ''} $$id={'load' + ii} />
                        }
                        else {
                          return (
                            <>
                              <View className={'abc demo-'+ii}></View>
                              <Button key={'b1-'+jj} title='开启' data-type='open' itemClass='btn-default' data-absolute={itemx.absolute} tap={this['onClick']} />
                              <Button key={'b2-'+jj} title='关闭' data-type='onclose' itemClass='btn-default ml-default' data-absolute={itemx.absolute} tap={this['onClick']} />
                            </>
                          )
                        }
                      })
                    }
                  </View>
                  <View className="item-hr" data-content={item.title}></View>
                  <View className="pages-title">{item.content}</View>
                </View>
              </View>
            )
          })
        }
      </View>
      <View className="pages-title-sm">Attributes</View>
      {doc.render()}
    </>
  )
}

export default function(Pager) {
  return Pager({
    template,
    data: {
      tipsList: data
    },
    __ready() {
      setTimeout(() => {
        $$('#load2').addClass('disN')
      }, 3000);
    },
    onClick(e, params, inst) {
      const type = inst.attr('data-type')
      const absolute = inst.attr('data-absolute')
      let instx = absolute ? load2 : load
      if (type !== 'onclose') {
        instx.show()
      }
      else {
        instx.hide()
      }
    }
  })
}