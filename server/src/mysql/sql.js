const { formatDateTime} = require('../util/sqlUtil')
const sql = {
  // 登录注册
  'login': (username, password) => `select username,img,text from user where id='${username}' and password='${password}' and status='offline'`,
  'register': (id, username, password, sex, img) => `insert into user (id,username,password,status,text,sex) values (${id},'${username}', '${password}', 'online', '没有个签就是最好的个签','${sex}','${img}')`,
  
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
    'contact': (id) => `SELECT \`user\`.id,\`user\`.\`status\`,\`user\`.username,\`user\`.text,zid${id}.fclass from user,zid${id} WHERE \`user\`.id=zid${id}.id`,
    'insertyid': (data) => `insert into yid${data.id} (id, toID, content, time, status) values ('${data.id}','${data.toID}','${data.content}','${formatDateTime(data.time)}', 'true')`,
    'getyid': (data) => `select * from yid${data.id} where toID = ${data.toID}`,
    'getAllyid': (id) => `SELECT \`user\`.username, yid${id}.* from \`user\` LEFT JOIN yid${id} on \`user\`.id=yid${id}.toID where \`user\`.id=yid${id}.toID`,
    'contact_move': data => `update zid${data.id} set fclass='${data.fclass}' where id='${data.toID}'`,
    'contact_remove': data => `delete from yid${data.id} where toID='${data.toID}'`,
    'find': data => `select user.id,user.username,user.status,user.text,user.img,user.sex from user where id='${data}' or username='${data}'`,
    'deleteFriend': data => `delete from zid${data.id} where id='${data.toID}'`,
    'addAppyFriend': data => `insert into apply values ('${data.id}','${data.toID}','${data.data}')`,
    'getApply': id => `select data from apply where toID='${id}'`,
    'agreeAddFriend1': (data) => `insert into zid${data.myID} values ('${data.fromID}','我的好友')`,
    'agreeAddFriend2': (data) => `insert into zid${data.fromID} values ('${data.myID}','我的好友')`
  }
}

module.exports = sql