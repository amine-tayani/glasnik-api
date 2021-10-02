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
            select: {
              id: true,
              username: true,
              email: true,
              photoUrl: true,
              friends: {
                select: {
                  id: true,
                  username: true,
                  email: true,
                  photoUrl: true,
                },
              },
            },
          })
        }
      },
    }),
      t.list.field('allChannels', {
        type: 'Channel',
        resolve: async (_parent, _args, { prisma }) => {
          return await prisma.channel.findMany()
        },
      }),
      t.list.field('allUsers', {
        type: 'User',
        resolve: async (_parent, _args, { prisma }) => {
          return await prisma.user.findMany({
            select: {
              id: true,
              username: true,
              email: true,
              photoUrl: true,
              friends: {
                select: {
                  id: true,
                  username: true,
                  email: true,
                  photoUrl: true,
                },
              },
            },
          })
        },
      })
  },
})

module.exports = { Query }
