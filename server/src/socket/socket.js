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
    
    // 聊天模块
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


    socket.on('contact_move', async (data) => { 
      await getRes(sql.chat.contact_move(data))
      socket.emit('contactRefresh')
    })

    socket.on('badgeValue', async (data) => {
      const res = await getRes(sql.chat.getBadge(data))
      res.toID = data.toID
      socket.emit('badgeValue', res)
    })

    socket.on('openChat', async (data) => { 
      await getRes(sql.chat.read(data))
      const res = await getRes(sql.chat.getBadge(data))
      res.toID = data.toID
      socket.emit('badgeValue',res)
    })

    socket.on('avgCount', async (data) => { 
      const res = await getRes(sql.chat.getAvgBadge(data))
      socket.emit('avgBadge', res)
    })
    socket.on('msgListInc', async (data) => {
      const res = await getRes(sql.chat.getSex(data.id))
      const emitData = {
        toID: data.id,
        username: data.username,
        sex: res.data[0].sex
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





















    // 公告 发布
    socket.on('newNotice', async (data) => {
      
      await getRes(sql.notice.newNotice(data))
      const idData = await getRes(sql.notice.getxmanage(data))
      // console.log(socket.adapter.rooms);
      for (let i = 0; i < idData.data.length; i++) {
        if (typeof socket.adapter.rooms.get(idData.data[i].id.toString()) == 'object') {
          const res = await getRes(sql.notice.getNotice({ id: idData.data[i].id, tid: data.id }))
          socket.to(idData.data[i].id.toString()).emit('noticeRefresh', res);
        }
      }
      const resu = await getRes(sql.notice.getAdminNotice(data))
      socket.emit('noticeRefresh', resu)
    })

    // 进入页面初次刷新
    socket.on('getNotice', async (data) => {
      if (data.permission == 'admin') {
        const resu = await getRes(sql.notice.getAdminNotice(data))
        socket.emit('noticeRefresh', resu)
      } else if (data.permission == 'user') { 
        const res = await getRes(sql.notice.getNotice(data))
        socket.emit('noticeRefresh', res)
      }
    })

    // 删除公告
    socket.on('notice_delete', async (data) => {

      await getRes(sql.notice.delete(data))
      const idData = await getRes(sql.notice.getxmanage(data))
    
      
      for (let i = 0; i < idData.data.length; i++) {
        if (typeof socket.adapter.rooms.get(idData.data[i].id.toString()) == 'object') {
          const res = await getRes(sql.notice.getNotice({ id: idData.data[i].id, tid: data.id }))
          socket.to(idData.data[i].id.toString()).emit('noticeRefresh', res);
        }
      }
      const resu = await getRes(sql.notice.getAdminNotice(data))
      socket.emit('noticeRefresh', resu)
    })

    // 编辑公告
    socket.on('notice_edit', async (data) => {

      await getRes(sql.notice.edit(data))
      

      const idData = await getRes(sql.notice.getxmanage(data))
      for (let i = 0; i < idData.data.length; i++) {
        if (typeof socket.adapter.rooms.get(idData.data[i].id.toString()) == 'object') {
          const res = await getRes(sql.notice.getNotice({ id: idData.data[i].id, tid: data.id }))
          socket.to(idData.data[i].id.toString()).emit('noticeRefresh', res);
        }
      }
      const resu = await getRes(sql.notice.getAdminNotice(data))
      socket.emit('noticeRefresh', resu)
    })






    // -----------个人信息模块----------------------------
    socket.on('stuEdit', async (data) => {
      // flag 判断是update还是insert
      const flag = await getRes(sql.selfInfo.stuFlag(data))
      if (flag.data.length > 0) {
        await getRes(sql.selfInfo.updateStuEdit(data))
      } else { 
        await getRes(sql.selfInfo.stuEdit(data))
      }
      
      const res = await getRes(sql.selfInfo.getStuInfo(data.toId))
      socket.to(data.toId.toString()).emit('refreshStu', res)
    })

    socket.on('baseEdit', async (data) => {
      const flag = await getRes(sql.selfInfo.baseFlag(data))
      if (flag.data.length > 0) {
        await getRes(sql.selfInfo.updateBaseEdit(data))
      } else {
        await getRes(sql.selfInfo.baseEdit(data))
      }
      const res = await getRes(sql.selfInfo.getBaseInfo(data.toId))
      socket.to(data.toId.toString()).emit('refreshBase', res)
    })

    socket.on('basePending', async(data) => {
      const res = await getRes(sql.selfInfo.getBaseInfo(data))
      socket.emit('refreshBase', res)
    })

    socket.on('stuPending', async (data) => {
      const res = await getRes(sql.selfInfo.getStuInfo(data))
      socket.emit('refreshStu', res)
    })

    socket.on('xmBaseAgree', async (data) => {
      await getRes(sql.selfInfo.updateBaseInfo(data.data))
      await getRes(sql.selfInfo.deleteBaseInfo(data)) 
      const res = await getRes(sql.selfInfo.getBaseInfo(data))
      socket.emit('refreshBase', res)
    })
    socket.on('xmStuAgree', async (data) => {
      await getRes(sql.selfInfo.updateStuInfo(data.data))
      await getRes(sql.selfInfo.deleteStuInfo(data))
      const res = await getRes(sql.selfInfo.getStuInfo(data))
      socket.emit('refreshStu', res)
    })
    socket.on('xmBaseRefuse', async (data) => {
      await getRes(sql.selfInfo.deleteBaseInfo(data))

      const res = await getRes(sql.selfInfo.getBaseInfo(data))
      socket.emit('refreshBase', res)
    })
    socket.on('xmStuRefuse', async (data) => {
      await getRes(sql.selfInfo.deleteStuInfo(data))
      const res = await getRes(sql.selfInfo.getStuInfo(data))

      socket.emit('refreshStu', res)
    })







  })

  server.listen(9001, () => {
    console.log('socket is running at http://localhost:9001');
  })
}

module.exports = chatSocket