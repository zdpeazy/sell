import Vue from 'vue';
import VueRouter from 'vue-router';
import goods from '@/components/goods/goods';
import ratings from '@/components/ratings/ratings';
import seller from '@/components/seller/seller';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/goods',
      name: 'goods',
      component: goods
    },
    // router重定向
    {
      path: '/',
      redirect: { name: 'goods' }
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: ratings
    },
    {
      path: '/seller',
      name: 'seller',
      component: seller
    }
  ],
  linkActiveClass: 'active'
});
