const { queryField, nonNull, stringArg, list } = require('nexus')

const communities = queryField('communities', {
  description: 'get a informations about all communities ',
  type: list('Community'),
  resolve: async (_parent, _args, { prisma }) => {
    const communities = await prisma.community.findMany({
      select: {
        id: true,
        name: true,
        category: true,
        type: true,
        users: {
          select: {
            username: true,
            id: true,
          },
        },
      },
    })
    return communities
  },
})

const community = queryField('community', {
  description: 'get a informations about a single community by id ',
  args: { communityId: nonNull(stringArg()) },
  type: 'Community',
  resolve: async (_parent, { communityId }, { prisma }) => {
    return await prisma.community.findUnique({
      where: { id: communityId },
      select: {
        id: true,
        name: true,
        category: true,
        type: true,
        users: {
          select: {
            username: true,
            id: true,
          },
        },
      },
    })
  },
})

module.exports = { communities, community }
