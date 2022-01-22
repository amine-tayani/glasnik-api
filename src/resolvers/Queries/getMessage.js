const { queryField, nonNull, stringArg } = require('nexus')

const getSingleMessage = queryField('getMessage', {
  type: 'Message',
  args: { id: nonNull(stringArg()) },
  description: 'Get a single message',

  resolve: async (_parent, { id }, { prisma }) => {
    const message = await prisma.message.findUnique({
      where: { id },
      include: {
        sender: true,
        community: true,
        channel: true,
      },
    })
    return message
  },
})

module.exports = { getSingleMessage }
