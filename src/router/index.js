import Vue from 'vue';
import VueRouter from 'vue-router';
import Table from '../components/Table.vue';

Vue.use(VueRouter);

// console.log(VueRouter.START_LOCATION);
// console.log(vm.isFiltered);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Table,
  },
  {
    path: '/filtered',
    name: 'Filtered',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../components/Table.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
