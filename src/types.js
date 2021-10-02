const { Query } = require('./resolvers/Query')
const {
  User,
  DateTime,
  Role,
  AuthPayload,
  ResponseMessage,
  ResetResponse,
} = require('./types/User')
const { Channel } = require('./types/Channel')
const { Message } = require('./types/Message')
const { Mutation } = require('./resolvers/Mutation')
const { Subscription } = require('./resolvers/Subscription')
const { enumType } = require('nexus')

const SortOrder = enumType({
  name: 'SortOrder',
  members: ['asc', 'desc'],
})

const types = [
  SortOrder,
  Query,
  Mutation,
  Subscription,
  User,
  ResponseMessage,
  ResetResponse,
  AuthPayload,
  Message,
  Channel,
  SortOrder,
  Role,
  DateTime,
]

module.exports = { types }
