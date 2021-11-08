const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const { graphqlUploadExpress } = require('graphql-upload')
const { schema } = require('./schema')
const { context } = require('./context')

const server = new ApolloServer({
  schema: schema,
  context: context,
  uploads: false,
})

const app = express()

app.use(graphqlUploadExpress())

server.applyMiddleware({ app })

app.listen({ port: 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
})
