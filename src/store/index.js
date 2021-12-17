import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currLang: '',  // 当前的语言
  },
  mutations: {
    /**
    * 设置当前的语言
    * */
    setCurrLang(state, param) {
      state.currLang = param.currLang
    },
  },
  actions: {
  },
  modules: {
  }
})
