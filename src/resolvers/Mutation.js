const { nonNull, stringArg, mutationType } = require('nexus')
const bcrypt = require('bcrypt')
const { ValidationError, AuthenticationError } = require('apollo-server')
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
      resolve: async (_parent, args, context) => {
        const existingAccount = await context.prisma.user.findUnique({
          where: { email: args.email },
        })
        if (existingAccount) {
          throw new ValidationError(
            'Email is already associated with another user',
          )
        }
        const hashpass = await bcrypt.hash(args.password, 10)
        const createdAccount = await context.prisma.user.create({
          data: {
            username: args.username,
            email: args.email,
            password: hashpass,
          },
        })

        const token = jwt.sign(
          { id: createdAccount.id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: '30d' },
        )

        return {
          createdAccount,
          token,
          message: 'account created successfully',
        }
      },
    }),
      t.field('loginToAccount', {
        type: 'AuthPayload',
        args: {
          email: nonNull(stringArg()),
          password: nonNull(stringArg()),
        },
        resolve: async (_parent, args, context) => {
          const user = await context.prisma.user.findUnique({
            where: { email: args.email },
          })
          if (!user) {
            throw new AuthenticationError('No such user found.')
          }

          const isPasswordMatch = await bcrypt.compare(
            args.password,
            user.password,
          )
          if (!isPasswordMatch) {
            throw new ValidationError('Provided password is invalid')
          }
          const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET_KEY,
          )

          return {
            user,
            token,
            message: 'User logged in successfully',
          }
        },
      })
  },
})

module.exports = { Mutation }
