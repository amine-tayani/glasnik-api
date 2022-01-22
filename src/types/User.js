const { objectType, enumType, asNexusMethod } = require('nexus')
const { DateTimeResolver } = require('graphql-scalars')
const { GraphQLUpload } = require('graphql-upload')

const DateTime = asNexusMethod(DateTimeResolver, 'date')

// Upload Scalar type
const Upload = asNexusMethod(GraphQLUpload, 'upload')
const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('email')
    t.nonNull.string('password')
    t.nonNull.string('username')
    t.string('avatar')
    t.string('banner')
    t.field('role', { type: 'Role' })
    t.string('resetToken')
    t.date('resetTokenExpiry')
    t.boolean('isActive')
    t.boolean('verified')
    t.boolean('isBlocked')
    t.date('createdAt')
    t.date('updateAt')
    t.list.field('communities', { type: 'Community' })
    t.string('communityId')
    t.list.field('messages', { type: 'Message' })
    t.list.field('friends', { type: 'User' })
    t.list.field('friendOf', { type: 'User' })
    t.field('channel', { type: 'Channel' })
    t.string('channelId')
  },
})

const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('token')
    t.field('user', { type: 'User' })
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
  Upload,
  Role,
  DateTime,
  ResponseMessage,
  ResetResponse,
  DateTime,
}
