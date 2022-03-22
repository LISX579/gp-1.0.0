import { rootapi, FETCH } from '@/util/fetch_common'
export const api = rootapi
export const fetch = FETCH
// 添加响应拦截器
// axios.interceptors.response.use(function (response) {
//   // 对响应数据做点什么
//   return response
// }, function (error) {
//   // 对响应错误做点什么
//   if (error.response && (error.response.status === 401)) {
//     baseFetch._logout()
//       .then( res => {
//         const appHash = window.location.hash
//         if (appHash !== '#/login') {
//           window.location.href = window.CONFIG.login_web
//           localStorage.setItem('licenseNotify', 'show')
//         }
//       })
//   }
//   // if (error.response.status === 401) {
//   //   window.location.href = window.CONFIG.authPath.user
//   // }
//   return Promise.reject(error)
// })
//
// // 添加请求拦截器
// axios.interceptors.request.use(function (config) {
//   // 在发送请求之前做些什么
//   // config.headers['Authorization'] = 'Token ' + sessionStorage.getItem('token') || ''
//   // if (config.url.indexOf('auth/switch_app') <= 0) {
//   //   config['headers']['CMP-Current-Cloud-Env'] = Cookies.get('sys_cloudenv_id') || ''
//   // }
//   return config
// }, function (error) {
//   // 对请求错误做些什么
//   return Promise.reject(error)
// })
