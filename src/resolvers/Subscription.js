const { subscriptionType } = require('nexus')

const Subscription = subscriptionType({
  definition(t) {
    t.string('newUserLoggedIn', {
      subscribe: (_root, _args, context) => {
        return context.pubsub.asyncIterator('USER_LOGGED_IN')
      },
      resolve: (payload) => {
        return payload
      },
    })
  },
})

module.exports = { Subscription }
