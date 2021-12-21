import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '@/views/index/index.vue'

Vue.use(VueRouter)

//以下代码解决路由地址重复点击的报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => {
    router.go(0)
  })
}

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
        path: '/research',
        name: 'research',
        meta: {
          requireAuth: false,
        },
        component: () => import(/* webpackChunkName: "research" */ '@/views/research/research.vue')
      },
      {
        path: '/news',
        name: 'news',
        meta: {
          requireAuth: false,
        },
        component: () => import(/* webpackChunkName: "news" */ '@/views/news/news.vue')
      },
      {
        path: '/publications',
        name: 'publications',
        meta: {
          requireAuth: false,
        },
        component: () => import(/* webpackChunkName: "publications" */ '@/views/publications/publications.vue')
      },
      {
        path: '/people',
        name: 'people',
        meta: {
          requireAuth: false,
        },
        component: () => import(/* webpackChunkName: "people" */ '@/views/people/people.vue')
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
