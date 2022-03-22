let mysql = require('mysql')
// 连接池
let pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Today579',
  database: 'severdata',
  port: '3306'
})

function query(sql, callback) {
  pool.getConnection(function (err, connection) {
    connection.query(sql, function (error, rows) {
      callback(err, rows)
      // 中断连接
      connection.release()
    })
  })
}

module.exports = {
  query
}