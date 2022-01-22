const { me } = require('./me')
const { users } = require('./users')
const { communities, community } = require('./communities')
const { getSingleMessage } = require('./getMessage')
const { getAllMessageofCommunity } = require('./allCommunityMessages')
const { getAllChannelMessages } = require('./channelMessages')

const Query = [
  me,
  users,
  communities,
  community,
  getAllMessageofCommunity,
  getAllChannelMessages,
  getSingleMessage,
]

module.exports = { Query }
