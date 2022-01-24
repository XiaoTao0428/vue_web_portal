import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currLang: '',  // 当前的语言
    menuList: [],  // 菜单栏列表
    currRoutePath: '',  // 当前页面的url
    currRouteKey: '',  // 当前页面的url
    token: '',  // 用户token
    userInfo: {
      name_cn: '',  // 中文名
      name_en: '',  // 英文名
      gender: 1,  // 1：男  0：女
      contact_cn: '',  // 联系方式中文
      contact_en: '',  // 联系方式英文
    },

    groupInfo: {
      // name_cn: '',  // 中文名
      // name_en: '',  // 英文名
      icon_cn: '',
      icon_en: '',
      contactAddress_cn: '',  // 联系地址
      contactAddress_en: '',  // 联系地址
    }
  },
  mutations: {
    /**
    * 设置当前的 currLang
    * */
    setCurrLang(state, param) {
      state.currLang = param.currLang
    },
    /**
     * 设置当前的 menuList
     * */
    setMenuList(state, param) {
      state.menuList = [...param.menuList]
    },
    /**
     * 设置当前的 currRoutePath
     * */
    setCurrRoutePath(state, param) {
      state.currRoutePath = param.currRoutePath
    },
    /**
     * 设置当前的 currRouteKey
     * */
    setCurrRouteKey(state, param) {
      state.currRouteKey = param.currRouteKey
    },
    /**
     * 设置当前的 小组信息
     * */
    setGroupInfo(state, param) {
      state.groupInfo.icon_cn = param.groupInfo.icon_cn
      state.groupInfo.icon_en = param.groupInfo.icon_en
      state.groupInfo.contactAddress_cn = param.groupInfo.contactAddress_cn
      state.groupInfo.contactAddress_en = param.groupInfo.contactAddress_en
    },
    /**
     * 登录
     * */
    login(state, param) {
      if (param.token !== undefined) {
        state.token = param.token
      }
      if (param.userInfo.name_cn !== undefined) {
        state.userInfo.name_cn = param.userInfo.name_cn
      }
      if (param.userInfo.name_en !== undefined) {
        state.userInfo.name_en = param.userInfo.name_en
      }
      if (param.userInfo.gender !== undefined) {
        state.userInfo.gender = param.userInfo.gender
      }
      if (param.userInfo.contact_cn !== undefined) {
        state.userInfo.contact_cn = param.userInfo.contact_cn
      }
      if (param.userInfo.contact_en !== undefined) {
        state.userInfo.contact_en = param.userInfo.contact_en
      }
    },
    /**
     * 登出
     * */
    logout(state, param) {
      state.token = ''
      state.userInfo.name_cn = ''
      state.userInfo.name_en = ''
      state.userInfo.gender = 1
      state.userInfo.contact_cn = ''
      state.userInfo.contact_en = ''
    },
  },
  actions: {
  },
  modules: {
  }
})
