const Router = require('koa-router')
const router = new Router()
const { getRes, delay } = require('../util/routerUtil')
const sql = require('../mysql/sql')

router.get('/login', async (ctx) => {
  const res = await getRes(sql.login(ctx.query.id, ctx.query.password))
  ctx.body = {
    'loginCheck': res.data.length ? 'success' : 'fail'
  }
})
router.get('/register', async (ctx) => {
  const res = await getRes(sql.register(ctx.query.id,ctx.query.username, ctx.query.password))
  await delay(2000, () => {
    if (res.data) {
      ctx.body = {
        registerCheck: 'success',
      }
    } else {
      ctx.body = {
        registerCheck: 'fail'
      }
    }
  })
})

router.get('/baseInfo/:id', async (ctx) => {
  const res = await getRes(sql.baseInfo(ctx.params.id))
  await delay(2000, ()=> {
    if (res.data) {
      ctx.body = res
    } else {
      ctx.body = {
        message: '未找到该用户'
      }
    }
  })
})

router.get('/studInfo/:id', async (ctx) => {
  const res = await getRes(sql.stuInfo(ctx.params.id))
  await delay(2000, () => {
    if (res.data) {
      ctx.body = res
    } else {
      ctx.body = {
        message: '未找到该用户'
      }
    }
  })
})


module.exports = router
