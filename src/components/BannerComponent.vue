<template>
  <div class="banner">
    <div v-for="(i, index) in bannerList" class="banner-content" :key="index">
      <img :src="i.imageUrl" />
      <p>{{i.title}}</p>
      <p class="num">{{i.subTitle}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bannerList: Array,
  },
};
</script>


<style lang="scss" scoped>
.banner {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 20vh;
  overflow: auto;
  .banner-content {
    height: 15vh;
    width: 30vw;
    margin-right: calc(10vw / 2);
    position: relative;

    &:last-child{
      margin: 0%;
    }

    img {
      height: 100%;
      width: 100%;
      border-radius: 15px;
    }

    .num{
        color: #fff;
        position: absolute;
        top: 13vh;
        left: 3vw;
        font-size: 12px;
    }
  }

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>