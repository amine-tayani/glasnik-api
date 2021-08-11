const { makeSchema, enumType } = require('nexus')
const { Query } = require('./resolvers/Query')
const { User, DateTime, Role, AuthPayload } = require('./types/User')
const { Chat } = require('./types/Chat')
const { Mutation } = require('./resolvers/Mutation')

const SortOrder = enumType({
  name: 'SortOrder',
  members: ['asc', 'desc'],
})

const schema = makeSchema({
  types: [Query, Mutation, User, AuthPayload, Chat, SortOrder, Role, DateTime],
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
