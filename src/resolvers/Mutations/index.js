const { createAccount } = require('./createAccount')
const { loginToAccount } = require('./loginToAccount')
const { forgotPassword } = require('./forgotPassword')
const { resetPassword } = require('./resetPassword')
const { addFriend } = require('./addFriend')
const { removeFriend } = require('./removeFriend')
const { createCommunity } = require('./createCommunity')
const { joinCommunity } = require('./joinCommunity')
const { uploadAvatar } = require('./uploadAvatar')
const { createMessage } = require('./createMessage')
const { addChannel } = require('./createChannel')
const { joinChannel } = require('./createInviteToChannel')

const Mutation = [
  createAccount,
  uploadAvatar,
  createMessage,
  loginToAccount,
  forgotPassword,
  resetPassword,
  addFriend,
  removeFriend,
  createCommunity,
  joinCommunity,
  addChannel,
  joinChannel,
]

module.exports = { Mutation }
