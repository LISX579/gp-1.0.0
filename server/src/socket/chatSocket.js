const { time } = require('console');
const { get } = require('../router/router');
const { formatDateTime } = require('../util/sqlUtil')

function chatSocket() {
  const Koa = require('koa');
  const app = new Koa();
  const server = require('http').Server(app.callback());
  const io = require('socket.io')(server, { cors: true });

  const { getRes, delay } = require('../util/sqlUtil')
  const sql = require('../mysql/sql')

  io.on('connection', socket => {
    // socket.on('send', data => {
    //   console.log('客户端发送的内容：', data);
    //   socket.emit('getMsg', '我是返回的消息... ...');
    // })
    socket.on('sendMsg', async (data) => {
      await getRes(sql.chat.insertyid(data))
      const res = await getRes(sql.chat.getyid(data))
      socket.emit('getMsg', res)
      socket.emit('msgChange')
    })
    socket.on('msgListInc', async (data) => {
      const emitData = {
        toID: data.id,
        username: data.username
      }
      socket.emit('msgListInc', emitData)
    })
    socket.on('applyAdd', async (data) => {
      socket.emit('applyAddBack', data)
    })
  })

  server.listen(9001, () => {
    console.log('socket is running at http://localhost:9001');
  })
}

module.exports = chatSocket