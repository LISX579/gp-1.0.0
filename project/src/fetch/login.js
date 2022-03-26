import {api, fetch} from './common'

const _thisApi = api

export default {
  // 'userCheck': function () {
  //   return fetch(_thisApi, 'get', {}, {})
  // },
  'login': function (data) {
    return fetch(_thisApi + '/login', 'get', {}, data)
  },
  'register': function (data) {
    return fetch(_thisApi + '/register', 'get', {}, data)
  },
  'exit': function (id) {
    return fetch(_thisApi+ '/'+id +'/exit/', 'get',{},{})
  }
}
