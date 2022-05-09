import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

// 引入全局样式
import '@/global.css';

// 全局事件总线
const bus = new Vue();
Vue.prototype.$bus = bus;

new Vue({
  render: h => h(App)
}).$mount('#app');
