import aotoo from '@aotoo/aotoo'
import { useState, lib, createStore } from "./common/util";
import {
  CellBlock,
  CellGroup,
  registerInput
} from "./form"

export function register(){
  let res = registerInput.apply(null, arguments)
  if (res) {
    let [isLang, FC, options] = res

    cell[isLang] = function RegisterComponentWrap(props){
      return <FC {...props} registeroptions={options} />
    }
  }
}

/**
 * $$id,
 * show,
 * data: [
 *   {
 *    show, 
 *    itemClass, 
 *    itemStyle, 
 *    title: '' || {} || <xxx />,   
 *    desc: '', 
 *    required: false
 *    input: [
 *      {show, itemClass, itemStyle, title, type, name, id, error, desc, tip, required, ...events}]
 *    }
 * ]
 */

function template(state, props, $ref){
  return <CellGroup data={state.data} context={this} state={state} />
}

function cell(options){
  let formConfig = {
    ctx: {
      elements: {},
      group: {},
    },
    _dynamicUnion: {},
    data: {},
    created(){
      let $data = this.getData()
      this.oriData = lib.cloneDeep($data)
    },
    getData(){
      
    },
    attached(){

    },
    ready(){

    },
    detached(){
      
    },
  }

  let target = {
    data: []
  }

  if (lib.isArray(options)) {
    target.data = options
  } else {
    target = Object.assign(target, options)
  }

  formConfig.data = target
  return aotoo(formConfig, template)
}



// 内部默认表单组件 input text
function TextInput(props){
  let $props = {...props}
  $props.store = null
  $props.registeroptions = null
  return (
    <input {...$props}/>
  )
}

register('Text', ['text', 'number', 'telephone', 'password'], TextInput)

export {
  createStore,
  CellGroup,
  CellBlock,
  useState,
  lib
}

export default cell