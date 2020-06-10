<template>
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in carouselList" :key="item.id">
        <img :src="item.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "Carousel",
  // 声明接收属性数据
  props: {
    carouselList: Array, // 轮播的数组数据
    autoplay: Boolean
  },

  mounted() {
    // 方法二：
    // 初始显示完之后，如果已经有数据了再去创建swiper对象，针对floor组件中的轮播
    if (this.carouselList.length > 0) {
      this.initSwiper();
    }
  },

  watch: {
    // carouselList() {
    // 利用nextTick延迟到界面更新之后再去创建对象
    //   this.$nextTick(() => {
    //     this.initSwiper();
    //   });
    // },

    carouselList: {
      handler(value) {
        if (this.carouselList.length === 0) return;
        // 只要监测到数据有变化就去创建swiper对象，针对listContainer中banners的轮播
        this.$nextTick(() => {
          this.initSwiper();
        });
      }
      // 解决Floor组件的轮播问题
      // 方法一：初始显示时就立即调用创建swiper对象
      // immediate: true
    }
  },
  methods: {
    initSwiper() {
      new Swiper(this.$refs.swiper, {
        // direction: "vertical", // 垂直切换选项
        loop: true, // 循环模式选项

        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination"
        },

        autoplay: this.autoplay,

        // 如果需要前进后退按钮
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
</style>
