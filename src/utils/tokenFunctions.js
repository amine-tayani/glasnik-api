const jwt = require('jsonwebtoken')
const config = require('../../config/_conf')

function generateToken(id) {
  const token = jwt.sign({ id }, config.JWT_SECRET_KEY, {
    expiresIn: '30d',
  })
  return token
}

function getUser(token) {
  const { id } = jwt.verify(token, config.JWT_SECRET_KEY)
  return id
}
module.exports = { generateToken, getUser }
