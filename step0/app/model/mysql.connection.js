const sequelize = require('sequelize');
const {database, dialect, username, password, host, port} = require('../config/environment');

const db = new sequelize(
  database, username, password,
  {
    host, dialect, port,
    logging: msg => console.log(msg)
  }
);

module.exports = db;