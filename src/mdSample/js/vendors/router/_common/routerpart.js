export function RouterHeader({content}) {
  if (!content) return null
  if (typeof content === 'function') {
    return content()
  }
  return (
    <div className="router-header">
      {content}
    </div>
  )
}

export function RouterFooter({content}) {
  if (!content) return null
  if (typeof content === 'function') {
    return content()
  }
  return (
    <div className="router-footer">
      {content}
    </div>
  )
}

export function RouterMenus({content}) {
  if (!content) return null
  if (typeof content === 'function') {
    return content()
  }
  return (
    <div className="router-menus">
      {content}
    </div>
  )
}

export function RouterItem({content}) {
  if (typeof content === 'function') {
    return content()
  }
  return (
    <div className="router-item">
      {content}
    </div>
  )
}

export function RouterContainer({
  header,
  footer,
  menus,
  content,
  myref,
  containerClass
}) {
  let body = ( 
    <> 
      <RouterMenus content={menus} /> 
      {content}
    </> 
  )
  
  let hasHeader = false
  if (header || footer) {
    hasHeader = true
    body = (
      <div className="router-body">
        {body}
      </div>
    )
  }
  
  return (
    <div className={'router-container ' + (hasHeader ? 'router-container-v ' : 'router-container-h ') +(containerClass||'')} ref={myref}>
      <RouterHeader content={header}/>
      { body }
      <RouterFooter content={footer}/>
    </div>
  )
}