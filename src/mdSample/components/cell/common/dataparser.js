/**
 * 解析用户数据
 * 重组用户数据
 */
import {lib} from './util'

export const inputPropertieKey = ['title', 'desc', 'required', 'error', 'tip', 'itemClass', 'itemStyle', 'itemMethod', 'show', 'union']

/**
 * 重新组合input element的描述属性
 * @param {Object} ipt 用户传入的表单描述属性
 * @param {*} item 
 * @param {*} parent 
 */
export function inputParser(ipt, gid, parent) {
  try {
    let properties = {
      unionResponse: []
    }
    let attributes = {}
    let events = {}
    if (!ipt.id && !ipt.name) {
      console.warn('注意，不指定id和name属性，会存在一定的性能问题');
    }
    let id = ipt.id || ipt.name || lib.uniqueId('input-id-')
    let name = ipt.name
    let type = ipt.type || 'text'
    let union = ipt.union
    let uniqId = ipt.uniqId || lib.uniqueId('input-element-')
    let key = 'input-key-' + id ? id : uniqId;
    properties.show = ipt.hasOwnProperty('show') ? show : true
    properties.key = key
    ipt.value = ipt.value || ''
    Object.keys(ipt).forEach(ky=>{
      if (inputPropertieKey.indexOf(ky) > -1) {
        properties[ky] = ipt[ky]
      } else if (lib.isEvent(ky)) {
        events[ky] = ipt[ky]
      } else {
        attributes[ky] = ipt[ky]
      }
    })
    attributes.id = id
    attributes.name = name

    return { 
      id,  // input id
      groupId: gid,
      name, // input name
      type,
      uniqId, // input 唯一id
      events,
      properties, // input 的外围属性
      attributes, // input 内置属性
    }
  } catch (error) {
    
  }
  
}

function createUnionResponse(union, $data, input){
  let [targetId, evtKey, unionCallback] = union
  if (lib.isFunction(evtKey)) {
    unionCallback = evtKey
    evtKey = null
  }
  if (targetId && lib.isFunction(unionCallback)) {
    $data.forEach(item => item.input.forEach(ipt=>{
      if (ipt.id === targetId) ipt.properties.unionResponse.push([evtKey, unionCallback, input.id])
    }))
  }
  return $data
}

// 解析用户输入的表单数据
export function formParser(data=[], parent){
  let $data = []
  let $unions = []
  data.forEach(item=>{  // item 为 group-line 数据
    let $item = {...item}
    $item.groupId = $item.gid || $item.groupId || lib.uniqueId('line-of-form-')  // 用于快速定位data中的那一组表单
    $item.key = 'gkey-' + ($item.id || $item.groupId)
    $item.show = $item.hasOwnProperty('show') ? $item.show : true
    let inputs = $item.input || $item.cells
    if (inputs) {
      inputs = [].concat(inputs)
      let $inputs = [...inputs]
      $inputs = $inputs.map((input, ii)=>{
        let $input = inputParser(input, $item.groupId, parent);
        let properties = $input.properties
        if (lib.isArray(properties.union)) {
          $unions.push($input)
        }
        return $input
      })
      $item.input = $inputs; delete $item.cells
      $data.push($item)
    }
  })

  

  if ($unions.length) {
    $unions.forEach(input=>{
      let union = input.properties.union
      let multipyUnion = []
      union.forEach(un=>{ 
        if (lib.isArray(un)) multipyUnion.push(un) // 允许监听多个id
      })

      if (multipyUnion.length) {
        multipyUnion.forEach(un=>{ 
          $data  = createUnionResponse(un, $data, input)
        })
      } else {
        $data  = createUnionResponse(union, $data, input)
      }

    })
  }
  return $data
}