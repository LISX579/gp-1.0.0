const sql = {
  // 登录注册
  'login': (id, password) => `select * from user where id='${id}' and password='${password}'`,
  'changeStatus': (id, status) => `update user set status='${status}' where id='${id}'`,
  'register': (id, username, password) => `insert into user values (${id},'${username}', '${password}')`,
  
  // 个人信息界面
  'baseInfo': (id) => `select * from baseUserInfo where id ='${id}'`,
  'stuInfo': (id)=> `select * from stuInfo where id='${id}'`
}

module.exports = sql