import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from "./router";
import rules from "../src/app-js/rules";

Vue.config.productionTip = false
Vue.prototype.$rules = rules;

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
