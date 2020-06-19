<template>
  <div>
    <h1>EventTest组件</h1>
    <!-- 
      原生DOM事件
        -绑定原生DOM事件监听的2种情况
            在html标签上绑定DOM事件名的监听
            在组件标签上绑定DOM事件名的监听, 事件绑定在组件的根标签上
        -当用户操作对应的界面时, 浏览器就会自动创建并封闭包含相关数据的事件对象, 分发对应的事件, 从而触发事件监听回调函数调用
        -事件对象event, 本质是 "事件数据对象"，event对象内的数据属性: target / offsetX / offsetY / keyCode等
        -$event就是浏览器创建的event对象, 默认传递给事件监听回调函数的就是它
    -->

    <!-- 1.在html标签上绑定DOM事件名的监听 -->
    <button @click="test1">测试原生事件1</button>
    <button @click="test1($event)">测试原生事件2</button>

    <!-- 2.在组件标签上绑定DOM事件名的监听, 事件绑定在组件的根标签上 -->
    <!-- 2.1 这里的click是自定义事件，不是原生的DOM事件名 -->
    <!-- <Event1 @click="test2"></Event1> -->
    <!-- 2.2 事件绑定在组件的根标签上  冒泡 -->
    <Event1 @click.native="test2"></Event1>
    <br />
    <br />

    <!-- 
      vue自定义事件
        绑定vue自定义事件监听
            只能在组件标签上绑定
            事件名是任意的, 可以与原生DOM事件名相同
        只有当执行$emit('自定义事件名', data)时分发自定义事件, 才会触发自定义事件监听函数调用
        $event: 就是分发自定义事件时指定的data数据
        $event可以是任意类型, 甚至可以没有
      vue的自定义事件: 
        用来实现子向父组件通信, 功能相当于函数类型的props
    -->
    <!-- 
      全局事件总线:
        理解:
            Vue原型对象上有3个事件处理的方法: $on() / $emit() / $off()
            组件对象的原型对象是vm对象: 组件对象可以直接访问Vue原型对象上的方法
            实现任意组件间通信
        编码实现:
            将入口js中的vm作为全局事件总线对象: 
                beforeCreate() {
                    Vue.prototype.$bus = this
                }
            分发事件/传递数据的组件: this.$bus.$emit('eventName', data)
            处理事件/接收数据的组件: this.$bus.$on('eventName', (data) => {})
    -->
    <Event2 @click="test3" @xxx="test4($event)"></Event2>
  </div>
</template>

<script type="text/ecmascript-6">
import Event1 from "./Event1.vue";
import Event2 from "./Event2.vue";

export default {
  name: "EventTest",
  components: {
    Event1,
    Event2
  },
  methods: {
    test1(event) {
      // event就是事件相关数据对象
      alert(event.target.innerHTML);
    },
    test2(event) {
      alert(event.target.innerHTML);
    },

    test3(data) {
      alert("自定义click回调---" + data);
    },
    test4(data) {
      alert("自定义xxx回调---" + data);
    }
  }
};
</script>
