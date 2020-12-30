import Button from "components/items/button";
import tooltip from "components/items/tooltip";

const Tooltip = tooltip({title: '我是文字提示的标题', body: [{title: '我是文字提示的内容！！！！！！！！！！！！！'}]})

function template(state, props) {
  return (
    <>
      <View className="pages-title-lg">警告提示</View>
      <View className='flex-row-wrap demo-grid num2'>
        <View className='demo-item-content'>
            <View className='item-head'>
              {
                <View className='demo-rounad-ui'>
                  <View className='item-li mb-default'>
                    <View className='mlr-default mb-default'></View>
                    <Button title='上左' onMouseEnter={this.onDire} onMouseLeave={this.onDireHide} itemClass='btn-default' data-dire='top' data-type='start'/>
                    <Button title='上边' onMouseEnter={this.onDire} onMouseLeave={this.onDireHide} itemClass='btn-default mlr-default' data-dire='top' />
                    <Button title='上右' onMouseEnter={this.onDire} onMouseLeave={this.onDireHide} itemClass='btn-default' data-dire='top' data-type='end'/>
                    <View className='mlr-default'></View>
                  </View>
                  <View className='item-li mb-default'>
                    <Button title='左上' onMouseEnter={this.onDire} onMouseLeave={this.onDireHide} itemClass='btn-default' data-dire='left' data-type='start'/>
                    <Button title='右上' onMouseEnter={this.onDire} onMouseLeave={this.onDireHide} itemClass='btn-default' data-dire='right' data-type='start'/>
                  </View>
                  <View className='item-li mb-default'>
                    <Button title='左边' onMouseEnter={this.onDire} onMouseLeave={this.onDireHide} itemClass='btn-default' data-dire='left'/>
                    <Button title='右边' onMouseEnter={this.onDire} onMouseLeave={this.onDireHide} itemClass='btn-default' data-dire='right'/>
                  </View>
                  <View className='item-li mb-default'>
                    <Button title='左下' onMouseEnter={this.onDire} onMouseLeave={this.onDireHide} itemClass='btn-default' data-dire='left' data-type='end'/>
                    <Button title='右下' onMouseEnter={this.onDire} onMouseLeave={this.onDireHide} itemClass='btn-default' data-dire='right' data-type='end'/>
                  </View>
                  <View className='item-li mb-default'>
                    <View className='mlr-default'></View>
                    <Button title='下左' onMouseEnter={this.onDire} onMouseLeave={this.onDireHide} itemClass='btn-default' data-dire='bottom' data-type='start'/>
                    <Button title='下边' onMouseEnter={this.onDire} onMouseLeave={this.onDireHide} itemClass='btn-default mlr-default' data-dire='bottom' />
                    <Button title='下右' onMouseEnter={this.onDire} onMouseLeave={this.onDireHide} itemClass='btn-default' data-dire='bottom' data-type='end'/>
                    <View className='mlr-default'></View>
                  </View>
                </View>
              }
            </View>
            <View className="item-hr" data-content='基础用法'></View>
            <View className="pages-title">四种基础样式</View>
          </View>
      </View>
    </>
  )
}

export default function(Pager) {
  return Pager({
    template,
    data: {},
    onDire(e, params, inst) {
      e.stopPropagation()
      const type = inst.attr('data-type')
      const dire = inst.attr('data-dire')
      const _dire = type ? dire + ' ' + type : dire
      Tooltip.show({checkedEvent: e, direction: _dire})
    },
    onDireHide(e) {
      Tooltip.hide(e)
    }
  })
}