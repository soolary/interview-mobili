import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import company from '../views/company'
import question from '../views/question'
import find from '../views/find'
import my from '../views/my'
import login from '../views/login'
Vue.use(VueRouter)

const routes = [
  //  {
  //  path: '/',
  //  name: 'company',
  //  rediret: company
  //  },
  {
    path: '/company',
    component: company,
    meta: { showTabbar: true }
  },
  {
    path: '/question',
    component: question,
    meta: { showTabbar: true }
  },
  {
    path: '/find',
    component: find,
    meta: { showTabbar: true }
  },
  {
    path: '/my',
    component: my,
    meta: { showTabbar: true }
  },
  {
    path: '/login',
    component: login
    // meta: { showTabbar: true }
  }
]

const router = new VueRouter({
  routes
})

export default router
