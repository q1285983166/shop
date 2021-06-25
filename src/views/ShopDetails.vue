<template>
  <div class="ShopDetalls">
    <!-- 搜索框 -->
    <van-search shape="round" placeholder="请输入搜索关键词" />
    <van-tabs @click="tabs(name,title)" title-active-color="red" v-model="active" line-height="0">
      <van-tab :name="0" to="/category" :title="title">
        <shop-list :shopList="shopList"></shop-list>
      </van-tab>
      <van-tab :name="1" :title="`价格`">
        <shop-list :shopList="shopList2"></shop-list>
      </van-tab>
      <img
        class="tab_2"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAATCAYAAABPwleqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxMGM0NTk3Mi0xZWRjLTc5NDktYmM5My01MmI5MGUwMjczMTkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjEwRUYxQTkyMTE2MTFFOTk4QUVDRTRFNDMyRTZFNkUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjEwRUYxQTgyMTE2MTFFOTk4QUVDRTRFNDMyRTZFNkUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODJmOGJjOWEtNjNhNi1hZDRkLTk0NTMtYWQxYTg4NTU5YTFhIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjEwYzQ1OTcyLTFlZGMtNzk0OS1iYzkzLTUyYjkwZTAyNzMxOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjUxYEEAAAD9SURBVHjaYpw5cyYDDiANxHOAOAmIn2NTwIRDIz8QbwdiDyDeCeUTpZkLiLcBsS6UD6K3QMXxamYD4hVAbIUmbgPEy4GYFZdmRiCeB8S+OLziB8TzoeowNE8A4mgG/AAk34euuRKI8xiIAwVAXAFisABxJhC3MZAGQOo/skBDVpmBdPAXpPkhA5kApFkeiJnJtdkLiKeRoTkLFNrTgbiGRI2g2JkOi6pWIJ5MpMaJQNyBnkjygXgpAY0g+UJsKew/NPttxqFxExAnQtVhzRi/gDgCiI+jiR8F4kgg/k0oS34DYk8gvgzlg2hvqDhRhcFHqAE7gNgdyscAAAEGAGMOLKKfpm4VAAAAAElFTkSuQmCC"
        alt=""
      />
      <van-tab :name="2" :title="`销量`">
        <shop-list :shopList="shopList"></shop-list>
      </van-tab>
      <img
        class="tab_3"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAATCAYAAABPwleqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxMGM0NTk3Mi0xZWRjLTc5NDktYmM5My01MmI5MGUwMjczMTkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjEwRUYxQTkyMTE2MTFFOTk4QUVDRTRFNDMyRTZFNkUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjEwRUYxQTgyMTE2MTFFOTk4QUVDRTRFNDMyRTZFNkUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODJmOGJjOWEtNjNhNi1hZDRkLTk0NTMtYWQxYTg4NTU5YTFhIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjEwYzQ1OTcyLTFlZGMtNzk0OS1iYzkzLTUyYjkwZTAyNzMxOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjUxYEEAAAD9SURBVHjaYpw5cyYDDiANxHOAOAmIn2NTwIRDIz8QbwdiDyDeCeUTpZkLiLcBsS6UD6K3QMXxamYD4hVAbIUmbgPEy4GYFZdmRiCeB8S+OLziB8TzoeowNE8A4mgG/AAk34euuRKI8xiIAwVAXAFisABxJhC3MZAGQOo/skBDVpmBdPAXpPkhA5kApFkeiJnJtdkLiKeRoTkLFNrTgbiGRI2g2JkOi6pWIJ5MpMaJQNyBnkjygXgpAY0g+UJsKew/NPttxqFxExAnQtVhzRi/gDgCiI+jiR8F4kgg/k0oS34DYk8gvgzlg2hvqDhRhcFHqAE7gNgdyscAAAEGAGMOLKKfpm4VAAAAAElFTkSuQmCC"
        alt=""
      />
      <van-tab :name="3" :title="`新品`">内容 4</van-tab>
    </van-tabs>
    <hot v-show="empty"></hot>
  </div>
</template>

<script>
import Hot from "../components/Hot";
import ShopList from "../components/ShopList";
export default {
  components: {
    ShopList,
    Hot,
  },
  data() {
    return {
      empty: false,
      title: null,
      active: "",
      shopList: [],
      shopList2: [],
    };
  },
  props: ["sid"],
  methods:{
    tabs(n,t){
      console.log(n,t);
    }
  },
  created() {
    this.title = this.$route.query.title;
    this.$axios.get("/api/products?sid=" + this.sid).then((d) => {
      console.log(d);
      if (d.data.data.length <= 0) {
        this.empty = true;
        console.log(123);
      }
      this.shopList = d.data.data;
    });
    this.$axios
      .get(
        "/api/products?page=1&limit=8&keyword=&sid="+this.sid+"&news=0&priceOrder=asc&salesOrder=")
      .then((d) => {
        console.log('dddd2222=>',d);
        if (d.data.data.length <= 0) {
          this.empty = true;
        }
        this.shopList2 = d.data.data;
      });
  },
};
</script>
<style lang="less" scoped>
.ShopDetalls {
  height: 100vh;
  background-color: rgb(245, 245, 245);
  .van-search {
    background-color: rgb(223, 35, 35);
  }
  .tab_2 {
    position: fixed;
    top: 71px;
    left: 158px;
    width: 7px;
  }
  .tab_3 {
    position: fixed;
    top: 71px;
    left: 252px;
    width: 7px;
  }
}

.red {
  color: red;
}
</style>