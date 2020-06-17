<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="userInfo.token">
            <span>{{userInfo.name}}</span> &nbsp;
            <a href="###" @click="logout">退出</a>
          </p>
          <p v-else>
            <span>请</span>
            <router-link :to="{path:'/login'}">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center/myorder">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <!-- <router-link to="/" class="logo" title="尚品汇" href="###" target="_blank"> -->
        <router-link to="/">
          <img src="./images/logo.png" alt />
        </router-link>
      </h1>
      <div class="searchArea">
        <!-- 提交表单了整个页面就会刷新,但是并不需要它刷新 → 阻止默认行为 -->
        <form action="###" class="searchForm" @submit.prevent="search">
          <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" />
          <!-- <button class="sui-btn btn-xlarge btn-danger"  @click.prevent="search">搜索</button> -->
          <button class="sui-btn btn-xlarge btn-danger" @click="search">搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      keyword: ""
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.users.userInfo;
    }
  },
  methods: {
    search() {
      // 路由传参
      // 写法一
      // const { keyword } = this;
      // this.$router.push(`/search/${keyword}?keyword2=${keyword.toUpperCase()}`)

      // 写法二（常用）
      // 使用push()的对象语法去写params参数时，必须配置name，传递query参数没有此限制
      // const { keyword } = this;
      // this.$router.push({
      //   name: "search",
      //   params: { keyword },
      //   query: { keyword2: keyword.toUpperCase() }
      // });

      // 写法三
      // 解决params可传可不传的问题
      // ①配置路由路径的params(最后面加问号)：path: '/search/:keyword?'
      // ②对keyword先进行判断，如果keyword为空则不进行参数配置，仍访问Search原页面
      const { keyword } = this;
      const location = {
        name: "search"
      };
      if (keyword) {
        location.params = { keyword };
      }
      // 获取当前路由地址中的query参数对象
      const { query } = this.$route;
      location.query = query;

      // 这其中还有另外一个问题：如果跳转到此路由且参数数据不变时，会报错（重复跳转路由）
      // 原因: vue-router3.1.0之后, 引入了push()的promise的语法, 如果没有通过参数指定回调函数就返回一个promise来指定成功/失败的回调, 且内部会判断是否要跳转的路径和参数都没有变化, 会抛出一个失败的promise
      // 解决办法一：在每次push时指定回调函数或catch错误
      // this.$router.push(location, ()=>{});
      // this.$router.push(location).catch(()=>{});
      // 解决办法二：修改Vue原型上的push和replace方法

      // 如果当前在search页面，使用replace，否则使用push
      // if(this.$route.path.indexOf('search') === 0){ // 路径以search开头(下标为0)
      if (this.$route.name === "search") {
        this.$router.replace(location);
      } else {
        this.$router.push(location);
      }
    },
    async logout() {
      if (confirm("确定退出吗？")) {
        try {
          await this.$store.dispatch("logout");
          this.$router.replace("/login");
        } catch (error) {
          alert(error.message);
        }
      }
    }
  },
  mounted() {
    this.$bus.$on("removeKeyword", () => {
      this.keyword = "";
    });
  }
};
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
