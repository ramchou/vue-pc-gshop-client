<template>
  <div>
    <!-- 
      理解:
        $attrs: 排除props声明 & class & style 的所有组件标签属性组成的对象
        $listeners: 级组件标签绑定的所有自定义事件监听的对象
        v-bind: 的特别使用: <div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>
        v-on: 的特别使用: <button v-on="{ mousedown: doThis, mouseup: doThat }"></button>
        一般: v-bind与$attrs配合使用, v-on与$listeners配合使用
      使用它们能做什么呢?
        在封装可复用组件时: HintButton
            从父组件中接收不定数量/名称的属性或事件监听，在组件内部, 传递给它的子组件（“透传”）
        element-ui中: Input就使用了v-bind与$attrs来接收不定的属性传递给input
    -->
    <!-- 
      扩展双击监听:
        @dblclick="add2"
            绑定的是自定义事件监听, 而el-button内部并没处理(没有绑定对应的原生监听, 没有分发自定义事件)
            双击时, 不会有响应
        @dblclick.native="add2"
            绑定的是原生的DOM事件监听, 最终是给组件的根标签<a>绑定的原生监听
            当双击a内部的<button>能响应, 因为事件有冒泡
    -->

    <h2>自定义带Hover提示的按钮</h2>

    <HintButton
      placeholder="hhh"
      title="添加用户"
      type="primary"
      icon="el-icon-circle-plus"
      size="medium"
      @click="add"
    />
&nbsp;
    <HintButton title="编辑用户" type="info" icon="el-icon-edit" round @click="edit" />&nbsp;
    <HintButton title="编辑用户" type="warning" icon="el-icon-edit" round @dblclick.native="edit2" />
&nbsp;
    <HintButton title="删除用户" type="danger" icon="el-icon-delete" circle @click="remove" />
  </div>
</template>

<script type="text/ecmascript-6">
import HintButton from "./HintButton";
export default {
  name: "AttrsListenersTest",
  components: {
    HintButton
  },

  methods: {
    add() {
      alert("添加~");
    },
    edit() {
      alert("修改~");
    },
    edit2() {
      alert("edit2~");
    },
    remove() {
      alert("删除~");
    }
  }
};
</script>
