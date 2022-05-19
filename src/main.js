import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import router from './router'
import store from './store'

import './components/globalComponent'

import './config/vantGlobalComponents.js'
import './permission.js'
// import Vant from 'vant';
// import 'vant/lib/index.css';

// Vue.use(Vant);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
