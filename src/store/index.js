import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currLang: '',  // 当前的语言
    currRoutePath: '',  // 当前页面的url
  },
  mutations: {
    /**
    * 设置当前的 currLang
    * */
    setCurrLang(state, param) {
      state.currLang = param.currLang
    },
    /**
     * 设置当前的 currRoutePath
     * */
    setCurrRoutePath(state, param) {
      state.currRoutePath = param.currRoutePath
    },
  },
  actions: {
  },
  modules: {
  }
})
