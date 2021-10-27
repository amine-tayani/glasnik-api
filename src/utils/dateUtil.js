const resetExpire = function (op) {
  let rte = new Date(Date.now())
  rte = new Date(rte)
  if (op === 'a') {
    rte = rte.setHours(rte.getHours() + 1)
  }
  if (op === 's') {
    rte = rte.setHours(rte.getHours() - 1)
  }
  return new Date(rte)
}

module.exports = { resetExpire }
