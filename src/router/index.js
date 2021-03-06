import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import { getToken, removeToken } from '@/utils/local.js'
import { getUserInfo } from '@/api/user/user.js'
// import Home from '../views/Home.vue'
import Company from '../views/company/Company'
import Question from '../views/question/Question'
import Find from '../views/find/Find.vue'
import My from '../views/my/My'
import Info from '../views/my/Info.vue'
import EditInfo from '../views/my/EditInfo.vue'
import Login from '../views/login/Login'
import { Toast } from 'vant'
import ShareList from '../views/share/ShareList'
import ShareSearch from '../views/share/ShareSearch'
import ShareDetail from '../views/share/ShareDetail'

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
    meta: { showTabbar: true }
  },
  {
    path: '/my',
    component: My,
    meta: { showTabbar: true, needLogin: true }
  },
  {
    path: '/info',
    component: Info,
    meta: { needLogin: true }
  },
  {
    path: '/editInfo',
    component: EditInfo,
    meta: { needLogin: true }
  },
  {
    path: '/login',
    component: Login
    // meta: { showTabbar: true }
  },
  {
    path: '/sharelist',
    component: ShareList
    // meta: { showTabbar: true }
  },
  {
    path: '/sharesearch',
    component: ShareSearch
    // meta: { showTabbar: true }
  },
  {
    path: '/sharedetail/:id',
    component: ShareDetail
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
router.afterEach((to, from) => {
  window.scrollTo(0, 0)
})
export default router
