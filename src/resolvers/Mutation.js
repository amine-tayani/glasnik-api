const { nonNull, stringArg, mutationType } = require('nexus')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const Mutation = mutationType({
  definition(t) {
    t.field('createAccount', {
      type: 'AuthPayload',
      args: {
        username: nonNull(stringArg()),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_parent, { username, email, password }, context) => {
        const existingAccount = await context.prisma.user.findUnique({
          where: { email },
        })
        if (existingAccount) {
          throw new Error('!Account already existing.')
        }
        const hashpass = await bcrypt.hash(password, 10)
        const createdAccount = await context.prisma.user.create({
          data: {
            username,
            email,
            password: hashpass,
          },
        })

        const token = jwt.sign(
          { userId: createdAccount.id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: '1d' },
        )

        return {
          createdAccount,
          token,
        }
      },
    }),
      t.field('loginToAccount', {
        type: 'AuthPayload',
        args: {
          email: nonNull(stringArg()),
          password: nonNull(stringArg()),
        },
        resolve: async (_parent, { email, password }, context) => {
          const user = await context.prisma.user.findUnique({
            where: { email },
          })
          if (!user) {
            throw new Error('!No such user found.')
          }

          const valid = await bcrypt.compare(password, user.password)
          if (!valid) {
            throw new Error('!Provided password is invalid')
          }

          const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET_KEY,
          )

          return {
            user,
            token,
          }
        },
      })
  },
})

module.exports = { Mutation }
