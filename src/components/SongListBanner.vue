<template>
  <div class="banner">
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide
        v-for="(i, index) in bannerList"
        :key="index"
        :id="i.actionUrl"
      >
        <img :src="i.imageUrl" />
        <div class="swiper-mask"></div>
        <p class="title">{{ i.title }}</p>
        <div class="num">
          <img src="@/assets/svg/ear2.svg" />
          <p>{{ i.subTitle }}</p>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
export default {
  mounted() {
    if (location.href.indexOf("#") <= 0) {
      location.href = location.href + "#";
      location.reload();
    }
  },
  props: {
    bannerList: Array,
  },
  data() {
    let self = this;
    return {
      swiperOption: {
        initialSlide: 2,
        effect: "coverflow",
        grabCursor: true,
        loop: true,
        centeredSlides: true,
        slidesPerView: "2",
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        coverflowEffect: {
          rotate: 20,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        },
        on: {
          click: function () {
            // console.log(this.realIndex,this.clickedSlide.id)
            self.goToOnlySongsList(this.clickedSlide.id);
          },
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
.banner {
  margin-top: 7vh;
}
.example-3d {
  width: 100%;
  height: 3vh;
  padding-top: 50px;
  padding-bottom: 50px;
}

.swiper {
  height: 100%;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  .swiper-slide {
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #fff;
    position: relative;

    .swiper-mask {
      height: 100%;
      width: 100%;
      background-color: rgb(0, 0, 0, 0.5);
      border-radius: 10px;
      position: absolute;
      top: 0%;
      left: 0%;
    }

    .title {
      width: 30vw;
      font-size: 15px;
      font-weight: 600;
      position: absolute;
      top: 6vh;
      left: 11vw;
      line-height: 4vh;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    img {
      width: 50vw;
      border-radius: 10px;
    }

    .num {
      color: #fff;
      position: absolute;
      top: 2vh;
      left: 4vw;
      font-size: 12px;
      display: flex;
      align-items: center;

      img {
        height: 15px;
        width: 15px;
        margin-right: 1vw;
      }
    }
  }
}
</style>