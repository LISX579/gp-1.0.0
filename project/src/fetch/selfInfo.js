import {api, fetch} from './common'

const _thisApi = api

export default {
    'getBaseInfo': function (id) {
        return fetch(_thisApi + '/baseInfo/'+ id, 'get')
    },
    'getStuInfo': function (id) {
      return fetch(_thisApi + '/studInfo/' + id, 'get')
    }
}
