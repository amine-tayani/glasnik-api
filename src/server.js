const { ApolloServer } = require('apollo-server-express')
const { graphqlUploadExpress } = require('graphql-upload')
const { schema } = require('./schema')
const { context } = require('./context')
const express = require('express')
const http = require('http')

const app = express()
const PORT = 4000

app.use(graphqlUploadExpress())

const server = new ApolloServer({
  schema: schema,
  context: context,
  uploads: false,
})

server.applyMiddleware({ app })

const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

httpServer.listen({ port: PORT }, () => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`,
  )
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`,
  )
})
