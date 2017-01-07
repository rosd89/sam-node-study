const http = require('http');
const app = require('../app/index.js');

const port = 3000;

http.createServer(app).listen(port, () => {
    console.log('server start => port : ' + port);
});