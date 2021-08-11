const { queryType } = require('nexus')

const Query = queryType({
  definition(t) {
    t.nonNull.list.nonNull.field('allUsers', {
      type: 'User',
      resolve: (_parent, _args, context) => {
        return context.prisma.user.findMany()
      },
    }),
      t.nonNull.list.nonNull.field('allMessages', {
        type: 'Chat',
        resolve: (_parent, _args, context) => {
          return context.prisma.chat.findMany()
        },
      })
  },
})

module.exports = { Query }
