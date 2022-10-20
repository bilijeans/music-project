<template>
  <div class="album-songs-page">
    <div class="album-songs-page-bg">
      <img
        :src="songsData.dataList? songsData.dataList[0].img3 : ''"
      />
      <div class="album-songs-page-bg-mask"></div>
    </div>

    <div class="album-songs-page-content">
      <div class="album-songs-page-head">
        <div class="head-back-box">
          <div class="head-back-box-left">
            <img src="@/assets/svg/back.svg" @click="back" />
            <span>数字专辑</span>
          </div>
          <div class="head-back-box-right">
            <img src="@/assets/svg/more.svg" alt="" />
          </div>
        </div>
      </div>

      <div class="album-songs-page-content-main">


        <div class="album-songs-page-share">
          <div class="share-img">
            <img src="@/assets/svg/albumShare.svg" />
            <span>分享</span>
          </div>
          <div class="comments-img">
            <img src="@/assets/svg/albumComments.svg" />
            <span></span>
          </div>
          <div class="download-img">
            <img src="@/assets/svg/albumDownLoad.svg" />
            <span>下载</span>
          </div>
        </div>

        <songs-component :songsData="songsData"></songs-component>
      </div>
    </div>
  </div>
</template>

<script>
import SongsComponent from "@/components/SongsComponent.vue";
export default {
  components: { SongsComponent },
  data() {
    return {
      albumId: "",
      songsData: {},
    };
  },
  created() {
    this.albumId = this.$route.params.id;
    this.getOnlySongsList(this.albumId)
  },
  methods: {
    getOnlySongsList(id) {
      this.$axios
        .get(
          `/MIGUM3.0/resource/playlist/song/v2.0?pageNo=1&pageSize=50&playlistId=${id}`
        )
        .then(({ data }) => {
          let dataList = data.data.songList;
            this.songsData = {
              dataList,
              totalCount:data.data.totalCount
            }

            console.log(this.songsData)
        });
    },

    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.album-songs-page-bg {
  width: 100vw;
  height: 30vh;
  position: fixed;
  top: 0%;
  left: 0%;
  z-index: -1;
  background-color: pink;
  img {
    width: 100%;
  }
  .album-songs-page-bg-mask {
    height: 100%;
    width: 100%;
    background-color: rgb(0, 0, 0, 0.3);
    position: absolute;
    top: 0%;
    left: 0%;
    bottom: 0%;
    right: 0%;
  }
}

.album-songs-page-head {
  height: 18vh;
  .head-back-box {
    height: 10vh;
    width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 4vw;
    position: fixed;
    top: 4vh;
    left: 0%;
  }

  .head-back-box-left {
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.album-songs-page-content-main {
  width: 100vw;
  border-top-left-radius: 20px;
  background-color: #fff;

}

.main-singer-right {
  width: 38vw;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  span {
    font-size: 14px;
    color: #999;
  }
}



.album-songs-page-share {
  height: 5vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin-top: 20px;

  div {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #666;
  }
}

.songslist {
  margin: 0;
}
</style>