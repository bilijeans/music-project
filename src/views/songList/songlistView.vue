<template>
  <div class="song-list-page" ref="songListPage">
    <header>
      <div class="song-back">
        <div class="song-back-arrow" @click="goBack">
          <wd-icon name="thin-arrow-left" tag="div" size="10px"></wd-icon>
        </div>
        <span>歌单广场</span>
      </div>
    </header>

    <nav>
      <song-list-banner :bannerList="bannerList"></song-list-banner>
    </nav>

    <main>
      <img
        class="main-nav"
        src="@/assets/nav.svg"
        @click="isShowNav = !isShowNav"
      />
      <div class="recommend" ref="recommend">
        <p
          v-for="(i, index) in recommendNav"
          :key="'recommend' + index"
          ref="recommendContent"
          :class="{ active: recommendNavActive == index }"
          @click="getSongsListAndActive(i.tagId, index)"
        >
          {{ i.tagName }}
        </p>
        <i :style="[{left:`calc(2vw + ${(recommendNavActive + 1) * 16}vw - 25vw / 2)`}]"></i>
      </div>
      <div class="songs-list-contents">
        <div
          class="songs-list"
          v-for="item in songList"
          :key="'songsList' + item.logEvent.contentId"
          @click="goToOnlySongsList(item.logEvent.contentId)"
        >
          <img :src="item.imageUrl" />
          <div class="songs-list-num">
            <img src="@/assets/svg/ear2.svg" />
            <p>{{ item.playNum }}</p>
          </div>

          <p class="song-list-title">{{ item.title }}</p>
        </div>
      </div>
      <div class="has-not-song" v-show="songList.length == 0">没有啦 テ_デ</div>
    </main>

    <transition name="showNav" @after-enter="afterEnter">
      <footer v-show="isShowNav">
        <div class="footer-mask" @click="notShowNav" v-show="isShowMask"></div>

        <div class="footer-content">
          <div class="nav-content">
            <div
              class="nav-title"
              v-for="(item, index) in nav"
              :key="'title' + index"
              :class="{ active: index == isShowTitle }"
            >
              <a :href="'#' + item.header.title">{{ item.header.title }}</a>
            </div>
          </div>
          <div class="nav-content-text" @scroll="showTitle($event)">
            <div
              class="nav-content-text-content"
              v-for="(item, index) in nav"
              :key="'text' + index"
              :id="item.header.title"
            >
              <p>{{ item.header.title }}</p>

              <div class="content-txt">
                <p
                  v-for="i in item.content"
                  :key="'text' + i.texts[1]"
                  ref="content"
                  @click="changeUnderLine(i.texts[1], i.texts[0])"
                >
                  {{ i.texts[0] }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </transition>
  </div>
</template>

<script>
import SongListBanner from "@/components/SongListBanner.vue";
export default {
  data() {
    return {
      // id:'',
      bannerList: [],
      nav: [],
      recommendNav: [],
      isShowNav: false,
      songList: [],
      isShowTitle: 0,
      isShowMask: false,
      recommendNavActive: 0,
    };
  },
  components: {
    SongListBanner,
  },
  created() {
    this.id = this.$route.query.id || '1000001635';
    this.recommendNavActive = Number(this.$route.query.index) || 0;
    this.getHeaderBanner();
    this.getNav();
    this.getSongsList();
    this.getRecommendNav();
  },
  methods: {
    goBack() {
      this.$router.push({ path: "/home" });
    },
    getHeaderBanner() {
      this.$axios
        .get("/MIGUM3.0/v1.0/template/musiclistplaza-header")
        .then(({ data }) => {
          this.bannerList = data.data.contentItemList;
        });
    },
    getNav() {
      this.$axios
        .get("/MIGUM3.0/v1.0/template/musiclistplaza-taglist")
        .then(({ data }) => {
          this.nav = data.data;
        });
    },

    getRecommendNav() {
      this.$axios
        .get("/MIGUM3.0/v1.0/template/musiclistplaza-hottaglist")
        .then(({ data }) => {
          this.recommendNav = data.data.contentItemList;
        });
    },

    getSongsList() {
      this.$axios({
        methods: "GET",
        url: `/MIGUM3.0/v1.0/template/musiclistplaza-listbytag?pageNumber=1&tagId=${this.id}`,
        headers: {
          recommendstatus: 1,
          aversionid:
            "DF948B8E93A7A2886998899ED082987894978C909AA1A68AAEDDD3D18C799B73979585BA9AA8D6B967918DE9D0C59877999A8C8E94A4A28965938B",
        },
      }).then(({ data }) => {
        this.songList = data.data.contentItemList.itemList;
      });
    },

    getSongsListAndActive(id, index) {
      this.moveRecommendNav(index);

      this.id = id;

      this.recommendNavActive = Number(index);

      this.getSongsList();

    },

    goToOnlySongsList(id) {
      this.$router.push({
        name: "songListOnly",
        params: {
          id,
        },
      });
    },

    showTitle(e) {
      // console.log(e.target.scrollTop/ this.$refs.content[0].offsetHeight);
      let m = this.$refs.content[0].offsetHeight;
      let n = e.target.scrollTop;
      if (n < 2 * m) {
        this.isShowTitle = 0;
      } else if (n < 18 * m) {
        this.isShowTitle = 1;
      } else if (n < 27 * m) {
        this.isShowTitle = 2;
      } else if (n < 42 * m) {
        this.isShowTitle = 3;
      } else if (n < 54 * m) {
        this.isShowTitle = 4;
      } else if (n < 60 * m) {
        this.isShowTitle = 5;
      } else {
        this.isShowTitle = 6;
      }
    },

    afterEnter() {
      this.isShowMask = true;
    },
    notShowNav() {
      this.isShowNav = false;
      this.isShowMask = false;
    },

    changeUnderLine(id, name) {
      this.$refs.songListPage.scrollTop = 228;

      this.id = id;

      this.getSongsList();

      this.notShowNav();

      let isExist = this.recommendNav.find((i) => {
        return i.tagName == name;
      });

      if (!isExist) {
        this.recommendNavActive = 0;

        this.recommendNav = [
          {
            tagId: id,
            tagName: name,
          },
          ...this.recommendNav,
        ];

      } else {
        let isExistIndex = this.recommendNav.indexOf(isExist);

        this.recommendNavActive = Number(isExistIndex);

      }

      this.moveRecommendNav(this.recommendNavActive);
    },

    moveRecommendNav(index) {
      const recommend = this.$refs.recommend;

      const currentRecommend = this.$refs.recommendContent[index];

      const goLeft =
        currentRecommend.offsetLeft +
        currentRecommend.offsetWidth / 2 -
        recommend.offsetWidth / 2;

      const step = 5;

      let timer = setInterval(() => {
        if (recommend.scrollLeft > goLeft) {
          recommend.scrollLeft -= step;
        } else {
          recommend.scrollLeft += step;
        }

        if (Math.abs(recommend.scrollLeft - goLeft) < step || recommend.scrollLeft == 0 ||
          Math.ceil(recommend.scrollLeft) + recommend.offsetWidth >= recommend.scrollWidth) {

          window.clearInterval(timer);

          timer = null;
        }
      }, 10);
    },
  },
};
</script>


<style lang="scss" scoped>
.song-list-page {
  background-color: #eee;
  height: 100vh;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
}
header {
  background-color: #eee;
  position: fixed;
  top: 0%;
  z-index: 3;
  padding: 0 5vw;
  height: 7vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .song-back {
    width: 25vw;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      font-size: 16px;
    }
  }
}

