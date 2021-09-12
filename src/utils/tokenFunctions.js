const jwt = require('jsonwebtoken')
require('dotenv').config()

function generateToken(id) {
  const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: '30d',
  })
  return token
}

function getUser(token) {
  const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY)
  return id
}
module.exports = { generateToken, getUser }
