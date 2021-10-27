const { ValidationError } = require('apollo-server')
const { nonNull, stringArg, mutationField } = require('nexus')

const createCommunity = mutationField('createCommunity', {
  description: 'mutation for creating a new Community',
  type: 'Community',
  args: {
    name: nonNull(stringArg()),
    type: 'CommunityType',
    category: nonNull(stringArg()),
  },
  resolve: async (_parent, args, { userId, prisma }) => {
    const existingCommunity = await prisma.community.findUnique({
      where: { name: args.name },
    })
    if (existingCommunity) {
      throw new ValidationError('Community is already exists.')
    }
    const createCommunity = await prisma.community.create({
      data: {
        name: args.name,
        type: args.type,
        category: args.category,
        users: {
          connect: { id: userId },
        },
      },
    })
    return createCommunity
  },
})

module.exports = { createCommunity }
