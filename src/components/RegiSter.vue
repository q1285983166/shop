<template>
  <div class="ForgetWord">
    <van-tabs>
      <!-- 注册账号 -->
      <van-tab title="注册账号">
        <van-form>
          <van-field
            v-model="account"
            name="account"
            placeholder="输入手机号码"
            left-icon="phone-o"
          />
          <van-field
            v-model="code"
            type="number"
            name="code"
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
                @click.stop="codea"
                >{{
                  countdown >= 60 ? "获取验证码" : `${countdown}秒`
                }}</van-button
              >
            </template>
          </van-field>
          <!-- 登录密码 -->
          <van-field
            v-model="password"
            name="password"
            type="password"
            placeholder="请填写您的登陆密码"
            left-icon="bag-o"
          />
          <!-- 登录按钮 -->
          <div style="margin: 16px">
            <van-button @click.stop="onSubmit" round block type="info" native-type="submit"
              >注册</van-button
            >
          </div>
        </van-form>
      </van-tab>

      <!-- 注册 -->
      <div class="register">
        已有账号？<span @click="$emit('goload')">立即登录</span>
      </div>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      account: "",
      password: "",
      code: "",
      codekey: null,
      countdown: 60,
    };
  },
  created() {
    this.$axios.get("/api/verify_code").then((d) => {
      this.codekey = d.data.data.key;
    });
  },
  methods: {
    onSubmit() {
      this.$axios
        .post("api/register", {
          account: this.account,
          captcha: this.code,
          password: this.password,
          spread: null,
        })
        .then((d) => {
          console.log(d);
          if (d.data.status == 200) {
            this.$toast({
              message: d.data.msg,
              onClose: () => {
                this.$emit("goload");
              },
            });
          } else {
            this.$toast(d.data.msg);
          }
        });
    },
    // 发送验证码
    codea() {
      console.log("a");
      this.$axios
        .post("api/register/verify", {
          key: this.codekey,
          phone: this.account,
          type: "register",
        })
        .then((d) => {
          this.$toast(d.data.msg);
          console.log(d);
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
  },
};
</script>
<style lang="less">
.van-tabs__line {
  height: 0;
}
</style>