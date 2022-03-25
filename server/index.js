const koa = require('koa')
const cors = require('koa2-cors')
const server = new koa()
const route = require('./src/router/router')

server.use(cors({}))
server.use(route.routes())
server.use(route.allowedMethods())

server.listen(9000, () => {
  console.log('server is running on http://localhost:9000');
})
