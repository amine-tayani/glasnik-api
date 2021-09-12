const { queryType } = require('nexus')

const Query = queryType({
  definition(t) {
    t.nonNull.field('me', {
      type: 'User',
      resolve: async (_parent, _args, { prisma, userId }) => {
        if (!userId) {
          throw new Error('You are not logged in ')
        } else {
          return await prisma.user.findUnique({
            where: { id: userId },
          })
        }
      },
    })
  },
})

module.exports = { Query }
