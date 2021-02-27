export function useState (od) {
  const cbRef = React.useRef();
  const [data, setData] = React.useState(od);

  if (typeof od !== 'function') {
    React.useEffect(() => {
      setData(od)
    }, [od]);
  }

  React.useEffect(() => {
    cbRef.current && cbRef.current(data);
  }, [data]);

  return [data, function (d, callback) {
    cbRef.current = callback;
    setData(d);
  }];
}

export const createStore = function createFormStore(){
  return {
    ctx: {
      elements: {},
      group: {},
    },
    getById(id){
      try {
        const cell = this.ctx.elements[id] || this.ctx.group[id]
        if (!cell) throw new Error('没有相关该元素')
        return cell
      } catch (error) {
        console.warn(error)
      }
    },
    _dynamicUnion: {},
  }
}


export {lib} from '@aotoo/aotoo'

