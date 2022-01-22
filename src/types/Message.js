const { objectType, asNexusMethod } = require('nexus')
const { DateTimeResolver } = require('graphql-scalars')

const DateTime = asNexusMethod(DateTimeResolver, 'date')
const Message = objectType({
  name: 'Message',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('text')
    t.date('timestamp')
    t.date('updateAt')
    t.date('deletedAt')
    t.nonNull.field('sender', { type: 'User' })
    t.nonNull.string('senderId')
    t.field('community', { type: 'Community' })
    t.string('communityId')
    t.field('channel', { type: 'Channel' })
    t.string('channelId')
  },
})

module.exports = {
  Message,
}
