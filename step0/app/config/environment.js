const environments = require('./config.json');

module.exports = environments[process.env.NODE_ENV || 'dev'];