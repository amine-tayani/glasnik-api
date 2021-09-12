const { PrismaClient } = require('@prisma/client')
const prismaClient = new PrismaClient()
const { PubSub } = require('apollo-server')
require('dotenv').config()
const { getUser } = require('./utils/tokenFunctions')
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
