require('sexy-require')

const app = require('./app')
const {sequelize} = require('./db')
const port = 3000

;(async _ => {
  await sequelize.sync({force: false})
  await app.listen(port, _ => console.log(`{{Server Start}}-NODE_ENV[${process.env.NODE_ENV}]-PORT[${port}]`))
})()
