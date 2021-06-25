<template>
  <div>
    <van-overlay :show="show" />
    <van-loading v-show="show" />
  </div>
</template>
<script>
export default {
    props:['show']
}
</script>
<style lang="less" scoped>
.van-loading {
  position: absolute;
  z-index: 99999999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>