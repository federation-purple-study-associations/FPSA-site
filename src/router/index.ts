import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Agenda from '../views/Agenda.vue';
import WelcomeAdmin from '../views/admin/WelcomeAdmin.vue';
import AgendaAdmin from '../views/admin/AgendaAdmin.vue';
import Board from '../views/Board.vue';
import BoardAdmin from '../views/admin/BoardAdmin.vue';
import UserAdmin from '../views/admin/user.admin.vue';
import Confirmation from '../views/confirmation.vue';
import Contact from '../views/contact.vue';
import AboutUs from '../views/aboutUs.vue';

Vue.use(VueRouter);
const withPrefix = (prefix: string, routesConfig: RouteConfig[]) =>
  routesConfig.map((route: RouteConfig) => {
    route.path = prefix + route.path;
    route.name = prefix + route.path;
    return route;
  });

const routes: RouteConfig[] = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/agenda',
    component: Agenda,
  },
  {
    path: '/board',
    component: Board,
  },
  {
    path: '/confirmation',
    component: Confirmation,
  },
  {
    path: '/contact',
    component: Contact,
  },
  {
    path: '/aboutus',
    component: AboutUs,
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
    },
    {
      path: '/user',
      component: UserAdmin,
    },
  ]),
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
