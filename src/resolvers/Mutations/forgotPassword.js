const crypto = require('crypto')
const { AuthenticationError } = require('apollo-server-express')
const { nonNull, stringArg, mutationField } = require('nexus')
const { resetPasswordHtml, sendMail } = require('../../utils/sendMail')
const { resetExpire } = require('../../utils/dateUtil')

const forgotPassword = mutationField('forgotPassword', {
  description: 'forgot password mutation',
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

module.exports = { forgotPassword }
