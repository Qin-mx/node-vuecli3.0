import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex/store'

import ElementUI from 'element-ui'
import HD_UI from './components/index.js'
import NProgress from 'nprogress'; // Progress 进度条

Vue.use(ElementUI)
Vue.use(HD_UI)

import 'element-ui/lib/theme-chalk/index.css'

import 'nprogress/nprogress.css';// Progress 进度条 样式
import './style/base.scss'

Vue.config.productionTip = false


const whiteList = ['/login', '/register'];//,'/reg'];// 不重定向白名单


router.beforeEach((to, from, next) => {
  NProgress.start();
  if (store.getters.token) {
    // 判断是否登录
    if (to.path === '/login') next({ path: '/' });
    else next()
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      if (to.path == '/login') { //如果是登录页面路径，就直接next()
        next();
      } else { //不然就跳转到登录；
        next('/login');
      }
    }

    NProgress.done(); // 在hash模式下 改变手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
  }
})

router.afterEach(() => {
  NProgress.done(); // 结束
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
