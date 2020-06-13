import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui' //引入核心库
import 'element-ui/lib/theme-chalk/index.css' //引入样式
import './assets/styles/common.css'
import './assets/styles/reset.css'


Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')