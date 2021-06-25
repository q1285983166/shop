<template>
  <div class="order">
    <div class="top_box">
      <p>订单信息</p>
      <div class="text">
        <p>
          累计订单: <span>{{ datas.order_count }}</span>
        </p>
        <p>
          总消费: <span>￥{{ datas.sum_price }}</span>
        </p>
      </div>
      <img src="http://47.115.51.185/h5/img/orderTime.e95f9090.png" alt="" />
    </div>
    <van-tabs v-model="activeName">
      <van-tab name="1">
        <template #title class="tab_title">
          <p>待付款</p>
          <p>{{ datas.unpaid_count }}</p>
        </template>
        <Shop
          @datas="datass"
          @lists="lists"
          class="shop_bxo"
          v-for="(l, i) in unpaid_count"
          :key="i"
          :l="l"
        >
        </Shop>
      </van-tab>
      <van-tab name="2">
        <template #title class="tab_title">
          <p>待发货</p>
          <p>{{ datas.order_count }}</p>
        </template>
        <ShopFahuo
          @datas="datass"
          @lists="lists"
          class="shop_bxo"
          v-for="(l, i) in order_count"
          :key="i"
          :l="l"
        >
        </ShopFahuo
      ></van-tab>
      <van-tab name="3"
        ><template #title class="tab_title">
          <p>待收货</p>
          <p>{{ datas.received_count }}</p> </template
        ><img
          class="tab_img"
          src="http://47.115.51.185/h5/img/noOrder.90017ce2.png"
          alt=""
      /></van-tab>
      <van-tab name="4"
        ><template #title class="tab_title">
          <p>待评价</p>
          <p>{{ datas.evaluated_count }}</p> </template
        ><img
          class="tab_img"
          src="http://47.115.51.185/h5/img/noOrder.90017ce2.png"
          alt=""
      /></van-tab>
      <van-tab name="5"
        ><template #title class="tab_title">
          <p>待付款</p>
          <p>{{ datas.complete_count }}</p> </template
        ><img
          class="tab_img"
          src="http://47.115.51.185/h5/img/noOrder.90017ce2.png"
          alt=""
      /></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Shop from "../components/Shop";
import ShopFahuo from "../components/ShopFahuo";
export default {
  props: ["id"],
  components: {
    Shop,
    ShopFahuo,
  },
  data() {
    return {
      datas: [],
      activeName: this.$route.params.id,
      unpaid_count: [],
      order_count: [],
    };
  },
  created() {
    this.$axios.get("/api/order/data").then((d) => {
      this.datas = d.data.data;
    });

    this.$axios.get("/api/order/list?page=1&limit=20&type=0").then((d) => {
      this.unpaid_count = d.data.data;
    });
    this.$axios.get("/api/order/list?page=1&limit=20&type=1").then((d) => {
      this.order_count = d.data.data;
    });
  },
  methods: {
    datass(e) {
      this.datas = e;
    },
    lists(e) {
      this.unpaid_count = e;
    },
  },
};
</script>
<style lang="less" >
.order {
  background-color: rgb(245, 245, 245);
  height: 100%;
  width: 100%;
  overflow: hidden;
  .top_box {
    width: 100%;
    height: 130px;
    background-color: rgb(233, 51, 35);
    position: relative;
    padding: 20px;
    box-sizing: border-box;
    p {
      color: white;
      font-size: 16px;
      font-weight: 600;
    }
    img {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-80%);
      width: 50px;
      height: 50px;
    }
    .text {
      margin-top: 10px;
      display: flex;
      p {
        color: rgba(255, 255, 255, 0.7);
        font-size: 12px;
        margin-right: 10px;
      }
    }
  }
  .van-tabs {
    .van-tabs__wrap {
      margin: 0 auto;
      margin-top: -30px;
      width: 95%;
      height: 70px;
      .van-tab--active {
        font-weight: 600;
      }
      .van-tab__text--ellipsis {
        overflow: auto;
        -webkit-line-clamp: 2;
        p {
          text-align: center;
        }
      }
    }
    .van-tabs__content {
      width: 95%;
      margin: 0 auto;
      background-color: white;
      margin-top: 10px;
      .shop_bxo {
        padding: 20px;
      }
    }
    .tab_img {
      display: block;
      margin: auto;
      padding: 50px 0;
      width: 50%;
      height: 50%;
    }
  }
}
</style>