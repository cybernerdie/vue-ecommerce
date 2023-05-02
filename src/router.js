import Vue from 'vue';
import Router from 'vue-router';
import { isAuthenticated, isGuest } from './middleware/auth'

const Home = () => import('@/views/Home.vue');
const Products = () => import('@/views/Products.vue');
const Cart = () => import('@/views/Cart.vue');
const Order = () => import('@/views/Order.vue');
const Login = () => import('@/views/Auth.vue');
const Info = () => import('@/views/Info.vue');

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/products',
      name: 'Products',
      component: Products,
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart,
      beforeEnter: isAuthenticated,
    },
    {
      path: '/orders',
      name: 'Order',
      component: Order,
      beforeEnter: isAuthenticated,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: isGuest,
    },
    {
      path: '/info',
      name: 'Info',
      component: Info
    }
  ],
  mode: 'history',
});
