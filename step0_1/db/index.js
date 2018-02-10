const Sequelize = require('sequelize')

const models = require('./model')
const {database, username, password, host, port, dialect, logging} = require('../config/db.config.json')

const sequelize = new Sequelize(database, username, password, {
  host,
  port,
  dialect,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging
})

module.exports = models({sequelize}, Sequelize);
