<template>
  <div class="Hot_New_Goods">
    <LoadIng :show="show"></LoadIng>
    <!-- 轮播 -->
    <div class="bastBanner">
      <van-swipe :height="120" :autoplay="3000">
        <van-swipe-item v-for="b in banner" :key="b.id">
          <img v-lazy="b.img" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <van-cell value="精品推荐" />
    <!-- 商品卡片 -->
    <BastLIst class="bast" v-for="b in list" :key="b.id" :b="b"></BastLIst>
  </div>
</template>
<script>
import LoadIng from "../components/LoadIng";
import BastLIst from "../components/BastLIst";
export default {
  // 注册组件
  components: {
    LoadIng,
    BastLIst,
  },
  data() {
    return {
      list: [],
      banner: [],
      show: true,
    };
  },
  created() {
    (this.show = true),
      this.$axios.get("/api/groom/list/1?page=1&limit=20").then((d) => {
        this.show = false;
        this.list = d.data.data.list;
        this.banner = d.data.data.banner;
      });
  },
};
</script>
<style lang="less">
.Hot_New_Goods {
  .van-cell {
      padding: 15px 0;
      background-color: rgb(229, 229, 229);
    .van-cell__value {
        text-align: center;
    }
  }
  .bast {
    padding: 0 15px;
  }
  .bastBanner {
    .van-swipe {
      height: 150px;
      width: 100%;
      img {
        height: 150px;
        width: 100%;
      }
    }
  }
}
</style>