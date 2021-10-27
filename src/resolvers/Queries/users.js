const { queryField, list } = require('nexus')

const users = queryField('users', {
  type: list('User'),
  resolve: async (_parent, _args, { prisma }) => {
    const users = await prisma.user.findMany({
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
    return users
  },
})

module.exports = { users }
