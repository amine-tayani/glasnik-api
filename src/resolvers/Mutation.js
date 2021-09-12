const { nonNull, stringArg, mutationType } = require('nexus')
const { ValidationError, AuthenticationError } = require('apollo-server')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const { sendMail, resetPasswordHtml } = require('../utils/sendMail')
const { generateToken } = require('../utils/tokenFunctions')
const { resetExpire } = require('../utils/dateUtil')

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

        return {
          createdAccount,
          token: generateToken(createdAccount.id),
          message: 'account created successfully',
        }
      },
    }),
      t.field('resetPassword', {
        type: 'ResetResponse',
        args: {
          password: nonNull(stringArg()),
          confirmPassword: nonNull(stringArg()),
          resetToken: nonNull(stringArg()),
        },
        resolve: async (_parent, args, context) => {
          if (args.password !== args.confirmPassword) {
            throw new Error(`Your passwords don't match`)
          }

          const resetExp = resetExpire('s')
          const user = await context.prisma.user.findFirst({
            where: {
              resetToken: args.resetToken,
              resetTokenExpiry: {
                gte: resetExp,
              },
            },
          })
          if (!user) {
            throw new ValidationError(
              'Your password reset token is either invalid or expired.',
            )
          }
          const hash = await bcrypt.hash(args.password, 10)

          const result = await context.prisma.user.update({
            where: { id: user.id },
            data: {
              password: hash,
              resetToken: null,
              resetTokenExpiry: null,
            },
          })

          return {
            token: generateToken(result.id),
            message: 'Password reset has been done successfully',
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
          context.pubsub.publish(
            'USER_LOGGED_IN',
            `${user.username} has logged in `,
          )
          const token = generateToken(user.id)

          return {
            user,
            token,
            message: 'User logged in successfully',
          }
        },
      })
    t.field('forgotPassword', {
      type: 'ResponseMessage',
      args: {
        email: nonNull(stringArg()),
      },
      resolve: async (_parent, { email }, context) => {
        const user = await context.prisma.user.findUnique({
          where: { email },
        })
        if (!user) {
          throw new AuthenticationError('No such user found with this email.')
        }
        const rt = crypto.randomBytes(32).toString('hex')
        const resetExp = resetExpire('a')
        await context.prisma.user.update({
          where: { email },
          data: { resetToken: rt, resetTokenExpiry: resetExp },
        })

        await sendMail(
          email,
          resetPasswordHtml(user.username, rt),
          'Password Reset',
        )
        return {
          message: `Please go to your  ${email} email and click the password reset link we've sent for your glasnik account`,
        }
      },
    })
  },
})

module.exports = { Mutation }
