<template>
  <div>
    <h2>深入v-model</h2>

    <!-- 
      原生input上的v-model的本质:  动态的value属性 与 原生input事件监听
        <input type="text" :value="name2" @input="name2=$event.target.value">
    -->
    <input type="text" v-model="name1" />
    <span>{{name1}}</span>
    <br />
    <br />
    <input type="text" :value="name2" @input="name2=$event.target.value" />
    <span>{{name2}}</span>
    <br />
    <br />
    <!-- 
      组件标签上的v-model的本质:  动态的value属性 与 自定义input事件监听
        父组件: 
            <CustomInput :value="name4" @input="name4=$event"/>
        子组件: 
            props: ['value']
            <input type="text" :value="value" @input="$emit('input', $event.target.value)">
    -->
    <CustomInput v-model="name3"></CustomInput>
    <span>{{name3}}</span>
    <br />
    <br />
    <CustomInput :value="name4" @input="name4=$event"></CustomInput>
    <span>{{name4}}</span>
  </div>
</template>

<script type="text/ecmascript-6">
import CustomInput from "./CustomInput.vue";
export default {
  name: "ModelTest",
  components: {
    CustomInput
  },
  data() {
    return {
      name1: "polly",
      name2: "steven",
      name3: "tom",
      name4:'tom2'
    };
  }
};
</script>
