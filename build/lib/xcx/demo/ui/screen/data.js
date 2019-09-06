const tabsData = [
  {
    title: '广东省',
    id: 'g',
    list: [
      {title: '广州市', id: 'g1', parentId: 'g'},
      {title: '深圳市', id: 'g2', parentId: 'g'},
      {title: '汕尾市', id: 'g3' , parentId: 'g'},
      {title: '清远市', id: 'g4', parentId: 'g'}
    ]
  },
  {
    title: '广西省',
    id: 'gx',
    list: [
      {title: '南宁市', id: 'gx1', parentId: 'gx'},
      {title: '百色市', id: 'gx2', parentId: 'gx'},
      {title: '北海市', id: 'gx3', parentId: 'gx'},
      {title: '桂林市', id: 'gx4', parentId: 'gx'}
    ]
  },
]

const location= [
  {
    title: '热门',
    id: 'hot',
    list: [
      {title: '广州南站', id: 'nz', parentId: 'hot'},
      {title: '广州东站站', id: 'dz', parentId: 'hot'},
      {title: '广州塔', id: 'gzt', parentId: 'hot'},
    ]
  },
  {
    title: '距离我',
    id: 'distance',
    list: [
      {title: '附近', id: 'fj', parentId: 'distance'},
      {title: '1km', id: 'd1', parentId: 'distance'},
      {title: '2km', id: 'd2', parentId: 'distance'},
    ]
  }
]

const listx = [
  { title: '智能排序', id: '1' },
  { title: '距离近-远', id: '2' },
  { title: '距离远-近', id: '3' },
  { title: '价格高-低', id: '4' },
  { title: '价格低-高', id: '5' },
  { title: '综合排序', id: '6' },
]
export default {
  tabsData,
  location,
  listx
}