const Router = require('koa-router')
const router = new Router()
const { getRes, delay, syncGetRes } = require('../util/routerUtil')
const sql = require('../mysql/sql')

router.get('/login', async (ctx) => {
  const res = await getRes(sql.login(ctx.query.id, ctx.query.password))
  if (res.data) {
    if (res.data[0].status === 'offline') {
      ctx.body = {
        'loginCheck': 'success'
      }
    } else {
      ctx.body = {
        'loginCheck': 'repeat'
      }
    }
    await getRes(sql.changeStatus(ctx.query.id, 'online'))
  } else {
    ctx.body = {
      'loginCheck': 'fail'
    }
  }
})
router.get('/register', async (ctx) => {
  const res = await getRes(sql.register(ctx.query.id, ctx.query.username, ctx.query.password))
  if (res.data) {
    await getRes(sql.createIdTable(ctx.query.id))
    await getRes(sql.createBaseInfo(ctx.query.id))
    await getRes(sql.createStuInfo(ctx.query.id))
    await delay(2000, () => {
      ctx.body = {
        registerCheck: 'success',
      }
    })
  } else {
    ctx.body = {
      registerCheck: 'fail',
    }
  }
})

router.get('/:id/exit', async (ctx) => {
  await getRes(sql.changeStatus(ctx.params.id, 'offline'))
  ctx.body = {
    message: '退出登录成功！'
  }
})


router.get('/:id/baseInfo', async (ctx) => {
  const res = await getRes(sql.baseInfo(ctx.params.id))
  await delay(1000, ()=> {
    if (res.data) {
      ctx.body = res
    } else {
      ctx.body = {
        message: '未找到该用户'
      }
    }
  })
})

router.get('/:id/studInfo', async (ctx) => {
  const res = await getRes(sql.stuInfo(ctx.params.id))
  await delay(2000, () => {
    if (res.data) {
      ctx.body = res || 'null'
    } else {
      ctx.body = {
        message: '未找到该用户'
      }
    }
  })
})
router.get('/:id/contact', async (ctx) => {
  const res = await getRes(sql.chat.getContact(ctx.params.id))
  ctx.body = res
  console.log(res);
})

module.exports = router
