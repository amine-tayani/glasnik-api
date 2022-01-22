const { ValidationError } = require('apollo-server-express')
const { nonNull, stringArg, arg, mutationField } = require('nexus')
const { uploadFile } = require('../../utils/cloudinary')

const createCommunity = mutationField('createCommunity', {
  description: 'mutation for creating a new Community',
  type: 'Community',
  args: {
    name: nonNull(stringArg()),
    type: 'CommunityType',
    category: nonNull(stringArg()),
    icon: arg({ type: 'Upload' }),
  },
  resolve: async (_parent, args, { userId, prisma }) => {
    const existingCommunity = await prisma.community.findUnique({
      where: { name: args.name.trim() },
    })
    if (existingCommunity) {
      throw new ValidationError('Community is already exists.')
    }
    const file = await uploadFile(args.icon)
    const createdCommunity = await prisma.community.create({
      data: {
        name: args.name.trim(),
        type: args.type,
        category: args.category.trim(),
        icon: file.secure_url,
        users: { connect: { id: userId } },
        owner_id: userId,
        owner: true,
      },
    })
    await prisma.community.update({
      data: { member_count: { increment: 1 } },
      where: { id: createCommunity.id },
    })
    return createdCommunity
  },
})

module.exports = { createCommunity }
