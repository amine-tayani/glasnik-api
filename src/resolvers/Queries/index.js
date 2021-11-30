const { me } = require('./me')
const { users } = require('./users')
const { communities, community } = require('./communities')
const { getAllMessageofCommunity } = require('./allCommunityMessages')
const { getSingleMessage } = require('./getMessage')

const Query = [
  me,
  users,
  communities,
  community,
  getAllMessageofCommunity,
  getSingleMessage,
]

module.exports = { Query }
