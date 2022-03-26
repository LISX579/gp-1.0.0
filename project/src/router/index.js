import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 报错原因：vue路由跳转相同的地址，即在当前路由下重复当前路由
const routerPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: require('../view/login').default
    },
    {
      path: '/graduation',
      name: 'graduation',
      component: require('../global/structure/index').default,
      children: [
        {
          path: 'overview',
          name: 'overview',
          component: require('../view/overview').default
        },
        {
          path: 'selfInfo',
          name: 'selfInfo',
          component: require('../view/selfInfo').default
        },
        {
          path: 'chat',
          name: 'chat',
          component: require('../view/chat').default
        }
      ]
    }
  ]
})
