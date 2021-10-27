const { Mutation } = require('./Mutations/index')
const { Query } = require('./Queries/index')
const { Subscription } = require('./Subscriptions/index')

const resolvers = [Mutation, Query, Subscription]

module.exports = { resolvers }
