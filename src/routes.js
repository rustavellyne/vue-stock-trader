import HomePage from './components/HomePage.vue';
import PortfolioPage from './components/PortfolioPage.vue';
import StocksPage from './components/StocksPage.vue';
import LoginPage from './components/LoginPage.vue';
import RegisterPage from './components/RegisterPage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/portfolio',
    name: 'portfolio',
    component: PortfolioPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/stocks',
    name: 'stocks',
    component: StocksPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: { guest: true }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
    meta: { guest: true }
  }
];

export default routes;
