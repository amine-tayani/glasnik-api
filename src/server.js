const { ApolloServer } = require('apollo-server-express')
const { graphqlUploadExpress } = require('graphql-upload')
const express = require('express')
const http = require('http')
const { schema } = require('./schema')
const { context } = require('./context')
const compression = require('compression')
const logger = require('../config/winston')

const app = express()
const port = process.env.PORT || 4000

app.use(graphqlUploadExpress())
app.use(compression())

const server = new ApolloServer({
  schema: schema,
  context: context,
  uploads: false,
})

server.applyMiddleware({ app })

const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

httpServer.listen({ port }, () => {
  logger.log(
    'info',
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`,
  )
})
