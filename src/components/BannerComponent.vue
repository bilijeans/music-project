<template>
  <div class="home-banner">
    <!-- <ul class="banner-container" ref="banner">
      <li class="banner-item">
        <img :src="bannerData[bannerData.length - 1].img" />
      </li>
      <li class="banner-item" v-for="i in bannerData" :key="i.viewId">
        <img :src="i.img" />
      </li>
      <li class="banner-item">
        <img :src="bannerData[0].img" />
      </li>
    </ul> -->
    <van-swipe
      class="banner-container"
      :autoplay="3000"
      indicator-color="#cd3021"
    >
      <van-swipe-item
        v-for="i in bannerData"
        :key="i.viewId"
        class="banner-item"
        :loop="true"
        :width="351"
      >
        <img :src="i.img" />
        <!-- <div style="text-align:center">{{index}}</div> -->
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
export default {
  props: {
    bannerData: Array,
  },
  data() {
    return {
      timer: null,
      index: 1,
    };
  },
  created() {
    // console.log(this.bannerData);
  },
  mounted() {
    // console.log(this.$refs.banner);
    this.timer = setInterval(this.bannerMove, 3000);
  },
  methods: {
    bannerMove() {
      this.index++;
      if (this.index == this.bannerData.length + 2) {
        this.backToFirstPage();
      }
      this.next();

      // this.$nextTick(() => {
      //   if (this.index == this.bannerData.length - 1) {
      //     this.$refs.banner.style.transition = "0s";
      //   }
      //   console.log(1);
      //   this.index++;
      //   this.index = this.index % this.bannerData.length;
      //   this.$refs.banner.style.left = `${this.index * -90}vw`;
      // });
    },
    next() {
      this.$nextTick(() => {
        this.$refs.banner.style.left = `${this.index * -90}vw`;
      });
    },
    backToFirstPage() {
      // console.log(1);
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>
<style lang="scss">
.home-banner {
  width: 90vw;
  height: 32vw;
  margin: 0 auto;
}
.banner-container {
  img {
    display: block;
    width: 100%;
    height: auto;
  }
}
</style>

