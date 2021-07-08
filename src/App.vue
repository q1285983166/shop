<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
    <!-- 底部导航栏组件 -->
    <btm-nav v-show="!$route.meta.btmNav"></btm-nav>
    <div class="go">
      <transition
        enter-active-class="animate__animated animate__bounceInRight"
        leave-active-class="animate__animated animate__bounceOutRight"
      >
        <ul class="go_box" v-show="goicon">
          <li size="40px" @click="goto('')">
            <van-icon color="#fff" name="wap-home-o" />
          </li>
          <li size="40px" @click="goto('shopcars')">
            <van-icon color="#fff" name="shopping-cart-o" />
          </li>
          <li size="40px" @click="goto('my')">
            <van-icon color="#fff" name="contact" />
          </li>
        </ul>
      </transition>
      <img
        @click="goicon = true"
        v-show="!goicon"
        src="http://47.115.51.185/h5/img/open.7da41017.gif"
        alt=""
      />
      <img
        @click="goicon = false"
        v-show="goicon"
        src="http://47.115.51.185/h5/img/close.446e8669.gif"
      />
    </div>
  </div>
</template>
<script>
import BtmNav from "./components/BtmNav";
export default {
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      goicon: false,
    };
  },
  components: {
    BtmNav,
  },
  methods: {
    goto(e) {
      console.log(e);
      if (e == "") {
        this.$router.push("/");
      } else {
        this.$router.push("/" + e);
      }
    },
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>
<style lang="less" scoped>
#app {
  .go {
    img {
      z-index: 999999;
      position: fixed;
      right: 20px;
      bottom: 110px;
      width: 40px;
      transform: rotateZ(90deg);
    }
    .go_box {
      z-index: 99999;
      position: fixed;
      right: 80px;
      bottom: 110px;
      width: 140px;
      height: 40px;
      border-radius: 50px;
      background-color: rgb(244, 73, 57);
      display: flex;
      li {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
      }
    }
  }
}
</style>