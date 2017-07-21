import Vue from 'vue';
import VueRouter from 'vue-router';
import msite from '@/components/msite/msite';
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
      path: '/msite',
      name: 'msite',
      component: msite,
      meta: { keepAlive: true } // 设置路由页面不刷新
    },
    {
      path: '/',
      redirect: { name: 'msite' }
    },
    {
      path: '/discover',
      name: 'discover',
      component: discover,
      meta: { keepAlive: true }
    },
    {
      path: '/order',
      name: 'order',
      component: order,
      meta: { keepAlive: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile,
      meta: { keepAlive: true }
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
