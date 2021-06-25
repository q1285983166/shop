<template>
  <div class="ForgetWord">
    <van-tabs line-height="0px" line-width="0px">
      <!-- 找回密码 -->
      <van-tab class="Forget" title="找回密码">
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
            placeholder="请填写您的登陆密码"
            left-icon="bag-o"
          />
          <!-- 登录按钮 -->
          <div style="margin: 16px">
            <van-button
              @click.stop="onSubmit"
              round
              block
              type="info"
              native-type="submit"
              >确认</van-button
            >
          </div>
        </van-form>
      </van-tab>
      <!-- 注册 -->
      <div class="register" @click="$emit('goload')"><span>立即登录</span></div>
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
        .post("api/register/reset", {
          account: this.account,
          captcha: this.code,
          password: this.password,
          code: "",
        })
        .then((d) => {
          this.$toast(d.data.msg);
          if (d.data.msg == status) {
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
    codea() {
      console.log("a");
      this.$axios
        .post("api/register/verify", {
          key: this.codekey,
          phone: this.account,
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
<style lang="less" scoped>
</style>
