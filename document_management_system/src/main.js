import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from "./router";
import rules from "../src/app-js/rules";
import urls from "./app-js/urls";
import axios from "axios";
import axios_req from "../src/app-js/axios";

Vue.config.productionTip = false
Vue.prototype.$rules = rules;
Vue.prototype.$apiUrl = urls;
Vue.prototype.$axios = axios_req;
axios.defaults.baseURL = "https://apis.allsoft.co/api/documentManagement";


Vue.mixin({
  methods: {
    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    }
  }
})

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
