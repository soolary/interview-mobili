import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    xxx: 666
  },
  mutations: {
    xxx (state, num) {
      state.xxx = num
    }
  },
  actions: {},
  modules: {}
})
