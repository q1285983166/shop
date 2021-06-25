<template>
  <!-- 底部导航栏组件 -->
  <div class="nav">
    <van-tabbar
    z-index='999'
      v-model="active"
      active-color="#fc4141"
      inactive-color="#282828"
      route
    >
      <van-tabbar-item to="/" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/category" icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item to="/shopcars" icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item to="/my" icon="contact">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style lang="less" scoped>
</style>