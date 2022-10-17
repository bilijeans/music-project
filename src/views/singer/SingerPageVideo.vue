<template>
  <div class="videoPage">
    <div
      class="video-content"
      v-for="item in singerViedoList"
      :key="'v' + item.resId"
      @click="getVideoUrl(item.action)"
    >
      <div class="video-content-img">
        <img :src="item.img" alt="" />
        <p class="playNum">{{ item.txt3 }}</p>
      </div>
      <p class="video-content-txt">{{ item.txt }}</p>
      <p class="video-content-txt2">{{ item.txt2 }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    singerViedoList: Array,
  },

  methods: {
    getVideoUrl(value) {
      console.log("视频Url ==>", value);
    },
  },
};
</script>

<style lang="scss" scoped>
.videoPage {
  background-color: #fff;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding-top: 2vh;
  height: 100vh;
  .video-content {
    width: 45vw;
    height: 23vh;
    margin-left: 3vw;

    .video-content-txt {
      padding-top: 1vh;
      font-size: 15px;
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .video-content-txt2 {
      font-size: 13px;
      color: #666;
      padding-top: 1vh;
    }

    .video-content-img {
      width: 100%;
      height: 13vh;
      position: relative;

      img {
        height: 100%;
        width: 100%;
        border-radius: 5px;
      }

      .playNum {
        font-size: 14px;
        color: #fff;
        position: absolute;
        bottom: 5%;
        left: 15%;
      }
    }
  }
}
</style>