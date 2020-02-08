import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Element from 'element-ui';
import { i18n } from './modules/language';
import Vuex from 'vuex';

import './assets/fpsa-theme.scss';

Vue.use(Element);
Vue.use(Vuex);

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app');
