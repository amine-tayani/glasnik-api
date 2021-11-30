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
    thumbUrl: arg({ type: 'Upload' }),
  },
  resolve: async (_parent, args, { userId, prisma }) => {
    const existingCommunity = await prisma.community.findUnique({
      where: { name: args.name },
    })
    if (existingCommunity) {
      throw new ValidationError('Community is already exists.')
    }
    const file = await uploadFile(args.thumbUrl)
    const createdCommunity = await prisma.community.create({
      data: {
        name: args.name,
        type: args.type,
        category: args.category,
        thumbUrl: file.secure_url,
        users: {
          connect: { id: userId },
        },
      },
    })
    return createdCommunity
  },
})

module.exports = { createCommunity }
