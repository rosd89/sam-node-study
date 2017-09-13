const app = require('../app');
const port = 3000;

app.listen(port, _ => {
  console.log(`{{Server Start}}-NODE_ENV[${process.env.NODE_ENV}]-PORT[${port}]`);
});