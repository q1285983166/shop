<template>
  <div class="DeTall">
    <load-ing :show="showa"></load-ing>
    <!-- 商品轮播图 -->
    <van-swipe class="top_swipe" @change="onChange">
      <van-swipe-item v-for="(s, index) in storeInfo.slider_image" :key="index">
        <img v-lazy="s" />
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">
          {{ current + 1 }}/{{ storeInfolength }}
        </div>
      </template>
    </van-swipe>
    <!-- 商品详情 -->
    <div class="info">
      <div class="info_top">
        <p>￥{{ storeInfo.price }}</p>
        <p>￥{{ storeInfo.vip_price }}</p>
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAVCAYAAAA5BNxZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphNmVhODdiZC0zYWY5LTEzNDYtYjYyYy1hZGE1MDVmMDUxMTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MURGMzA2REQyMDNEMTFFOTkxOUVDOTNCMjU4MDcwQjQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MURGMzA2REMyMDNEMTFFOTkxOUVDOTNCMjU4MDcwQjQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODk2ZWFjMGYtNDI3MC0yZDRlLThiYTItYjE4OTA2YzRiOWVlIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MDg3NDQyZTItM2M1ZC1iNDRkLTljYmUt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"
          alt=""
        />
      </div>
      <div class="info_con">
        <p>{{ storeInfo.store_name }}</p>
      </div>
      <div class="info_bto">
        <P>原价:￥{{ storeInfo.ot_price }}</P>
        <P>库存:{{ storeInfo.stock }}{{ storeInfo.unit_name }}</P>
        <P>销量:{{ storeInfo.sales }}{{ storeInfo.unit_name }}</P>
      </div>
    </div>
    <!-- 商品种类 -->
    <van-cell
      v-if="sshow"
      :title="`已选择` + suki"
      is-link
      @click="show = true"
    />
    <!-- 用户评价 -->
    <van-cell class="cell_right" title="用户评价(0)" is-link value="好评率" />
    <!-- 优品推荐 -->
    <div class="cell_div">
      <van-cell value-class="cell" value="优品推荐" />
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4MzY0MDk5ZC0yYTkzLTliNDEtOGRmYy1jOGJmMzFlMzdmNzEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Q0RDRjkwRTdEODI5MTFFOTkwMjJEM0NGMjU2NjJCMDYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Q0RDRjkwRTZEODI5MTFFOTkwMjJEM0NGMjU2NjJCMDYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ZGUzODVhZDQtYzhjNS00M2UxLTlkNWEtMTFmOGY5MGNlZWJkIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjgzNjQwOTlkLTJhOTMtOWI0MS04ZGZjLWM4YmYzMWUzN2Y3MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmrrFTIAAAGpSURBVHjazNe9T4NAFADw947WcqXgRw1KqtbJxcXFpZN/gyaNU/+4Ti4k/glOHZyMg3H0q2mThqhtU+wHnKBEaWzluGLwEkIgufsBx733DkCwdUu5jH+I9kdR1DsVg0tLaw4nfw6HUCm45YjguCAKojgmgArhmBAaG8cE0Vg4Joxy40QUxRWZoqHqc7r7fYq/rXMihK5RinvFOurKOW4UDBGcxEbX8xT39ToQrHgTVYZVanoPEhsnsVBdoXhgfKLff0kZNNlELRcLJ9yoUaB4uFUHKYSGcWXJxHyWGydcaEmlpLI9Gw3jcsaEJYkLJ9GoRsnRroeSCscyKkOWmN5UROIEUmokWORWsOh/NNbs2u7FXQ0ct8Ex3j2M3RNwWSsqsHy8cTTes93GY80b8HIuyeAW3ibHMHJaPNHs61NH4q2+za7bPn41C2W9YZUNxm3eEDo1x5H4w2uP3XROp3Affbar0B9ZceI2CoXMzYKKO8tnMHRk96lbBWtgxU0WKJwkdEUFxiTWGbyIZKjU0uL/LARSLX1SLfZSLW9TLeiT3MIIt0U3be8CDADFKvt2TKvKzAAAAABJRU5ErkJggg=="
        alt=""
      />
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4MzY0MDk5ZC0yYTkzLTliNDEtOGRmYy1jOGJmMzFlMzdmNzEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Q0RDRjkwRTdEODI5MTFFOTkwMjJEM0NGMjU2NjJCMDYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Q0RDRjkwRTZEODI5MTFFOTkwMjJEM0NGMjU2NjJCMDYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ZGUzODVhZDQtYzhjNS00M2UxLTlkNWEtMTFmOGY5MGNlZWJkIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjgzNjQwOTlkLTJhOTMtOWI0MS04ZGZjLWM4YmYzMWUzN2Y3MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmrrFTIAAAGpSURBVHjazNe9T4NAFADw947WcqXgRw1KqtbJxcXFpZN/gyaNU/+4Ti4k/glOHZyMg3H0q2mThqhtU+wHnKBEaWzluGLwEkIgufsBx733DkCwdUu5jH+I9kdR1DsVg0tLaw4nfw6HUCm45YjguCAKojgmgArhmBAaG8cE0Vg4Joxy40QUxRWZoqHqc7r7fYq/rXMihK5RinvFOurKOW4UDBGcxEbX8xT39ToQrHgTVYZVanoPEhsnsVBdoXhgfKLff0kZNNlELRcLJ9yoUaB4uFUHKYSGcWXJxHyWGydcaEmlpLI9Gw3jcsaEJYkLJ9GoRsnRroeSCscyKkOWmN5UROIEUmokWORWsOh/NNbs2u7FXQ0ct8Ex3j2M3RNwWSsqsHy8cTTes93GY80b8HIuyeAW3ibHMHJaPNHs61NH4q2+za7bPn41C2W9YZUNxm3eEDo1x5H4w2uP3XROp3Affbar0B9ZceI2CoXMzYKKO8tnMHRk96lbBWtgxU0WKJwkdEUFxiTWGbyIZKjU0uL/LARSLX1SLfZSLW9TLeiT3MIIt0U3be8CDADFKvt2TKvKzAAAAABJRU5ErkJggg=="
        alt=""
      />
    </div>
    <van-swipe class="my-swipe" indicator-color="red">
      <van-swipe-item>
        <ul @click="rel">
          <good-list v-for="g in good_list1" :key="g.id" :g="g"></good-list>
        </ul>
      </van-swipe-item>
      <van-swipe-item
        ><ul @click="rel">
          <good-list v-for="g in good_list1" :key="g.id" :g="g"></good-list></ul
      ></van-swipe-item>
      <van-swipe-item
        ><ul @click="rel">
          <good-list v-for="g in good_list1" :key="g.id" :g="g"></good-list></ul
      ></van-swipe-item>
    </van-swipe>
    <!-- 详情 -->
    <van-cell value="产品介绍" />
    <div v-html="storeInfo.description" class="description"></div>
    <!-- 底部导航 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon
        icon="cart-o"
        to="/shopcars"
        :badge="valid.length"
        text="购物车"
      />
      <van-goods-action-icon icon="shop-o" text="店铺" />
      <van-goods-action-button
        @click="show = true"
        type="warning"
        text="加入购物车"
      />
      <van-goods-action-button
        @click="show = true"
        type="danger"
        text="立即购买"
      />
    </van-goods-action>
    <!-- 商品规格 -->
    <van-sku
      ref="checkbox"
      v-model="show"
      :sku="sku"
      :goods="goods"
      :goods-id="goodsId"
      @add-cart="addCart"
      @buy-clicked="buyClicked"
    />
  </div>
