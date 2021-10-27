const { queryField } = require('nexus')

const me = queryField('me', {
  type: 'User',
  resolve: async (_parent, _args, { prisma, userId }) => {
    if (!userId) {
      throw new Error('You are not logged in ')
    } else {
      return await prisma.user.findUnique({
        where: { id: userId },
        include: {
          communities: true,
          messages: true,
          friends: true,
          friendOf: true,
        },
      })
    }
  },
})

module.exports = { me }
