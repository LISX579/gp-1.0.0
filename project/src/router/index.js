import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

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
