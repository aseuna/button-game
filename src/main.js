import Vue from 'vue'
import App from './App.vue'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
 
import PortalVue from 'portal-vue';

Vue.use(BootstrapVue);
Vue.use(PortalVue);
Vue.use(VueSweetalert2);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
