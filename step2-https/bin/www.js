const https = require('https');
const fs = require('fs');
const path = require('path');

const app = require('../app');
const port = 3000;

const dir = path.resolve(__dirname, '../');
global.$dir = dir;

const options = {
  key: fs.readFileSync(`${dir}/key/key.pem`, 'utf-8'),
  cert: fs.readFileSync(`${dir}/key/cert.pem`, 'utf-8')
};

https.createServer(options, app).listen(port, _ => {
  console.log(`{{Server Start}}-NODE_ENV[${process.env.NODE_ENV}]-PORT[${port}]`);
});