const { arg, mutationField } = require('nexus')
const { uploadFile } = require('../../utils/cloudinary')

const uploadAvatar = mutationField('uploadAvatar', {
  description: 'Mutation for file uploading (avatar) ',
  type: 'ResponseMessage',
  args: {
    avatar: arg({ type: 'Upload' }),
  },
  resolve: async (_parent, { avatar }, { prisma, userId }) => {
    const file = await uploadFile(avatar)
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: { photoUrl: file.secure_url },
    })
    return { message: 'file uploaded' }
  },
})

module.exports = { uploadAvatar }
