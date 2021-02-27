import { InputBody } from "./inputbody";
import { lib, createStore } from '../util'
import { getRegisterPart } from "./register";

export function WhatTypeInput(props) {
  let inputConfig = props.data
  let parent = props.store || props.parent
  let target = null
  const whatLang = getRegisterPart()

  let langs = Object.keys(whatLang)
  for (let ii=0; ii<langs.length; ii++) {
    let isLang = langs[ii]
    let [iptConfig, X, options] = whatLang[isLang](inputConfig)
    if (X) {
      function Y(props){
        return <X {...props} registeroptions={options} />
      }
      target = <InputBody data={iptConfig} entity={Y} parent={parent} from={'form'}/>;
      break;
    }
  }

  return target
}