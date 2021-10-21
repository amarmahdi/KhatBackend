const Sequelize = require('sequelize')
const config = require('./config')

const db = {}

const sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    config.db.options,
)

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db