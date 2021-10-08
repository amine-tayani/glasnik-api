const { objectType, enumType, asNexusMethod } = require('nexus')
const { DateTimeResolver } = require('graphql-scalars')

const DateTime = asNexusMethod(DateTimeResolver, 'date')
const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('username')
    t.nonNull.string('email')
    t.nonNull.string('password')
    t.string('photoUrl')
    t.boolean('isActive')
    t.boolean('isBlocked')
    t.string('resetToken')
    t.date('resetTokenExpiry')
    t.date('createdAt')
    t.date('updateAt')
    t.field('role', {
      type: 'Role',
    })
    t.field('Channel', {
      type: 'Channel',
    })
    t.string('channelId')
    t.list.field('messages', {
      type: 'Message',
    })
    t.list.field('friends', {
      type: 'User',
    })
    t.list.field('friendOf', {
      type: 'User',
    })
  },
})

const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('token')
    t.field('user', {
      type: 'User',
    })
    t.string('message')
  },
})

const ResponseMessage = objectType({
  name: 'ResponseMessage',
  definition(t) {
    t.string('message')
  },
})
const ResetResponse = objectType({
  name: 'ResetResponse',
  definition(t) {
    t.string('token')
    t.string('message')
  },
})

const Role = enumType({
  name: 'Role',
  members: ['MOD', 'BOT', 'USER'],
})
module.exports = {
  User,
  AuthPayload,
  Role,
  DateTime,
  ResponseMessage,
  ResetResponse,
}
