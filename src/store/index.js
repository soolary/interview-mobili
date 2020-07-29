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
    SETUSERINFO (state, info) {
      state.userinfo = info
    },
    SETISLOGIN (state, status) {
      state.isLogin = status
    }
  },
  getters: {
    userGender (state) {
      const genderObj = { 0: '未知', 1: '男', 2: '女' }
      return genderObj[state.userinfo.gender]
    }
  },
  actions: {},
  modules: {}
})
