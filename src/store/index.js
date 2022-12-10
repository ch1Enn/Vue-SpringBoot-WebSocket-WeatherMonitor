import Vue from 'vue'
import Vuex from 'vuex'

import liveData from './liveData.js'

Vue.use(Vuex)

export default new Vuex.Store({
  
  modules: {
    liveData: liveData
  }

})
