// 引入vue 和vue-router
import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../pages/Login.vue'

// 在工程中使用VueRouter插件
Vue.use(VueRouter)

var router = new VueRouter({
  routes: [{
    path: '/', //监听的hash值
    name: 'login', //当前这个路由的名字
    component: Login //切换到对应hash值后，切换哪个组件
  }, {
    path: '/index', //监听的hash值
    name: 'index', //当前这个路由的名字
    component: () => import('../pages/Index.vue'), //切换到对应hash值后，切换哪个组件
    children: [{
      path: '/index/home',
      name: 'home',
      component: () => import('../pages/index/Home.vue')
    }]
  }]
})


export default router