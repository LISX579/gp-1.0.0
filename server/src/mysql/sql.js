const { get } = require('../router/router')
const { formatDateTime} = require('../util/sqlUtil')
const sql = {
  // 登录注册
  'login': (username, password) => `select username,img,text from user where id='${username}' and password='${password}' and status='offline'`,
  'register': (id, username, password, sex, img) => `insert into user (id,username,password,status,text,img,sex) values (${id},'${username}', '${password}', 'online', '没有个签就是最好的个签','${img}','${sex}')`,
  
  'changeStatus': (id) => `update user set status='online' where id=${id}`,

  'insertStuInfo': (id) => `INSERT INTO stuinfo (id) VALUES ('${id}')`,
  'insertBaseInfo': (id) => `INSERT INTO baseuserinfo (id) VALUES ('${id}')`,
  'createyid': (id) => `CREATE TABLE \`yid${id}\` (\`id\`  int NOT NULL ,\`toID\`  int NULL, content varchar(255), time datetime, status varchar(10))`,
  'createzid': (id) => `CREATE TABLE \`zid${id}\` (\`id\`  int NOT NULL ,\`fclass\`  varchar(255) NULL DEFAULT '我的好友' ,PRIMARY KEY (\`id\`))`,
  'insertzid': (id) => `insert into zid${id} (id) values ('${id}')`,
  


  'exit': (id) => `update user set status='offline' where id=${id}`,

  // 个人信息界面
  'baseInfo': (id) => `select * from baseUserInfo where id ='${id}'`,
  'stuInfo': (id) => `select * from stuInfo where id='${id}'`,
  
  'chat': {
    'contact': (id) => `SELECT \`user\`.id,\`user\`.\`status\`,\`user\`.username,\`user\`.text,zid${id}.fclass from user,zid${id} WHERE \`user\`.id=zid${id}.id`,
    
    'insertyid1': (data) => `insert into yid${data.id} (id, toID, content, time, status) values ('${data.id}','${data.toID}','${data.content}','${formatDateTime(data.time)}', 'unread')`,
    'insertyid2': (data) => `insert into yid${data.toID} (id, toID, content, time, status) values ('${data.id}','${data.toID}','${data.content}','${formatDateTime(data.time)}', 'unread')`,
    
    'getyid': (id,toID) => `select * from yid${id} where (id='${id}' and toID='${toID}') or (id='${toID}' and toID='${id}')`,

    
    'getAllyid1': (id) => `SELECT \`user\`.username,user.id, yid${id}.toID,yid${id}.content,yid${id}.time,yid${id}.status from \`user\` LEFT JOIN yid${id} on \`user\`.id=yid${id}.toID where yid${id}.id = ${id}`,
    'getAllyid2': (id) => `SELECT \`user\`.username,user.id, yid${id}.id as toID,yid${id}.content,yid${id}.time,yid${id}.status from \`user\` LEFT JOIN yid${id} on \`user\`.id=yid${id}.id where yid${id}.toID = ${id}`,

    'contact_move': data => `update zid${data.id} set fclass='${data.fclass}' where id='${data.toID}'`,
    
    'contact_remove': data => `delete from yid${data.id} where (toID='${data.toID}' and id='${data.id}') or (toID='${data.id}' and id='${data.toID}')`,
    
    'find': data => `select user.id,user.username,user.status,user.text,user.img,user.sex from user where id='${data}' or username='${data}'`,
    
    'deleteFriend': data => `delete from zid${data.id} where id='${data.toID}'`,
    
    'addAppyFriend': data => `insert into apply values ('${data.id}','${data.toID}','${data.data}')`,
    
    'getApply': toID => `select data from apply where toID='${toID}'`,
    
    'agreeAddFriend1': (data) => `insert into zid${data.myID} values ('${data.fromID}','我的好友')`,
    
    'agreeAddFriend2': (data) => `insert into zid${data.fromID} values ('${data.myID}','我的好友')`,
    
    'deleteApply': (data) => `delete from apply where id='${data.fromID}' and toID='${data.myID}'`, 
    
    'getUserInfo': id => `select id,username,img,text from user where id='${id}'`,

    'getBadge': (data) => `select count(*) as count from yid${data.id} where id=${data.toID} and toID=${data.id} and status='unread'`,

    'getName': (id) => `select username from user where id='${id}'`,

    'read': (data) => `update yid${data.id} set status='read' where (id=${data.id} and toID=${data.toID}) or (id=${data.toID} and toID=${data.id})`
  }
}

module.exports = sql