const Pager = require('components/aotoo/core')

const inputTips = Pager.item({
  title: '',
  itemClass: ' ',
  methods: {
    // show: 
    onHide: function() {
      this.hooks.emit('hide')
      this.update({ itemClass: 'none' })
    },
    top: function(params) {
      const {title, itemClass} = params
      this.update({
        title: {
          title: title,
          itemClass: 'input-tips'
        },
        itemClass: itemClass || 'popups-wrap-input',
        tap: 'onHide'
      }, function(){
        setTimeout(() => this.hide(), 500);
      })
    },
    mid: function(params, time) {
      const {title, itemClass} = params
      this.update({
        title: title,
        itemClass: itemClass || 'popups-wrap',
        tap: 'onHide'
      }, function(){
        setTimeout(() => this.onHide(), time || 500);
      })
    }
  }
})

export default inputTips