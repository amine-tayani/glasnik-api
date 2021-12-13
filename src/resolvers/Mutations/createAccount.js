const { nonNull, stringArg, mutationField } = require('nexus')
const bcrypt = require('bcrypt')
const { generateToken } = require('../../utils/tokenFunctions')
const { ValidationError } = require('apollo-server-express')

const createAccount = mutationField('createAccount', {
  description: 'creating account mutation',
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
      throw new ValidationError('Account is already exists ')
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
})

module.exports = { createAccount }
