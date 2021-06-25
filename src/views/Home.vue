<template>
  <!-- 首页 -->
  <div class="home">
    <load-ing :show="show"></load-ing>
    <!-- 搜索框 -->
    <div class="top_search">
      <img :src="datas.logoUrl" alt="" />
      <van-search shape="round" placeholder="请输入搜索关键词" />
    </div>
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in datas.banner" :key="index">
        <img v-lazy="image.pic" />
      </van-swipe-item>
    </van-swipe>
    <!-- 宫格 -->
    <van-grid square icon-size="1rem" :border="false">
      <van-grid-item
        
        v-for="value in datas.menus"
        :key="value.id"
        :icon="value.pic"
        :text="value.name"
        :to="value.wap_url"
      />
    </van-grid>
    <!-- 新闻速报 -->
    <div class="press_speed">
      <!-- 图片 -->
      <div class="press_speed_img">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHwAAAAcCAYAAACj6tvkAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphNmVhODdiZC0zYWY5LTEzNDYtYjYyYy1hZGE1MDVmMDUxMTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzVEMDQxOUYxRjhDMTFFOUIwQkJCMEMyMkY3MzdBQUQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzVEMDQxOUUxRjhDMTFFOUIwQkJCMEMyMkY3MzdBQUQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODk2ZWFjMGYtNDI3MC0yZDRlLThiYTItYjE4OTA2YzRiOWVlIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MDg3NDQyZTItM2M1ZC1iNDRkLTljYmUt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"
          alt=""
        />
      </div>
      <!-- 文字轮播 -->
      <van-swipe
        style="height: 38.5px"
        :show-indicators="false"
        :autoplay="3000"
        vertical
        :touchable="false"
      >
        <van-swipe-item
          @click="hotlist"
          v-for="(text, index) in datas.roll"
          :key="index"
        >
          <p>{{ text.info }}</p>
          <van-icon size="14" name="arrow" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 快速选择 -->
    <van-cell
      to="/category"
      :border="false"
      title="快速选择"
      :title-class="'titke_class'"
      :label-class="'label_class'"
      :label="info.fastInfo"
      :center="true"
      is-link
      value="更多"
    />
    <!-- 滑动商品 -->
    <div class="slide_shop">
      <ul>
        <router-link
          tag="li"
          :to="`/shopdetails/${f.id}?title=${f.cate_name}`"
          v-for="f in info.fastList"
          :key="f.id"
        >
          <div class="slide_shop_img">
            <img :src="f.pic" alt="" />
          </div>
          <div class="slide_shop_text">
            <p>{{ f.cate_name }}</p>
          </div>
        </router-link>
      </ul>
    </div>
    <!-- 精品推荐 -->
    <van-cell
      to="/hot_new_goods/1"
      :border="false"
      title="精品推荐"
      :title-class="'titke_class'"
      :label-class="'label_class'"
      :label="info.bastInfo"
      :center="true"
      is-link
      value="更多"
    />
    <!-- 轮播 -->
    <div class="bastBanner">
      <van-swipe :height="120" :autoplay="3000">
        <van-swipe-item
          @click="Hot_New_Goods"
          v-for="(image, index) in info.bastBanner"
          :key="index"
        >
          <img v-lazy="image.img" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 商品卡片 -->
    <div class="shop_card">
      <ul>
        <BastLIst v-for="b in info.bastList" :key="b.id" :b="b"></BastLIst>
      </ul>
    </div>
    <!-- 热门榜单 -->
    <div class="hot_list">
      <div class="red_bg">
        <div class="red_bg_text">
          <p><span>热门榜单</span>根据销量、搜索、好评等综合得出</p>
          <span>更多<van-icon color="withe" name="arrow" /> </span>
        </div>
      </div>
      <div class="white_bg"></div>
      <div class="hot_con">
        <ul>
          <router-link
            tag="li"
            :to="`/detail/${l.id}`"
            v-for="l in likeInfo"
            :key="l.id"
          >
            <img :src="l.image" alt="" />
            <p>{{ l.store_name }}</p>
            <p>￥{{ l.price }}</p>
          </router-link>
        </ul>
      </div>
    </div>
    <!-- 首发新品 -->
    <van-cell
      class="new_shop"
      :border="false"
      title="首发新品"
      :title-class="'titke_class'"
      :label-class="'label_class'"
      :label="info.firstInfo"
      :center="true"
      is-link
      value="更多"
    />
    <!-- 首发新品 滑动商品 -->
    <div class="new_shop">
      <ul>
        <router-link
          tag="li"
          :to="`/detail/${f.id}`"
          v-for="f in info.firstList"
          :key="f.id"
        >
          <div class="new_shop_img">
            <img :src="f.image" alt="" />
          </div>
          <div class="new_shop_text">
            <p>{{ f.store_name }}</p>
          </div>
          <div class="new_shop_p">
            <p>￥{{ f.price }}</p>
          </div>
        </router-link>
      </ul>
    </div>
    <!-- 促销单品 -->
    <van-cell
      class="new_shop"
      :border="false"
      title="促销单品"
      :title-class="'titke_class'"
      :label-class="'label_class'"
      :label="info.salesInfo"
      :center="true"
      is-link
      value="更多"
    />
    <!-- 促销商品卡片 -->
    <div class="promotion">
      <ul>
        <router-link
          tag="li"
          :to="`/detail/${b.id}`"
          v-for="b in datas.benefit"
          :key="b.id"
        >
          <div class="card_img">
            <img :src="b.image" alt="" />
          </div>
          <div class="card_text">
            <p class="card_text_text">{{ b.store_name }}</p>
            <div class="card_text_price">
              <span>促销价：￥{{ b.price }}</span>
            </div>
            <div class="card_text_vip">
              <p>日常价{{ b.ot_price }}</p>
              <p>仅剩{{ b.stock }}</p>
            </div>
          </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import LoadIng from "../components/LoadIng";
