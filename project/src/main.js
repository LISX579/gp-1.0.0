import Vue from 'vue';
import App from './App.vue';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import Vuex from 'vuex';
import "./global/style/global.css";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import store from './store/index';
import VueSocketIO from 'vue-socket.io';
import SocketIO from "socket.io-client"

Vue.use(ElementUI);
Vue.use(ViewUI);
Vue.use(Vuex);
Vue.prototype.$bus = new Vue()

Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO('http://localhost:9001'),
  // options: { path: "/", transports: ['websocket', 'polling', 'flashsocket'] },
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  },
  // options: {
  //   autoConnect: false
  // }
}));

Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue();
new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app');
