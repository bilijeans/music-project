<template>
  <div class="rank">
    <div class="rank-head">
      <wd-icon name="arrow-left" @click="back()"></wd-icon>
      <div>排行榜</div>
    </div>
    <div class="rank-scream">
      <span>咪咕尖叫榜</span>
      <span>每小时更新</span>
    </div>
    <div class="screams"></div>
    <div class="rank-characteristic"></div>
    <div class="characteristics"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss">
.rank-head {
    position: relative;
    background-color: pink;
    i {
        position: absolute;
        top: 0;
        background-color: burlywood;
    }
    div {
        padding: 15px;
    }
}
</style>