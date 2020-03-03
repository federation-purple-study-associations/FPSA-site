import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Agenda from '../views/Agenda.vue';
import WelcomeAdmin from '../views/admin/WelcomeAdmin.vue';
import AgendaAdmin from '../views/admin/AgendaAdmin.vue';
import Board from '../views/Board.vue';
import BoardAdmin from '../views/admin/BoardAdmin.vue';

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
  {
    path: '/board',
    component: Board
  },
  ...withPrefix('/admin', [
    {
      path: '/',
      component: WelcomeAdmin,
    },
    {
      path: '/agenda',
      component: AgendaAdmin,
    },
    {
      path: '/board',
      component: BoardAdmin,
    }
  ]),
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
