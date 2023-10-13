import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import store from './store';
Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters['user/isLoggin']) {
      next('/login');
      return
    }
    next();
    return;
  }
  next();
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.guest)) {
    if (store.getters['user/isLoggin']) {
      next('/stocks');
      return;
    }
    next();
    return;
  }
  next();
});

export default router;
