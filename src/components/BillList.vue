<template>
  <div class="datas">
    <p class="time" v-if="d.time">{{ d.time }}</p>
    <div class="list" v-for="(l, i) in d.list" :key="i">
      <p>{{ l.title }}</p>
      <p>{{ l.add_time }}</p>
      <p :class="{ g: l.pm == 1 }">{{ l.pm == 0 ? "-" : "+" }}{{ l.number }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["d"],
};
</script>

<style lang="less">
.datas {
  .time {
    background-color: rgb(231, 231, 231);
    font-size: 14px;
    padding: 15px;
  }
  .list {
    padding: 10px 0;
    position: relative;
    border-bottom: 0.5px solid rgb(225, 225, 225);
    p {
      &:first-child {
        font-size: 16px;
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
  p {
    padding: 0 15px;
  }
}
</style>