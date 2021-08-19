const { queryType } = require('nexus')

const Query = queryType({
  definition(t) {
    t.nonNull.list.nonNull.field('allUsers', {
      type: 'User',
      resolve: (_parent, _args, context) => {
        return context.prisma.user.findMany()
      },
    }),
      t.nonNull.field('me', {
        type: 'User',
        resolve: async (_parent, _args, { prisma, userId }) => {
          if (!userId) {
            throw new Error('You are not authenticated')
          } else {
            return await prisma.user.findUnique({
              where: { id: userId },
            })
          }
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
