import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from './store'
import TypeNav from './components/TypeNav'
import '@/mock/mockServer' // 引入加载，即被执行了一次
import "swiper/css/swiper.min.css"
import Carousel from './components/Carousel'
import Pagination from './components/Pagination'
import "./validate" // 引入表单校验的配置模块
import './elements' // 引入elements模块

import VueLazyLoad from 'vue-lazyload'
import loading from '@/assets/images/loading.jpg'
// 配置图片懒加载
Vue.use(VueLazyLoad, {
  loading
})


// 引入api模块中的所有分别暴露的函数，封装到API对象中
import * as API from '@/api'
// 将API对象保存到Vue的原型对象上，让所有的组件都直接可见（不用再引入API）
Vue.prototype.$API = API


// 注册全局组件
Vue.component('TypeNav', TypeNav)
Vue.component('Carousel', Carousel)
Vue.component('Pagination', Pagination)

Vue.config.productionTip = false

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  render: h => h(App),
  router,
  store  // 注册之后，所有的组件都可以通过$store来得到store对象
}).$mount('#app')
