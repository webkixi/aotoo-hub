/**
 * input item的容器
 */

import { lib } from "../util";
import { inputParser } from '../dataparser'
import { createAttachment, useMyAttachment } from "../attachment";
import { createAttrState } from "../attributes";
import { supplementEvents } from "../events";
import { useState, createStore } from '../util'

export function InputBody(props){
  let parent = props.parent || props.store || createStore()
  let InputEntity = props.entity  // 注册组件
  


  
  
  let [inputConfig, setInputConfig] = useState(() => props.from ? props.data : (()=> inputParser(props.data))())
  let uniqId = inputConfig.uniqId

  React.useEffect(()=>{
    let iptConfig = props.from ? props.data : (()=> inputParser(props.data))()
    setAttribute((iptConfig.attributes))
  }, [props.data])



  

  
  
  // let [ inputContext, attributesContext, attributesFunKeys ] = createAttrState(inputConfig)
  // let { myrequired, myItemClass, myItemStyle, mytitle, mydesc, myerror, myshow, errorType, context, funKeys } = useMyAttachment(inputConfig)

  // let [attr, setAttribute] = React.useState(inputConfig)

  let [attr, setAttribute] = useState(()=>(inputConfig.attributes||{}))
  let [ inputContext, attributesContext, attributesFunKeys ] = createAttrState(inputConfig.id, attr, setAttribute)
  let { myrequired, myItemClass, myItemStyle, mytitle, mydesc, myerror, mytip, myshow, errorType, context, funKeys } = useMyAttachment(inputConfig)
  inputConfig.attributes = attr
  





  let allFunkeys = Object.assign({}, funKeys, attributesFunKeys)
  let mycontext = Object.assign({}, context, inputContext, attributesContext)

  mycontext.asset = {
    attributes: attr,
    properties: inputConfig.properties
  }
  // attr方法仿jquery的attr方法
  mycontext.attr = function(ky, val, cb){
    if (ky) {
      let fn = typeof val !== 'undefined' ? allFunkeys[ky][0] : allFunkeys[ky][1]
      if (attributesContext[fn]) {
        if (inputContext[fn] || context[fn]) {
          console.warn(`${fn}方法将覆盖同名方法，请区分属性命名`, props.data);
        }
      }

      let fun = mycontext[fn]
      return fn && fun && fun(val, cb)
    }
  }
  mycontext.save = function(e, cb){
    if (e) {
      if (e.target) {
        let readOnly = e.target.readOnly
        let disabled = e.target.disabled
        if (readOnly || disabled) {
          return
        }
        mycontext.setValue(e.target.value, cb)
      } else {
        mycontext.setValue(e, cb)
      }
    }
  } 
  
  let attributes = supplementEvents(inputConfig, mycontext, parent)
  attributes.className = attributes.className ? attributes.className.indexOf('input') === 0 ? attributes.className : `input ${attributes.className}` : 'input'
  parent.ctx.elements[attributes.id] = mycontext
  if (attributes.name) {
    parent.ctx.elements[attributes.name] = mycontext
  }
  attributes.store = mycontext



  // InputEntity = InputEntity || <input {...attributes} />
  InputEntity = InputEntity ? React.isValidElement(InputEntity) ? InputEntity : <InputEntity {...attributes}/> : <input {...attributes} />



  return myshow ? (
    <div className={`line-item ${myItemClass||''}`} style={myItemStyle}>
      {(myrequired && myrequired.UI) ? <myrequired.UI /> : myrequired}
      {(mytitle && mytitle.UI) ? <mytitle.UI /> : mytitle}
      <div className="item-entity">
        {InputEntity}
        {(mytip && mytip.UI) ? <mytip.UI /> : mytip  /* 提示 */ } 
        {(myerror && myerror.UI) ? <myerror.UI /> : myerror  /* success , warning, error info */ } 
      </div>
      {(mydesc && mydesc.UI) ? <mydesc.UI /> : mydesc}
    </div>
  ) : null
}