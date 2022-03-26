import {api, fetch} from './common'

const _thisApi = api

export default {
    'getBaseInfo': function (id) {
        return fetch(_thisApi + '/' + id + '/baseInfo', 'get')
    },
    'getStuInfo': function (id) {
      return fetch(_thisApi + '/' + id + '/studInfo', 'get')
    }
}
