const lib = require('../../lib')

import {
  listBehavior,
  listComponentBehavior
} from "./list";

export const treeBehavior = function(app, mytype) {
  mytype = mytype || 'tree'
  return Behavior({
    behaviors: [listComponentBehavior(app, mytype)],
    lifetimes: {
      created: function created() {
        this.$$is = 'tree'
        const uniqId = this.uniqId
        this.children = {}
        app['_vars'][uniqId] = this // fromTree == uniqId
      },
      ready: function() {
        const activePage = this.activePage
        const uniqId = this.uniqId
        activePage.hooks.on('destory', function () {
          app['_vars'][uniqId] = null
        })
      }
    }
  })
}

export const treeComponentBehavior = function(app, mytype) {
  mytype = mytype || 'tree'
  return Behavior({
    behaviors: [treeBehavior(app, mytype)],
  })
}