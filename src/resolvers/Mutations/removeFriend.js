const { nonNull, stringArg, mutationField } = require('nexus')

const removeFriend = mutationField('removeFriend', {
  description: 'mutation for removing a friend from a list',
  type: 'ResponseMessage',
  args: {
    friendId: nonNull(stringArg()),
  },
  resolve: async (_parent, { friendId }, { prisma, userId }) => {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        friends: {
          disconnect: [{ id: friendId }],
        },
      },
    })
    return {
      message: 'friend removed from the list',
    }
  },
})

module.exports = { removeFriend }
