const { get } = require('../router/router')
const { formatDateTime} = require('../util/sqlUtil')
const sql = {
  // 登录注册
  'login': (username, password) => `select username,img,text,permission,tid,sex from user where id='${username}' and password='${password}' and status='offline'`,
  'register': (id, username, password, sex, img, permission, tId) => `insert into user (id,username,password,status,text,sex,permission,tId) values (${id},'${username}', '${password}', 'online', '没有个签就是最好的个签','${sex}','${permission}', '${tId}')`,

  'changeStatus': (id) => `update user set status='online' where id=${id}`,
  'createxm': (id) => `create table xmanage${id} (id int not null, name varchar(255), primary key(id))`,
  'insertxm': (data) => `insert into xmanage${data.tId} values ('${data.id}', '${data.username}')`, 
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
    'contact': (id) => `SELECT \`user\`.id,\`user\`.\`status\`,\`user\`.username,\`user\`.text,\`user\`.sex,zid${id}.fclass from user,zid${id} WHERE \`user\`.id=zid${id}.id`,
    
    'insertyid1': (data) => `insert into yid${data.id} (id, toID, content, time, status) values ('${data.id}','${data.toID}','${data.content}','${formatDateTime(data.time)}', 'unread')`,
    'insertyid2': (data) => `insert into yid${data.toID} (id, toID, content, time, status) values ('${data.id}','${data.toID}','${data.content}','${formatDateTime(data.time)}', 'unread')`,
    // select yid1002.*,`user`.sex from yid1002 LEFT JOIN user on yid1002.id=`user`.id where (yid1002.id='1002' and yid1002.toID='1002') or (yid1002.id='1002' and yid1002.toID='1002')  
    'getyid': (id, toID) => `select yid${id}.*,user.sex from yid${id} left join user on yid${id}.id=user.id where (yid${id}.id='${id}' and yid${id}.toID='${toID}') or (yid${id}.id='${toID}' and yid${id}.toID='${id}')`,
    'getSex': id => `select * from user where id='${id}'`,
    
    'getAllyid1': (id) => `SELECT user.sex,\`user\`.username,user.id, yid${id}.toID,yid${id}.content,yid${id}.time,yid${id}.status from \`user\` LEFT JOIN yid${id} on \`user\`.id=yid${id}.toID where yid${id}.id = ${id}`,
    'getAllyid2': (id) => `SELECT user.sex,\`user\`.username,user.id, yid${id}.id as toID,yid${id}.content,yid${id}.time,yid${id}.status from \`user\` LEFT JOIN yid${id} on \`user\`.id=yid${id}.id where yid${id}.toID = ${id}`,

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
    'getAvgBadge': (id) => `select count(*) as count from yid${id} where toID=${id} and status='unread'`,

    'getName': (id) => `select username from user where id='${id}'`,

    'read': (data) => `update yid${data.id} set status='read' where (id=${data.id} and toID=${data.toID}) or (id=${data.toID} and toID=${data.id})`
  
  
  },
  'stuManage': {
    'getBaseInfo': (data) => `select baseuserinfo.* from baseuserinfo RIGHT JOIN xManage${data.id} on baseuserinfo.id=xmanage${data.id}.id limit ${data.page},10`,
    'getBaseInfoTotal': (data) =>  `select count(*) as count from baseuserinfo RIGHT JOIN xManage${ data.id } on baseuserinfo.id = xmanage${ data.id }.id `,
    
    'stuManageDelete': data => `delete from xmanage${data.id} where id='${data.toID}'`,
    
    'stuManageIncrease': data => `insert into xmanage${data.id} values ('${data.toID}', '${data.name}')`,
    
    'stuManageEdit1': (id, data) => `update baseUserInfo set name='${data.name}',idNumber='${data.idNumber}',nation='${data.nation}',nationality='${data.nationality}', PlaceOfOrigin='${data.PlaceOfOrigin}',sex='${data.sex}',registeredResidence='${data.registeredResidence}' where id='${data.id}'`,
    'stuManageEdit2': (id, data) => `update xmanage${id} set name='${data.name}' where id='${data.id}'`,

    'getStuInfo': (data) => `select stuinfo.*,xmanage${data.id}.name from stuinfo, xmanage${data.id} where stuinfo.id=xmanage${data.id}.id limit ${data.page}, 10`,
    'getStuInfoTotal': data => `select count(*) as count from stuinfo, xmanage${data.id} where stuinfo.id=xmanage${data.id}.id`,


  },

  'notice': {
    'newNotice': data => `insert into notice values ('${data.id}','${data.name}','${formatDateTime(data.time)}','${data.title}','${data.content}', '${data.permission}')`,
    'getNotice': data => `SELECT notice.* from xmanage${data.tid},notice WHERE xmanage${data.tid}.id=${data.id} and notice.id='${data.tid}' and notice.permission='self' union all SELECT * from notice where permission='all'`,
    'getAdminNotice': data => `select * from notice where id=${data.id} or permission='self' `,
    'getxmanage': data => `select id from xmanage${data.id}`,
    'delete': data => `delete from notice where id='${data.id}' and time='${data.time}'`,
    'edit': data => `update notice set time='${formatDateTime(data.newTime)}', content='${data.content}',title='${data.title}',permission='${data.permission}'  where id='${data.id}' and time='${formatDateTime(data.oldTime)}'`
  },
  'selfInfo': {
    'stuEdit': data => `insert into infoPending values ('${data.fromId}','${data.name}','${data.toId}','${JSON.stringify(data.data)}','stuEdit')`,
    'baseEdit': data => `insert into infoPending values ('${data.fromId}','${data.name}','${data.toId}','${JSON.stringify(data.data)}','baseEdit')`,

    'stuFlag': data => `select * from infoPending where fromId='${data.fromId}' and type='stuEdit' and toID='${data.toId}'`,
    'baseFlag': data => `select * from infoPending where fromId='${data.fromId}' and type='baseEdit' and toID='${data.toId}'`,

    'updateBaseEdit': data => `update infoPending set data='${JSON.stringify(data.data)}' where fromId='${data.fromId}' and type='baseEdit' and toID='${data.toId}'`,
    'updateStuEdit': data => `update infoPending set data='${JSON.stringify(data.data)}' where fromId='${data.fromId}' and type='stuEdit' and toID='${data.toId}'`,

    'getBaseInfo': id => `select * from infoPending where toID=${id} and type='baseEdit'`,
    'getStuInfo': id => `select * from infoPending where toID=${id} and type='stuEdit'`,


    'updateBaseInfo': data => `update baseuserinfo set usedName='${data.usedName}', idType='${data.idType}', idNumber='${data.idNumber}', sex='${data.sex}', dateOfBirth='${formatDateTime(data.dateOfBirth)}', dateOfAdmission='${formatDateTime(data.dateOfAdmission)}',PlaceOfOrigin='${data.PlaceOfOrigin}', bloodType='${data.bloodType}', nation='${data.nation}',politicalOutlook='${data.politicalOutlook}', nationality='${data.nationality}', registeredResidence='${data.registeredResidence}' where id=${data.id}`,
    'updateStuInfo': data => `update stuinfo set schoolYear='${data.schoolYear}', collegeName='${data.collegeName}', professionalDirection='${data.professionalDirection}', departmentName='${data.departmentName}', major='${data.major}', educationalSystem='${data.educationalSystem}', className='${data.className}',studentStatus='${data.studentStatus}', trainingMode='${data.trainingMode}', office='${data.office}', inSchool='${data.inSchool}', registStatus='${data.registStatus}', registRemark='${data.registRemark}', checkinTime='${formatDateTime(data.checkinTime)}', reasonOfUnChek='${data.reasonOfUnChek}', reasonOfUnregist='${data.reasonOfUnregist}', cultureMethod='${data.cultureMethod}', cultivationLevel='${data.cultivationLevel}',typeOfStu='${data.typeOfStu}', enrollmentquarter='${data.enrollmentquarter}', affiliationSchool='${data.affiliationSchool}',admissionsMajor='${data.admissionsMajor}', enrollmentYear='${data.enrollmentYear}',graduatedFrom='${data.graduatedFrom}',graduationMajor='${data.graduationMajor}' where id='${data.id}' `,
    
    'deleteBaseInfo': data => `delete from infoPending where fromId='${data.fromId}' and type='baseEdit' and toID='${data.toID}'`,
    'deleteStuInfo': data => `delete from infoPending where fromId='${data.fromId}' and type='stuEdit' and toID='${data.toID}'`
  }
}

module.exports = sql