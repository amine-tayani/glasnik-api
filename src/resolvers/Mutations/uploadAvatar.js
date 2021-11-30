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
    return { message: file.secure_url }
  },
})

module.exports = { uploadAvatar }
