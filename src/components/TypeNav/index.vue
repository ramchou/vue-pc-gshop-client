<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="hideSubCategories" @mouseenter="showCategories">
        <h2 class="all">全部商品分类</h2>
        <!-- 用transition给一级列表添加显示时的过渡效果，注意要同时更改less文件对应的部分 -->
        <transition name="move">
          <div class="sort" v-show="isShowFirst">
            <div class="all-sort-list2" @click="toSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{item_on: index === currentIndex}"
                @mouseenter="showSubCategories(index)"
              >
                <h3>
                  <a
                    href="javascript:"
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                  >{{c1.categoryName}}</a>
                  <!-- <a href='javascript:' @click="`/search?categoryName=${c1.categoryName}&category1Id=${c1.categoryId}`">{{c1.categoryName}}</a> -->
                  <!-- <router-link :to="`/search?categoryName=${c1.categoryName}&category1Id=${c1.categoryId}`">{{c1.categoryName}}</router-link> -->
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <dl class="fore" v-for="(c2) in c1.categoryChild" :key="c2.categoryId">
                      <dt>
                        <a
                          href="javascript:"
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                        >{{c2.categoryName}}</a>
                        <!-- <a href='javascript:' @click="`/search?categoryName=${c2.categoryName}&category2Id=${c2.categoryId}`">{{c2.categoryName}}</a> -->
                        <!-- <router-link :to="`/search?categoryName=${c2.categoryName}&category2Id=${c2.categoryId}`">{{c2.categoryName}}</router-link> -->
                      </dt>
                      <dd>
                        <em v-for="(c3) in c2.categoryChild" :key="c3.categoryId">
                          <a
                            href="javascript:"
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                          >{{c3.categoryName}}</a>
                          <!-- <a href='javascript:' @click="`/search?categoryName=${c3.categoryName}&category3Id=${c3.categoryId}`">{{c3.categoryName}}</a> -->
                          <!-- <router-link :to="`/search?categoryName=${c3.categoryName}&category3Id=${c3.categoryId}`">{{c3.categoryName}}</router-link> -->
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -2,
      isShowFirst: false
    };
  },
  beforeMount() {
    this.isShowFirst = this.$route.path === "/";
  },
  computed: {
    // 三级分类列表的计算属性
    // categoryList1() {
    //   return this.$store.state.home.categoryList;
    // },

    // 一旦使用vuex多模块编程，mapState通过数组名称直接取是取不到的，因为层次结构不对
    // 数组方法
    // ...mapState(['categoryList']) // categoryList(){return this.$store.state['categoryList']} 这里的state是总state而不是home的state
    // 对象方法也不行
    // ...mapState({
    //   categoryList2: 'categoryList'
    // }) // categoryList2: {return this.$store.state['categoryList']}

    ...mapState({
      // 右边是一个回调函数，回调函数接收总state作为参数，返回值作为计算属性的值
      // 通过vuex获取当前组件的数据时注意层次结构：总/分
      categoryList: state => state.home.categoryList
    })
  },

  mounted() {
    // 通过store对象的dispatch()触发异步action getCategoryList执行获取数据
    // this.$store.dispatch("getCategoryList"); // 数据从接口转移到vuex的state中
    this.getCategoryList();
  },
  methods: {
    ...mapActions(["getCategoryList"]), // getCategoryList(){this.$store.dispatch("getCategoryList"}

    showSubCategories: throttle(function(index) {
      if (this.currentIndex !== -2) {
        this.currentIndex = index;
      }
    }, 200),

    // 隐藏详情列表
    hideSubCategories() {
      this.currentIndex = -2;
      // 非首页则隐藏一级列表（Search页面）
      if (this.$route.path !== "/") {
        this.isShowFirst = false;
      }
    },
    // 展示一级列表
    showCategories() {
      this.currentIndex = -1; // 鼠标尚未进入一级列表区域则不更新列表数据
      this.isShowFirst = true; // 鼠标位于“全部商品分类”上+位于一级列表之上时，显示一级列表
    },

    toSearch(event) {
      const {
        categoryname,
        category1id,
        category2id,
        category3id
      } = event.target.dataset;

      if (categoryname) {
        const query = {
          categoryName: categoryname
        };

        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }

        this.$router.push({
          name: "search",
          query
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
      // 指定显示过程的transtion
      &.move-enter-active {
        transition: all 0.3s;
      }
      // 指定隐藏时的样式
      &.move-enter,
      &.move-leave-to {
        opacity: 0;
        height: 0;
      }

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 550px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &.item_on {
            background-color: #999;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
