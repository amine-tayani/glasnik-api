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
    let file
    const existingCommunity = await prisma.community.findUnique({
      where: { name: args.name.trim() },
    })
    if (existingCommunity) {
      throw new ValidationError('Community is already exists.')
    }
    if (args.icon !== null) {
      file = await uploadFile(args.icon)
    }
    const createdCommunity = await prisma.community.create({
      data: {
        name: args.name.trim(),
        type: args.type,
        category: args.category.trim(),
        icon: file ? file.secure_url : null,
        users: { connect: { id: userId } },
      },
    })

    return createdCommunity
  },
})

module.exports = { createCommunity }
