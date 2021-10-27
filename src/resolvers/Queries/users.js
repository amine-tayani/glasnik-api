const { queryField, list } = require('nexus')

const users = queryField('users', {
  type: list('User'),
  resolve: async (_parent, _args, { prisma }) => {
    const users = await prisma.user.findMany({
      include: {
        communities: true,
        messages: true,
        friends: true,
        friendOf: true,
      },
    })
    return users
  },
})

module.exports = { users }
