const path = require('path')
const pakg = require('./package.json')

const ROOT = __dirname
const version = pakg.version
module.exports = {
  version: version,
  mode: process.env.NODE_ENV,
  src : path.join(__dirname, 'src'),
  // dist: path.join(__dirname, 'dist'),
  apps: [
    {
      name: 'aotooSample',
      startup: true,
      src: path.join(ROOT, 'src/aotooSample'),
      host: 'localhost',
      port: 8400
    }
  ]
}