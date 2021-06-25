<template>
  <div class="integral">
    <div class="back">
      <img
        src="data:image/jpeg;base64,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"
        alt=""
      />
      <div class="top_text">
        <p>当前积分</p>
        <p>{{ datas.integral }}</p>
        <div class="br"></div>
      </div>
      <div class="bon_text">
        <div class="box_flex">
          <div class="bon">
            <p>{{ datas.sum_integral }}</p>
            <p>累计积分</p>
          </div>
          <div class="bon">
            <p>{{ datas.deduction_integral }}</p>
            <p>累计消费</p>
          </div>
          <div class="bon">
            <p>{{ datas.today_integral }}</p>
            <p>今日获得</p>
          </div>
        </div>
      </div>
    </div>
    <van-tabs
      line-height="0px"
      title-inactive-color="rgb(187,193,208)"
      title-active-color="rgb(233,51,35)"
    >
      <van-tab title="分值明细">
        <div class="tisi">通知：积分数值的高低会直接影响您的会员等级</div>
        <div class="datas">
          <div class="list" v-for="(l, i) in list" :key="i">
            <p>{{ l.mark }}</p>
            <p>{{ l.add_time }}</p>
            <p :class="{ g: l.pm == 1 }">
              {{ l.pm == 0 ? "-" : "+" }}{{ l.number }}
            </p>
          </div>
        </div>
      </van-tab>
      <van-tab title="分值提升">
        <router-link to='/' tag="div" class="gouwu">
          <img src="http://47.115.51.185/h5/img/score.30715cf5.png" alt="" />
          <p>购买商品可获得积分奖励</p>
          <div class="jifeng">赚积分</div>
        </router-link>
        <div class="gouwu">
          <img src="http://47.115.51.185/h5/img/score.30715cf5.png" alt="" />
          <p>每日签到可获得积分奖励</p>
          <div class="jifeng">赚积分</div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      datas: [],
      list: [],
    };
  },
  created() {
    this.$axios
      .post("/api/sign/user", {
        all: 1,
        integral: 1,
        sign: 1,
      })
      .then((d) => {
        this.datas = d.data.data;
      });
    this.$axios.get("/api/integral/list?page=1&limit=15").then((d) => {
      this.list = d.data.data;
      console.log(this.list);
    });
  },
};
</script>
<style lang="less" >
.integral {
  .back {
    position: relative;
    display: flex;
    img {
      width: 100%;
      height: 230px;
    }
    .top_text {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      p {
        margin-top: 10px;
        color: white;
        &:first-child {
          font-size: 16px;
        }
        &:nth-child(2) {
          font-size: 34px;
        }
      }
      .br {
        height: 1px;
        width: 30px;
        background-color: white;
        position: absolute;
        left: 50%;
        margin-left: -15px;
        top: 90px;
      }
    }
    .bon_text {
      position: absolute;
      top: 120px;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      width: 100%;
      .box_flex {
        display: flex;
        .bon {
          flex: 1;
          p {
            color: white;
            &:first-child {
              font-size: 20px;
            }
            &:last-child {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
  .van-tabs {
    width: 90%;
    height: 50px;
    margin-top: -44px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    .tisi {
      height: 30px;
      width: 100%;
      background-color: rgb(255, 245, 226);
      color: rgb(247, 191, 88);
      margin-top: 10px;
      border-radius: 20px;
      font-size: 12px;
      line-height: 30px;
      padding-left: 30px;
      box-sizing: border-box;
    }
    .van-tabs__wrap {
      border-radius: 10px 10px 0 0;
      .van-tabs__nav {
        background-color: rgb(229, 229, 229);
        .van-tab--active {
          background-color: white;
        }
      }
    }
    .gouwu {
      margin-top: 10px;
      height: 90px;
      width: 100%;
      background-image: linear-gradient(90deg, #fff7e7 0, #fffdf9);
      padding: 15px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      img {
        width: 40px;
        margin-right: 15px;
      }
      p {
        flex: 1;
        font-size: 16px;
        color: rgb(219, 159, 46);
        font-weight: 600;
      }
      .jifeng {
        font-size: 12px;
        color: rgb(219, 159, 46);
        padding: 5px 12px;
        border: 1px solid rgb(219, 159, 46);
        border-radius: 20px;
      }
    }
  }
  .datas {
    .time {
      background-color: rgb(231, 231, 231);
      font-size: 14px;
    }
    .list {
      padding: 10px 0;
      position: relative;
      border-bottom: 0.5px solid rgb(225, 225, 225);
      p {
        &:first-child {
          font-size: 12px;
          color: rgb(81, 81, 81);
        }
        &:nth-child(2) {
          margin-top: 5px;
          font-size: 12px;
          color: rgb(159, 159, 159);
        }
        &:last-child {
          font-size: 18px;
          right: 0;
          top: 50%;
          margin-top: -9px;
          position: absolute;
          color: rgb(244, 73, 57);
        }
      }
    }
  }
}
</style>