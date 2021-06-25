<template>
  <div class="Status">
    <!-- 顶部状态栏 -->
    <div class="box">
      <img
        src="http://datong.crmeb.net/public/uploads/attach/2019/03/28/5c9ccca12638a.gif"
        alt=""
      />
      <div>
        <p>{{ msg }}</p>
        <p>{{ datas._add_time }}</p>
      </div>
    </div>
    <!-- 步骤条 -->
    <van-steps active-color="rgb(233, 51, 35)" :active="active">
      <van-step>待付款</van-step>
      <van-step>待发货</van-step>
      <van-step>待收货</van-step>
      <van-step>待评价</van-step>
      <van-step>已完成</van-step>
    </van-steps>
    <!-- 联系人 -->
    <van-contact-card
      type="edit"
      :name="datas.real_name"
      :tel="datas.user_phone"
      :editable="false"
    >
    </van-contact-card>
    <!-- 商品数量 -->
    <van-cell :value="`共${datas.total_num}件商品`" />
    <!-- 商品卡片 -->
    <div class="card">
      <van-card
        v-for="d in datas.cartInfo"
        :key="d.id"
        :num="d.cart_num"
        :price="`${(d.productInfo.price*100 - d.vip_truePrice*100)/100}`"
        :desc="d.productInfo.attrInfo.suk"
        :title="d.productInfo.store_name"
        :thumb="d.productInfo.image"
      />
    </div>
    <!-- 联系客服 -->
    <van-cell class="cell" value="联系客服" />
    <!-- 订单详情 -->
    <div class="cells">
      <van-cell title="订单编号：" :value="sid" />
      <van-cell title="下单时间：" :value="datas._add_time" />
      <van-cell title="订单类型：" value="普通订单" />
      <van-cell title="支付状态：" value="已支付" />
      <van-cell title="支付方式：" :value="payType" />
    </div>
    <!-- 支付金额 -->
    <van-cell title="支付金额：" :value="`￥${datas.total_price}`" />
    <van-cell class="cell_sqtk" >
      <van-button color="rgb(157, 157, 157)" round plain type="info">申请退款</van-button>
    </van-cell>
  </div>
</template>
<script>
export default {
  props: ["sid"],
  data() {
    return {
      datas: {},
      msg: "",
      active: 1,
      payType: "",
    };
  },
  created() {
    this.$axios.get("/api/order/detail/" + this.sid).then((d) => {
      this.datas = d.data.data;
      this.msg = d.data.data._status._msg;
      this.active = d.data.data._status._type;
      this.payType = d.data.data._status._payType;
      console.log(d);
    });
  },
};
</script>
<style lang="less" scoped>
.Status {
  background-color: rgb(245, 245, 245);
  .box {
    width: 100%;
    height: 70px;
    background-color: rgb(233, 51, 35);
    display: flex;
    align-items: center;
    img {
      margin: 0 20px;
      width: 40px;
      height: 40px;
    }
    div {
      p {
        margin: 5px 0;
        font-size: 14px;
        color: white;
        &:first-child {
          font-weight: 900;
        }
        &:last-child {
          font-size: 12px;
          font-weight: 100;
        }
      }
    }
  }
  .card {
    .van-card {
      background-color: white;
      border-top: 1px solid rgb(239, 239, 239);
      border-bottom: 1px solid rgb(239, 239, 239);
      .van-card__price {
        color: red;
      }
    }
  }
  .cell {
    .van-cell__value {
      text-align: center;
      color: rgb(233, 51, 35);
    }
  }
  .cells {
    margin: 5px 0;
    .van-cell {
      padding: 0 15px;
      height: 30px;
      line-height: 30px;
      .van-cell__value {
        text-align: right;
        font-size: 12px;
        color: rgb(157, 157, 157);
      }
    }
  }
  .cell_sqtk {
    position: relative;
    height: 50px;
    padding: 0 15px;
    .van-button{
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 30px;
    }
  }
}
</style>