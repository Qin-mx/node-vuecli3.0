import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import {
 User,
 info
}
from './modules'
Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    User,
    info
  },
  getters
  
})
