<template>
  <div class="album-songs-page">
    <div class="album-songs-page-bg">
      <img :src="AblumMes.imgItem ? AblumMes.imgItem.img : ''" />
      <div class="album-songs-page-bg-mask"></div>
    </div>

    <div class="album-songs-page-content">
      <div class="album-songs-page-head">
        <div class="head-back-box">
          <div class="head-back-box-left">
            <img src="@/assets/svg/back.svg" @click="back" />
            <span>歌单</span>
          </div>
          <div class="head-back-box-right">
            <img src="@/assets/MoreFunctionWhite.svg" alt="" />
          </div>
        </div>
      </div>

      <div class="album-songs-page-content-main">
        <div class="album-songs-page-content-main-singer">
          <div class="main-singer-left">
            <div class="main-singer-left-img">
              <img :src="AblumMes.imgItem ? AblumMes.imgItem.img : ''" />
            </div>
            <span class="ab-singer">{{ AblumMes.ownerName }}</span>
            <img class="r-arrow" src="@/assets/svg/rightArrow.svg" alt="" />
          </div>
          <div class="main-singer-right">
            <img src="@/assets/svg/ear.svg" />
            <span>{{
              AblumMes.opNumItem ? AblumMes.opNumItem.playNumDesc : ""
            }}</span>
            <img src="@/assets/svg/heart.svg" />
            <span>{{
              AblumMes.opNumItem ? AblumMes.opNumItem.keepNumDesc : ""
            }}</span>
          </div>
        </div>

        <div class="album-songs-page-album">
          <p class="page-album-name">{{ AblumMes.title }}</p>
          <div class="collect">
            <img src="@/assets/svg/redHeart.svg" />
            <p>收藏</p>
          </div>
        </div>

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
      AblumMes: {},
    };
  },
  created() {
    this.albumId = this.$route.params.id;
    this.getOnlySongsList(this.albumId);
    this.getAblumMes(this.albumId);
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
            totalCount: data.data.totalCount,
          };
        });
    },
    getAblumMes(id) {
      this.$axios
        .get(`/MIGUM3.0/resource/playlist/v2.0?playlistId=${id}`)
        .then(({ data }) => {
          this.AblumMes = data.data;
          // console.log(this.songsData)

        });
    },

    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.album-songs-page {
  width: 100vw;
  height: 100vh;
  overflow: auto;
}
.album-songs-page-bg {
  width: 100vw;
  position: fixed;
  top: 0%;
  left: 0%;
  z-index: -1;
  img {
    width: 100%;
  }
  .album-songs-page-bg-mask {
    height: 100%;
    width: 100%;
    background-color: rgb(0, 0, 0, 0.6);
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
    position: sticky;
    top: 4vh;
    left: 0%;
  }

  .head-back-box-left {
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      font-size: 20px;
      margin-left: 3vw;
    }
  }
}

.album-songs-page-content-main {
  width: 100vw;
  border-top-left-radius: 20px;
  background-color: #fff;
  .album-songs-page-content-main-singer {
    height: 8vh;
    border-top-left-radius: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 3vw;

    .main-singer-left {
      width: 40vw;
      height: 100%;
      border-top-left-radius: 20px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-evenly;

      .main-singer-left-img {
        height: 30px;
        width: 30px;

        img {
          height: 100%;
          width: 100%;
          border-radius: 999px;
        }
      }

      .ab-singer {
        font-size: 15px;
        color: #999;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 12vw;
        height: 2vh;
      }
    }
  }
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

.album-songs-page-album {
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3vw;

  .page-album-name {
    width: 50vw;
    font-size: 25px;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .collect {
    width: 22vw;
    height: 100%;
    border-radius: 999px;
    box-shadow: 0 0 6px 0 #ccc;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    p {
      font-size: 14px;
      color: #999;
    }
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