import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from './store'
import TypeNav from './components/TypeNav'

// 注册全局组件
Vue.component('TypeNav', TypeNav)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store  // 注册之后，所有的组件都可以通过$store来得到store对象
}).$mount('#app')
