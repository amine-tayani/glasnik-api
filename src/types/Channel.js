const { objectType, asNexusMethod } = require('nexus')
const { DateTimeResolver } = require('graphql-scalars')
const { Message } = require('./Message')
const { User } = require('./User')

const DateTime = asNexusMethod(DateTimeResolver, 'date')
const Channel = objectType({
  name: 'Channel',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('name')
    t.date('createdAt')
    t.date('updateAt')
    t.date('deletedAt')
    t.nonNull.list.nonNull.field('messages', {
      type: 'Message',
    })
    t.nonNull.list.nonNull.field('users', {
      type: 'User',
    })
  },
})

module.exports = {
  Channel,
  DateTime,
}
