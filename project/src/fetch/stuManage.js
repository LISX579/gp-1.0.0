import {api, fetch} from './common'

const _thisApi = api

export default {
  'getMBaseInfo': function (data) {
    return fetch(_thisApi + '/mStuInfo', 'get', {},data)
  },
  'stuManageDelete': function (data) {
    return fetch(_thisApi + '/stuManageDelete','post',{},data)
  },
  'stuManageIncrease': function (data) {
    return fetch(_thisApi + '/stuManageIncrease', 'post', {}, data)
  },
  'stuManageEdit': function (data) {
    return fetch(_thisApi + '/stuManageEdit', 'post', {}, data)
  }
}