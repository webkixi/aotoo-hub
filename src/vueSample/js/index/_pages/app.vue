<template>
  <div class="page-container" >
    <div class="router-menus">
      <router-link class='yyy' to="/foo"> {{pageName[0]}} </router-link>
      <router-link to="/bar">{{pageName[1]}}</router-link>
    </div>
    <router-view class="router-content"></router-view>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        pageName: [
          '第一页',
          '第二页'
        ]
      }
    },
    created(){
      console.log('====== xxxx');
    }
  }
</script>

<style lang="stylus">
.mylink
  display block
  margin-top 20px
body
  padding 0
  margin 0
.page-container
  box-sizing border-box
  width 100%
  height 100vh
  display flex
  .router-menus
    width 200px
    display flex
    flex 1 0 auto
    flex-direction column
    box-sizing border-box
    padding 10px
  .router-content
    background-color #efefef
    box-sizing border-box
    padding 10px
    display block

</style>