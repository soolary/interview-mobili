import MMNavBar from '@/components/MMNavBar.vue'
import MMCell from '@/components/MMCell.vue'
import MMShare from '@/components/MMShare.vue'

const myPlugin = {
  install (Vue) {
    Vue.component(MMNavBar.name, MMNavBar)
    Vue.component(MMCell.name, MMCell)
    Vue.component(MMShare.name, MMShare)
  }
}
export default myPlugin
