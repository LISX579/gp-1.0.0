import axios from 'axios'

export const rootapi = 'http://127.0.0.1:9000'

export function FETCH (url, method, data, params, header) {
  return new Promise((resolve, reject) => {
    axios({
      method: method || 'get',
      url: url,
      params: params || {},
      data: data || {},
      headers: Object.assign({
        'Content-Type': 'application/json',
        'X-Access-Module': 'ADMIN'
      }, header),
      // withCredentials: true,
      transformRequest: [function (data) {
        let ret = ''
        ret = JSON.stringify(data)
        return ret
      }]
    }).then(res => {
      resolve(res.data)
    }).catch((error) => {
      reject(error)
    })
  })
}
