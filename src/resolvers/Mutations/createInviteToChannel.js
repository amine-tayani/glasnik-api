const { ValidationError } = require('apollo-server-express')
const { nonNull, stringArg, mutationField } = require('nexus')

const joinChannel = mutationField('joinChannel', {
  description: 'mutation for creating an invite to a Channel',
  type: 'ResponseMessage',
  args: {
    name: nonNull(stringArg()),
  },
  resolve: async (_parent, args, { prisma, userId }) => {
    return {
      message: 'Invite ',
    }
  },
})

module.exports = { joinChannel }
