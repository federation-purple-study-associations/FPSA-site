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
import ActivateAccountancy from '../views/admin/accountancy/activate.vue';
import AccountancyAdmin from '../views/admin/accountancyAdmin.vue';
import Error404 from '../views/error/404.vue';
import ForgotPassword from '../views/forgot.password.vue';

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
    ...withPrefix('/accountancy', [
      {
        path: '/',
        component: AccountancyAdmin,
      },
      {
        path: '/callback',
        component: ActivateAccountancy,
      },
    ]),
  ]),
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
