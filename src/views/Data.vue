<template>
  <div class="Data">
    <van-cell value="管理我的账号" />
    <!-- 顶部账号信息 -->
    <div class="my_info">
      <div class="info_box">
        <img class="info_img" :src="datas.avatar" alt="" />
        <img
          class="img_img"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpkNTA0M2QyNC02ZDBmLTkwNGItYjY1Ni02OGM0MTIzOWMzZDEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDU2OUE5RjFCRjBFMTFFOUFDNzRBNUUwNDlEMzk1RTciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDU2OUE5RjBCRjBFMTFFOUFDNzRBNUUwNDlEMzk1RTciIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NGRkYmQ0NDMtMjEwZS00ZjVjLWE0MDgtMDYxM2VkMDBkMDE1IiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6YWIyMDM4YzctNTBiNi0xNzRiLTg3NGEtNjkyZDA5MzI1MWRmIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+bMGCmQAAA5NJREFUeNq0l0tME1EUhs8wDATFAiJEIhZBMSZqkFeiCeKrwEZjwAUlMbCRRCBRSYyy8AELQ9wIESRskKVhAZGEjYiCBNTwBsFHUEgBkUcLrUCFPrjeMw4IdDotUzjJaTtzzz1f79zH/IchhIAjm4o5xNGvJOoJ1GOph1H3FZr11Ieot1N/Tf1VYMd3s6OcjBSYAjH5LWCYbC4yJsAz7hxwEdHA7g8BZpcPH0PmDGAd1YC5txOWWhrB3N2hBUKe0aZi+gf0dpMjWMwnow+qJ2PDJwz5d4hFM0ScNYtmmBgK7hLsizns5RcDstTLtMkXiKm/h8g17Ku9dIZgLswpCRag1bM5GWR5YZ64atYZHZm5pkZ49Ub4RnDJTKaaLJtMZKsMc81ev4rwUlEwbUjFR4P/cqsNn542WYXw1HVgesOXLoZJV+bUop0i2qeFZKaihFiNC6JzjgxkrQXn40qUa+bxMfLj9BHyVenB+/iNDNE4Q0EejjofmQz94UH36Zh/TUMA7k85NpqaAMaPzavXHmHhENrYbxOH+12Xopqmow12o9eJXGSsLKjl108wvKiAvU8qgAsJW73vrbooGo8MZCGTB3vGnZUFHUlVwUReNszVVoGyqoGHKy6rISDvkd1+AivJnX5EcccjZUHNmiH+evrxPX6thNS2AKugpyzL2u3LHeNZUQg+zIaEyoaumOnbALA+fgBubpL92QM8KxyjfBhvhUtQfLxBRc8dQvm30r+Xi4+bqyNdhUo8XjFDsIHM/3YYOJ6VtiVQfI0iE8GDVs2wZLBVNw1/etq2ZKQCaxDBneZP3ZLBCy1v8IhzGYomsLoQXL/U0iQZbGxtAq+ok7An9z4oXzZDUHGlLCiawKpfOTLH6ZHpL3Z6GT+8A6t2ChgPT6eTM147YGe8SvLIdKe6yES1VelCZflDxYNCW91VcBuWvvRtalTcPiWEvR+0nbLKcpyyMmS6C/eKF+uqs7yuqAO5oxHrF1FyGlhOxW8KzPrutp3bz32wWFczjax1Ym/bhUBKAlkr/jZKn9JtkT5Z6TbSZ+PJddPc1V5jyM0EYjSCq7asnwV9djqY2lprMLekrv4vb1XENNArX97Svk7LWxFBP4mSCEX65gR93oq+sivonSlhcuk+z6EljL9n3HngTtASJli5voQZGwFzD5Ywb7GE0QklTJFUCcNssmhLXFO0+QnNs2uKtnp03KeOcv4VYABwkIZ9IZVk0gAAAABJRU5ErkJggg=="
          alt=""
        />
        <div class="info_text">
          <p>{{ datas.nickname }}</p>
          <p>绑定手机号{{ datas.phone }}</p>
        </div>
        <div class="dqzh">
          <p>当前账号</p>
        </div>
      </div>
    </div>
    <!-- 昵称 -->
    <van-cell title="昵称" :value="datas.nickname" />
    <!-- ID号 -->
    <van-cell title="ID号" :value="datas.uid" />
    <!-- 手机号 -->
    <van-cell title="手机号" :value="datas.phone" />
    <!-- 密码 -->
    <van-cell title="密码" is-link value="点击修改密码" />
    <div class="button">
      <van-button color="rgb(233,51,35)" round type="info">保存修改</van-button>
      <van-button @click="esc" color="rgb(233,51,35)" plain round type="info"
        >退出登录</van-button
      >
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      datas: [],
    };
  },
  created() {
    this.$axios.get("/api/user").then((d) => {
      console.log(d);
      this.datas = d.data.data;
    });
  },
  methods:{
      esc() {
      this.escToken();
      this.$toast({
        message: "退出成功!",
        onClose: () => {
          this.$router.push("/load");
        },
      });
    },
    ...mapMutations(["escToken"]),
  },
  
};
</script>
<style lang="less" scoped>
.Data {
  background-color: rgb(234, 234, 234);
  height: 100vh;
  .button {
    padding: 15px;
    .van-button {
      margin: 5px 0;
      width: 100%;
      &:last-child {
        background-color: rgb(234, 234, 234);
      }
    }
  }

  .my_info {
    margin-bottom: 5px;
    height: 100px;
    padding: 10px;
    background-color: white;
    .info_box {
      height: 80%;
      border-radius: 10px;
      border: 1px solid red;
      background-color: rgb(255, 244, 244);
      display: flex;
      align-items: center;
      position: relative;
      overflow: hidden;
      .info_img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin: 0 20px;
      }
      .img_img {
        width: 20px;
        position: absolute;
        top: 50px;
        left: 55px;
      }
      .info_text {
        p {
          font-size: 16px;
          &:last-child {
            color: rgb(180, 180, 180);
            font-size: 12px;
          }
        }
      }
      .dqzh {
        position: absolute;
        background-color: rgb(252, 144, 144);
        color: white;
        position: absolute;
        top: 0;
        right: 0;
        font-size: 12px;
        padding: 2px 5px;
        border-radius: 0 0 0 10px;
      }
    }
  }
}
</style>