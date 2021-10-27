const { me } = require('./me')
const { users } = require('./users')
const { communities, community } = require('./communities')

const Query = [me, users, communities, community]

module.exports = { Query }
