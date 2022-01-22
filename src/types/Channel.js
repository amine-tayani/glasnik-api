const { objectType, enumType, asNexusMethod } = require('nexus')
const { DateTimeResolver } = require('graphql-scalars')

const DateTime = asNexusMethod(DateTimeResolver, 'date')
const Channel = objectType({
  name: 'Channel',
  description: 'the Channel type definition',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('topic')
    t.field('mode', { type: 'ChannelMode' })
    t.date('createdAt')
    t.date('updateAt')
    t.date('deletedAt')
    t.nonNull.string('communityId')
    t.nonNull.list.nonNull.field('messages', { type: 'Message' })
    t.nonNull.int('member_count')
    t.nonNull.int('message_count')
    t.string('owner_id')
    t.string('communityId')
    t.nonNull.list.nonNull.field('recipients', { type: 'User' })
    t.nonNull.field('community', { type: 'Community' })
  },
})

const ChannelMode = enumType({
  name: 'ChannelMode',
  members: ['TEXT', 'VOICE'],
})

module.exports = {
  Channel,
  ChannelMode,
  DateTime,
}
