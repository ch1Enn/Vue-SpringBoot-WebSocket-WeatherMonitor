import Vue from 'vue'
import VueRouter from 'vue-router'

import TemperaturePage from '../views/TemperaturePage.vue'
import MapPage from '../views/MapPage.vue'
import HumidityPage from '../views/HumidityPage'
import WindPowerPage from '../views/WindPowerPage'
import WindDirectionPage from '../views/WindDirectionPage'
import ScreenPage from '../views/ScreenPage.vue'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

Nprogress.configure({showSpinner: true})

Vue.use(VueRouter)

const routes = [
  {
    path:'/screen',
    component:ScreenPage,
  },
  {
    path:'/temperaturePage',
    component:TemperaturePage,
  },
  {
    path: '/mapPage',
    component: MapPage,
  },
  {
    path:'/humidityPage',
    component:HumidityPage,
  },
  {
    path:'/windPowerPage',
    component: WindPowerPage
  },
  {
    path:'/wind',
    component: WindDirectionPage
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  Nprogress.start();
  next();
  Nprogress.done();
})

router.afterEach(()=>{
  Nprogress.done();
})

export default router
