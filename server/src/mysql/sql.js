const sql = {
  // 登录注册
  'login': (id, password) => `select * from user where id='${id}' and password='${password}'`,
  'changeStatus': (id, status) => `update user set status='${status}' where id='${id}'`,
  'register': (id, username, password) => `insert into user values ('${id}','${username}', '${password}', 'online', '没有个签就是最好的个签')`,
  'createIdTable': (id) => `CREATE TABLE \`zid${id}\` (\`fid\` int NOT NULL,\`fclass\` varchar(255) NULL DEFAULT '我的好友',PRIMARY KEY(\`fid\`))`,
  'createBaseInfo': (id) => `insert into baseuserInfo(id) values (${id})`,
  'createStuInfo': (id) => `insert into stuInfo(id) values (${id})`,
  
  // 个人信息界面
  'baseInfo': (id) => `select * from baseUserInfo left join user on baseUserInfo.id=user.id where user.id ='${id}'`,
  'stuInfo': (id) => `select * from stuInfo left join user on stuInfo.id=user.id where user.id='${id}'`,
  
  'chat': {
    'getContact': (id) => `select * from zid${id},user where user.id=zid${id}.fid `
  }
}

module.exports = sql