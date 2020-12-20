import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import NotFound from '../views/NotFound.vue';
import Profile from '../views/Profile.vue';
import Dashboard from '../views/Dashboard.vue';
import store from '../store';

Vue.use(VueRouter);

const logginGuard = (next, route = '/sign_in') => {
  const { user } = store.state;
  if (!user) next(route);
  next();
};

const routes = [
  {
    path: '/sign_in',
    name: 'Login',
    component: Login,
  },
  {
    path: '/sign_up',
    name: 'Register',
    component: Register,
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter(to, from, next) {
      logginGuard(next);
    },
  },

  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter(to, from, next) {
      logginGuard(next);
    },
  },

  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
  },

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
