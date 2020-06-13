// 引入vue 和vue-router
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login.vue'
import {
  API_CHECK_TOKEN
} from '@/api/apis'
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
      meta: ["super", "normal"],
      component: () => import('../pages/index/Home.vue')
    }, {
      // 订单管理
      path: '/index/order',
      name: 'order',
      meta: ["super", "normal"],
      component: () => import('../pages/index/Order.vue')
    }, {
      // 商品统计
      path: '/index/shopsta',
      name: 'shopsta',
      meta: ["super", "normal"],
      component: () => import('../pages/index/ShopStatistics.vue')
    }, {
      path: '/index/shop',
      name: 'shop',
      meta: ["super", "normal"],
      // 店铺管理
      component: () => import('../pages/index/Shop.vue')
    }, {
      path: '/index/shopadd',
      name: 'shopadd',
      meta: ["super", "normal"],
      // 添加商品
      component: () => import('../pages/index/ShopAdd.vue')
    }, {
      // 商品分类
      path: '/index/shopsort',
      name: 'shopadd',
      meta: ["super", "normal"],
      component: () => import('../pages/index/Shopsort.vue')
    }, {
      // 商品列表
      path: '/index/shoplist',
      name: 'shoplist',
      meta: ["super", "normal"],
      component: () => import('../pages/index/Shoplist.vue')
    }, {
      // 修改密码
      path: '/index/changepwd',
      name: 'changepwd',
      meta: ["super", "normal"],
      component: () => import('../pages/index/ChangePwd.vue')
    }, {
      // 添加账号
      path: '/index/addto',
      name: 'addto',
      meta: ["super", "normal"],
      component: () => import('../pages/index/Addto.vue')
    }, {
      // 账号列表
      path: '/index/acclist',
      name: 'acclist',
      meta: ["super", "normal"],
      component: () => import('../pages/index/Accountlist.vue')
    }, {
      // 订单统计
      path: '/index/ordersta',
      name: 'ordersta',
      meta: ["super", "normal"],
      component: () => import('../pages/index/OrderStatistics.vue')
    }, {
      // 个人中心
      path: '/index/personal',
      name: 'personal',
      component: () => import('../pages/index/personal/Personal.vue')
    }]
  }]
})

// 路由拦截
/* 
to:要跳转的地址
from:当前地址
next():放行

*/
router.beforeEach((to, from, next) => {
  from
  console.log('from:', from);

  if (to.path != '/') {
    API_CHECK_TOKEN(localStorage.token).then(res => {
      if (res.data.code == 0) {
        // 还在登录
        // if(localStorage.role)
        // to.meta(from.path)
        next()
      } else {
        next('/') //登录失效  停留在'/'
      }
    })
  } else {
    next() //登录页面直接放行
  }
})


export default router