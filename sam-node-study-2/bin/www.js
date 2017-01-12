const https = require('https');
const fs = require('fs');
const app = require('../app/index.js');

const dir = require('../app/api/v1/util/directory.path').dir;
const port = 3000;

const options = {
    key: fs.readFileSync(dir + '/key/ssl/private.pem', 'utf-8'),
    cert: fs.readFileSync(dir + '/key/ssl/public.pem', 'utf-8')
};

https.createServer(options, app).listen(port, () => {
    console.log('server start => port : ' + port);
});