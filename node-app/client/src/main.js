import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { Button, Select, Row, Col } from 'element-ui'
import HD_UI from './components/index.js'
Vue.use(Button).use(Select).use(Row).use(Col)

Vue.use(HD_UI)

import 'element-ui/lib/theme-chalk/index.css'
import './style/theme.less'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
