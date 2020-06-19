<template>
  <div>
    <h2>BABA有存款: {{money}}</h2>
    <button @click="borrowFromXiaoming(100)">找小明借钱100</button>
    <br />
    <button @click="borrowFromXiaohong(150)">找小红借钱150</button>
    <br />
    <button @click="borrowFromTwo(200)">找所有孩子借钱200</button>
    <br />

    <br />
    <Son ref="son" />

    <br />
    <Daughter ref="daughter" />
  </div>
</template>

<script>
import Son from "./Son";
import Daughter from "./Daughter";

export default {
  name: "ChildrenParentTest",
  data() {
    return {
      money: 1000
    };
  },

  // 理解:
  //       $children: 所有直接子组件对象的数组, 利用它可以更新多个子组件的数据
  //       $parent: 父组件对象, 从而可以更新父组件的数据
  //       $refs: 包含所有有ref属性的标签对象或组件对象的容器对象
  //   利用它们能做什么?
  //       能方便地得到子组件/后代组件/父组件/祖辈组件对象, 从而更新其data或调用其方法
  //       官方建议不要大量使用, 优先使用props和event
  //       在一些UI组件库定义高复用组件时会使用$children和$parent, 如Carousel组件
  methods: {
    // 找小明借钱
    borrowFromXiaoming(count) {
      const son = this.$refs.son;
      // son.money -= count // 父组件直接更新子组件的数据
      son.spendMoney(count); // 父组件调用子组件的方法操作数据
      this.money += count;
    },
    // 找小红借钱
    borrowFromXiaohong(count) {
      const daughter = this.$refs.daughter;
      // daughter.money -= count // 父组件直接更新子组件的数据
      daughter.spendMoney(count); // 父组件调用子组件的方法操作数据
      this.money += count;
    },
    // 找两个孩子借钱
    borrowFromTwo(count) {
      const children = this.$children; // 获取所有子组件对象 生成数组
      children.forEach(child => {
        child.spendMoney(count);
        this.money += count;
      });
    }
  },

  components: {
    Son,
    Daughter
  }
};
</script>

<style>
</style>
