const Router = require('koa-router')
const router = new Router()
const { getRes, delay } = require('../util/sqlUtil')
const sql = require('../mysql/sql')
// const img = require('../assets/boy.png')


router.get('/login', async (ctx) => {
  const res = await getRes(sql.login(ctx.query.id, ctx.query.password))
  await getRes(sql.changeStatus(ctx.query.id))
  ctx.body = {
    'loginCheck': res.data.length ? 'success' : 'fail'
  }
})
router.get('/register', async (ctx) => {
  const res = await getRes(sql.register(ctx.query.id, ctx.query.username, ctx.query.password, ctx.query.sex))
  
  await getRes(sql.insertBaseInfo(ctx.query.id))
  await getRes(sql.insertStuInfo(ctx.query.id))
  await getRes(sql.createyid(ctx.query.id))
  await getRes(sql.createzid(ctx.query.id))
  await getRes(sql.changeStatus(ctx.query.id))
  await getRes(sql.insertzid(ctx.query.id))

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

router.post('/exit/:id', async (ctx) => {
  await getRes(sql.exit(ctx.params.id))
  ctx.body = {
    message: '退出成功！'
  }
})

router.get('/:id/baseInfo', async (ctx) => {
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

router.get('/:id/studInfo', async (ctx) => {
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