</template>
<script>
import LoadIng from "../components/LoadIng";
import GoodList from "../components/GoodList";
export default {
  inject: ["reload"], //注入依赖
  components: {
    GoodList,
    LoadIng,
  },
  props: ["sid"],
  // 商品列表数据
  created() {
    (this.showa = true), this.updata();
    this.$axios.get("/api/product/detail/" + this.sid).then((d) => {
      this.showa = false;
      let id = 1;
      let idobj = {};
      let ssk = 1;
      let datas = d.data.data;
      let productAttr = datas.productAttr;
      this.productValue = datas.productValue;
      this.storeInfo = datas.storeInfo;
      this.sku.price = datas.storeInfo.price;
      this.sku.stock_num = datas.storeInfo.stock;
      this.storeInfolength = datas.storeInfo.slider_image.length;
      this.good_list1 = datas.good_list.slice(0, 6);
      this.good_list2 = datas.good_list.slice(6, 12);
      this.good_list3 = datas.good_list.slice(12, 18);
      this.sku.list = [];
      if (this.productValue.length == 0) {
        this.sshow = false;
      }
      if (this.productValue.length != 0) {
        this.goods.picture = this.productValue[
          Object.keys(this.productValue)[0]
        ].image;
        this.sku.tree = productAttr.map((atr, ads) => {
          let va = atr.attr_value.map((at, index) => {
            id++;
            idobj[at.attr] = id;
            let attrs = {
              id: id,
              name: at.attr,
            };
            if (ads < 1) {
              attrs.imgUrl = this.productValue[
                Object.keys(this.productValue)[index]
              ].image;
            }
            return attrs;
          });
          var ks = "s" + ssk;
          ssk++;
          return {
            k: atr.attr_name,
            k_id: atr.attr_name,
            v: va,
            k_s: ks,
          };
        });
        for (let key in this.productValue) {
          let v = this.productValue[key];
          let keys = key.split(",");
          this.sku.list.push({
            id: v.unique,
            price: v.price * 100,
            s1: idobj[keys[0]],
            s2: idobj[keys[1]],
            stock_num: v.stock,
            goods_id: v.product_id,
            imgUrl: v.image,
          });
        }
      } else {
        this.goods.picture = this.storeInfo.image;
        this.sku.tree = [];
        this.sku.list = [
          {
            id: "",
            price: this.storeInfo.price * 100,
            s1: "1216",
            s2: "1193",
            stock_num: this.storeInfo.stock,
            goods_id: this.storeInfo.id,
            imgUrl: this.storeInfo.image,
          },
        ];
      }
    });
  },
  data() {
    return {
      showa: true,
      suki: "",
      current: 0,
      storeInfo: {},
      storeInfolength: 0,
      productValue: null,
      good_list1: [],
      good_list2: [],
      good_list3: [],
      show: false,
      sshow: true,
      valid: [],
      sku: {
        //初始化demo数据
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          {
            k: "颜色", //属性名称
            k_id: "1", //属性的ID值 唯一 在当前产品里面唯一
            v: [
              //颜色属性可用值列表
              {
                id: "30349", //属性ID
                name: "红色", //属性名
                //属性图片，默认只有第一行属性有
                imgUrl: "https://b.yzcdn.cn/vant/sku/shoes-1.png",
              },
              {
                id: "1215",
                name: "白色",
                imgUrl: "https://b.yzcdn.cn/vant/sku/shoes-1.png",
              },
              {
                id: "1216",
                name: "棕色",
                imgUrl: "https://b.yzcdn.cn/vant/sku/shoes-1.png",
              },
            ],
            k_s: "s1", //属性的k_s值 对应list里面组合键名
          },
          {
            k: "尺寸",
            k_id: "2",
            v: [
              {
                id: "1193",
                name: "30码",
              },
              {
                id: "1194",
                name: "40码",
              },
            ],
            k_s: "s2",
            count: 2,
          },
        ],
        // 所有 sku 的组合列表，如下是：白色1、白色2、天蓝色1、天蓝色2
        list: [
          {
            id: 2300,
            price: 500,
            s1: "1216",
            s2: "1193",
            stock_num: 100,
            goods_id: 123123,
          },
          {
            id: 2259,
            price: 120, //价格
            s1: "1215", //对应属性列表里面 k_s 等于s1的属性id值
            s2: "1193",
            stock_num: 20, //库存
            goods_id: 946755, //产品ID
          },
          {
            id: 2260,
            price: 110,
            s1: "1215",
            s2: "1194",
            stock_num: 2,
            goods_id: 946755,
          },
          {
            id: 2257,
            price: 130,
            s1: "30349",
            s2: "1193",
            stock_num: 40,
            goods_id: 946755,
          },
          {
            id: 2258,
            price: 100,
            s1: "30349",
            s2: "1194",
            stock_num: 50,
            goods_id: 946755,
          },
        ],
        price: "500",
        stock_num: null, // 商品总库存
        none_sku: false, // 是否无规格商品
        hide_stock: true, // 是否隐藏剩余库存
      },
      goods: {},
      goodsId: 1,
    };
  },
  methods: {
    onChange(index) {
      this.current = index;
    },
    buyClicked(e){
      this.$axios.post("http://47.115.51.185/api/cart/add", {
        cartNum: e.selectedNum,
        new: 0,
        productId: e.selectedSkuComb.goods_id,
        uniqueId: e.selectedSkuComb.id,
      }).then((d)=>{
        console.log(d);
        this.$router.push('/submit/'+d.data.data.cartId)
      })
    },
    addCart(e) {
      this.show = false;
      this.$axios.post("http://47.115.51.185/api/cart/add", {
        cartNum: e.selectedNum,
        new: 0,
        productId: e.selectedSkuComb.goods_id,
        uniqueId: e.selectedSkuComb.id,
      });
      this.$toast({
        message: "加入购物车成功",
        onClose: () => {
          this.updata();
        },
      });
      this.$axios.get("/api/cart/list").then((d) => {
        // 当前商品
        d.data.data.valid.map((d) => {
          if (d.product_attr_unique == e.selectedSkuComb.id) {
            this.suki = ":" + d.productInfo.attrInfo.suk;
          }
        });
      });
    },
    updata() {
      this.$axios.get("/api/cart/list").then((d) => {
        console.log(d);
        if (d.data.status == 410000) {
          this.$toast({
            message: d.data.msg,
            onClose: () => {
              this.$router.push("/load");
            },
          });
        }
        if (d.data.data.valid) {
          this.valid = d.data.data.valid;
        }
      });
    },
    rel() {
      console.log("1");
      this.$router.go(0);
    },
  },
};
</script>

