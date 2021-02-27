import { InputBody } from "./inputbody";
import {lib, createStore} from '../util'

let whatLang = {}

// 注册组件
function _registerInput(isLang, types, FunctionComponent, options={}) { 
  try {
    if (lib.isFunction(types)) {
      FunctionComponent = types
      types = null
    }

    if (lib.isString(isLang) && (!types || (lib.isArray(types) || lib.isString(types))) && lib.isFunction(FunctionComponent)){
      
      whatLang[isLang] = function(config){
        types = types ? [].concat(types) : []
        if (!types.length) {
          return [config, FunctionComponent, options]
        } else if (types.indexOf(config.type) > -1) {
          return [config, FunctionComponent, options]
        } else {
          return [config, null]
        }
      }

      // 用户注册时生成独立的form表单，挂在form方法上
      let FC = function(props){
        let iptConfig = props.data||{}
        if (!iptConfig.type) {  // 强制指定组件类型
          iptConfig.type = types[0]
        }
        let parent = props.store||props.parent||createStore()
        return <InputBody data={iptConfig} entity={FunctionComponent} parent={parent} />
      }
      return [isLang, FC, options]
    } else {
      throw new Error('注册参数填写错误')
    }
  } catch (error) {
    console.error(error);
  }
}

export function registerInput(isLang, types, FunctionComponent){ // rule ? 
  if (lib.isPlainObject(types)) {
    let $types = types.types
    let $options = types.options||{}
    return _registerInput(isLang, $types, FunctionComponent, $options)
  } else {
    if (types) {
      if (!types.length) {
        console.warn(`必须指定组件类型, 如['text', 'password']`);
      } else {
        return _registerInput.apply(null, arguments)
      }
    }
  }
}

export function getRegisterPart(){
  return whatLang
}