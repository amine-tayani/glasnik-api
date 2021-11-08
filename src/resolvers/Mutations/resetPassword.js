const { nonNull, stringArg, mutationField } = require('nexus')
const bcrypt = require('bcrypt')
const { generateToken } = require('../../utils/tokenFunctions')
const { ValidationError } = require('apollo-server-express')
const { resetExpire } = require('../../utils/dateUtil')

const resetPassword = mutationField('resetPassword', {
  description: 'reset password mutation',
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
})

module.exports = { resetPassword }
