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
    t.nonNull.string('communityId')
    t.nonNull.string('senderId')
    t.nonNull.field('sender', {
      type: 'User',
    })
    t.nonNull.field('community', {
      type: 'Community',
    })
  },
})

module.exports = {
  Message,
}
