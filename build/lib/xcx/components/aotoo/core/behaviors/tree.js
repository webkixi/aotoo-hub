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
        this.children = {}
      },
      ready: function() {
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