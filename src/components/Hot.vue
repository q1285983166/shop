<template>
  <div class="hot">
    <!-- 为您推荐 -->
    <van-divider
      :style="{ color: '#000', borderColor: '#000', padding: '0 16px' }"
    >
      为您推荐
    </van-divider>
    <!-- 推荐商品 -->
    <div class="sp">
      <ul>
        <router-link tag="li" :to="`/detail/${d.id}`" v-for="d in datas" :key="d.id">
          <img :src="d.image" />
          <p>{{ d.store_name }}</p>
          <p>￥{{ d.price }}</p>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      datas: [],
    };
  },
  created() {
    this.axios.get("api/product/hot?page=1&limit=20").then((d) => {
      console.log(d);
      this.datas = d.data.data;
    });
  },
};
</script>
<style lang="less" scoped>
.hot {
  background-color: white;
  .van-divider {
    background-color: white;
    margin: 0;
  }
  .sp {
    ul {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li {
        width: 48%;
    margin-top: 10px;
        img {
          width: 100%;
          height: 160px;
        }
        p {
          font-size: 12px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 100%;
          &:last-child{
              color: red;
          }
        }
      }
    }
  }
}
</style>