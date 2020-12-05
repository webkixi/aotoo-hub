/*
 * Aotoo-hub
 * 多项目大前端脚手架
 * 作者：天天修改
 * home-url: http://www.agzgz.com
 * github: https: //github.com/webkixi
 */

import path from 'path'
import aotoo, {$$, lib, render, extTemplate} from "./ao2"
import './ajax'  // context.Fetcher
import marked from "marked";
import _inject from 'aotoo-inject'
import Pager from "./page";
let context = lib.curContext()
let inject = _inject()

function highlightCode(){
  if (lib.isClient()) {
    // 注入markdown 高亮样式
    // inject.css([
    //   'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.3.1/build/styles/monokai-sublime.min.css'
    // ])
  
    // 注入markdown高亮
    inject.js([
      'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.3.1/build/highlight.min.js'
    ], function () {
      setTimeout(() => {
        document.querySelectorAll('pre code').forEach((block) => {
          hljs.highlightBlock(block);
        });
      }, 50);
    })
  }
}

marked.setOptions({
  renderer: new marked.Renderer(),
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
});

extTemplate({
  "@md": function(value, key){
    if (lib.isString(value)) {
      value = value.trim()
    } else {
      return null
    }
    let markdownContent = marked(value);
    return (
      <View key={key} className="markdown-section" dangerouslySetInnerHTML={{ __html: markdownContent }}></View>
    )
  },

  "@html": function(value, key){
    if (lib.isString(value)) {
      value = value.trim()
    } else {
      return null
    }
    return (
      <View key={key} className="html-section" dangerouslySetInnerHTML={{ __html: value }}></View>
    )
  }
})

// 全局加载文档，前端n/ode端
function requireMd(filename, fromapi) {
  let md = null
  if (lib.isClient()) {
    // md = require('docs/' + filename)

    return new Promise((resolve, rej)=>{
      Fetcher.get('/docs', {filename}).then(res=>{
        let targetKey = '@md'
        md = res.data
        if (res.data.data) {  // 数据从node推送过来
          targetKey = '@html'
          md = md.data
        }
        let mdContent = ui_item({
          [targetKey]: md,
          itemClass: 'markdown-body'
        })
        highlightCode()
        resolve(<mdContent.UI />)
      })
    })
  }

  if (lib.isNode()) {
    let approot = process.env.APPENV_SRC
    let filepath = path.join(approot, 'docs/' + filename)
    const commandStr = `
    let marked = require('marked')
    let fs = require('fs')
    let mdStr = ''
    if (fs.existsSync(filepath)) {
      let tmpBuffer = fs.readFileSync(filepath)
      mdStr = tmpBuffer.toString()
      md = marked(mdStr)
      Cache.set(filepath, md)
    }
    `
    let cnt = Cache.ifid(filepath, function(){
      eval(commandStr)
    })
    md = cnt || md
    let mdContent = ui_item({
      "@html": md,
      itemClass: 'markdown-body'
    })
    return fromapi ? {data: md} : (<mdContent.UI />)
  }
  return md
}

let ao2 = aotoo
ao2.lib = lib
ao2.extTemplate = extTemplate
ao2.render = render
ao2.$$ = $$
ao2.inject = inject

context.Pager = Pager
context.$$ = $$
context.ao2 = ao2
context.requireMarkdown = requireMd

export {}