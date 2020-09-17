import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Agenda from '../views/Agenda.vue';
import WelcomeAdmin from '../views/admin/welcome.admin.vue';
import Board from '../views/Board.vue';
import Confirmation from '../views/confirmation.vue';
import WebsiteAdmin from '../views/admin/website.admin.vue';
import Error404 from '../views/error/404.vue';
import ForgotPassword from '../views/forgot.password.vue';
import Contact from '../views/contact.vue';
import Application from '../views/application.vue';

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
    path: '/forgot',
    component: ForgotPassword,
  },
  {
    path: '/contact',
    component: Contact,
  },
  {
    path: '/application',
    component: Application,
  },
  {
    path: '*',
    redirect: '/error/404',
  },
  ...withPrefix('/error', [
    {
      path: '/404',
      component: Error404,
    },
  ]),
  ...withPrefix('/admin', [
    {
      path: '/',
      component: WelcomeAdmin,
    },
    {
      path: '/website',
      component: WebsiteAdmin,
    },
  ]),
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
