<template>
  <div class="banner" @scroll="toHead($event)">
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide v-for="(i, index) in bannerList" :key="index" >
        <img :src="i.imageUrl"  @click="goToOnlySongsList(i.actionUrl)"/>
        <p class="title">{{ i.title }}</p>
        <p class="num">{{ i.subTitle }}</p>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
export default {
  props: {
    bannerList: Array,
  },
  data() {
    return {
      swiperOption: {
        effect: "coverflow",
        grabCursor: true,
        loop: true,
        centeredSlides: false,
        slidesPerView: "3",
        // autoplay: {
        //     delay: 2500,
        //     disableOnInteraction: false
        //   },
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        },
      },
    };
  },
  methods: {
    goToOnlySongsList(id) {
      this.$router.push({
        name: "songListOnly",
        params: {
          id,
        },
      });
    },
  },
};
</script>


<style lang="scss" scoped>
.example-3d {
  width: 100%;
  height: 3vh;
  padding-top: 50px;
  padding-bottom: 50px;
}

.swiper {
  height: 100%;
  width: 100%;
  background-image: url(@/assets/R-C.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  .swiper-slide {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    width: 30vw;
    height: 20vh;
    color: #fff;
    position: relative;

    .title {
      width: 100%;
      height: 3vh;
      font-size: 14px;
      line-height: 3vh;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    img {
      height: 15vh;
      border-radius: 15px;
    }

    .num {
      color: #fff;
      position: absolute;
      top: calc(27vh / 2);
      left: 5vw;
      font-size: 12px;
    }
  }
}
</style>