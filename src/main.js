import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

//引入全局样式文件
import './assets/CSS/gloable.less'
import * as echarts from 'echarts'

axios.defaults.baseURL = 'http://localhost:8080'
Vue.prototype.$http = axios

//Vue.prototype.$echarts = window.echarts;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
