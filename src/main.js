import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import TypeNav from './components/TypeNav'

// 注册全局组件
Vue.component('TypeNav', TypeNav)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
