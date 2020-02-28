import Vue from 'vue'
import App from './App.vue'

import { ButtonPlugin, ToastPlugin, PopoverPlugin} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
 
import PortalVue from 'portal-vue';

Vue.use(PortalVue);
Vue.use(ButtonPlugin);
Vue.use(ToastPlugin);
Vue.use(PopoverPlugin);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
