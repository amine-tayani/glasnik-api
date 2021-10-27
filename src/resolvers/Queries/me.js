const { queryField } = require('nexus')

const me = queryField('me', {
  type: 'User',
  resolve: async (_parent, _args, { prisma, userId }) => {
    if (!userId) {
      throw new Error('You are not logged in ')
    } else {
      return await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          username: true,
          email: true,
          photoUrl: true,
          friends: {
            select: {
              id: true,
              username: true,
              email: true,
              photoUrl: true,
            },
          },
          friendOf: {
            select: {
              id: true,
              username: true,
              email: true,
              photoUrl: true,
            },
          },
        },
      })
    }
  },
})

module.exports = { me }
