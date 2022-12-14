<template>
  <div class="singerPage" @scroll="scrollHandle($event)">
    <div class="bgImage">
      <div ref="bgImgMask" class="bgImage-mask"></div>
      <img :src="singerPageData.imgs ? singerPageData.imgs[2].img : ''" />
    </div>
    <div class="content">
      <header>
        <div class="head">
          <div class="singerBack" @click="goBack">
            <img src="@/assets/svg/back.svg" alt="" />
            <span v-show="show">{{ singerPageData.singer }}</span>
          </div>
          <div class="singerMore">
            <img src="@/assets/MoreFunctionWhite.svg" alt="" />
          </div>
        </div>
        <div class="nav" ref="navOpacity" v-show="!show">
          <div class="singerName">{{ singerPageData.singer }}</div>
          <div class="fans">{{ singerPageData.followNums }}粉丝</div>
          <div class="wall">
            <img src="@/assets/svg/like.svg" alt="" />
            <div
              class="concern"
              @click="like"
              :style="{
                backgroundColor: isLike ? 'rgb(151, 149, 149,.5)' : '#e93f59',
              }"
            >
              {{ isLike ? "已" : "" }}关注
            </div>
          </div>
        </div>
      </header>
      <main>
        <div class="singer-nav">
          <singer-nav-component :tabName="tabName" @changeTab="getTab">
          </singer-nav-component>

          <transition-group ref="nav" name="navBar">
            <singer-main-component
              v-if="tab == 1"
              :singerPageData="singerPageData"
              :maskShow="maskShow"
              :similarSinger="similarSinger"
              @changeShowMask="getShowMask"
              key="main"
            ></singer-main-component>

            <songs-component
              v-else-if="tab == 2"
              :songsData="songsData"
              key="song"
              @changePage="addSongsPage"
            ></songs-component>

            <singer-video-component
              v-else-if="tab == 3"
              :singerViedoList="singerViedoList"
              key="video"
              @changeVideoPage="addVideoPage"
            ></singer-video-component>

            <singer-album-component
              v-else
              :SingerAlbumList="SingerAlbumList"
              key="album"
              @changeAlbumPage="addAlbumPage"
            ></singer-album-component>
          </transition-group>
        </div>
      </main>
    </div>

    <div class="mask" v-show="maskShow">
      <div class="mask-head">
        <div class="mask-head-img">
          <img :src="singerPageData.imgs ? singerPageData.imgs[2].img : ''" />

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
  </div>
</template>

<script>
import SongsComponent from "@/components/SongsComponent.vue";
import SingerAlbumComponent from "@/components/SingerComponents/SingerAlbumComponent.vue";
import SingerMainComponent from "@/components/SingerComponents/SingerMainComponent.vue";
import SingerVideoComponent from "@/components/SingerComponents/SingerVideoComponent.vue";
import SingerNavComponent from "@/components/SingerComponents/SingerNavComponent.vue";
import { mapMutations, mapState } from "vuex";

