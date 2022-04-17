const koa = require('koa')
const cors = require('koa2-cors')
const server = new koa()
const route = require('./src/router/router')
const chat = require('./src/router/chat')
server.use(cors({}))
const stuManage = require('./src/router/stuMange')

const chatSocket = require('./src/socket/chatSocket')
chatSocket()

server.use(route.routes())
server.use(route.allowedMethods())
server.use(chat.routes())
server.use(chat.allowedMethods())
server.use(stuManage.routes())
server.use(stuManage.allowedMethods())


server.listen(9000, () => {
  console.log('server is running on http://localhost:9000');
})
