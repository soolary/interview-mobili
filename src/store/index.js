import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    xxx: 666,
    userinfo: {},
    isLogin: false
  },
  mutations: {
    xxx (state, num) {
      state.xxx = num
    },
    setUserinfo (state, info) {
      state.userinfo = info
    },
    setIsLogin (state, status) {
      state.isLogin = status
    }
  },
  actions: {},
  modules: {}
})
