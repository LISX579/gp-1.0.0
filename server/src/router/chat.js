const Router = require('koa-router')
const router = new Router()
const { getRes, delay } = require('../util/sqlUtil')
const sql = require('../mysql/sql')

router.get('/:id/contact', async (ctx) => {
  const res = await getRes(sql.chat.contact(ctx.params.id))
  ctx.body = res
})

router.get('/getMsg', async (ctx) => {
  const res = await getRes(sql.chat.getyid(ctx.query))
  if (res.data) {
    ctx.body = res
  } else {
    ctx.body = '暂未选择好友'
  }
})
router.get('/:id/getAllMsg', async (ctx) => {
  const res = await getRes(sql.chat.getAllyid(ctx.params.id))
  console.log(sql.chat.getAllyid(ctx.params.id));
  ctx.body = res
})




module.exports = router
