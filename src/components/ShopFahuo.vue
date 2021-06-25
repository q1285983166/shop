<template>
  <div class="shop" @click="goStatus">
    <div class="time">
      <p>{{ l._add_time }}</p>
      <p>{{ l._status._title }}</p>
    </div>
    <div class="br"></div>
    <div class="shop" v-for="(d, index) in l.cartInfo" :key="index">
      <img :src="d.productInfo.image" alt="" />
      <p>{{ d.productInfo.store_name }}</p>
      <div class="money_num">
        <p>￥{{ d.productInfo.price }}</p>
        <div>×{{ d.cart_num }}</div>
      </div>
    </div>
    <div class="total_prices">
      总{{ l.cartInfo.length }}件商品，总金额
      <span>￥{{ l.pay_price }}</span>
    </div>
    <div class="br"></div>
    <div class="shop_btn">
      <van-button
        size="small"
        @click.stop="goStatus"
        color="rgb(233,51,35)"
        round
        type="info"
        >查看详情</van-button
      >
    </div>
    <div class="br2"></div>
  </div>
</template>
<script>
export default {
  props: ["l"],
  methods: {
    goStatus() {
        this.$router.push("/status/" + this.l.order_id);
    },
  },
};
</script>
<style lang="less" scoped>
.shop {
  .br {
    height: 1px;
    width: 100%;
    background-color: rgb(224, 224, 224);
    margin: 10px 0;
  }
  .time {
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      font-size: 14px;
      &:last-child {
        color: tomato;
      }
    }
  }
  .shop {
    display: flex;
    margin-bottom: 10px;
    position: relative;
    img {
      width: 60px;
      height: 60px;
    }
    p {
      &:nth-child(2) {
        font-size: 14px;
        width: 50%;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        height: 40px;
        margin: 0 10px;
      }
    }
    .money_num {
      position: absolute;
      right: 0;
      text-align: right;
      margin: 0;
      color: rgb(174, 174, 174);
      p {
        font-size: 14px;
      }
      div {
        font-size: 14px;
      }
    }
  }
  .total_prices {
    font-size: 14px;
    text-align: right;
    span {
      color: rgb(241, 85, 71);
      font-weight: 600;
    }
  }
  .shop_btn {
    text-align: right;
    .van-button--small {
      padding: 0 15px;
    }
    .cancel {
      color: rgb(161, 161, 161);
      background-color: rgb(255, 255, 255);
      border: 1px solid rgb(161, 161, 161);
      margin-right: 10px;
    }
  }
  .br2 {
    height: 10px;
    width: 100%;
    margin: 15px;
    position: absolute;
    left: -10px;
    background-color: rgb(245, 245, 245);
    text-align: center;
  }
}
</style>