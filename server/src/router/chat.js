const Router = require('koa-router')
const router = new Router()
const { getRes, delay } = require('../util/sqlUtil')
const sql = require('../mysql/sql')

router.get('/:id/contact', async (ctx) => {
  console.log(sql.chat.contact(ctx.params.id));
  const res = await getRes(sql.chat.contact(ctx.params.id))
  ctx.body = res
})

router.get('/getMsg', async (ctx) => {
  const res = await getRes(sql.chat.getyid(ctx.query))
  console.log(res);
  if (res.data) {
    ctx.body = res
  } else {
    ctx.body = '暂未选择好友'
  }
})
router.get('/:id/getAllMsg', async (ctx) => {
  const res = await getRes(sql.chat.getAllyid(ctx.params.id))
  ctx.body = res
})

router.post('/contact_move', async (ctx) => {
  const res = await getRes(sql.chat.contact_move(ctx.query))
  ctx.body = res
})
router.post('/contact_remove', async (ctx) => {
  const res = await getRes(sql.chat.contact_remove(ctx.query))
  ctx.body = res
})

router.post('/find', async (ctx) => {
  const res = await getRes(sql.chat.find(ctx.query.input))
  ctx.body = res
})

router.post('/deleteFriend', async (ctx) => {
  console.log(sql.chat.deleteFriend(ctx.query));
  const res = await getRes(sql.chat.deleteFriend(ctx.query))
  ctx.body = res
})

router.get('/:id/getApply', async (ctx) => {
  const res = await getRes(sql.chat.getApply(ctx.params.id))
  ctx.body = res
  console.log(res);
})




module.exports = router
