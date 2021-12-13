const { nonNull, stringArg, mutationField } = require('nexus')
const bcrypt = require('bcrypt')
const { generateToken } = require('../../utils/tokenFunctions')
const {
  ValidationError,
  AuthenticationError,
} = require('apollo-server-express')

const loginToAccount = mutationField('loginToAccount', {
  description: 'login to account mutation',
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
      throw new AuthenticationError('This account does not exist.')
    }

    const isPasswordMatch = await bcrypt.compare(args.password, user.password)
    if (!isPasswordMatch) {
      throw new ValidationError('Password is incorrect try again.')
    }
    context.pubsub.publish('USER_LOGGED_IN', {
      user: user,
    })
    const token = generateToken(user.id)

    return {
      user,
      token,
      message: 'User logged in successfully',
    }
  },
})

module.exports = { loginToAccount }
