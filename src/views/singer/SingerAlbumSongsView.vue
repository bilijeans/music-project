<template>
  <div class="album-songs-page">
    <div class="album-songs-page-bg">
      <img
        :src="
          AblumMes.imgItems
            ? AblumMes.imgItems[2].img
            : AblumMes.imgItem
            ? AblumMes.imgItem[2].img
            : ''
        "
        alt=""
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
            <img src="@/assets/MoreFunctionWhite.svg" alt="" />
          </div>
        </div>
      </div>

      <div class="album-songs-page-content-main">
        <div class="album-songs-page-content-main-singer">
          <div class="main-singer-left">
            <div class="main-singer-left-img">
              <img
                :src="
                  AblumMes.imgItems
                    ? AblumMes.imgItems[2].img
                    : AblumMes.imgItem
                    ? AblumMes.imgItem[2].img
                    : ''
                "
              />
            </div>
            <span class="ab-singer">{{ AblumMes.singer }}</span>
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
            <div :class="{collectActive : isCollect}" @click="collectHandel"></div>
            <p>收藏</p>
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
      albumType: "",
      songsData: {},
      AblumMes: {},
      isCollect:false,
    };
  },
  created() {
    this.albumId = this.$route.params.id;
    this.albumType = this.$route.params.type;
    this.getAblumSongsList();
    this.getAblumMes();
  },
  methods: {
    getAblumSongsList() {
      if (this.albumType == "1") {
        this.$axios
          .get(`/MIGUM3.0/resource/dalbum/song/v2.0?dAlbumId=${this.albumId}`)
          .then(({ data }) => {
            let dataList = data.data.songList;
            this.songsData = {
              dataList,
              totalCount: data.data.totalCount,
            };

            // console.log(this.songsData);
          });
      } else {
        this.$axios
          .get(`/MIGUM3.0/resource/album/song/v2.0?albumId=${this.albumId}`)
          .then(({ data }) => {
            let dataList = data.data.songList;
            this.songsData = {
              dataList,
              totalCount: data.data.totalCount,
            };
            // console.log(this.songsData);
          });
      }
    },

    getAblumMes() {
      if (this.albumType == "1") {
        this.$axios
          .get(`/MIGUM3.0/resource/dalbum/v2.0?dAlbumId=${this.albumId}`)
          .then(({ data }) => {
            this.AblumMes = data.data;
            // console.log(this.AblumMes)
          });
      } else {
        this.$axios
          .get(`/MIGUM3.0/resource/album/v2.0?albumId=${this.albumId}`)
          .then(({ data }) => {
            this.AblumMes = data.data;
            // console.log(this.AblumMes)
          });
      }
    },

    collectHandel(){
      this.isCollect = !this.isCollect
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
    width: 65vw;
    font-size: 16px;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .collect {
    width: 22vw;
    height: 22vw;
    border-radius: 999px;
    box-shadow: 0 0 6px 0 #ccc;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    div{
      height: 32px;
      width: 32px;
      margin-bottom: 3px;
      background-image: url(@/assets/svg/redHeart.svg);
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center center;

      &.collectActive{
        background-image: url(@/assets/svg/redHeartFull.svg);
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center center;
      }
    }

    p {
      font-size: 14px;
      color: #999;
    }
  }
}

.songslist {
  margin: 1vh 0 0 0;
}
</style>