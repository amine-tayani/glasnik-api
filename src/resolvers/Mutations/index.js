const { createAccount } = require('./createAccount')
const { loginToAccount } = require('./loginToAccount')
const { forgotPassword } = require('./forgotPassword')
const { resetPassword } = require('./resetPassword')
const { addFriend } = require('./addFriend')
const { removeFriend } = require('./removeFriend')
const { createCommunity } = require('./createCommunity')
const { joinCommunity } = require('./joinCommunity')

const Mutation = [
  createAccount,
  loginToAccount,
  forgotPassword,
  resetPassword,
  addFriend,
  removeFriend,
  createCommunity,
  joinCommunity,
]

module.exports = { Mutation }
