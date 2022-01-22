const { queryField, list, nonNull, stringArg } = require('nexus')

const getAllMessageofCommunity = queryField('getMessages', {
  args: {
    communityId: nonNull(stringArg()),
  },
  type: list('Message'),
  description: 'get a informations about all messages in a community ',
  resolve: async (_parent, { communityId }, { prisma }) => {
    const communityMessages = await prisma.message.findMany({
      where: { communityId },
      orderBy: { timestamp: 'asc' },
      include: {
        sender: true,
        community: true,
        channel: true,
      },
    })
    return communityMessages
  },
})

module.exports = { getAllMessageofCommunity }
