const { nonNull, stringArg, mutationField } = require('nexus')
const { ValidationError } = require('apollo-server')

const addFriend = mutationField('addFriend', {
  description: 'mutation for adding a friend',
  type: 'ResponseMessage',
  args: {
    friendId: nonNull(stringArg()),
  },
  resolve: async (_parent, { friendId }, { prisma, userId }) => {
    const isFriendExist = await prisma.user.findUnique({
      where: { id: friendId },
    })
    if (!isFriendExist) {
      throw new ValidationError('friend does not have an account')
    }
    const isFriendAlreadyExistInMyList = await prisma.user.findFirst({
      where: {
        AND: [
          {
            id: userId,
          },
          {
            friends: {
              some: {
                id: {
                  equals: friendId,
                },
              },
            },
          },
        ],
      },
    })
    if (isFriendAlreadyExistInMyList) {
      throw new ValidationError(
        `${isFriendExist.username} is already exist in your friendlist`,
      )
    }
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        friends: {
          connect: { id: friendId },
        },
      },
    })
    return {
      message: 'friend added to the list',
    }
  },
})

module.exports = { addFriend }
