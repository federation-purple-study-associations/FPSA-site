import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Agenda from '../views/Agenda.vue';
import News from '../views/News.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/agenda',
    component: Agenda
  },
  {
    path: '/news',
    component: News
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
