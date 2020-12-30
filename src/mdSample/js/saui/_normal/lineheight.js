const {lib, $$} = ao2

function template(state, props) {
  return (
    <>
      <View className="pages-title-lg">自定义行高</View>
      {
        state.list.map((item, ii) => {
          ii = ii + 1
          return (
            <View className={'m-default '+ item.name} key={'bl-'+ii}>
              <View className="color-info">{'.'+item.name}</View>
              <View>{item.title}</View>
            </View>
          )
        })
      }
    </>
  )
}

export default function(Pager) {
  return Pager({
    template,
    data: {
      list: [
        {title: '今天，你学习了么？', name: 'leading-none'},
        {title: '今天，你学习了么？', name: 'leading-tight'},
        {title: '今天，你学习了么？', name: 'leading-snug'},
        {title: '今天，你学习了么？', name: 'leading-normal'},
        {title: '今天，你学习了么？', name: 'leading-relaxed'},
        {title: '今天，你学习了么？', name: 'leading-loose'},
      ]
    },
    onReady(){
    }
  })
}