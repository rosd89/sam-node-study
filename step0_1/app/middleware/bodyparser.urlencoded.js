const bodyParser = require('body-parser');

// for parsing application/x-www-form-urlencoded
module.exports = bodyParser.urlencoded({
  extended: true,
  limit: `${5 * 1024 * 1024}b`,
  parameterLimit: 1000000
});
