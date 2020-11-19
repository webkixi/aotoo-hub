function fakePage(params) {
  return params
}

export default function fakePager(Pager) {
  Object.keys(Pager).forEach(k => {
    fakePage[k] = Pager[k]
  })
  return fakePage
}