main {
  margin-bottom: 7vh;
  border-top-left-radius: 20px;
  background-color: #fff;
  position: relative;

  .main-nav {
    box-shadow: -2px 0px 0px -1px #ccc;
    background-color: #fff;
    width: 7vw;
    position: absolute;
    top: calc(4.4vh / 2);
    right: 0%;
    z-index: 11;
  }
}

.songsListTitle {
  font-size: 20px;
  font-weight: 900;
  padding: 2vh 5vw;
}
.songs-list-contents {
  width: 100vw;
  height: 79vh;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
  .songs-list {
    height: 40vw;
    width: 30vw;
    margin-left: calc(9vw / 4);
    margin-top: 2vh;
    position: relative;
    img {
      height: 30vw;
      width: 30vw;
      border-radius: 15px;
    }
    .songs-list-num {
      position: absolute;
      bottom: 10vw;
      left: 0vw;
      color: #fff;
      height: 2vh;
      width: 100%;
      display: flex;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.4);
      border-bottom-left-radius: 15px;
      border-bottom-right-radius: 15px;

      p {
        font-size: 12px;
      }
      img {
        height: 15px;
        width: 15px;
        margin: 0 1vw 0 2vw;
      }
    }
    .song-list-title {
      width: 100%;
      font-size: 13px;
      line-height: 20px;
      font-weight: 400;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}

.recommend {
  margin: 2vh 3vw 1vh 3vw;
  display: flex;
  overflow: auto;
  background-color: #fff;
  position: sticky;
  top: 5vh;
  z-index: 2;
  border-top-left-radius: 20px;
  &::-webkit-scrollbar {
    display: none;
  }

  p {
    width: 16vw;
    height: 4vh;
    text-align: center;
    line-height: 4vh;
    margin: 2vh 0 1vh 0;
    color: #666;
    flex: 0 0 auto;
    font-size: 12px;

    &.active {
      font-size: 13px;
      font-weight: 600;
    }
  }

  i {
    display: inline-block;
    width: 5vw;
    height: 5px;
    border-radius: 5px;
    background-color: red;
    position: absolute;
    top: calc(11vh / 2);
    // left: calc(11vw / 2);
    z-index: 2;
    transition: all 0.5s;
  }
}

footer {
  height: 100vh;
  width: 100%;
  position: fixed;
  bottom: 0vh;
  right: 0%;
  z-index: 20;

  .footer-mask {
    height: 34vh;
    background-color: rgba(0, 0, 0, 0.4);
  }
}

.footer-content {
  height: 60vh;
  background-color: #fff;
  display: flex;

  .nav-content {
    background-color: #eee;
    height: 100%;
    width: 20vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .nav-title {
    width: 20vw;
    height: calc(50vh / 7);
    border-right: 1px solid #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      color: #000;
      display: inline-block;
      font-size: 18px;
    }
    &.active {
      background-color: #fff;
      font-weight: 600;
    }
  }

  .nav-content-text {
    height: 100%;
    width: 80vw;
    overflow: auto;
    display: flex;
    flex-direction: column;

    &::-webkit-scrollbar {
      display: none;
    }

    .nav-content-text-content {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      align-items: center;
      width: 80vw;
      margin-top: 5vh;
      margin-bottom: 10vh;

      .content-txt {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        p {
          margin-top: 3vh;
          margin-left: 5vw;
          height: 4vh;
          width: 20vw;
          text-align: center;
          line-height: 4vh;
          background-color: #eee;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 800;
        }
      }
    }
  }
}

.has-not-song {
  position: fixed;
  bottom: 8vh;
  left: 39vw;
}

.showNav-enter,
.showNav-leave-to {
  transform: translateY(100vh);
}
.showNav-enter-active {
  transition: all 0.5s;
}

.showNav-leave-active {
  transition: all 0.1s;
}

.showNav-enter-to,
.showNav-leave {
  transform: translateY(35vh);
}
</style>