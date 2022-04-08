import {api, fetch} from './common'

const _thisApi = api

export default {
  'getContact': function (id) {
    return fetch(_thisApi + '/' + id + '/contact', 'get')
  },
  'sendMsg': function (data) {
    return fetch(_thisApi + '/sendMsg', 'post', {}, data)
  },
  'getMsg': function (data) {
    return fetch(_thisApi + '/getMsg', 'get', {}, data)
  },
  'getAllMsg': function (id) {
    return fetch(_thisApi +'/'+ id + '/getAllMsg', 'get')
  },
  'contact_move': function (data) {
    return fetch(_thisApi + '/contact_move','post',{}, data)
  },
  'contact_remove': function (data) {
    return fetch(_thisApi + '/contact_remove', 'post', {}, data)
  }
}
