<template>
  <a href="###" :title="title">
    <!-- 
        1.需要传递给<el-button>的属性是不定的（属性个数及属性值都不确定）
                → 这些属性都在 $attrs 中
                → 使用 v-bind 将$attrs中的所有属性传递给el-button
        2.需要给<el-button>绑定什么事件监听也不确定 
                → 这些事件监听都在 $listeners 中
                → 使用 v-on 给el-button绑定$listeners中的所有监听
    -->
    <el-button v-bind="$attrs" v-on="$listeners"></el-button>
  </a>
</template>

<script>
export default {
  name: "HintButton",
  props: {
    title: String
  },
  // mounted() {
  //   console.log(this.$attrs);
  //   console.log(this.$listeners);
  // }
};
</script>

<style lang="less" scoped>
</style>
