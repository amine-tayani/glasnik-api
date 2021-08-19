const { PrismaClient } = require('@prisma/client')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const prismaClient = new PrismaClient()

const getUser = async (token) => {
  const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY)
  return userId
}

const context = async ({ req }) => {
  let userId

  const authorization = req.headers.authorization || ''
  if (authorization) {
    const token = authorization.replace('Bearer ', '')
    userId = await getUser(token)
  }
  return {
    userId: userId,
    prisma: prismaClient,
  }
}

module.exports = {
  context: context,
}
