const { PubSub } = require('apollo-server')
const prismaClient = require('./prisma')
const { getUser } = require('./utils/tokenFunctions')

require('dotenv').config()

const pubsub = new PubSub()

const context = async ({ req }) => {
  let userId
  const authorization = req?.headers.authorization || ''
  if (authorization) {
    const token = authorization.replace('Bearer ', '')
    userId = getUser(token)
  }

  return {
    userId,
    pubsub: pubsub,
    prisma: prismaClient,
  }
}

module.exports = {
  context: context,
}
