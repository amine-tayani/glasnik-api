const { nonNull, stringArg, mutationField } = require('nexus')
const { AuthenticationError } = require('apollo-server-express')
const { ON_MESSAGE } = require('../Subscriptions/onMessage')
const createMessage = mutationField('createMessage', {
  description: 'mutation for creating a new Message',
  type: 'Message',
  args: {
    communityId: nonNull(stringArg()),
    text: nonNull(stringArg()),
  },
  resolve: async (_parent, args, { userId, prisma, pubsub }) => {
    if (!userId) {
      throw new AuthenticationError(
        'you need to login first to perform this action',
      )
    }
    const message = await prisma.message.create({
      data: {
        text: args.text,
        sender: {
          connect: {
            id: userId,
          },
        },
        community: { connect: { id: args.communityId } },
      },
      include: {
        sender: true,
        community: true,
      },
    })

    pubsub.publish(ON_MESSAGE, {
      message: message,
    })
    return message
  },
})

module.exports = { createMessage }
