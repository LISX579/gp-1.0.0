const Router = require('koa-router')
const router = new Router()
const { getRes, delay } = require('../util/sqlUtil')
const sql = require('../mysql/sql')


router.get('/mStuInfo', async (ctx) => {
  const res = await getRes(sql.stuManage.getBaseInfo(ctx.query))
  const result = await getRes(sql.stuManage.getBaseInfoTotal(ctx.query))
  console.log(sql.stuManage.getBaseInfo(ctx.query));

  const total = result.data[0].count
  totalPage = total % 10 === 0 ? total / 10 : total / 10 + 1
  await delay(500, () => {
    ctx.body = {
      res,
      total: total,
      totalPage: parseInt(totalPage)
    }
  })
})
























router.post('/stuManageDelete', async (ctx) => {
  const res = await getRes(sql.stuManage.stuManageDelete(ctx.query))
  ctx.body = res
})

router.post('/stuManageIncrease', async (ctx) => {
  const res = await getRes(sql.stuManage.stuManageIncrease(ctx.query))
  console.log(sql.stuManage.stuManageIncrease(ctx.query));

  ctx.body = '增加成功'
})

router.post('/stuManageEdit', async (ctx) => {
  await getRes(sql.stuManage.stuManageEdit1(ctx.query.id, JSON.parse(ctx.query.data)))
  await getRes(sql.stuManage.stuManageEdit2(ctx.query.id, JSON.parse(ctx.query.data)))
  ctx.body = '编辑成功'
})




module.exports = router