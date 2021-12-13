import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '@/views/index/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: index,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/home/home.vue')
      }
    ]
  },
  {
    path: '*',
    name: 'NotFound404',
    component: () => import(/* webpackChunkName: "about" */ '../views/NotFound404/NotFound404.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
