const { makeSchema, enumType } = require('nexus')
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

const SortOrder = enumType({
  name: 'SortOrder',
  members: ['asc', 'desc'],
})

const schema = makeSchema({
  types: [
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
  ],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})

module.exports = {
  schema: schema,
}
