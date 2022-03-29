import {api, fetch} from './common'
import axios from "axios";

const _thisApi = api

const data = { id: '1001'}

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
    return fetch(_thisApi +'/exit/'+ id, 'post')
  }
}
