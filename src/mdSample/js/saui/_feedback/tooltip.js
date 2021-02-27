import Button from "components/items/button";
import tooltip from "components/items/tooltip";

const Tooltip = tooltip({title: 'title', body: [{title: '我是文字提示的内容'}]})

function template(state, props) {
  console.log('state.list', state.list);
  
  return (
    <>
      <View className="pages-title-lg">文字提示</View>
      <View className='flex-row-wrap demo-grid'>
        {
          state.list.map((item, ii) => {
            return (
              <View className='demo-item-content wid-p100 mb-default' key={'xxx-'+ii}>
                <View className='item-head'>
                  <View className='demo-rounad-ui wid-p80 m-auto'>
                    <View className='item-li mb-default'>
                      <View className='mlr-default mb-default'></View>
                      <View className='ss-relative'>
                        {item.eventMode == 'hover' ? 
                          <Button title='上左' onMouseEnter={this.onDire} onMouseLeave={this.onDireHide} itemClass='btn-default' data-isbody={item.isBody} data-dire='top' data-type='start'/>
                          : <View data-isbody={item.isBody} data-dire='top' data-type='start' className='xx'><Button title='上左' onClick={this.onDire} itemClass='btn-default' data-isbody={item.isBody} data-dire='top' data-type='start'/></View>
                        }
                      </View>
                      <View className='ss-relative mlr-default'>
                        {item.eventMode == 'hover' ? 
                          <Button title='上边' onMouseEnter={this.onDire} onMouseLeave={this.onDireHide} itemClass='btn-default' data-isbody={item.isBody} data-dire='top' />
                          : <View data-isbody={item.isBody} data-dire='top' className='xx'><Button title='上边' onClick={this.onDire} itemClass='btn-default' data-isbody={item.isBody} data-dire='top' /></View>
                        }
                      </View>
                      <View className='ss-relative'>
                        {item.eventMode == 'hover' ? 
                          <Button title='上右' onMouseEnter={this.onDire} onMouseLeave={this.onDireHide} itemClass='btn-default' data-isbody={item.isBody} data-dire='top' data-type='end'/>
                          : <View data-isbody={item.isBody} data-dire='top' data-type='end' className='xx'><Button title='上右' onClick={this.onDire} itemClass='btn-default' data-isbody={item.isBody} data-dire='top' data-type='end'/></View>
                        }
                      </View>
                      <View className='mlr-default'></View>
                    </View>
                    <View className='item-li mb-default'>
                      <View className='ss-relative'>
                        {item.eventMode == 'hover' ? 
                          <Button title='左上' onMouseEnter={this.onDire} onMouseLeave={this.onDireHide} itemClass='btn-default' data-isbody={item.isBody} data-dire='left' data-type='start'/>
                          : <View data-isbody={item.isBody} data-dire='left' data-type='start' className='xx'><Button title='左上' onClick={this.onDire} itemClass='btn-default' data-isbody={item.isBody} data-dire='left' data-type='start'/></View>
                        }
                      </View>
                      <View className='ss-relative'>
                        {item.eventMode == 'hover' ? 
                          <Button title='右上' onMouseEnter={this.onDire} onMouseLeave={this.onDireHide} itemClass='btn-default' data-isbody={item.isBody} data-dire='right' data-type='start'/>
                          : <View data-isbody={item.isBody} data-dire='right' data-type='start' className='xx'><Button title='右上' onClick={this.onDire} itemClass='btn-default' data-isbody={item.isBody} data-dire='right' data-type='start'/></View>
                        }
                      </View>
                    </View>
                    <View className='item-li mb-default'>
                      <View className='ss-relative'>
                        {item.eventMode == 'hover' ? 
                          <Button title='左边' onMouseEnter={this.onDire} onMouseLeave={this.onDireHide} itemClass='btn-default' data-isbody={item.isBody} data-dire='left'/>
                          : <View data-isbody={item.isBody} data-dire='left' className='xx'><Button title='左边' onClick={this.onDire} itemClass='btn-default' data-isbody={item.isBody} data-dire='left'/></View>
                        }
                      </View>
                      <View className='ss-relative'>
                        {item.eventMode == 'hover' ? 
                          <Button title='右边' onMouseEnter={this.onDire} onMouseLeave={this.onDireHide} itemClass='btn-default' data-isbody={item.isBody} data-dire='right'/>
                          : <View data-isbody={item.isBody} data-dire='right' className='xx'><Button title='右边' onClick={this.onDire} itemClass='btn-default' data-isbody={item.isBody} data-dire='right'/></View>
                        }
                      </View>
                    </View>
                    <View className='item-li mb-default'>
                      <View className='ss-relative'>
                        {item.eventMode == 'hover' ? 
                          <Button title='左下' onMouseEnter={this.onDire} onMouseLeave={this.onDireHide} itemClass='btn-default' data-isbody={item.isBody} data-dire='left' data-type='end'/>
                          : <View data-isbody={item.isBody} data-dire='left' data-type='end' className='xx'><Button title='左下' onClick={this.onDire} itemClass='btn-default' data-isbody={item.isBody} data-dire='left' data-type='end'/></View>
                        }
                      </View>
                      <View className='ss-relative'>
                        {item.eventMode == 'hover' ? 
                          <Button title='右下' onMouseEnter={this.onDire} onMouseLeave={this.onDireHide} itemClass='btn-default' data-isbody={item.isBody} data-dire='right' data-type='end'/>
                          : <View data-isbody={item.isBody} data-dire='right' data-type='end' className='xx'><Button title='右下' onClick={this.onDire} itemClass='btn-default' data-isbody={item.isBody} data-dire='right' data-type='end'/></View>
                        }
                      </View>
                    </View>
                    <View className='item-li mb-default'>
                      <View className='mlr-default'></View>
                      <View className='ss-relative'>
                        {item.eventMode == 'hover' ? 
                          <Button title='下左' onMouseEnter={this.onDire} onMouseLeave={this.onDireHide} itemClass='btn-default' data-isbody={item.isBody} data-dire='bottom' data-type='start'/>
                          : <View data-isbody={item.isBody} data-dire='bottom' data-type='start' className='xx'><Button title='下左' onClick={this.onDire} itemClass='btn-default' data-isbody={item.isBody} data-dire='bottom' data-type='start'/></View>
                        }
                      </View>
                      <View className='ss-relative mlr-default'>
                        {item.eventMode == 'hover' ? 
                          <Button title='下边' onMouseEnter={this.onDire} onMouseLeave={this.onDireHide} itemClass='btn-default' data-isbody={item.isBody} data-dire='bottom' />
                          : <View data-isbody={item.isBody} data-dire='bottom' className='xx'><Button title='下边' onClick={this.onDire} itemClass='btn-default' data-isbody={item.isBody} data-dire='bottom' /></View>
                        }
                      </View>
                      <View className='ss-relative'>
                        {item.eventMode == 'hover' ? 
                          <Button title='下右' onMouseEnter={this.onDire} onMouseLeave={this.onDireHide} itemClass='btn-default' data-isbody={item.isBody} data-dire='bottom' data-type='end'/>
                          : <View data-isbody={item.isBody} data-dire='bottom' data-type='end' className='xx'><Button title='下右' onClick={this.onDire} itemClass='btn-default' data-isbody={item.isBody} data-dire='bottom' data-type='end'/></View>
                        }
                      </View>
                      <View className='mlr-default'></View>
                    </View>
                  </View>
                </View>
                <View className="item-hr" data-content={item.title}></View>
                <View className="pages-title">{item.content}</View>
              </View>
            )
          })
        }
      </View>
    </>
  )
}

export default function(Pager) {
  return Pager({
    template,
    data: {
      list: [
        {title: '基础用法', content: '十二种基础样式', isBody: true, eventMode: 'hover'},
        {title: '指定元素下生成', content: 'pop层生成在鼠标经过的同级', isBody: false, eventMode: 'click'},
      ]
    },
    onDire(e, params, inst) {
      // if (e.target.nodeName === 'SPAN') {
      //   return false
      // }
      // e.stopPropagation()
      const type = inst.attr('data-type')
      const dire = inst.attr('data-dire')
      const isBody = inst.attr('data-isbody')
      const _dire = type ? dire + ' ' + type : dire
      if (e.target.className.indexOf('ss-button') > 0) {
        Tooltip.showPop({dom: e.target, direction: _dire, isBody: isBody})
      }
      else {
        Tooltip.showPop({dom: e.target.parentNode, direction: _dire, isBody: isBody})
      }
    },
    onDireHide(e) {
      Tooltip.hidePop(e)
    },
    __ready() {
      const that = this
      // $('.demo-grid').off('click', '.xx').on('click','.xx', function(e) {
      //   e.stopPropagation()
      //   console.log('我是点击xx的e', e);
        
      //   // that.onDire(e)
      // })
    }
  })
}