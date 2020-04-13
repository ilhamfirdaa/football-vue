/* eslint-disable import/no-cycle */
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
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
    path: '/area/:areaId',
    name: 'Area',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Area'),
  },
  {
    path: '/league/:leagueId',
    name: 'League',
    props: true,
    component: () => import('../views/League'),
  },
  {
    path: '/club/:clubId',
    name: 'Club',
    props: true,
    component: () => import('../views/Club'),
  },
  {
    path: '/player/:playerId',
    name: 'Player',
    props: true,
    component: () => import('../views/Player'),
  },
  {
    // will match everything
    path: '*',
    name: 'NotFound',
    component: () => import('../views/NotFound'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  console.log(to);
  const { isLogin } = store.state;
  if (to.name === 'Football') {
    if (isLogin === false) {
      next({ name: 'Home' });
      return;
    }
  } else if (to.name === 'Home') {
    if (isLogin === true) {
      next({ name: 'Football' });
      return;
    }
  }
  next();
});

// router.beforeResolve((to, from, next) => {
//   switch (to.name) {
//     case 'Home':
//       if (store.state.isLogin === true) {
//         console.log('jnck');
//         next({ name: 'Football' });
//       }
//       break;
//     case 'Football':
//       if (store.state.isLogin === false) {
//         console.log('asw');
//         next({ name: 'Home' });
//       }
//       break;
//     default:
//       next();
//       break;
//   }
// });

export default router;
