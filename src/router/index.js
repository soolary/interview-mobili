import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Company from '../views/company'
import Question from '../views/question'
import Find from '../views/find'
import My from '../views/my/index'
import Info from '../views/my/Info.vue'
import Login from '../views/login'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/company',
    component: Company,
    meta: { showTabbar: true }
  },
  {
    path: '/question',
    component: Question,
    meta: { showTabbar: true }
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
  { path: '/info', component: Info, meta: { showTabbar: false } },
  {
    path: '/login',
    component: Login
    // meta: { showTabbar: true }
  }
]

const router = new VueRouter({
  routes
})

export default router