<style lang="less" >
.cell {
  color: rgb(224, 24, 24);
}
.custom-indicator {
  position: absolute;
  right: 10px;
  bottom: 20px;
  padding: 2px 5px;
  font-size: 12px;
  background: rgb(254, 254, 254);
}
.DeTall {
  background-color: rgb(246, 246, 246);
  .cell_right {
    .van-cell__value {
      text-align: right;
    }
  }
  .cell_div {
    position: relative;
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateY(-60%);
      width: 16px;
      &:nth-child(2) {
        margin-left: -60px;
      }
      &:last-child {
        margin-left: 44px;
      }
    }
  }
  .my-swipe {
    background-color: white;
    padding-bottom: 20px;
    .van-swipe__indicators {
      bottom: 10px;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      li {
        width: 28%;
        img {
          width: 100%;
          height: 100px;
        }
        p {
          font-size: 12px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 100%;
          &:last-child {
            color: red;
            margin-bottom: 5px;
          }
        }
      }
    }
  }
  .van-cell__value {
    text-align: center;
  }
  .top_swipe {
    img {
      width: 100%;
      height: 400px;
    }
  }
  .info {
    margin-top: -6px;
    background-color: rgb(255, 255, 255);
    padding: 10px;
    .info_top {
      display: flex;
      align-items: flex-end;
      p {
        &:nth-child(1) {
          color: #000;
          color: red;
          font-weight: 600;
        }
        &:nth-child(2) {
          margin-left: 5px;
          margin-bottom: 1px;
          font-size: 16px;
          font-weight: 600;
        }
      }
      img {
        display: inline-block;
        margin-left: 5px;
        margin-bottom: 4px;
        width: 26px;
        height: 12px;
      }
    }
    .info_con {
      margin: 5px 0;
      p {
        font-size: 16px;
        font-weight: 600;
      }
    }
    .info_bto {
      display: flex;
      margin: 10px 0;
      justify-content: space-between;
      p {
        font-size: 12px;
        color: rgb(118, 118, 118);
      }
    }
  }
  .description {
    max-width: 375px !important ;
    overflow: hidden;
    .attributes-list {
      font-size: 14px;
    }
    .content {
      max-width: 375px !important ;
      img {
        max-width: 375px !important ;
      }
    }
  }
  .van-cell {
    margin-top: 10px;
  }
}
</style>