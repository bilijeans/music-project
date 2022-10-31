<template>
  <div class="videoPage">
    <div
      class="video-content"
      v-for="item in singerViedoList"
      :key="'v' + item.resId"
      @click="
        goToVideoPage({
          id: item.resId,
          singerName: item.txt2,
          mes: item.txt,
          image: item.img,
        })
      "
    >
      <div class="video-content-img">
        <img :src="item.img" alt="" />
        <div class="playNum">
          <img src="@/assets/video.svg" alt="" />
          <p>{{ item.txt3 }}</p>
        </div>
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
    goToVideoPage({ id, singerName, mes, image }) {
      this.$router.push({
        path: "/video",
        query: {
          id,
          singerName,
          mes,
          image,
        },
      });
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
  height: 67vh;
  overflow: auto;

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
        display: flex;
        align-items: center;
        height: 3vh;
        width: 100%;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        background-color: rgba(117, 114, 114, 0.5);
        font-size: 13px;
        color: #fff;
        position: absolute;
        bottom: 0;
        left: 0;

        img {
          height: 20px;
          width: 20px;
          margin: 0 1vw 0 2vw;
        }
      }
    }
  }
}
</style>