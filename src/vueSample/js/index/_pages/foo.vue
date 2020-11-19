<template>
  <div class="page-container" >
    <h1>{{foo}}</h1>
    <a class="mylink" href="https://www.github.com/webkixi/aotoo-hub" target="_blank">GITHUB</a>
    <a class="mylink" href="http://www.agzgz.com" target="_blank">官网</a>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        foo: 'Vue项目演示'
      }
    },
    created(){
      console.log('====== xxxx');
    }
  }
</script>
