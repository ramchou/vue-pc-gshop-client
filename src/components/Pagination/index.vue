<template>
  <div class="pagination">
    <!-- 当前页码为1时，“上一页”不能操作“ -->
    <button :disabled="myCurrentPage===1" @click="setCurrentPage(myCurrentPage-1)">上一页</button>
    <!-- start值要大于1，这个1才显示 -->
    <button v-if="startEnd.start > 1" @click="setCurrentPage(1)">1</button>
    <!-- start值要大于2，这个...才显示 -->
    <button v-if="startEnd.start > 2" disabled>···</button>

    <!-- 连续页码[start, end] -->
    <!-- v-for的优先级高于v-if  先执行v-for的遍历,每遍历一个再执行v-if判断 -->
    <button
      v-for="item in startEnd.end"
      :key="item"
      v-if="item>=startEnd.start"
      :class="{active: item === myCurrentPage}"
      @click="setCurrentPage(item)"
    >{{item}}</button>

    <button disabled v-if="startEnd.end < totalPages-1">···</button>
    <button v-if="startEnd.end < totalPages" @click="setCurrentPage(totalPages)">{{totalPages}}</button>
    <!-- 如果当前页码为totalPages，则无法操作”下一页“ -->
    <button :disabled="myCurrentPage===totalPages" @click="setCurrentPage(myCurrentPage+1)">下一页</button>
    <button style="margin-left: 30px" disabled>共 {{total}} 条</button>
  </div>
</template>
<script>
export default {
  name: "Pagination",
  props: {
    currentPage: {
      // 当前页码  从外部接收
      type: Number,
      default: 1
    },
    pageSize: {
      // 每页商品数量
      type: Number,
      default: 10
    },
    total: {
      // 商品总数量
      type: Number,
      default: 0
    },
    showPageNo: {
      // 连续页码数
      type: Number,
      default: 5 // 最好指定为奇数
    }
  },
  data() {
    return {
      // 内部自己维护的页码   将外部传入的页码作为当前组件当前页码的初始值
      myCurrentPage: this.currentPage
    };
  },
  watch: {
    // 监视父组件传入的当前页码
    currentPage(value){
      this.myCurrentPage = value
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.pageSize);
    },

    // 计算出连续页码的start值和end值
    // start的最小值为1，end的最大值为totalPages
    startEnd() {
      // 取出依赖数据
      const { myCurrentPage, totalPages, showPageNo } = this;
      let start, end;
      // 计算start
      // myCurrentPage showPageNo  totalPages
      //       4            5          8           23[4]56
      // myCurrentPage showPageNo  totalPages
      //       2            5          8           01[2]34 → 1[2]345     →如果start<1，修改其为1
      start = myCurrentPage - Math.floor(showPageNo / 2); // start = 4 - Math.floor(5/2)
      // 如果start<1，修改其为1
      if (start < 1) {
        start = 1;
      }

      // 计算end
      // myCurrentPage showPageNo  totalPages
      //       4            5          8           23[4]56
      // myCurrentPage showPageNo  totalPages
      //       7            5          8           56[7]89 → 456[7]8
      end = start + showPageNo - 1; // 2+5-1
      // 如果end > totalPages，修改其为totalPages
      if (end > totalPages) {
        end = totalPages;
        // 同时要根据showPageNo修正start
        start = end - showPageNo + 1; // 8-5+1

        // 其他情况：如果总页码数比较小
        // myCurrentPage showPageNo  totalPages
        //       3            5          4           12[3]45 →012【3】4 ×
        if (start < 1) {
          start = 1;
        }
      }

      return { start, end };
    }
  },
  methods: {
    //  设置新的当前页码
    setCurrentPage(page) {
      // 更新自己data中的当前页码，而不是更新接收的currentPage属性
      if(this.myCurrentPage === page) return;
      this.myCurrentPage = page;
      // 分发vue自定义事件：通知父组件，当前页码发生了改变
      this.$emit('currentPage', page)
    }
  }
};
</script>
<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;
    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }
    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
