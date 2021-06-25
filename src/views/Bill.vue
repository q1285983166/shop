<template>
  <div class="bill">
    <van-tabs v-model="activeName">
      <van-tab title="全部" name="1">
        <BullList class="datas" v-for="(d, i) in datas" :key="i" :d="d" />
      </van-tab>
      <van-tab title="消费" name="2">
        <BullList class="datas" v-for="(d, i) in datasred" :key="i" :d="d" />
      </van-tab>
      <van-tab title="充值" name="3">
        <BullList class="datas" v-for="(d, i) in datasadd" :key="i" :d="d" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import BullList from "../components/BillList.vue";
export default {
  components: {
    BullList,
  },
  data() {
    return {
      activeName: this.$route.params.id,
      datas: [],
      datasadd: [],
      datasred: [],
    };
  },
  props: ["id"],
  created() {
    this.$axios.get("/api/spread/commission/0?page=1&limit=5").then((d) => {
      this.datas = d.data.data;
    console.log(this.datas);
    });
    this.$axios.get("/api/spread/commission/1?page=1&limit=5").then((d) => {
      this.datasred = d.data.data;
    });
    this.$axios.get("/api/spread/commission/2?page=1&limit=5").then((d) => {
      this.datasadd = d.data.data;
    });
  },
};
</script>

<style lang="less">
.g {
  color: rgb(23, 204, 41) !important;
}
</style>