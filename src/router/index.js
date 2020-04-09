import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  // {
  //   path: '/player/:name/goal/:total',
  //   name: 'Player',
  //   props: true,
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Player.vue'),
  // },
  {
    path: '/football',
    name: 'Football',
    component: () => import('../views/Football'),
  },
  {
    path: '/continent/:continentId',
    name: 'Continent',
    props: true,
    component: () => import('../views/Continent'),
  },
  {
    // will match everything
    path: '*',
    name: 'NotFound',
    component: () => import('../views/NotFound'),
  },
];

const router = new VueRouter({
  // mode: 'history',
  routes,
});

export default router;
