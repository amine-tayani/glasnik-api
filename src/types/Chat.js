const { objectType, asNexusMethod } = require('nexus')
const { DateTimeResolver } = require('graphql-scalars')

const DateTime = asNexusMethod(DateTimeResolver, 'date')

const Chat = objectType({
  name: 'Chat',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('receiverId')
    t.field('receiver', {
      type: 'User',
      resolve: (parent, args, context) => {
        return context.prisma.user.findUnique({
          where: { id: parent.receiverId },
        })
      },
    })
    t.field('sender', {
      type: 'User',
      resolve: (parent, args, context) => {
        return context.prisma.user.findFirst({
          where: { id: parent.senderId },
        })
      },
    })
    t.nonNull.string('senderId')
    t.nonNull.string('message')
    t.date('createdAt')
    t.date('updateAt')
  },
})

module.exports = { Chat, DateTime }
