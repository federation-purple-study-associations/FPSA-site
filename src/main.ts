import 'reflect-metadata';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { i18n } from './modules/language';
import Vuex from 'vuex';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import VueApexCharts from 'vue-apexcharts';
import Notifications from 'vue-notification';
import { PluginObject } from 'vue/types/umd';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';
import './assets/fpsa-theme.scss';

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(Notifications);
Vue.use(Vuex);
Vue.use(VueApexCharts);

Vue.component('apexchart', VueApexCharts);

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
