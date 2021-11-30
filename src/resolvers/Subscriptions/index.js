const { onMessage } = require('./onMessage')
const { newUserLoggedIn } = require('./newUserLoggedIn')

const Subscription = [newUserLoggedIn, onMessage]

module.exports = { Subscription }
