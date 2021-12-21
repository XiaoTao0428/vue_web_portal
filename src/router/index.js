import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '@/views/index/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: index,
    meta: {
      requireAuth: false,
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          requireAuth: false,
        },
        component: () => import(/* webpackChunkName: "home" */ '@/views/home/home.vue')
      },
      {
        path: '/manage',
        name: 'manage',
        meta: {
          requireAuth: false,
        },
        component: () => import(/* webpackChunkName: "manage" */ '@/views/manage/manage.vue'),
        redirect: '/pageHeaderMenuManage',
        children: [
          {
            path: '/pageHeaderMenuManage',
            name: 'pageHeaderMenuManage',
            meta: {
              requireAuth: false,
            },
            component: () => import(/* webpackChunkName: "pageHeaderMenuManage" */ '@/views/pageHeaderMenuManage/pageHeaderMenuManage.vue'),
          },
          {
            path: '/pageContentManage',
            name: 'pageContentManage',
            meta: {
              requireAuth: false,
            },
            component: () => import(/* webpackChunkName: "pageContentManage" */ '@/views/pageContentManage/pageContentManage.vue'),
          }
        ]
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
