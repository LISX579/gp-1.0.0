const { reject } = require('any-promise')
const { query } = require('../mysql/mysql.js')

// 异步执行sql语句 返回sql语句执行结果
async function getRes(sql) {
  const res = await new Promise((resovle, reject) => {
    return query(sql, (err, data) => {
      const _data = {
        data
      }
      if (err) throw err
      resovle(_data)
    })
  })
  return res
} 

// 模拟网络延迟
async function delay(time, callback) {
  const delayDo = await new Promise((resolve, reject) => {
    return setTimeout(() => {
      resolve(callback())
    }, time)
  })
  return delayDo
}

module.exports = {
  getRes,
  delay
}