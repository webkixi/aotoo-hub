import reactdom from 'react-dom';

import aotoo, {
  lib,
  _elements,
  ReturnPromiseComponent,
  extTemplate,
  render,
  html,
  $$
} from '@aotoo/aotoo';

if (lib.isClient()) {
  const context = lib.curContext()
  context.ReactDOM = context.ReactDom = reactdom
}

export {
  lib,
  _elements,
  ReturnPromiseComponent,
  extTemplate,
  render,
  html,
  $$
}

export default aotoo