import { createAttachment, useMyAttachment } from "./common/attachment";
import { formParser, inputParser } from "./common/dataparser";
import { useState, lib, createStore } from "./common/util";
import { TextInput } from "./common/elements/inputbody";
import { WhatTypeInput } from "./common/elements/whatinput";
import { registerInput } from "./common/elements/register";

export {TextInput, registerInput}

function addUnionListen(union, input, parent) {
  let [targetId, evtKey, unionCallback] = union
  if (lib.isFunction(evtKey)) {
    unionCallback = evtKey
    evtKey = null
  }
  if (targetId && lib.isFunction(unionCallback)) {
    let idf = 'response-' + targetId + '-' + input.id
    parent._dynamicUnion[idf] = [evtKey, unionCallback, input.id]
    parent._dynamicUnion[input.id] = idf  // 在删除该input时，同时删除该id的监听回调方法
  }
}

function dynamicUnion(ipt, parent){  // 动态数据添加的联动回调方法
  if (ipt && ipt.properties.union) {
    let $unions = [ipt]
    $unions.forEach(input=>{
      let union = input.properties.union
      let multipyUnion = []
      union.forEach(un=>{ 
        if (lib.isArray(un)) multipyUnion.push(un) // 允许监听多个id
      })
  
      if (multipyUnion.length) {
        multipyUnion.forEach(un => addUnionListen(un, input, parent))
      } else {
        addUnionListen(union, input, parent)
      }
    })
  }
}

export function FormBlock(props){
  let myElements = []
  let parent = props.parent || props.store || createStore()
  let [item, setItem] = useState(()=>props.from ? props.data : (()=>formParser([props.data], parent)[0])())
  let groupId = item.groupId
  let tmpConfig = { attributes: {}, properties: item }
  
  React.useEffect(()=>{
    setItem(props.from ? props.data : (()=>formParser([props.data], parent)[0])())
  }, [props.data])
  
  let [inputElements, managerInputElements] = useState(tmpConfig.properties.input)
  let { myrequired, myItemClass, myItemStyle, mytitle, mydesc, myerror, mytip,  myshow, errorType, context, funKeys } = useMyAttachment(tmpConfig, 'line')
  let allFunkeys = Object.assign({}, funKeys)

  let formLineContext = {
    attr(ky, val, cb){
      if (ky) {
        let fn = typeof val !== 'undefined' ? allFunkeys[ky][0] : allFunkeys[ky][1]
        let fun = context[fn]
        return fn && fun && fun(val, cb)
      }
    },
    reset(param, cb){
      if (lib.isFunction(param)){
        cb = param;
        param = null
      }
      if (lib.isArray(param)) {
        param = param.map(item=> this.push(item, null, true) )
        managerInputElements([], function(){
          setTimeout(() => managerInputElements([...param], cb), 50);
        })
      } else {
        managerInputElements([...tmpConfig.properties.input], cb)
      }
    },
    push(inputData, cb, inner){
      if (lib.isPlainObject(inputData)) {
        let inputItemConfig = inputParser(inputData, groupId) 
        dynamicUnion(inputItemConfig, parent)
        if (inner) {
          return inputItemConfig
        } else {
          inputElements.push(inputItemConfig)
          managerInputElements([...inputElements], cb)
        }
      }
    },
    pop(cb){
      let index = inputElements.length - 1
      this.delete(index, cb)
    },
    shift(cb){
      this.delete(0, cb)
    },
    unshift(inputData, cb){
      let inputItemConfig = inputParser(inputData)
      dynamicUnion(inputItemConfig, parent)
      inputElements.unshift(inputItemConfig)
      managerInputElements([...inputElements], cb)
    },
    delete(cb, callback){
      let index = this.findIndex(cb)
      if (index > -1 && inputElements[index]) {
        let srouce = inputElements[index]
        let targetId = parent._dynamicUnion[srouce.id]
        let responseIdPrefix = 'response-' + srouce.id

        // 删除id相关的联动方法
        lib.forEach(parent._dynamicUnion, (un, ii, ky)=>{
          if (ky.indexOf(responseIdPrefix) === 0) {
            parent._dynamicUnion[ky] = null
          }
        })

        // 删除id相关的监听方法
        if (typeof targetId === 'string') {
          parent._dynamicUnion[targetId] = null
          parent._dynamicUnion[srouce.id] = null
        }

        inputElements.splice(index, 1)
        managerInputElements([...inputElements], callback)
      }
    },
    concat(param, cb, unshift){
      if (param) {
        if (lib.isPlainObject(param)) param = [param]
        if (lib.isArray(param)) {
          param = param.map(item=> this.push(item, null, true) )
          if (unshift) {
            inputElements = param.concat(inputElements)
          } else {
            inputElements = inputElements.concat(param)
          }
          managerInputElements([...inputElements], cb)
        }
      }
    },
    append(param, cb){
      this.concat(param, cb)
    },
    prepend(param, cb){
      this.concat(param, cb, true)
    },
    splice(cb, pay, callback){
      if (lib.isFunction(pay)) {
        callback = pay
        pay = null
      }
      if (lib.isPlainObject(pay)) {
        let index = this.findIndex(cb)
        if (index > -1) {
          let inputItemConfig = inputParser(pay)
          dynamicUnion(inputItemConfig, parent)
          inputElements.splice(index, 0, inputItemConfig)
          managerInputElements([...inputElements], callback)
        }
      }
    },
    findIndex(query){
      let index = -1
      if (query || (lib.isNumber(query) && query > -1)) {
        if (lib.isNumber(query) && query > -1) {
          index = query
        } else if(lib.isFunction(query)) {
          inputElements.find((item, ii)=>{
            let res = query(item)
            if (res) index = ii
          })
        } else if(lib.isPlainObject(query)) {
          index = inputElements.findIndex(item=> item.id === query.id )
        }
      }
      return index
    },
  }

  let mycontext = Object.assign({}, context, formLineContext)
  parent.ctx.group[groupId] = mycontext
  
  // console.log(inputElements);
  // 渲染结构
  inputElements.forEach(ipt=>{
    myElements.push( <WhatTypeInput key={ipt.properties.key} data={ipt} parent={parent} /> )
  })

  let body = (
    <div className="line-body">
      {myElements}
    </div>
  )

  if (!props.from) {
    body = myElements
  }

  return myshow ? (
    <div className={`group-line ${myItemClass||''}`} style={myItemStyle}>
      {(myrequired && myrequired.UI) ? <myrequired.UI /> : myrequired}
      {(mytitle && mytitle.UI) ? <mytitle.UI /> : mytitle}
      {body}
      {(mytip && mytip.UI) ? <mytip.UI /> : mytip  /* tip */ }
      {(myerror && myerror.UI) ? <myerror.UI /> : myerror  /* success , warning, error info */ }
      {(mydesc && mydesc.UI) ? <mydesc.UI /> : mydesc}
    </div>
  ) : null
}

