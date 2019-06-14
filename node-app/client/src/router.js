import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
/**
 * hidden: true 表示不会在菜单栏中出现
 */
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import('./views/layout/index.vue'),
      hidden: true
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login/login.vue'),
      hidden: true
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/login/register.vue'),
      hidden: true
    },
    {
      path: '/404',
      component: () => import('./views/error/error.vue'),
      hidden: true
    },
    
    // 当上述路由找不到以后
    { path: '*', redirect: '/404', hidden: true } 
    
  ]
})