import BastLIst from "../components/BastLIst";
export default {
  name: "Home",
  data() {
    return {
      datas: {},
      fastInfo: "",
      info: {},
      likeInfo: [],
      show: true,
    };
  },
  // 首页数据
  created() {
    this.show = true;
    this.$axios.get("/api/index").then((d) => {
      console.log(d);
      this.datas = d.data.data;
      this.info = this.datas.info;
      this.likeInfo = this.datas.likeInfo;
      this.show = false;
    });
  },
  // 注册组件
  components: {
    LoadIng,
    BastLIst,
  },

  computed: {},

  methods: {
    hotlist() {
      this.$router.push("/hotlist");
    },
    Hot_New_Goods() {
      this.$router.push("/hot_new_goods/1");
    },
  },
};
</script>
sty
<style lang="less">
.titke_class {
  font-size: 16px;
  font-weight: 600;
}
.label_class {
  font-size: 14px;
  color: rgb(188, 188, 188);
}

.home {
  margin-bottom: 50px;
  overflow: hidden;
  .top_search {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 63.5px;
      height: 22.5px;
    }
    .van-search {
      width: 280px;
      padding-right: 0;
    }
  }
  .van-swipe {
    width: 100%;
    height: 187.5px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .press_speed {
    height: 38.5px;
    padding: 0 15px;
    display: flex;
    align-items: center;
    box-shadow: 0 0 5px 5px rgba(234, 234, 234, 0.4);
    border-top: 1px solid rgba(236, 236, 236, 0.4);
    margin-bottom: 15px;
    .press_speed_img {
      width: 62px;
      height: 14px;
      margin-right: 20px;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .van-swipe {
      .van-swipe__track {
        .van-swipe-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          p {
            font-size: 14px;
            color: rgb(110, 110, 110);
            &::before {
              content: "";
              border-left: 1px solid;
              width: 30%;
              color: rgb(145, 145, 145);
              padding-left: 20px;
            }
          }
        }
      }
    }
  }
  .van-cell {
    padding-top: 0;
    padding-bottom: 0;
  }
  .slide_shop {
    padding: 16px;
    overflow: hidden;

    ul {
      overflow-y: hidden;
      overflow-x: auto;
      display: flex;
      &::-webkit-scrollbar {
        display: none;
      }
      li {
        text-align: center;
        margin-right: 10px;
        &:nth-child(1),
        &:nth-child(4),
        &:nth-child(7),
        &:nth-child(10) {
          border-bottom: 2.5px solid rgb(13, 219, 13);
        }
        &:nth-child(2),
        &:nth-child(5),
        &:nth-child(8) {
          border-bottom: 2.5px solid rgb(15, 123, 211);
        }
        &:nth-child(3),
        &:nth-child(6),
        &:nth-child(9) {
          border-bottom: 2.5px solid rgb(219, 16, 13);
        }
        img {
          display: block;
          width: 90px;
          height: 90px;
        }
        p {
          padding: 10px 0;
          font-size: 14px;
        }
      }
    }
  }
  .bastBanner {
    padding: 0 16px;
    padding-top: 10px;
    .van-swipe {
      height: 120px;
    }
  }
  .shop_card {
    padding: 0 16px;
  }
  .hot_list {
    height: 200px;
    position: relative;
    .red_bg {
      height: 120px;
      background-color: rgb(255, 49, 34);
      .red_bg_text {
        color: white;
        padding: 10px 16px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        font-size: 12px;
        p {
          &:nth-child(1) {
            span {
              font-size: 14px;
              font-weight: 600;
              margin-right: 10px;
            }
          }
        }
        span {
          &:nth-child(2) {
            font-size: 12px;
            display: flex;
            align-items: center;
            .van-icon-arrow {
              margin-left: 4px;
            }
          }
        }
      }
    }
    .white_bg {
      height: 70px;
      background-color: white;
      border-radius: 100%;
      margin: -45px -20px 0 -20px;
    }
    .hot_con {
      background-color: white;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 91%;
      top: 45px;
      border-radius: 10px;
      box-shadow: 0 0 10px 1px rgba(198, 198, 198, 0.5);
      ul {
        display: flex;
        justify-content: space-around;
        li {
          width: 25%;
          margin: 10px 0;
          img {
            display: flex;
            height: 90px;
            width: 100%;
            border-radius: 10px;
          }
          p {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 100%;
            font-size: 12px;
            margin: 5px 0;
            &:nth-child(3) {
              color: rgb(255, 49, 34);
            }
          }
        }
      }
    }
  }
  .new_shop {
    margin: 16px 0;
    padding: 0 16px;
    overflow: hidden;
    ul {
      overflow-y: hidden;
      overflow-x: auto;
      display: flex;
      &::-webkit-scrollbar {
        display: none;
      }
      li {
        text-align: center;
        margin-right: 10px;
        width: 120px;
        .new_shop_text {
          width: 100%;
          p {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        img {
          display: block;
          width: 100%;
          height: 120px;
        }
        p {
          padding: 2px 0;
          font-size: 14px;
        }
        .new_shop_p {
          color: rgb(255, 49, 34);
        }
      }
    }
  }
  .promotion {
    padding: 0 16px;
    li {
      display: flex;
      margin: 24px 0;
      position: relative;
      .card_img {
        img {
          width: 90px;
          height: 90px;
        }
      }
      .card_text {
        overflow: hidden;
        margin-left: 16px;
        .card_text_text {
          font-size: 14px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .card_text_price {
          font-size: 14px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          margin-top: 30px;
          span {
            background-color: #fc4141;
            color: white;
            padding: 5px 10px;
            border-radius: 20px 0 20px 0;
          }
        }
      }
      .card_text_vip {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        p {
          font-size: 12px;
          font-weight: 600;
          margin-right: 5px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          color: rgb(162, 162, 162);
          &:nth-child(1) {
            text-decoration: line-through;
          }
        }
      }
    }
  }
}
</style>