export default {
  components: {
    SingerMainComponent,
    SingerVideoComponent,
    SingerAlbumComponent,
    SongsComponent,
    SingerNavComponent,
  },

  data() {
    return {
      show: false,
      maskShow: false,
      tab: 2,
      id: "",
      type: "",
      isLike: false,
      singerPageData: {},
      similarSinger: [],
      tabName: [],
      songsData: {},
      singerSongListPage: 1,
      singerViedoList: [],
      SingerAlbumList: [],
      dataList: [],
      SingerAlbumListPage: 1,
      SingerVideoListPage:1,
      turnSongsPage: false,
      turnAlbumPage: false,
      turnVideoPage: false
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
    this.hasLike();
  },
  computed: {
    ...mapState(["user"]),
  },
  watch: {
    turnSongsPage() {
      if (this.turnSongsPage) {
        this.singerSongListPage = this.singerSongListPage + 1;
        this.getSongList();
      }
    },

    turnAlbumPage() {
      if (this.turnAlbumPage) {
        this.SingerAlbumListPage = this.SingerAlbumListPage + 1;
        this.getAlbumList();
      }
    },

    turnVideoPage() {
      if (this.turnVideoPage) {
        this.SingerVideoListPage = this.SingerVideoListPage + 1;
        this.getViedoList();
      }
    },
  },
  methods: {
    hasLike() {
      this.user.fav.singer.forEach((e) => {
        if (e.singerId == this.id) {
          this.isLike = true;
        }
      });
    },
    like() {
      this.isLike = !this.isLike;
      if (this.isLike) {
        this.addFavSinger({
          singerId: this.singerPageData.singerId,
          singerName: this.singerPageData.singer,
          cover: this.singerPageData.imgs[2].img,
          type: this.singerPageData.resourceType,
        });
      } else {
        this.delFavSinger(this.singerPageData.singerId);
      }
    },
    getSingerPersonalPage() {
      this.$axios
        .get(
          `/MIGUM3.0/v1.0/content/resourceinfo.do?resourceId=${this.id}&resourceType=${this.type}`
        )
        .then((data) => {
          this.singerPageData = data.data.resource[0];
        });
    },

    getSimilarSinger() {
      this.$axios
        .get(`/MIGUM3.0/bmw/singer/index/v1.0?singerId=${this.id}`)
        .then(({ data }) => {
          this.similarSinger = data.data.contents[3].contents;
        });
    },

    getAllNum() {
      this.$axios
        .get(`/MIGUM3.0/bmw/singer/info/v1.0?singerId=${this.id}`)
        .then(({ data }) => {
          this.tabName = data.data.contents[1].contents;
        });
    },
    getSongList() {
      this.$axios
        .get(
          `/MIGUM3.0/bmw/singer/song/v1.0?pageNo=${this.singerSongListPage}&singerId=${this.id}`
        )
        .then(({ data }) => {
          data.data.contents[0].contents.forEach((el) => {
            this.dataList.push(el.songItem);
          });

          this.songsData = {
            dataList: this.dataList,
            totalCount: this.dataList.length,
          };

          this.turnSongsPage = false;
        });
    },

    getViedoList() {
      this.$axios
        .get(`/MIGUM3.0/bmw/singer/mv/v1.0?pageNo=${this.SingerVideoListPage}&singerId=${this.id}`)
        .then(({ data }) => {
          data.data.contents.forEach(i => {
            this.singerViedoList.push(i)
          });

          this.turnVideoPage = false;
        });
    },

    getAlbumList() {
      this.$axios
        .get(
          `/MIGUM3.0/bmw/singer/album/v1.0?pageNo=${this.SingerAlbumListPage}&singerId=${this.id}`
        )
        .then(({ data }) => {
          data.data.contents.forEach((i) => {
            this.SingerAlbumList.push(i);
          });

          this.turnAlbumPage = false;
        });
    },

    getShowMask(value) {
      this.maskShow = value;
    },

    changeShowMaskToFalse() {
      this.maskShow = false;
    },

    getTab(value) {
      this.tab = value;
    },

    goBack() {
      this.$router.go(-1);
    },

    scrollHandle(e) {
      e.target.scrollLeft = 0;
      let windowY = window.innerHeight * 0.35;

      if (e.target.scrollTop >= windowY) {
        e.target.scrollTop = windowY + 2;

        this.show = true;

        this.$refs.bgImgMask.style.backdropFilter = `blur(5px)`;
      } else {
        this.show = false;

        this.$refs.bgImgMask.style.backdropFilter = `blur(${
          e.target.scrollTop / 48
        }px)`;

        let opacity = 100 - parseInt(e.target.scrollTop / 3);

        this.$refs.navOpacity.style.opacity = `${opacity}%`;
      }
    },
    addSongsPage(value) {
      this.turnSongsPage = value;
    },
    addAlbumPage(value) {
      this.turnAlbumPage = value;
    },
    addVideoPage(value){
      this.turnVideoPage = value
    },
    ...mapMutations(["addFavSinger", "delFavSinger"]),
  },
};
</script>


<style lang="scss" scoped>
.singerPage {
  position: relative;
  height: 100vh;
  overflow: auto;
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
    position: fixed;
    top: 0%;
    left: 0%;

    .bgImage-mask {
      width: 100%;
      height: 100%;
      background-color: rgb(0, 0, 0, 0.3);
      position: absolute;
      top: 0%;
      left: 0%;
      right: 0%;
      bottom: 0%;
    }

    img {
      width: 100%;
    }
  }
}
header {
  height: 45vh;
  position: relative;
  .head {
    height: 5vh;
    width: 100vw;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 3vh;
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
      // width: 18vw;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .nav {
    color: #fff;
    width: 100vw;
    position: absolute;
    bottom: 3vh;
    left: 0%;
    opacity: 100%;
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
  background-color: #fff;
  position: relative;

  .wd-tabs {
    border-top-left-radius: 20px;
    overflow: hidden;
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

.songslist {
  margin: 0;
  padding: 0;
}

.navBar-enter {
  transform: translateX(100vw);
}
.navBar-enter-active {
  transition: all 0.5s;
}
.navBar-enter-to {
  transform: translateX(0);
}
</style>