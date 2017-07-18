import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '@/components/home/home';
import shop from '@/components/shop/shop';
import goods from '@/components/shop/children/goods/goods';
import ratings from '@/components/shop/children/ratings/ratings';
import seller from '@/components/shop/children/seller/seller';


Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
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
