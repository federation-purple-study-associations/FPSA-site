import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Agenda from '../views/Agenda.vue';

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
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
