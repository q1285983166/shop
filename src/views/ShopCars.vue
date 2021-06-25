<template>
  <div class="ShopCars">
    <van-cell-group>
      <van-cell title="购物数量" />
      <p>{{ valid.length }}</p>
      <van-button
        size="mini"
        @click="mini_button = false"
        v-show="mini_button"
        color="#000"
        plain
        type="primary"
        >管理</van-button
      >
      <van-button
        size="mini"
        @click="mini_button = true"
        v-show="!mini_button"
        color="#000"
        plain
        type="primary"
        >取消</van-button
      >
    </van-cell-group>
    <!-- 商品卡片 -->
    <van-checkbox-group v-model="result" ref="checkboxGroup">
      <div ref="card" class="kp" v-for="(v, index) in valid" :key="index">
        <!-- 复选框 -->
        <van-checkbox
          :value="v.productInfo.attrInfo.price * v.cart_num"
          @click="checkbox"
          ref="checkbox"
          :name="v.id"
        ></van-checkbox>
        <!-- 商品 -->
        <van-card
          :price="v.productInfo.attrInfo.price"
          :desc="`属性：${v.productInfo.attrInfo.suk}`"
          :title="v.productInfo.store_name"
          :thumb="v.productInfo.image"
        >
          <!-- 步进器 -->
          <template #footer>
            <van-stepper
              @minus="minus($event, v.id)"
              @change="plus($event, v.id)"
              v-model="v.cart_num"
              :name="v.id"
            />
          </template>
        </van-card>
      </div>
      <!-- 提交订单 -->
      <van-submit-bar
        v-show="mini_button"
        :price="total_prices"
        button-text="提交订单"
        @submit="onSubmit"
      >
        <van-checkbox ref="allcheckbox" type="primary" @click="checkAll"
          >全选</van-checkbox
        >
      </van-submit-bar>

      <van-cell class="cell_bto" v-show="!mini_button" value="内容">
        <van-checkbox ref="allcheckbox" type="primary" @click="delAll"
          >全选</van-checkbox
        >
        <div>
          <van-button color="rgb(243, 37, 37)" plain hairline round type="info"
            >收藏</van-button
          >
          <van-button
            @click="del"
            color="rgb(115, 115, 115)"
            plain
            hairline
            round
            type="info"
            >删除</van-button
          >
        </div>
      </van-cell>
    </van-checkbox-group>
    <!-- 购物车为空 -->
    <div class="hot">
      <van-empty
        v-show="empty"
        class="custom-image"
        image="http://47.115.51.185/h5/img/noCart.6f2abfef.png"
      />
      <hot v-show="empty"></hot>
    </div>
  </div>
</template>

<script>
import Hot from "../components/Hot";
export default {
  components: {
    Hot,
  },
  watch: {},
  data() {
    return {
      mini_button: true,
      valid: [],
      checked: false,
      total_prices: 0,
      result: [],
      results: [],
      sub: "",
      empty: false,
    };
  },
  created() {
    this.aempty();
  },
  methods: {
    minus(e, id) {
      this.$axios
        .post("/api/cart/num", {
          id: id,
          number: e,
        })
        .then((d) => {
          console.log(d);
          this.setTimeouta();
        });
    },
    plus(e, id) {
      this.$axios
        .post("/api/cart/num", {
          id: id,
          number: e,
        })
        .then((d) => {
          console.log(d);
          this.setTimeouta();
        });
    },
    aempty() {
      this.$axios.get("/api/cart/list").then((d) => {
        // 当前商品
        if (d.data.data.valid) {
          console.log(d);
          this.valid = d.data.data.valid;
        }
        if (d.data.data.valid.length <= 0) {
          console.log("a");
          this.empty = true;
        }
      });
    },
    onSubmit() {
      if (this.valid.length <= 0) {
        this.$toast("请下单");
      } else {
        let b = this.$refs.checkbox;
        let a = [];
        b.map((d) => {
          if (d.checked) {
            a.push(d.name);
          }
        });
        this.sub = a.join(",");
        if (this.sub == "") {
          this.$toast("请添加商品");
        } else {
          this.$router.push("/submit/" + this.sub);
        }
      }
    },
    del() {
      if (this.valid.length <= 0) {
        this.$toast("无可删除商品");
      } else {
        let b = this.$refs.checkbox;
        let a = [];
        b.map((d) => {
          if (d.checked) {
            a.push(d.name);
          }
          console.log(a);
        });
        this.$axios
          .post("/api/cart/del", {
            ids: a,
          })
          .then((d) => {
            console.log(d);
          });
        this.aempty();
        this.$refs.allcheckbox.checked = false;
      }
    },
    delAll() {
      if (this.valid.length <= 0) {
        this.$toast("请下单");
      } else {
        this.check();
      }
    },
    checkAll() {
      if (this.valid.length <= 0) {
        this.$toast("请下单");
      } else {
        this.check();
      }
    },
    setTimeouta() {
      var that = this;
      setTimeout(function () {
        let b = that.$refs.checkbox;
        let val = 0;
        b.map((d) => {
          if (d.checked) {
            val = val + +d.value;
          }
        });
        that.total_prices = val * 100;
      }, 100);
    },
    check() {
      this.$refs.checkboxGroup.toggleAll(true);
      this.setTimeouta();
    },
    checkbox() {
      let a = true;
      let c = this.$refs.allcheckbox;
      let val = 0;
      let b = this.$refs.checkbox;
      b.map((d) => {
        if (!d.checked) {
          a = false;
          return;
        }
        if (d.checked) {
          val = val + +d.value;
        }
      });
      this.total_prices = val * 100;
      c.checked = a;
    },
  },
};
</script>

<style lang="less" >
.ShopCars {
  margin-top: 50px;
  margin-bottom: 100px;
  background-color: rgb(245, 245, 245);
  .van-empty {
    background-color: white;
  }
  .van-cell-group {
    top: 0;
    position: fixed;
    z-index: 999;
    width: 100%;
    p {
      color: rgb(243, 37, 37);
      font-size: 14px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 80px;
    }
    .van-button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 15px;
    }
  }
  .van-card {
    overflow: hidden;
    background-color: white;
    .van-card__title {
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
    }
    .van-card__desc {
      color: rgb(152, 152, 152);
      margin-top: 10px;
    }
  }
  .kp {
    margin-top: 10px;
    display: flex;
    align-items: center;
    background-color: white;
    .van-checkbox {
      padding: 0 7px 0 20px;
    }
    .van-card {
      margin: 0;
    }
  }
  .van-submit-bar {
    margin-bottom: 50px;
    background-color: rgb(250, 250, 250);
  }
  .cell_bto {
    padding: 0 20px;
    height: 50px;
    position: fixed;
    bottom: 50px;
    background-color: rgb(250, 250, 250);
    .van-cell__value {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .van-button {
        height: 35px;
        width: 75px;
        margin-left: 10px;
        margin-right: 1px;
      }
    }
  }
  .hot{
    padding: 0 15px;
  }
}
</style>