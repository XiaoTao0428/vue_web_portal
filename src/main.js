import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import i18n from './i18n/i18n';
import './assets/css/global.css'
import storeValue from './store/index'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(ElementUI)

Vue.use(mavonEditor)

Vue.config.productionTip = false

/**
* 路由判断登录 根据路由配置文件的参数
* */
router.beforeEach((to, from, next) => {
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
    console.log('to', to)
    console.log('from', from)
    next()
  }
})

Vue.directive('clickoutside', {
  // 初始化指令
  bind(el, binding, vnode) {
    function clickHandler(e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false;
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e);
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = clickHandler;
    document.addEventListener('click', clickHandler);
  },
  update() {},
  unbind(el, binding) {
    // 解除事件监听
    document.removeEventListener('click', el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  },
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
