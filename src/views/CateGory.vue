<template>
  <div class="ClassIfy">
    <load-ing :show="show"></load-ing>
    <!-- 搜索框 -->
    <van-search shape="round" placeholder="请输入搜索关键词" />
    <div class="none"></div>
    <!-- 上下滑动导航 -->
    <van-tabs class="ClassIfy_ul" scrollspy sticky>
      <van-tab
        class="ClassIfy_li"
        v-for="d in data"
        :key="d.id"
        :title="d.cate_name"
      >
        <div>
          <div class="tap">{{ d.cate_name }}</div>
          <ul>
            <router-link tag="li" :to="`/shopdetails/${c.id}?title=${c.cate_name}`" v-for="c in d.children" :key="c.id">
              <img :src="c.pic" alt="" />
              <p>{{ c.cate_name }}</p>
            </router-link>
          </ul>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import LoadIng from "../components/LoadIng";
export default {
  data() {
    return {
      data: [],
      show: true,
    };
  },
  // 商品列表数据
  created() {
    this.show = true;
    this.$axios.get("/api/category").then((d) => {
      this.data = d.data.data;
      this.show = false;
    });
  },
  components: {
    LoadIng,
  },
};
</script>

<style lang="less" >
.ClassIfy {
  position: relative;
  .van-search {
    z-index: 99;
    position: fixed;
    top: 0;
    width: 100%;
  }
  .van-sticky {
    .van-tabs__wrap {
      height: 100%;
      width: 100px;
      .van-tabs__nav {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
    }
  }
  .none {
    height: 55px;
    width: 100%;
  }
  .ClassIfy_ul {
    position: relative;
    .van-sticky {
      top: 0px;
      position: fixed;
      left: 0;
      margin-top: 55px;
      .van-tabs__wrap {
        background-color: rgb(247, 247, 247);
        .van-tabs__nav {
          background-color: rgb(247, 247, 247);
          padding: 0;
          .van-tab {
            line-height: 40px;
          }
          .van-tab--active {
            background-color: rgb(255, 255, 255);
          }
          .van-tabs__line {
            display: none;
          }
        }
      }
    }
    .van-tabs__content {
      margin-left: 100px;
      margin-bottom: 100px;
      .ClassIfy_li {
        div {
          margin-bottom: -20px;
          .tap {
            text-align: center;
            font-size: 10px;
            font-weight: 600;
            height: 50px;
            line-height: 50px;
            padding-top: 40px;
          }
          ul {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            li {
              margin-top: 10px;
              flex: 30%;
              text-align: center;
              img {
                width: 60px;
              }
              p {
                font-size: 14px;
              }
            }
          }
        }
      }
    }
  }
}
</style>