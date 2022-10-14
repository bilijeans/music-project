<template>
  <div class="singerPage">
    <div v-for="(i,d) in singerPageData.imgs" :key="'singerPage' + d">
    <img class="bgImage" :src="i.img" />
    </div>
    <div class="content">
      <header>
        <div class="head">
          <div class="singerBack" @click="goBack">
            <img src="@/svg/back.svg" alt="" />
            <span v-show="show">{{ singerPageData.singer }}</span>
          </div>
          <div class="singerMore">
            <img src="@/svg/share.svg" alt="" />
            <img src="@/svg/more.svg" alt="" />
          </div>
        </div>
        <div class="nav">
          <div class="singerName">{{ singerPageData.singer }}</div>
          <div class="fans">{{ singerPageData.followNums }}粉丝</div>
          <div class="wall">
            <img src="@/svg/like.svg" alt="" />
            <div class="concern" @click="like">+关注</div>
          </div>
        </div>
      </header>
      <main>
        <div class="singer-nav">
          <div
            :class="'num' + index"
            v-for="(item, index) in tabName"
            :key="index"
          >
            {{ item.txt2 }}
          </div>
          <wd-tabs v-model="tab" swipeable>
            <wd-tab v-for="item in tabName" :key="item.txt" :title="item.txt">
              <singer-page-main
                v-if="tab == 0"
                :singerPageData="singerPageData"
                :maskShow="maskShow"
                :similarSinger="similarSinger"
                @changeShowMask="getShowMask"
              ></singer-page-main>

              <singer-page-songs
                v-else-if="tab == 1"
                :singerSongList="singerSongList"
                @changeIsShowMore="changeSingerPageIsShowMore"
              ></singer-page-songs>

              <singer-page-video
                v-else-if="tab == 2"
                :singerViedoList="singerViedoList"
              ></singer-page-video>
              <singer-album-view
                v-else
                :SingerAlbumList="SingerAlbumList"
              ></singer-album-view>
            </wd-tab>
          </wd-tabs>
        </div>
      </main>
    </div>

    <div class="mask" v-show="maskShow">
      <div class="mask-head">
        <div class="mask-head-img" v-for="(i,d) in singerPageData.imgs" :key="'singerPage1' + d">
          <img :src="i.img" />

          <p>{{ singerPageData.singer }}</p>
        </div>
      </div>

      <div class="mask-content">{{ singerPageData.summary }}</div>

      <div class="mask-foot">
        <div class="clear" @click="changeShowMaskToFalse">
          <wd-icon name="close-bold" size="40px"></wd-icon>
        </div>
      </div>
    </div>

    <div class="song-content-more" v-show="isShowMore">
      <div class="song-content-more-mask" @click="isShowMoreCansel"></div>
      <div class="song-content-more-content">
        <div class="song-content-more-content-cansel" @click="isShowMoreCansel">
          取消
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SingerAlbumView from "./SingerAlbumView.vue";
import SingerPageMain from "./SingerPageMain.vue";
import SingerPageSongs from "./SingerPageSongs.vue";
import SingerPageVideo from "./SingerPageVideo.vue";
export default {
  components: {
    SingerPageMain,
    SingerPageSongs,
    SingerPageVideo,
    SingerAlbumView,
  },

  data() {
    return {
      show: false,
      maskShow: false,
      isShowMore: false,
      tab: 1,
      id: "",
      type: "",
      isLike: false,
      singerPageData: {},
      similarSinger: [],
      tabName: [],
      singerSongList: [],
      singerSongListPage: 1,
      singerViedoList: [],
      SingerAlbumList: [],
      SingerAlbumListPage:1
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.type = this.$route.params.type;
    this.getSingerPersonalPage();
    this.getSimilarSinger();
    this.getAllNum();
    this.getSongList();
    this.getViedoList();
    this.getAlbumList();
  },
  methods: {
    like(e) {
      this.isLike = !this.isLike;
      if (this.isLike) {
        e.target.textContent = "已关注";
        e.target.style.backgroundColor = "rgb(151, 149, 149,.5)";
      } else {
        e.target.textContent = "+关注";
        e.target.style.backgroundColor = "#e93f59";
      }
    },
    getSingerPersonalPage() {
      this.$axios
        .get(
          `/MIGUM2.0/v1.0/content/resourceinfo.do?resourceId=${this.id}&resourceType=${this.type}`
        )
        .then((data) => {
          this.singerPageData = data.data.resource[0];
        });
    },

    getSimilarSinger() {
      this.$axios
        .get(`/MIGUM2.0/bmw/singer/index/v1.0?singerId=${this.id}`)
        .then(({ data }) => {
          this.similarSinger = data.data.contents[3].contents;
        });
    },

    getAllNum() {
      this.$axios
        .get(`/MIGUM2.0/bmw/singer/info/v1.0?singerId=${this.id}`)
        .then(({ data }) => {
          this.tabName = data.data.contents[1].contents;
        });
    },
    getSongList() {
      this.$axios
        .get(
          `/MIGUM2.0/bmw/singer/song/v1.0?pageNo=${this.singerSongListPage}&singerId=${this.id}`
        )
        .then(({ data }) => {
          data.data.contents[0].contents.forEach((el) => {
            this.singerSongList.push(el);
          });
        });
    },

    getViedoList() {
      this.$axios
        .get(`/MIGUM2.0/bmw/singer/mv/v1.0?singerId=${this.id}`)
        .then(({ data }) => {
          this.singerViedoList = data.data.contents;
        });
    },

    getAlbumList() {
      this.$axios
        .get(`/MIGUM2.0/bmw/singer/album/v1.0?pageNo=${this.SingerAlbumListPage}&singerId=${this.id}`)
        .then(({ data }) => {
          this.SingerAlbumList = data.data.contents;
          console.log(data.data.contents);
        });
    },

    getShowMask(value) {
      this.maskShow = value;
    },

    changeShowMaskToFalse() {
      this.maskShow = false;
    },

    changeSingerPageIsShowMore(value) {
      this.isShowMore = value;
    },

    isShowMoreCansel() {
      this.isShowMore = false;
    },

    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>


<style lang="scss" scoped>
.singerPage {
  position: relative;

  .mask {
    width: 100vw;
    height: 100vh;
    color: rgb(200, 200, 200);
    background-color: rgba(29, 29, 29, 0.9);
    position: fixed;
    top: 0%;
    left: 0%;
    right: 0%;
    bottom: 0%;
    z-index: 999;
  }

  .bgImage {
    width: 100vw;
    height: 45vh;
    position: fixed;
    top: 0%;
    left: 0%;
    filter: blur(0px);
  }

  .content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    // background-color: #fff;
  }
}
header {
  height: 40vh;
  background-color: rgb(0, 0, 0, 0.3);
  display: flex;
  align-items: flex-end;
  .head {
    height: 5vh;
    width: calc(100vw - 40px);
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 5vh;
    left: 0;

    .singerBack {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #fff;

      span {
        padding: 0 20px;
      }
    }

    .singerMore {
      width: 18vw;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    img {
      height: 20px;
      width: 20px;
    }
  }
  .nav {
    color: #fff;
    width: 100vw;
    // background-color: rgb(0, 0, 0, 0.3);
    .singerName {
      font-size: 30px;
      font-weight: 500;
      margin-bottom: 10px;
      padding-left: 20px;
    }

    .fans {
      font-size: 12px;
      padding-left: 20px;
    }

    .wall {
      height: 5vh;
      display: flex;
      justify-content: space-between;
      padding: 20px 20px 0 20px;

      img {
        height: 20px;
        width: 20px;
      }

      .concern {
        width: 16vw;
        height: 3vh;
        font-size: 12px;
        font-weight: 500;
        background-color: #e93f59;
        text-align: center;
        line-height: 3vh;
        border-radius: 20px;
      }
    }
  }
}

.singer-nav {
  border-top-left-radius: 20px;
  width: 100vw;
  height: 100vh;
  padding: 0 0 20px 0;
  position: relative;

  .num0 {
    display: none;
  }
  .num1 {
    position: absolute;
    top: 2vh;
    left: 42vw;
    z-index: 999;
    font-size: 12px;
    color: #999;
  }
  .num2 {
    position: absolute;
    top: 2vh;
    left: 67vw;
    z-index: 999;
    font-size: 12px;
    color: #999;
  }
  .num3 {
    position: absolute;
    top: 2vh;
    left: 92vw;
    z-index: 999;
    font-size: 12px;
    color: #999;
  }

  .wd-tabs {
    border-top-left-radius: 20px;
    overflow: hidden;

    .singer-nav-content1 {
      width: 100vw;
      background-color: #61e93f;
    }
  }
}

.mask-head {
  height: 40vh;

  .mask-head-img {
    height: 130px;
    width: 130px;
    position: absolute;
    top: 10vh;
    left: calc(50vw - 65px);

    img {
      height: 100%;
      width: 100%;
      border-radius: 999px;
    }

    p {
      text-align: center;
      font-size: 20px;
      font-weight: 600;
      padding-top: 30px;
    }
  }
}

.mask-content {
  height: 50vh;
  padding: 0 10px;
  font-size: 12px;
  line-height: 3vh;
  overflow: auto;
}

.mask-foot {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;

  .clear {
    height: 40px;
    width: 40px;
  }
}
.song-content-more {
  position: fixed;
  bottom: 0%;
  left: 0%;
  top: 0%;
  right: 0%;
  background-color: rgb(0, 0, 0, 0.3);
  .song-content-more-mask {
    width: 100vw;
    height: 50vh;
  }
  .song-content-more-content {
    width: 100vw;
    height: 50vh;
    background-color: #fff;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    position: relative;

    .song-content-more-content-cansel {
      height: 5vh;
      width: 100vw;
      font-size: 18px;
      font-weight: 550;
      text-align: center;
      position: absolute;
      bottom: 0%;
      left: 0%;
    }
  }
}
</style>