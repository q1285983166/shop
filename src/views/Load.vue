<template>
  <div class="load">
    <div class="load_img"></div>
    <div class="load_com">
      <forget-word v-show="show == 2" @goload="show = 1" class="van-tabs2"></forget-word>
      <regi-ster v-show="show == 3" @goload="show = 1" class="van-tabs2"></regi-ster>
      <van-tabs line-width="50px" v-show="show == 1" >
        <!-- 账号登录 -->
        <van-tab title="账号登录">
          <van-form @submit="onSubmit">
            <van-field
              v-model="account"
              name="account"
              placeholder="输入手机号码"
              left-icon="phone-o"
            />
            <van-field
              v-model="password"
              type="password"
              name="password"
              left-icon="bag-o"
              placeholder="填写登录密码"
            />
            <!-- 忘记密码 -->
            <div class="forget">
              <van-icon color="#b0b0b0" size=".5rem" name="question-o" />
              <p @click="show = 2">忘记密码</p>
            </div>
            <!-- 登录按钮 -->
            <div style="margin: 16px">
              <van-button round block type="info" native-type="submit"
                >登录</van-button
              >
            </div>
          </van-form>
        </van-tab>
        <!-- 快速登录 -->
        <van-tab title="快速登录">
          <van-form @submit="onSubmit2">
            <van-field
              v-model="account2"
              name="用户名"
              placeholder="输入手机号码"
              left-icon="phone-o"
            />
            <van-field
              v-model="password2"
              type="password"
              name="验证码"
              left-icon="bag-o"
              placeholder="填写验证码"
            >
              <!-- 发送验证码 -->
              <template v-slot:button>
                <van-button
                  class="smabtn"
                  size="small"
                  :disabled="countdown < 60"
                  round
                  type="info"
                  @click.stop="code"
                  >{{
                    countdown >= 60 ? "获取验证码" : `${countdown}秒`
                  }}</van-button
                >
              </template>
            </van-field>
            <!-- 登录按钮 -->
            <div style="margin: 16px">
              <van-button round block type="info" native-type="submit"
                >登录</van-button
              >
            </div>
          </van-form>
        </van-tab>
        <!-- 注册 -->
        <div class="register">
          没有账号？<span @click="show = 3">立即注册</span>
        </div>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import ForgetWord from "../components/ForgetWord";
import RegiSter from "../components/RegiSter";
import { mapMutations, mapActions } from "vuex";
export default {
  components: {
    RegiSter,
    ForgetWord,
  },
  // 获取页面kay
  created() {
    this.$axios.get("/api/verify_code").then((d) => {
      this.codekey = d.data.data.key;
    });
  },
  data() {
    return {
      account: "",
      password: "",
      account2: "",
      password2: "",
      show: 1,
      codekey: 0,
      countdown: 60,
    };
  },
  methods: {
    // 结构vuex
    ...mapMutations(["mutaToken"]),
    ...mapActions(["actToken"]),
    // 发送验证码
    code() {
      this.$axios
        .post("api/register/verify", {
          key: this.codekey,
          phone: this.account2,
          type: "login",
        })
        .then((d) => {
          this.$toast(d.data.msg);
          if (d.data.status == 200) {
            let i = setInterval(() => {
              if (this.countdown <= 0) {
                this.countdown = 60;
                clearInterval(i);
                return;
              }
              this.countdown--;
            }, 1000);
          }
        });
    },
    onSubmit(e) {
      console.log("submit", e);
      if (e.account == "") {
        this.$toast("请输入账号");
        return;
      }
      if (e.password == "") {
        this.$toast("请输入密码");
        return;
      }
      this.$axios.post("/api/login", e).then((d) => {
        console.log(d);
        if (d.data.status == 400) {
          this.$toast(d.data.msg);
          return;
        }
        if (d.data.status == 200) {
          this.$toast({
            message: "登录成功",
            icon: "passed",
            onClose: () => {
              this.$router.go(-1);
            },
          });
          this.actToken(d.data.data.token);
          this.mutaToken(d.data.data.token);
        }
      });
    },
    // 快速登录
    onSubmit2() {
      this.$axios
        .post("/api/login/mobile", {
          captcha: this.password2,
          phone: this.account2,
          spread: null,
        })
        .then((d) => {
          this.$toast(d.data.msg);
          console.log(d);
          if (d.data.status == 200) {
          this.$toast({
            message: "登录成功",
            icon: "passed",
            onClose: () => {
              this.$router.go(-1);
            },
          });
          this.actToken(d.data.data.token);
          this.mutaToken(d.data.data.token);
        }
        });
    },
  },
};
</script>
<style lang="less">
.load {
  .van-tabs2{
    .van-tabs__line{
      height: 0;
    }
  }
  background-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(#eb5447),
    to(#ff8e3b)
  );
  background-image: linear-gradient(180deg, #eb5447 0, #ff8e3b);
  background-image: -moz-linear-gradient(to bottom, #eb5447 0, #ff8e3b 100%);
  width: 100%;
  height: 100vh;
  overflow: hidden;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
  .van-tab__text {
    font-weight: 600;
  }
  .load_img {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background-color: rgb(0, 0, 0);
    border: 3px solid rgb(255, 255, 255);
    margin: 30px auto;
  }
  .load_com {
    width: 300px;
    background-color: white;
    border-radius: 10px;
    margin: 0 auto;
    position: relative;
    .forget {
      display: flex;
      float: right;
      margin-bottom: 16px;
      margin-right: 16px;
      .van-icon {
        margin: 0 7px;
        margin-top: 3px;
      }
      p {
        font-size: 16px;
        color: rgb(108, 108, 108);
      }
    }
    .van-button {
      background: linear-gradient(90deg, #f35447 0, #ff8e3c);
      border: none;
    }
    &::after {
      content: "";
      width: 90%;
      height: 10px;
      position: absolute;
      top: 100%; /*  */
      background-color: rgb(254, 201, 169);
      border-radius: 0 0 30px 30px;
      left: 50%;
      transform: translateX(-50%);
    }
    .van-tabs {
      padding-top: 20px;
      .van-tab {
        font-size: 20px;
      }
    }
    .van-tab__pane {
      .van-cell {
        margin: 10px 0;
        .van-field__left-icon {
          i {
            font-size: 20px;
            margin: 0 10px;
          }
        }
      }
    }
    .register {
      padding-bottom: 20px;
      font-size: 14px;
      color: rgb(185, 185, 185);
      text-align: center;
      span {
        color: #eb5447;
      }
    }
  }
  .van-tabs__line {
    height: 3px;
  }
  .smabtn {
    width: 90px;
  }
}
</style>