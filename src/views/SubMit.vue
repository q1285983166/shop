<template>
  <div class="SubMit">
    <div class="back"></div>
    <!-- 顶部分页 -->
    <van-tabs
      @disabled="disabled"
      title-inactive-color="#e93323"
      background="#e49e97"
    >
      <van-tab title="快速派送"> </van-tab>
      <van-tab disabled title="到店自取"></van-tab>
    </van-tabs>
    <!-- 联系人 -->
    <van-cell class="lxr" @click="onEdit">
      <div>
        {{ currentContact.name }} <span>{{ currentContact.tel }}</span>
      </div>
      <div>
        {{ addressInfoa.province }}{{ addressInfoa.city
        }}{{ addressInfoa.district }}{{ addressInfoa.detail }}
      </div>
    </van-cell>
    <!-- 编辑联系人 -->
    <van-popup
      class="dz_popup"
      @open="popup"
      v-model="show"
      closeable
      position="bottom"
    >
      <van-cell class="pop_top" value="选择地址" />
      <div class="pop_con">
        <van-cell v-for="p in popuplist" :key="p.id" @click="onEdit">
          <div>
            {{ p.real_name }} <span>{{ p.phone }}</span>
          </div>
          <div>{{ p.province }}{{ p.city }}{{ p.district }}{{ p.detail }}</div>
        </van-cell>
      </div>
      <div class="pop_bto">
        <van-button color="rgb(244,73,57)" round type="info">添加地址</van-button>
      </div>
    </van-popup>
    <!-- 商品卡片 -->
    <van-cell :value="`共0件商品`" />
    <div class="card">
      <van-card
        v-for="c in cartInfo"
        :key="c.id"
        :num="c.cart_num"
        :price="c.truePrice"
        :desc="c.productInfo.attrInfo.suk"
        :title="c.productInfo.store_name"
        :thumb="c.productInfo.image"
      />
    </div>
    <!-- 优惠券单元格 -->
    <van-coupon-cell @click="showList = true" />
    <van-popup
      v-model="showList"
      closeable
      position="bottom"
      :style="{ height: '30%' }"
    >
      <p>优惠卷</p>
    </van-popup>
    <!-- 积分抵扣 -->
    <van-cell-group>
      <van-cell title="积分折扣" value="当前折扣：">
        <template #right-icon>
          <p class="cell_p">{{ userInfo.integral }}</p>
          <van-checkbox @click="checkbox" v-model="checked"></van-checkbox>
        </template>
      </van-cell>
    </van-cell-group>
    <!-- 会员优惠 -->
    <van-cell-group>
      <van-cell title="会员优惠">
        <template #right-icon>
          <p>{{ vipPrice == 0 ? "无" : "-￥" + vipPrice }}</p>
        </template>
      </van-cell>
    </van-cell-group>
    <!-- 快递邮费 -->
    <van-cell-group>
      <van-cell title="快递邮费">
        <template #right-icon>
          <p>{{ storePostage == 0 ? "免邮费" : storePostage }}</p>
        </template>
      </van-cell>
    </van-cell-group>
    <!-- 备注信息 -->
    <van-cell-group class="cell-group">
      <van-cell title="备注信息"> </van-cell>
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        placeholder="请输入"
        show-word-limit
      />
    </van-cell-group>
    <!-- 支付方式 -->
    <van-cell-group class="cell-group-zf">
      <van-cell title="支付方式"> </van-cell>
      <div class="group-zf">
        <van-cell
          @click="cell1"
          :class="{ cell_zf: cell == 1 }"
          title="微信支付"
          value="微信快捷支付"
        />
        <van-cell
          @click="cell2"
          :class="{ cell_zf: cell == 2 }"
          title="余额支付"
          :value="`可用余额：${userInfo.now_money}`"
        >
        </van-cell>
      </div>
    </van-cell-group>
    <!-- 结算 -->
    <van-submit-bar
      :price="price_z"
      button-text="立即结算"
      @submit="onSubmit"
    />
    <!-- 弹出层 -->
    <van-popup class="popup" v-model="showpopup"
      ><van-loading />订单生成中</van-popup
    >
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentContact: {
        name: "",
        tel: "",
      },
      showpopup: false,
      show: false,
      showList: false,
      cartInfo: [],
      checked: false,
      userInfo: [],
      storePostage: 0,
      message: "",
      price_z: 0,
      orderKey: "",
      cell: 1,
      vipPrice: 0,
      addressInfo: {},
      addressInfoa: [],
      popuplist: [],
    };
  },
  props: ["sid"],
  methods: {
    popup() {
      console.log(123);
      this.$axios.get("/api/address/list").then((d) => {
        console.log(d);
        this.popuplist = d.data.data;
      });
    },
    checkbox() {
      if (this.checked) {
        console.log(this.userInfo.integral);
        this.$axios
          .post("/api/order/computed/" + this.orderKey, {
            addressId: this.addressInfo.id,
            couponId: 0,
            payType: "yue",
            shipping_type: 1,
            useIntegral: 1,
          })
          .then((d) => {
            let da = d.data.data.result;
            console.log(da);
            this.userInfo.integral =
              this.userInfo.integral - +da.deduction_price;
            this.price_z = +da.pay_price;
          });
      } else {
        console.log(this.userInfo.integral);
        this.$axios
          .post("/api/order/computed/" + this.orderKey, {
            addressId: this.addressInfo.id,
            couponId: 0,
            payType: "yue",
            shipping_type: 1,
            useIntegral: 0,
          })
          .then((d) => {
            let da = d.data.data.result;
            console.log(da);
            this.userInfo.integral = this.userInfo.integral + +da.pay_price;
            this.price_z = da.pay_price * 100;
          });
      }
    },
    cell1() {
      this.cell = 1;
    },
    cell2() {
      this.cell = 2;
    },
    disabled() {
      this.$toast("暂无门店");
    },
    onEdit() {
      this.show = true;
    },
    onSubmit() {
      this.showpopup = true;
      this.$axios
        .post("/api/order/create/" + this.orderKey, {
          addressId: this.addressInfo.id,
          bargainId: 0,
          combinationId: 0,
          couponId: 0,
          from: "weixinh5",
          mark: "",
          payType: "yue",
          phone: "",
          pinkId: 0,
          real_name: "",
          seckill_id: 0,
          shipping_type: 1,
          store_id: 0,
          useIntegral: 0,
        })
        .then((d) => {
          this.showpopup = false;
          console.log(d);
          this.$router.push("/orderform/" + d.data.data.result.orderId);
        });
    },
  },
  created() {
    this.cell1();
    this.$axios
      .post("/api/order/confirm", {
        cartId: this.sid,
      })
      .then((d) => {
        console.log(d);
        let b = d.data.data;
        this.addressInfoa = b.addressInfo;
        console.log(this.addressInfoa);
        this.currentContact.name = b.addressInfo.real_name;
        this.currentContact.tel = b.addressInfo.phone;
        this.addressInfo = b.addressInfo;
        this.orderKey = b.orderKey;
        this.userInfo = b.userInfo;
        this.cartInfo = b.cartInfo;
        this.storePostage = b.priceGroup.storePostage;
        this.vipPrice = b.priceGroup.vipPrice;
        this.price_z = +b.priceGroup.totalPrice * 100;
      });
  },
};
</script>
<style lang="less" >
.cell_zf {
  border: 1px solid rgb(255, 102, 102) !important;
  box-sizing: border-box;
}
.van-tab--active {
  background-color: white;
  color: #e93323;
}
.SubMit {
  background-color: rgb(235, 235, 235);
  position: relative;
  overflow-x: hidden;
  height: 100vh;
  margin-bottom: 50px;
  width: 100%;
  .back {
    position: absolute;
    top: 0;
    width: 100%;
    height: 120px;
    background-image: linear-gradient(180deg, #e93323 0, #f5f5f5);
  }
  .van-tabs {
    margin: 10px;
    margin-bottom: 0;
    .van-tab {
      height: 50px;
    }
    .van-tabs__line {
      height: 0;
    }
  }
  .lxr {
    margin: 0 10px;
  }
  .van-cell {
    margin-bottom: 2px;
  }
  .card {
    margin-bottom: 5px;
    .van-card {
      margin: 0;
      margin-bottom: 2px;
      background-color: white;
    }
    .van-card__price {
      color: red;
    }
  }
  .van-popup {
    text-align: center;
    p {
      margin-top: 10px;
    }
  }
  .van-submit-bar {
    .van-submit-bar__text {
      text-align: left;
    }
  }
  .van-cell-group {
    p {
      color: rgb(157, 157, 157);
    }
    .cell_p {
      color: red;
    }
    .van-checkbox {
      margin-left: 10px;
    }
  }
  .cell-group {
    display: flex;
    flex-direction: column;
    position: relative;
    .van-field {
      width: 90%;
      margin: 0 auto;
      height: 100px;
      color: white;
      background-color: rgba(237, 237, 237, 0.5);
      margin-bottom: 20px;
    }
  }
  .cell-group-zf {
    padding: 10px 0;
    margin: 5px 0;
    .group-zf {
      padding: 0 20px;
      .van-cell {
        text-align: center;
        margin-bottom: 10px;
        border: 1px solid rgb(224, 224, 224);
        .van-cell__value {
          text-align: center;
        }
      }
    }
  }
  .popup {
    padding: 20px 40px;
    font-size: 14px;
    display: flex;
    align-items: center;
  }
  .dz_popup {
    position: fixed;
    .pop_top {
      position: absolute;
      top: 0;
      .van-cell__value {
        text-align: center;
      }
    }
    .pop_con {
      height: 300px;
      overflow: hidden;
      margin-top: 50px;
      margin-bottom: 100px;
      overflow-y: auto;
    }
    .pop_bto{
      position: absolute;
      bottom: 0;
      height: 100px;
      width: 100%;
      line-height: 80px;
      .van-button{
        width: 90%;
      }
    }
  }
}
</style>