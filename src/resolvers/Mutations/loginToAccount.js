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
      throw new AuthenticationError('No such user found.')
    }

    const isPasswordMatch = await bcrypt.compare(args.password, user.password)
    if (!isPasswordMatch) {
      throw new ValidationError('Provided password is invalid')
    }
    context.pubsub.publish('USER_LOGGED_IN', `${user.username} has logged in `)
    const token = generateToken(user.id)

    return {
      user,
      token,
      message: 'User logged in successfully',
    }
  },
})

module.exports = { loginToAccount }
