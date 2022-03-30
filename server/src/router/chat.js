const Router = require('koa-router')
const router = new Router()
const { getRes, delay } = require('../util/routerUtil')
const sql = require('../mysql/sql')

router.get('/:id/contact', async (ctx) => {
  const res = await getRes(sql.chat.contact(ctx.params.id))
  ctx.body = res
})




module.exports = router
