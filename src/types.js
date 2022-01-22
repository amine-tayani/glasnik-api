const {
  User,
  DateTime,
  Role,
  AuthPayload,
  ResponseMessage,
  ResetResponse,
  Upload,
} = require('./types/User')
const { Community, CommunityType } = require('./types/Community')
const { Channel, ChannelMode } = require('./types/Channel')
const { Message } = require('./types/Message')
const { resolvers } = require('./resolvers/index')
const { enumType } = require('nexus')

const SortOrder = enumType({
  name: 'SortOrder',
  members: ['asc', 'desc'],
})

const types = [
  SortOrder,
  resolvers,
  Upload,
  User,
  ResponseMessage,
  ResetResponse,
  AuthPayload,
  Message,
  Community,
  CommunityType,
  Channel,
  ChannelMode,
  SortOrder,
  Role,
  DateTime,
]

module.exports = { types }
