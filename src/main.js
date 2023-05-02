import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import moment from 'moment';

Vue.prototype.$moment = moment;

Vue.use(Toast, {
  position: 'top-center',
});

Vue.config.productionTip = false
Vue.config.devtools = true

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')