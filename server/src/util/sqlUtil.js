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



function formatDateTime(time) {
    const date = new Date(time)
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    var second = date.getSeconds();
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
}

module.exports = {
  getRes,
  delay,
  formatDateTime
}