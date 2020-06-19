<template>
  <div>
    <!-- 
      理解本质:绑定一个自定义事件监听,用来接收子组件分发事件携带的最新数据来更新父组件的数据
        <child :money.sync="total"/>
        <Child :money="total" @update:money="total=$event"/>
      利用sync能做什么呢?
        实现父子组件间数据双向同步
        常用于封装可复用组件(需要更新父组件数据)
            v-model一般用于带表单项的组件
            sync一般用于不带表单项标签的组件
        element-ui中: Dialog就利用sync来实现组件的隐藏
    -->
    小明的爸爸现在有{{money}}元
    <h2>不使用sync修改符</h2>
    <!-- 现在父组件里面改，再改子组件里面的 -->
    <!-- <Child :money="money" @update:money="money=$event"></Child> -->
    <br />
    <br />

    <h2>使用sync修改符</h2>
    <Child :money.sync="money"></Child>
    <br />
    <br />

    <h2>使用v-model修改符</h2>
    <Child2 v-model="money"></Child2>
    <hr />
  </div>
</template>

<script type="text/ecmascript-6">
import Child from "./Child.vue";
import Child2 from "./Child2.vue";
export default {
  name: "SyncTest",
  components: {
    Child,
    Child2
  },
  data() {
    return {
      money: 1000
    };
  }
};
</script>
