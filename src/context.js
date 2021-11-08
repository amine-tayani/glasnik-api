const { PrismaClient } = require('@prisma/client')
const { PubSub } = require('apollo-server-express')
const { getUser } = require('./utils/tokenFunctions')

require('dotenv').config()
const prismaClient = new PrismaClient()
const pubsub = new PubSub()

const context = async ({ req }) => {
  let userId
  const authorization = req.headers.authorization || ''
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
