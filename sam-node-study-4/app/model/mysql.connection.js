const sequelize = require('sequelize');
const dbConfig = require('../config/environment');

const db = new sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    port: dbConfig.port,
    logging: dbConfig.logging
});

module.exports = db;