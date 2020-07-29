import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import { getToken, removeToken } from '@/utils/local.js'
import { getUserInfo } from '@/api/user/user.js'
// import Home from '../views/Home.vue'
import Company from '../views/company'
import Question from '../views/question'
import Find from '../views/find'
import My from '../views/my/index'
import Info from '../views/my/Info.vue'
import Login from '../views/login'
import { Toast } from 'vant'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/company',
    component: Company,
    meta: { showTabbar: true, needLogin: true }
  },
  {
    path: '/question',
    component: Question,
    meta: { showTabbar: true, needLogin: true }
  },
  {
    path: '/find',
    component: Find,
    meta: { showTabbar: true, needLogin: true }
  },
  {
    path: '/my',
    component: My,
    meta: { showTabbar: true, needLogin: true }
  },
  {
    path: '/info',
    component: Info,
    meta: { showTabbar: true, needLogin: true }
  },
  {
    path: '/login',
    component: Login
    // meta: { showTabbar: true }
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.meta.needLogin) {
    if (store.state.isLogin) {
      next()
    } else if (getToken()) {
      getUserInfo()
        .then(res => {
          res.data.avatar = process.env.VUE_APP_URL + res.data.avatar
          store.commit('SETUSERINFO', res.data)
          store.commit('SETISLOGIN', true)
          next()
        })
        .catch(err => {
          console.log(err)
          removeToken()
          Toast.fail('请先登录')
          next(`/login?redirect=${to.fullPath}`)
        })
    } else {
      Toast.fail('请先登录')
      next(`/login?redirect=${to.fullPath}`)
    }
  } else {
    next()
  }
})
export default router
