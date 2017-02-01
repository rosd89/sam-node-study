const app = require('../app/index.js');

const dir = require('../app/api/v1/util/directory.path').dir;
const port = 3000;

const syncDatabase = require('./sync-database');

app.listen(port, () => {
    console.log('server start => port : ' + port);

    syncDatabase().then(_ => console.log('Database sync'))
});