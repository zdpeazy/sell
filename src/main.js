// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from '@/App';
import router from '@/router/index';
import VueResource from 'vue-resource';

import '@/common/stylus/index.styl';

Vue.config.productionTip = false;

let app = Vue.extend(App);
Vue.use(VueResource);

new Vue({
  router,
  render: h => h(app)
}).$mount('#app');

// $mount('#app')这里要用单引号
// render: x => x(App)
// 这里的render: x => x(App)是es6的写法
// 转换过来就是：  暂且可理解为是渲染App组件
// render:(function(x){
//  return x(App);
// });

/* eslint-disable no-new */
/* new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
}); */
