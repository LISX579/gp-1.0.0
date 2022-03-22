import Vue from 'vue'
import App from './App.vue'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import Vuex from 'vuex';
import "./global/style/global.css"

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'

Vue.use(ElementUI);
Vue.use(ViewUI)
Vue.use(Vuex)

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
new Vue({
    render: h => h(App),
    // store,
    router,
}).$mount('#app')
