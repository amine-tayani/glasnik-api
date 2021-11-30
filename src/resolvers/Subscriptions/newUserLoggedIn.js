const { subscriptionField } = require('nexus')

const newUserLoggedIn = subscriptionField('newUserLoggedIn', {
  type: 'User',
  subscribe: (_root, _args, context) => {
    return context.pubsub.asyncIterator('USER_LOGGED_IN')
  },
  resolve: (payload) => {
    return payload.user
  },
})
module.exports = { newUserLoggedIn }