export function FormGroup(props) {
  let data = props.data
  let parent = props.context||props.parent||props.store||createStore()
  let state = props.state
  let elementsJSX = []
  
  let [oridata, setOriData] = useState(data)
  let [$data, setData] = useState(oridata)

  let formContext = {
    reset(param, cb){
      if (lib.isFunction(param)){
        cb = param;
        param = null
      }
      if (lib.isArray(param)) {
        $data = param
        setData([...$data], cb)
      } else {
        setData([...oridata], cb)
      }
    },
    push(param, cb) {
      if (lib.isPlainObject(param)) {
        $data.push(param)
        setData([...$data], cb)
      }
    },
    unshift(param, cb){
      if (lib.isPlainObject(param)) {
        $data.unshift(param)
        setData([...$data], cb)
      }
    },
    concat(param, cb, unshift){
      if (param) {
        if (lib.isPlainObject(param)) {
          param = [param]
        }
        if (lib.isArray(param)) {
          if (unshift) {
            $data = param.concat($data)
          } else {
            $data = $data.concat(param)
          }
          setData([...$data], cb)
        }
      }
    },
    append(param, cb){
      this.concat(param, cb)
    },
    prepend(param, cb){
      this.concat(param, cb, true)
    },
    pop(cb){
      let index = $data.length - 1
      this.delete(index, cb)
    },
    shift(cb){
      this.delete(0, cb)
    },
    splice(indexer, pay, cb){
      let index = this.findIndex(indexer)
      if (index > -1 && lib.isPlainObject(pay)) {
        $data.splice(index, 0, pay)
        setData([...$data], cb)
      }
    },
    delete(query){
      let index = this.findIndex(query)
      if (index > -1) {
        let $formline = $data[index]
        $formline.input.forEach(inputItem=>{
          let srouce = inputItem
          let targetId = parent._dynamicUnion[srouce.id]
          let responseIdPrefix = 'response-' + srouce.id

          // 删除id相关的联动方法
          lib.forEach(parent._dynamicUnion, (un, ii, ky)=>{
            if (ky.indexOf(responseIdPrefix) === 0) {
              parent._dynamicUnion[ky] = null
            }
          })

          // 删除id相关的监听方法
          if (typeof targetId === 'string') {
            parent._dynamicUnion[targetId] = null
            parent._dynamicUnion[srouce.id] = null
          }
        })
        $data.splice(index, 1);
        setData([...$data])
      }
    },
    findIndex(query){
      let index = -1
      if (query || (lib.isNumber(query) && query > -1)) {
        if (lib.isNumber(query) && query > -1) {
          index = query
        } else if(lib.isFunction(query)) {
          $data.find((item, ii)=>{
            let res = query(item)
            if (res) index = ii
          })
        } else if(lib.isPlainObject(query)) {
          index = $data.findIndex(item=> item.gid === query.gid )
        }
      }
      return index
    }
  }

  parent.ctx = Object.assign({}, parent.ctx, formContext)

  let mydata = formParser($data, parent)
  mydata.forEach((item, ii)=>{
    elementsJSX.push( <FormBlock key={item.key} data={item} parent={parent} from={'form'} /> )
  })
  
  return (
    <div className={`${props.formClass||'form'}`}>
      {elementsJSX}
    </div>  
  )
}

export const CellGroup = FormGroup
export const CellBlock = FormBlock