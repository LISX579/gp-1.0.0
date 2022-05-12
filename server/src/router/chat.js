const Router = require('koa-router')
const router = new Router()
const { getRes, delay } = require('../util/sqlUtil')
const sql = require('../mysql/sql')

router.get('/:id/contact', async (ctx) => {
  const res = await getRes(sql.chat.contact(ctx.params.id))
  ctx.body = res
})

router.get('/getMsg', async (ctx) => {
  console.log(sql.chat.getyid(ctx.query.id, ctx.query.toID));
  const res = await getRes(sql.chat.getyid(ctx.query.id, ctx.query.toID))
  console.log(res);
  if (res.data) {
    ctx.body = res
  } else {
    ctx.body = ''
  }
})
router.get('/:id/getAllMsg', async (ctx) => {
  const res1= await getRes(sql.chat.getAllyid1(ctx.params.id))
  const res2 = await getRes(sql.chat.getAllyid2(ctx.params.id))
  ctx.body = {res1, res2}
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
  const res = await getRes(sql.chat.deleteFriend(ctx.query))
  ctx.body = res
})

router.get('/:id/getApply', async (ctx) => {
  const res = await getRes(sql.chat.getApply(ctx.params.id))
  ctx.body = res
})

router.get('/:id/getUserInfo', async (ctx) => {
  const res = await getRes(sql.chat.getUserInfo(ctx.params.id))
  ctx.body=res
})




module.exports = router
