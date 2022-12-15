import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('../views/login/index.vue')
const Home = () => import('../views/home/index.vue')
const Iframe = () => import('../views/home/iframe.vue')
const TrafficOperation = () => import('../views/trafficOperation/index.vue')
const GovernServices = () => import('../views/governServices/index.vue')
const DumpTruck = () => import('../views/dumpTruck/index.vue')
const HazardousVehicle = () => import('../views/hazardousVehicle/index.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/trafficOperation',
    name: 'trafficOperation',
    component: TrafficOperation
  },
  {
    path: '/governServices',
    name: 'governServices',
    component: GovernServices
  },
  {
    path: '/dumpTruck',
    name: 'dumpTruck',
    component: DumpTruck
  },
  {
    path: '/hazardousVehicle',
    name: 'hazardousVehicle',
    component: HazardousVehicle
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/iframe',
    name: 'iframe',
    component: Iframe
  }
  // {
  //     path: '/',
  //     redirect: '/login'
  // }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
