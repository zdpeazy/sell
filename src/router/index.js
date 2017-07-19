import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '@/components/home/home';
import discover from '@/components/discover/discover';
import order from '@/components/order/order';
import profile from '@/components/profile/profile';
import shop from '@/components/shop/shop';
import goods from '@/components/shop/children/goods/goods';
import ratings from '@/components/shop/children/ratings/ratings';
import seller from '@/components/shop/children/seller/seller';


Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/',
      redirect: { name: 'home' }
    },
    {
      path: '/discover',
      name: 'discover',
      component: discover
    },
    {
      path: '/order',
      name: 'order',
      component: order
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile
    },
    {
      path: '/shop',
      name: 'shop',
      component: shop,
      children: [{
        path: '/goods',
        name: 'goods',
        component: goods
      }, {
        path: '/ratings',
        name: 'ratings',
        component: ratings
      }, {
        path: '/seller',
        name: 'seller',
        component: seller
      }, {
        path: '/',
        redirect: { name: 'goods' }
      }]
    }
  ],
  linkActiveClass: 'active'
});
