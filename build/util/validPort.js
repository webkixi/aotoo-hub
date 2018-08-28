const portOccupied = require('./portOccupied')

function* validPort(port, step) {
  const portUsed = yield portOccupied(port)
  if (portUsed) {
    port += 30
    return yield validPort(port, step)
  } else {
    return { validPort: port }
  }
}

module.exports = validPort