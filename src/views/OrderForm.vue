<template>
  <div class="orderform">
    <div class="box">
      <div class="gou">
        <svg
          t="1622112305571"
          class="icon"
          viewBox="0 0 1397 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2318"
          width="32"
          height="32"
        >
          <path
            d="M1396.363636 121.018182c0 0-223.418182 74.472727-484.072727 372.363636-242.036364 269.963636-297.890909 381.672727-390.981818 530.618182C512 1014.690909 372.363636 744.727273 0 549.236364l195.490909-186.181818c0 0 176.872727 121.018182 297.890909 344.436364 0 0 307.2-474.763636 902.981818-707.490909L1396.363636 121.018182 1396.363636 121.018182zM1396.363636 121.018182"
            p-id="2319"
            fill="#ffffff"
          ></path>
        </svg>
      </div>
      <p class="zf">订单支付成功</p>
      <div class="hr"></div>
      <ul>
        <li>
          <p>订单编号</p>
          <span>{{ sid }}</span>
        </li>
        <li>
          <p>下单时间</p>
          <span>{{ datas._add_time }}</span>
        </li>
        <li>
          <p>支付方式</p>
          <span>{{ datas.pay_price }}</span>
        </li>
        <li>
          <p>支付金额</p>
          <span>{{ payType }}</span>
        </li>
      </ul>
      <div class="hr"></div>
      <div class="btn">
        <van-button color="rgb(233,51,35)" @click="button" round type="info">查看订单</van-button>
        <van-button color="rgb(233,51,35)" @click="$router.push('/')" plain round type="info">返回首页</van-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["sid"],
  data() {
    return {
      datas: {},
      payType: "",
    };
  },
  methods:{
    button(){
        this.$router.push('/status/'+this.sid)
    }  
  },
  created() {
    this.$axios.get("/api/order/detail/" + this.sid).then((d) => {
      console.log(d);
      this.datas = d.data.data;
      this.payType = d.data.data._status._payType;
    });
  },
};
</script>
<style lang="less" scoped>
.orderform {
  height: 100vh;
  background-color: rgb(245, 245, 245);
  overflow: hidden;
  .box {
    width: 90%;
    background-color: white;
    margin: 0 auto;
    margin-top: 30%;
    border: 0.1px solid #fff;
    border-radius: 10px;
    .gou {
      margin: 0 auto;
      margin-top: -35px;
      height: 70px;
      width: 70px;
      border-radius: 50%;
      background-color: rgb(233, 51, 35);
      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        width: 50px;
      }
    }
    .zf {
      font-size: 16px;
      text-align: center;
      font-weight: 600;
      margin-top: 10px;
    }
    .hr {
      width: 90%;
      height: 1px;
      background-color: rgb(215, 215, 215);
      margin: 20px auto;
    }
    ul {
      font-size: 14px;
      padding: 0 10px;
      li {
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span {
          color: rgb(144, 144, 144);
        }
      }
    }
    .btn{
            text-align: center;
            margin-bottom: 10px;
        .van-button{
            margin-bottom: 10px;
            width: 90%;
        }
    }
  }
}
</style>