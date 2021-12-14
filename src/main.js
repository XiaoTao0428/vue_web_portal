import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import i18n from './i18n/i18n';
import './assets/css/global.css'
import storeValue from './store/index'

Vue.use(ElementUI)

Vue.config.productionTip = false

/**
* 路由判断登录 根据路由配置文件的参数
* */
router.beforeEach((to, from, next) => {
  console.log('to', to)
  if (to.matched.some(record => record.meta.requireAuth)){  // 判断该路由是否需要登录权限
    console.log('record', record)
    let store2 = JSON.parse(sessionStorage.getItem("store"))
    console.log('store2', store2)
    let token2 = ''
    if (store2 && store2.token) {
      token2 = store2.token
    }
    let token = storeValue.state.token || token2
    if (token && token !== '' && token !== null && token !== 'null') {  // 判断当前的token是否存在 ； 登录存入的token
      next()
    }
    else {
      // share.message.warning('请先去登陆')
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
