import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Agenda from '../views/Agenda.vue';
import WelcomeAdmin from '../views/admin/WelcomeAdmin.vue';
import AgendaAdmin from '../views/admin/AgendaAdmin.vue';

Vue.use(VueRouter);
const withPrefix = (prefix: string, routes: RouteConfig[]) =>
  routes.map((route: RouteConfig) => {
    route.path = prefix + route.path;
    route.name = prefix + route.path;
    return route;
  });

const routes: RouteConfig[] = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/agenda',
    component: Agenda
  },
  ...withPrefix('/admin', [
    {
      path: '/',
      component: WelcomeAdmin,
    },
    {
      path: '/agenda',
      component: AgendaAdmin
    }
  ]),
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
