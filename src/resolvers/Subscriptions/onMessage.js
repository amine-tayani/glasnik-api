const { withFilter } = require('graphql-subscriptions')
const { subscriptionField } = require('nexus')

const ON_MESSAGE = 'ON_MESSAGE'

function newMessage(parent, args, context, info) {
  return context.pubsub.asyncIterator(ON_MESSAGE)
}

const onMessage = subscriptionField('onMessage', {
  type: 'Message',
  description: 'subscription that listen for new messages',
  subscribe: withFilter(
    (parent, args, context) => {
      return context.pubsub.asyncIterator(ON_MESSAGE)
    },
    (payload) => true,
  ),
  resolve: (payload) => {
    return payload.message
  },
})
module.exports = { onMessage, ON_MESSAGE }
