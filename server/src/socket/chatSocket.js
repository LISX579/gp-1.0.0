const { get } = require('../router/router');
const { formatDateTime } = require('../util/sqlUtil')
const { parse } =require('../util/util')

function chatSocket() {
  const Koa = require('koa');
  const app = new Koa();
  const server = require('http').Server(app.callback());
  const io = require('socket.io')(server, { cors: true });

  const { getRes, delay } = require('../util/sqlUtil')
  const sql = require('../mysql/sql')

  io.on('connection', socket => {
    socket.on('connectID', data => {
      socket.join(data)
    })

    socket.on('sendMsg', async (data) => {
      await getRes(sql.chat.insertyid1(data))
      if (data.id !== data.toID){
        await getRes(sql.chat.insertyid2(data))
        socket.to(data.toID.toString()).emit('getMsg', data)
        socket.to(data.toID.toString()).emit('msgRefresh')
        socket.emit('msgRefresh')
        const res = await getRes(sql.chat.getBadge(data))
        socket.to(data.toID.toString()).emit('badgeValue', res)
      }
    })



    socket.on('badgeValue', async (data) => {
      const res = await getRes(sql.chat.getBadge(data))
      res.toID = data.toID
      socket.emit('badgeValue', res)
    })

    socket.on('openChat', async (data) => { 
      console.log(data);
    })
























    socket.on('msgListInc', async (data) => {
      const emitData = {
        toID: data.id,
        username: data.username
      }
      socket.emit('msgListInc', emitData)
    })

    socket.on('applyAdd', async (data) => {
      await getRes(sql.chat.addAppyFriend(data))
      const res = await getRes(sql.chat.getApply(data.toID))
      socket.to(data.toID.toString()).emit('refreshApply', res)
    })

    socket.on('applyAgree', async (data) => {
      await getRes(sql.chat.agreeAddFriend1(data))
      await getRes(sql.chat.agreeAddFriend2(data))
      await getRes(sql.chat.deleteApply(data))
      const res = await getRes(sql.chat.getApply(data))
      socket.emit('refreshApply', res)
      socket.emit('contactRefresh')
      socket.to(data.fromID.toString()).emit('contactRefresh')
    })

    socket.on('applyRefuse', async (data) => { 
      await getRes(sql.chat.deleteApply(data))
      const res = await getRes(sql.chat.getApply(data))
      socket.emit('refreshApply', res)
    })

    socket.on('demo', id => {
      socket.to(id).emit('demoBack','指定返回的消息')
    })


    // 刷新
    socket.on('getApply', async (data) => {
      const res = await getRes(sql.chat.getApply(data))
      socket.emit('refreshApply', res)
    })
  })

  server.listen(9001, () => {
    console.log('socket is running at http://localhost:9001');
  })
}

module.exports = chatSocket