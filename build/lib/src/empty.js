/*
 * Aotoo-hub
 * 多项目大前端脚手架
 * 作者：天天修改
 * home-url: http://www.agzgz.com
 * github: https: //github.com/webkixi
 */

// 前端业务逻辑页面请写在此处
// 该静态文件会自动加载到业务页面中
import ij from 'aotoo-inject'
const inject = ij();
inject.css(`
  body{
    font-size: 1.2em;
  }
`)

inject.js([
  'https://cdn.bootcss.com/jquery/3.3.1/jquery.js'
], function () {
  window.$ = jQuery
  $('#root').html(`
    这是一个新项目
    <br />
    更多aotoo-hub使用说明请移步 <a href="http://www.agzgz.com" target='__blank'>agzgz</a>
    <br />
    <a href="https://codesandbox.io/u/webkixi/sandboxes" target='__blank'>demo</a>
  `)
})