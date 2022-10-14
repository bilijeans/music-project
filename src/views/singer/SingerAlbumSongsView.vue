<template>
  <div class="album-songs-page">
    <div
      class="album-songs-page-bg"
      v-for="(i, d) in AblumMes.imgItem"
      :key="'albumSong' + d"
    >
      <img :src="i.img" alt="" />
      <div class="album-songs-page-bg-mask"></div>
    </div>

    <div class="album-songs-page-content">
      <div class="album-songs-page-head">
        <div class="head-back-box">
          <div class="head-back-box-left">
            <img src="@/svg/back.svg" />
            <span>数字专辑</span>
          </div>
          <div class="head-back-box-righ">
            <img src="@/svg/more.svg" alt="" />
          </div>
        </div>
      </div>

      <div class="album-songs-page-content-main">
        <div class="album-songs-page-content-main-singer">
          <div class="main-singer-left">
            <div
              class="main-singer-left-img"
              v-for="(item, index) in AblumMes.imgItem"
              :key="index"
            >
              <img :src="item.img" alt="" />
            </div>
            <span class="ab-singer">{{ AblumMes.singer }}</span>
            <img class="r-arrow" src="@/svg/rightArrow.svg" alt="" />
          </div>
          <div class="main-singer-right">
            <img src="@/svg/ear.svg" />
            <span>{{ AblumMes.opNumItem.playNumDesc }}</span>
            <img src="@/svg/heart.svg" />
            <span>{{ AblumMes.opNumItem.keepNumDesc }}</span>
          </div>
        </div>
       
       <div class="album-songs-page-album">
        <p>{{AblumMes.title}}</p>
        <div class="collect">
             <img src="@/svg/redHeart.svg">
             <p>收藏</p>
        </div>
       </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      albumId: "",
      ablumSongsList: {},
      AblumMes: {},
    };
  },
  created() {
    this.albumId = this.$route.params.id;
    this.getAblumSongsList();
    this.getAblumMes();
  },
  methods: {
    getAblumSongsList() {
      this.$axios
        .get(`/MIGUM2.0/resource/dalbum/song/v2.0?dAlbumId=${this.albumId}`)
        .then(({ data }) => {
          this.ablumSongsList = data.data;
          console.log("data ==> ", data.data);
        });
    },

    getAblumMes() {
      this.$axios
        .get(`/MIGUM2.0/resource/dalbum/v2.0?dAlbumId=${this.albumId}`)
        .then(({ data }) => {
          console.log("data2 ==> ", data.data);
          this.AblumMes = data.data;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
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
    width: 92vw;
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
  height: 50vh;
  width: 100vw;
  border-top-left-radius: 20px;
  background-color: #fff;

  .album-songs-page-content-main-singer {
    height: 8vh;
    border-top-left-radius: 20px;
    display: flex;
    justify-content: space-between;
    padding-right: 3vw;

    .main-singer-left {
      width: 40vw;
      height: 100%;
      border-top-left-radius: 20px;
      position: relative;

      .main-singer-left-img {
        height: 30px;
        width: 30px;
        position: absolute;
        top: calc(50% - 15px);
        left: 7vw;

        img {
          height: 100%;
          width: 100%;
          border-radius: 999px;
        }
      }

      .ab-singer {
        font-size: 14px;
        color: #999;
        position: absolute;
        top: calc(50% - 1vh);
        left: 18vw;
      }
      .r-arrow {
        position: absolute;
        top: calc(33%);
        left: 29vw;
      }
    }
  }
}

.main-singer-right{
    width: 40vw;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span{
        font-size: 14px;
        color: #999;
    }
}

.album-songs-page-album{
    height: 10vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 3vw;

    p{
        font-size: 25px;
        font-weight: 500;
    }

    .collect{
        width: 22vw;
        height: 100%;
        border-radius: 999px;
        box-shadow: 0 0 6px 0 #ccc;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;

        p{
            font-size: 14px;
            color: #999;
        }

    }
}
</style>