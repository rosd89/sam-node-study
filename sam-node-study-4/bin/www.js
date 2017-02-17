const app = require('../app/index');

const port = 3000;

const syncDatabase = require('./sync-database');

app.listen(port, () => {
    console.log('server start => port : ' + port);

    syncDatabase().then(_ => console.log('Database sync'))
});