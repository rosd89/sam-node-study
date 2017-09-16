const sequelize = require('sequelize');
const {database, username, password, host, port, logging} = require('../config/environment');

const db = new sequelize(
  database,
  username,
  password,
  {host, port, logging}
);

module.exports = db;