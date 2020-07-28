import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入vant
import Vant from 'vant'
import MMNavBar from './components/MMNavBar.vue'
import 'vant/lib/index.css'
import 'normalize.css'
// 导入flexible
import 'amfe-flexible'
// 导入字体图标
import '@/styles/iconfont.css'
// 导入自己的初始化样式
import '@/styles/base.less'
Vue.use(Vant)
Vue.component(MMNavBar.name, MMNavBar)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
