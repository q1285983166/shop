<template>
  <div class="shop" @click.self="goStatus">
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
        @click.stop="callOff"
        class="cancel"
        round
        type="info"
        >取消订单</van-button
      >
      <van-button
        size="small"
        is-link
        @click.stop="showPopup"
        color="rgb(233,51,35)"
        round
        type="info"
        >立即付款</van-button
      >
      <van-popup
        v-model="show"
        position="bottom"
        closeable
        :style="{ height: '30%' }"
        ><p>选择支付方式</p>
        <van-cell
          is-link
          title="微信支付"
          @click="wx(l.order_id)"
          label="使用微信快捷支付" />
        <van-cell
          is-link
          title="余额支付"
          @click="yue(l.order_id)"
          :label="`当前可用余额：${datas.now_money}`"
      /></van-popup>
    </div>
    <div class="br2"></div>
  </div>
</template>
<script>
export default {
  props: ["l"],
  data() {
    return {
      show: false,
      datas: [],
    };
  },
  created() {
    this.$axios.get("/api/userinfo").then((d) => {
      this.datas = d.data.data;
    });
    console.log(this.l);
  },
  methods: {
    goStatus() {
      this.$router.push("/status/" + this.l.order_id);
    },
    showPopup() {
      this.show = true;
    },
    callOff() {
      this.$dialog
        .confirm({
          title: "标题",
          message: "弹窗内容",
        })
        .then(() => {
          this.$axios
            .post("/api/order/cancel", {
              id: this.l.order_id,
            })
            .then((d) => {
              this.$toast.success(d.data.msg);
            });
          this.$axios.get("/api/order/data").then((d) => {
            this.$emit("datas", d.data.data);
          });
          this.$axios
            .get("/api/order/list?page=1&limit=20&type=0")
            .then((d) => {
              this.$emit("lists", d.data.data);
            });
        })
        .catch(() => {
          // on cancel
        });
    },
    wx(e) {
      this.show = false;
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      this.$axios
        .post("/api/order/pay", {
          from: "weixinh5",
          paytype: "weixin",
          uni: e,
        })
        .then((d) => {
          console.log(d);
          this.$toast(d.data.msg);
        });
    },
    yue(e) {
      this.show = false;
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      this.$axios
        .post("/api/order/pay", {
          from: "weixinh5",
          paytype: "yue",
          uni: e,
        })
        .then((d) => {
          this.$toast(d.data.msg);
          this.$axios.get("/api/order/data").then((d) => {
            this.$emit("datas", d.data.data);
          });
          this.$axios
            .get("/api/order/list?page=1&limit=20&type=0")
            .then((d) => {
              this.$emit("lists", d.data.data);
            });
        });
    },
  },
};
</script>
<style lang="less" scoped>
.shop {
  .van-popup {
    text-align: left;
    p {
      text-align: center;
      margin: 10px 0;
      font-size: 16px;
      font-weight: 600;
    }
    .van-cell {
      align-items: center;
    }
  }
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
        height: 38px;
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