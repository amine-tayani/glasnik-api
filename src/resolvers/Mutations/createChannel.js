const { ValidationError } = require('apollo-server-express')
const { nonNull, stringArg, arg, mutationField } = require('nexus')

const addChannel = mutationField('addChannel', {
  description: 'mutation for adding a new channel => voice OR text',
  type: 'Channel',
  args: {
    topic: nonNull(stringArg()),
    communityId: stringArg(),
    mode: 'ChannelMode',
    owner_id: stringArg(),
  },
  resolve: async (_parent, args, { userId, prisma }) => {
    const isChannelExist = await prisma.channel.findUnique({
      where: { topic: args.topic.trim() },
    })
    if (isChannelExist) {
      throw new ValidationError('Channel already exists.')
    }
    const createdChannel = await prisma.channel.create({
      data: {
        topic: args.topic.trim(),
        mode: args.mode,
        owner_id: userId,
        recipients: { connect: { id: userId } },
        community: { connect: { id: args.communityId } },
      },
    })
    await prisma.channel.update({
      data: { member_count: { increment: 1 } },
      where: { id: createdChannel.id },
    })
    return createdChannel
  },
})

module.exports = { addChannel }
