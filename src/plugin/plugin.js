import store from '../store'
import { getToken, removeToken } from '../utils/local'
import { Toast } from 'vant'
import router from '../router'
import { getUserInfo } from '../api/user/user'
export default function (Vue) {
  Vue.prototype.$checkLogin = function () {
    console.log('蹦沙卡拉卡')
    return new Promise((resolve, reject) => {
      if (store.state.isLogin) {
        resolve()
      } else if (getToken()) {
        getUserInfo()
          .then(res => {
            res.data.avatar = process.env.VUE_APP_URL + res.data.avatar
            store.commit('SETUSERINFO', res.data)
            store.commit('SETISLOGIN', true)
            resolve()
          })
          .catch(() => {
            removeToken()
            Toast.fail('请先登录')
            router.push('./login?redirect=' + this.$route.fullPath)
            reject(new Error('请先登录'))
          })
      } else {
        Toast.fail('请先登录')
        router.push('./login?redirect=' + this.$route.fullPath)
        reject(new Error('请先登录'))
      }
    })
  }
}
