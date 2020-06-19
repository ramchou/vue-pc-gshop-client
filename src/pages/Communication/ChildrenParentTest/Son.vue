<template>
  <div style="background: #ccc; height: 50px;">
    <h3>儿子小明: 有存款: {{money}}</h3>
    <button @click="lendToPapa(50)">给BABA钱: 50</button>
  </div>
</template>

<script>
import { cpMixin } from "./mixin.js";
export default {
  name: "Son",
  mixins: [cpMixin],
  data() {
    return {
      money: 30000
    };
  },

  methods: {
    // 定义自己单独使用的方法
  }
};
</script>
