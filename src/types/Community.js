const { objectType, asNexusMethod } = require('nexus')
const { DateTimeResolver } = require('graphql-scalars')

const DateTime = asNexusMethod(DateTimeResolver, 'date')
const Community = objectType({
  name: 'Community',
  description: 'the Community type definition',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('name')
    t.nonNull.string('category')
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
  Community,
  DateTime,
}
