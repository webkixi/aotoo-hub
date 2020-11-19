/**
 * vendors
 * vendors的内容应该适用于前端, node端
 * 如果aotoo.config.js的项目配置中，字段server=true，vendors/index.js将会被node端引用
 */

import '../../../mdSample/js/vendors/ajax';  // 定义了全局Fetcher，基于axios
import {lib} from '../../../mdSample/js/vendors/ao2'; // lodash超集
import _inject from 'aotoo-inject';  // 静态资源注入

const context = lib.curContext()  // 浏览器端的window，node端的global
const inject = _inject()

context.inject = inject
context._ = lib 

inject.js(['jquery']) // 注入cdn jquery，aotoo-inject自带cdn链接
module.exports = {}