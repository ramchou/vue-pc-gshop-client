<template>
  <div>
    <Header />
    <!-- 一级路由组件显示区域 -->
    <router-view></router-view>

    <Footer v-if="!$route.meta.isHideFooter" />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
import {reqCategories} from './api'
export default {
  name: "App",
  // 局部注册（只有当前组件可用）
  components: {
    Header,
    Footer
  },

  // created () {
    
  // },
  async mounted () {
    // 测试
    const result = await reqCategories()
    console.log('result', result);
  }
};
</script>

<style lang="less" scoped>
</style>
