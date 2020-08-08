import Vue from 'vue'
import Vuex from 'vuex'
import areaData from '@/utils/area'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    xxx: 666,
    userinfo: '',
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
    },
    SETPROPVALUE (state, { propName, propValue }) {
      // state.userinfo[option.propName] = option.propValue
      state.userinfo[propName] = propValue
    }
  },
  getters: {
    userGender (state) {
      const genderObj = { 0: '未知', 1: '男', 2: '女' }
      return genderObj[state.userinfo.gender]
    },
    userCity (state) {
      return areaData.city_list[state.userinfo.area]
    }
  },
  actions: {},
  modules: {}
})
