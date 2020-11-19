import {lib, $$} from '../../ao2'
import Pager, { page } from "../../page";

const fakePager = require('./fakepager').default(Pager)
export function getRenderPage({$query, selectPageItem, selectPageContent}){
  let that = this
  let pageInst = null
  selectPageContent = selectPageContent
  selectPageItem = selectPageItem
  if (lib.isFunction(selectPageContent)) {
    selectPageContent = selectPageContent(fakePager)
  }
  if (React.isValidElement(selectPageContent)) {
    selectPageContent = {
      children: selectPageContent,
      data: {},
    }
  }
  if (lib.isPlainObject(selectPageContent)) {
    // selectPageContent.__key = selectPageItem.id
    pageInst = page(selectPageContent) // Page为page的实例
    let oldReady = pageInst.onReady
    pageInst.onReady = function () {
      that.onPageReady(this)
      if (lib.isFunction(oldReady)) {
        oldReady.call(this)
      }
    }
    pageInst.id = selectPageItem.id
  }
  return pageInst
}