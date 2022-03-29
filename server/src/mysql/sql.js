const sql = {
  // 登录注册
  'login': (username, password) => `select * from user where id='${username}' and password='${password}' and status='offline'`,
  'register': (id, username, password) => `insert into user (id,username,password,status,text) values (${id},'${username}', '${password}', 'online', '没有个签就是最好的个签')`,
  
  'changeStatus': (id) => `update user set status='online' where id=${id}`,

  'insertStuInfo': (id) => `INSERT INTO stuinfo (id) VALUES ('${id}')`,
  'insertBaseInfo': (id) => `INSERT INTO baseuserinfo (id) VALUES ('${id}')`,
  'createyid': (id) => `CREATE TABLE \`yid${id}\` (\`id\`  int NOT NULL ,\`toID\`  int NULL, content varchar(255), time datetime,PRIMARY KEY (\`id\`))`,
  'createzid': (id) => `CREATE TABLE \`zid${id}\` (\`id\`  int NOT NULL ,\`fclass\`  varchar(255) NULL DEFAULT '我的好友' ,PRIMARY KEY (\`id\`))`,
  'insertzid': (id) => `insert into zid${id} (id) values ('${id}')`,


  'exit': (id) => `update user set status='offline' where id=${id}`,

  // 个人信息界面
  'baseInfo': (id) => `select * from baseUserInfo where id ='${id}'`,
  'stuInfo': (id) => `select * from stuInfo where id='${id}'`,
  
  'chat': {
    'contact': (id) => `SELECT \`user\`.id,\`user\`.\`status\`,\`user\`.text,zid1001.fclass from user,zid1001 WHERE \`user\`.id=zid1001.id`
  }
}

module.exports = sql