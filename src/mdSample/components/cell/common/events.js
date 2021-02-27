/**
 * 数据解析时，绑定用户事件，并预绑定事件触发时联动方法
 */

import { useState, lib } from "./util";

function emitUnionResponse(response, evtkey, ctx, parent, evt) {
  response.forEach(linkitem=>{
    let [ekey, linkfun, srcId] = linkitem
    let sourceBehaviorContext = parent.ctx.elements[srcId]
    let value = ctx.getValue()
    if (ekey) {
      if (ekey === evtkey) linkfun.call(sourceBehaviorContext, {value}, ctx)
    } else {
      linkfun.call(sourceBehaviorContext, {value}, ctx)
    }
  })
}

function getDynamicUnion(prefix, parent) {
  let target = []
  lib.forEach(parent._dynamicUnion, (un, ii, ky)=>{
    if (ky.indexOf(prefix) === 0) {
      target.push(un)
    }
  })
  return target
}

export function supplementEvents(inputConfig, mycontext, parent){
  let attributes = inputConfig.attributes || {}
  let properties = inputConfig.properties || {}
  let events = inputConfig.events || {}
  let unionResponse = properties.unionResponse || []
  // let dynamicUnion = parent._dynamicUnion[('response-' + inputConfig.id)]
  let dynamicUnion = getDynamicUnion(('response-' + inputConfig.id), parent)
  if (dynamicUnion && lib.isArray(dynamicUnion)) {
    unionResponse = unionResponse.concat(dynamicUnion)
  }

  function innerOnChange(e){
    mycontext.setValue(e.target.value)
  }

  if (lib.isEmpty(events)) {
    events = { onChange: innerOnChange}
    if (unionResponse.length) {
      // unionResponse = unionResponse.map(un=>{ un[0] = null; return un })
      unionResponse.forEach(un=>{
        if (un[0] && un[0]!=='onChange')  {
          events[un[0]] = true
        }
      })
    }
  }

  // 有value时必须绑onChange事件
  if (attributes.hasOwnProperty('value')) {
    let hasOnChangeEvent = true
    if (!events.onChange) {
      hasOnChangeEvent = false
    }
    if (!hasOnChangeEvent) { 
      // events = { onChange: innerOnChange}
      events.onChange = innerOnChange
    }
  }



  if (!lib.isEmpty(events)) {
    lib.forEach(events, (fun, ii, evtkey)=>{
      let funEntity = function(fn, param) {
        return function(e){
          if (lib.isFunction(e)) {
            let oldfn = fn
            let newfn = e
            return [
              oldfn,
              function(evt){
                newfn.call(mycontext, evt, param, mycontext)
                emitUnionResponse(unionResponse, evtkey, mycontext, parent, e)
              },
              parent
            ]
          }
          e.persist()
          if (lib.isString(fn)) {
            if (lib.isFunction(parent[fn])){
              if (parent[fn].call(mycontext, e, param, mycontext)) {
                mycontext.setValue(e.target.value)
              }
            }
          }
          if (lib.isFunction(fn)) {
            if (fn.call(mycontext, e, param, mycontext)) {
              mycontext.setValue(e.target.value)
            }
          }
          // 设计联动方法的参数
          emitUnionResponse(unionResponse, evtkey, mycontext, parent, e)
        }
      }
      if (lib.isString(fun)) {
        let funName = lib.uniqueId(`${fun}-${properties.id||properties.name}-`)
        let obj = lib.urlTOquery(fun)
        let query = obj.query
        funName = obj.url
        attributes[evtkey] = funEntity(funName, query /* ,param, inst */)
      }
      if (lib.isFunction(fun)) {
        attributes[evtkey] = funEntity(fun, null /* ,param, inst */)
      }
      if (fun === true) {
        attributes[evtkey] = funEntity(fun, null /* ,param, inst */)
      }
    })
  }
  return attributes
}