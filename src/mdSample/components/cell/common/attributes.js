/**
 * 构建表单原生属性的状态机
 * 如value, className, disable, readonly等
 */
import { useState, lib } from "./util";

let inputBehaviorKey = ['className', 'value', 'values', 'disabled', 'readOnly', 'style', 'checked']

export function createAttrState(id, attr, setAttribute){
  let funKeys = {}
  let inputAttrBehavior = {id}

  let timmer = null
  inputBehaviorKey.forEach(ky=>{
    let val = attr[ky]
    if (attr.hasOwnProperty(ky) && !lib.isFunction(val)) {
      if (ky === 'className') ky = 'class'
      let n = ['set '+ky, 'get '+ky, ky]
      n = n.map(k=>lib.camelCase(k))
      funKeys[ky] = n

      inputAttrBehavior[n[0]] = function(param, cb){
        if (ky === 'class') {
          attr['className'] = param  
        } else {
          attr[ky] = param
        }
        if (timmer) clearTimeout(timmer)
        timmer = setTimeout(() => {
          setAttribute({...attr}, cb)
        }, 17);
      }

      inputAttrBehavior[n[1]] = function(){ 
        if (ky === 'class') {
          return attr['className']   
        }
        return attr[ky] 
      }
    }
  })

  let myattrs = attr.attributes||{}
  let attrTimmer = null
  let attributesContext = {id}
  let myattrsKeys = Object.keys(myattrs)

  myattrsKeys.forEach(ky=>{
    let val = myattrs[ky]
    if (ky.indexOf('on') === -1 && !lib.isFunction(val)) {
      let n = ['set '+ky, 'get '+ky, ky]
      n = n.map(k=>lib.camelCase(k))
      funKeys[ky] = n

      // setValue setClass setReadonly
      attributesContext[n[0]] = function(param, cb){
        myattrs[ky] = ky === 'show' ? (param||true) : param
  
        if (attrTimmer) clearTimeout(attrTimmer)
        attrTimmer = setTimeout(() => {
          setAttribute({...myattrs}, cb)
          attrTimmer = null
        }, 17);
      }
  
      attributesContext[n[1]] = function(){ 
        return attr.attributes[ky] 
      }
    }
  })

  return [inputAttrBehavior, attributesContext, funKeys]
}


// export function createAttrState(inputConfig){
//   let id = inputConfig.id
//   let funKeys = {}
//   let inputAttrBehavior = {id}
//   let attributes = inputConfig.attributes||{}

//   let [v, setV] = useState(attributes)
//   v = attributes

//   let timmer = null
//   inputBehaviorKey.forEach(ky=>{
//     if (ky === 'className') ky = 'class'
//     let val = attributes[ky]
//     if (attributes.hasOwnProperty(ky) && !lib.isFunction(val)) {
//       let n = ['set '+ky, 'get '+ky, ky]
//       n = n.map(k=>lib.camelCase(k))
//       funKeys[ky] = n
//       inputAttrBehavior[n[0]] = function(param, cb){
//         if (ky === 'class') {
//           attributes['className'] = param  
//         } else {
//           attributes[ky] = param
//         }
//         if (timmer) clearTimeout(timmer)
//         timmer = setTimeout(() => {
//           v = attributes
//           setV({...attributes}, cb)
//         }, 17);
//       }

//       inputAttrBehavior[n[1]] = function(){ 
//         if (ky === 'class') {
//           return v['className']   
//         }
//         return v[ky] 
//       }
//     }
//   })

  
//   // 设置子属性监听方法
//   // 用于非input组件
//   let myattrs = attributes.attributes||{}
//   let attrTimmer = null
//   let attributesContext = {id}
//   let myattrsKeys = Object.keys(myattrs)

//   myattrsKeys.forEach(ky=>{
//     let val = myattrs[ky]
//     if (ky.indexOf('on') === -1 && !lib.isFunction(val)) {
//       let n = ['set '+ky, 'get '+ky, ky]
//       n = n.map(k=>lib.camelCase(k))
//       funKeys[ky] = n

//       // setValue setClass setReadonly
//       attributesContext[n[0]] = function(param, cb){
//         myattrs[ky] = ky === 'show' ? (param||true) : param
  
//         if (attrTimmer) clearTimeout(attrTimmer)
//         attrTimmer = setTimeout(() => {
//           v.attributes = myattrs
//           setV({...v}, cb)
//           attrTimmer = null
//         }, 17);
//       }
  
//       attributesContext[n[1]] = function(){ 
//         return v.attributes[ky] 
//       }
//     }
//   })



//   // let timmer = null
//   // inputBehaviorKey.forEach(ky=>{
//   //   if (ky === 'className') ky = 'class'
//   //   if (attributes.hasOwnProperty(ky)) {
//   //     let n = ['set '+ky, 'get '+ky, ky]
//   //     n = n.map(k=>lib.camelCase(k))

//   //     let [v, setV] = useState(attributes)
//   //     v = attributes
//   //     // setValue setClass setReadonly
//   //     inputAttrBehavior[n[0]] = function(param){
//   //       if (ky === 'class') {
//   //         attributes['className'] = param  
//   //       } else {
//   //         attributes[ky] = param
//   //       }
//   //       if (timmer) clearTimeout(timmer)
//   //       timmer = setTimeout(() => {
//   //         v = attributes
//   //         setV({...attributes})
//   //       }, 17);
//   //     }

//   //     inputAttrBehavior[n[1]] = function(){ 
//   //       if (ky === 'class') {
//   //         return v['className']   
//   //       }
//   //       return v[ky] 
//   //     }
//   //   }
//   // })


//   // return inputAttrBehavior

//   // inputAttrBehavior.funKeys = funKeys
//   // inputAttrBehavior.attrs = attributesContext
//   return [inputAttrBehavior, attributesContext, funKeys]
// }