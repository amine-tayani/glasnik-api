const express = require('express')
const http = require('http')
const compression = require('compression')
const cors = require('cors')
const { ApolloServer } = require('apollo-server-express')
const { graphqlUploadExpress } = require('graphql-upload')
const { schema } = require('./schema')
const { context } = require('./context')
const logger = require('../config/winston')
const config = require('../config/_conf')

const port = config.PORT
var __prod__ = config.NODE_ENV === 'production'
var __dev__ = config.NODE_ENV === 'development'

const app = express()

if (__dev__) {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }))
}
if (__prod__) {
  app.use(express.errorHandler())
}
app.use(cors())
app.use(graphqlUploadExpress())
app.use(compression())

app.use((err, __req, res, __next) => {
  res.status(err.status || 500)
  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  })
})

// init Graphql Apollo Server
const server = new ApolloServer({
  schema: schema,
  context: context,
  uploads: false,
})

// apply express app as apollo server middleware
server.applyMiddleware({ app })

const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

httpServer.listen({ port }, () => {
  logger.log(
    'info',
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`,
  )
})
