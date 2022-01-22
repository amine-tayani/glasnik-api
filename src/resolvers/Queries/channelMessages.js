const { queryField, list, nonNull, stringArg } = require('nexus')

const getAllChannelMessages = queryField('getChannelMessages', {
  args: {
    channelId: nonNull(stringArg()),
  },
  type: list('Message'),
  description: 'get a informations about all messages in a community ',
  resolve: async (_parent, { channelId }, { prisma }) => {
    const channelMessages = await prisma.message.findMany({
      where: { channelId },
      orderBy: { timestamp: 'asc' },
      include: {
        sender: true,
        community: true,
      },
    })
    return channelMessages
  },
})

module.exports = { getAllChannelMessages }
