const { objectType, enumType, asNexusMethod } = require('nexus')
const { DateTimeResolver } = require('graphql-scalars')

const DateTime = asNexusMethod(DateTimeResolver, 'date')
const Community = objectType({
  name: 'Community',
  description: 'the Community type definition',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('name')
    t.nonNull.string('category')
    t.nonNull.string('icon')
    t.string('banner')
    t.string('description')
    t.int('member_count')
    t.field('type', { type: 'CommunityType' })
    t.date('createdAt')
    t.date('updateAt')
    t.date('deletedAt')
    t.boolean('isOwner')
    t.string('owner_id')
    t.nonNull.list.nonNull.field('messages', { type: 'Message' })
    t.nonNull.list.nonNull.field('users', { type: 'User' })
    t.nonNull.list.field('channels', { type: 'Channel' })
  },
})

const CommunityType = enumType({
  name: 'CommunityType',
  members: ['PRIVATE', 'PUBLIC', 'DUO'],
})

module.exports = {
  Community,
  CommunityType,
  DateTime,
}
