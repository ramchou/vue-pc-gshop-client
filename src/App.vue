<template>
  <div>
    <Header />

    <!-- 一级路由组件显示区域 -->
    <router-view></router-view>
    
    <Footer />

  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: "App",
  // 据不注册（只有当前组件可用）
  components:{
    Header,
    Footer
  }
};
</script>

<style lang="less" scoped>
</style>
