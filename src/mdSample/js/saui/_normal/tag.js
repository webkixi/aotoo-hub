const {lib, $$} = ao2
import Button from "components/items/button";
import dynamicTag from "components/items/droppop";

const dyPuretag = dynamicTag({
  placeholder: '+ New Tag',
  type: 'pureTag',
  pureTagType: 2,
  valued: [{title: '选项一', id: 'aa1'}],
  tagSpecial: true,
  autoCreateTag: true,
  readOnly: false,
  itemClass: 'wid-p70 tag-pure'
})
const dytag = dynamicTag({
  placeholder: 'Tag Siblings',
  type: 'pureTag',
  valued: [{title: '选项一', id: 'aa1'}, {title: '选项二', id: 'aa2'}],
  tagSpecial: true,
  autoCreateTag: true,
  readOnly: false,
  itemClass: 'wid-p70'
})

function template(state, props) {
  return (
    <>
      <View className="pages-title-lg">标签</View>
      {
        state.buttonList.map((item, ii) => {
          ii = ii + 1
          return (
            <View className='m-default' key={'bl-'+ii}>
              <View className="pages-title">{ii + '、 ' +item.title}</View>
              <View className='mt-default'>
                {
                  item.child.map((itemx, jj) => {
                    return <View key={'b-'+jj}className={'ss-tag ml-default ' + itemx.name} >{itemx.title || item.title}<Text data-close={item.close}></Text></View>
                  })
                }
              </View>
            </View>
          )
        })
      }
      <View className='demo-item-content wid-p100 mb-default'>
        <View className='item-head flex-row'>
          <View className='flex-1'>
            <dyPuretag.UI/>
          </View>
          <View className='flex-1'>
            <dytag.UI/>
          </View>
        </View>
        <View className="item-hr" data-content='tag&input'></View>
        <View className="pages-title">动态编辑标签</View>
      </View>
    </>
  )
}

export default function(Pager) {
  return Pager({
    template,
    data: {
      buttonList: [
        {title: '默认', child: [{name: 'tag-default'}, {name: 'tag-minor'}, {name: 'tag-grey'}]},
        {title: '空心', child: [{name: 'tag-default plain'}, {name: 'tag-minor plain'}, {name: 'tag-grey plain'}]},
        {title: '圆角', child: [{name: 'tag-default round'}, {name: 'tag-minor round'}, {name: 'tag-grey round'}]},
        {title: '大小', child: [{name: 'tag-default larger plain'}, {name: 'tag-minor plain'}, {name: 'tag-grey small plain'}]},
        {title: '带操作', close: true, child: [{title: '选项A', name: 'tag-default plain'}, {title: '选项B', name: 'tag-minor plain'}, {title: '选项C', name: 'tag-grey plain'}]},
      ],
      dynamicList: [
        {title: '动态编辑标签'},
        {title: '动态编辑标签 Input'},
      ]
    },
    onReady(){
    }
  })
}